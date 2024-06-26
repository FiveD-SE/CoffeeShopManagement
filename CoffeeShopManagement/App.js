import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";

import AuthNavigator from "./navigation/AuthNavigator";
import SignInScreen from "./screens/Client/SignInScreen";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store/store";
import { auth, db } from "../CoffeeShopManagement/services/firebaseService";
import {
    getDoc,
    doc,
    query,
    collection,
    where,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import {
    saveUserData,
    updateAddressStatus,
    updateDeliveryStatus,
    updateUserLikes,
} from "./redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "./services/firebaseService";
import { IsOpenProvider } from "./utils/IsOpenContext";
import Toast from "react-native-toast-message";

export default function App() {
    const [role, setRole] = useState("");
    const [isLogin, setIsLogin] = useState(false);
    const [loaded] = useFonts({
        "lato-bold": require("./assets/fonts/HelveticaNeueBold.otf"),
        "lato-regular": require("./assets/fonts/HelveticaNeueMedium.otf"),
        "lato-light": require("./assets/fonts/HelveticaNeueLight.otf"),
    });

    useEffect(() => {
        // remove async storage
        // Check if the user is remembered and attempt to log them in
        const checkLogin = async () => {
            const isRemembered = await AsyncStorage.getItem("isRemembered");
            if (isRemembered === "true") {
                const email = await AsyncStorage.getItem("email");
                const password = await AsyncStorage.getItem("password");
                if (email && password) {
                    try {
                        const userCredential = await signInWithEmailAndPassword(
                            auth,
                            email,
                            password
                        );
                        const userDocSnap = await getDoc(
                            doc(db, "users", userCredential.user.uid)
                        );

                        if (userDocSnap.exists()) {
                            const userDoc = userDocSnap.data();
                            const userData = {
                                id: userCredential.user.uid,
                                email: userDoc.email,
                                name: userDoc.fullName,
                                likedProductId: userDoc.likedProductId,
                                userImage: userDoc.userImage,
                                role: userDoc.role,
                                phoneNumber: userDoc.phoneNumber,
                                credit: userDoc.credit,
                                rankPoint: userDoc.rankPoint,
                                recentlyViewedItems:
                                    userDoc.recentlyViewedItems,
                            };
                            store.dispatch(saveUserData(userData));
                            setIsLogin(true);
                            setRole(userDoc.role);
                        }
                    } catch (error) {
                        console.error("Error signing in:", error);
                        Toast.show({
                            type: "error",
                            text1: "Login Error",
                            text2: "Failed to sign in. Please check your credentials.",
                        });
                    }
                }
            }
        };

        checkLogin();
    }, []);

    useEffect(() => {
        const setUpAddressListener = async () => {
            const email = await AsyncStorage.getItem("email");
            const password = await AsyncStorage.getItem("password");
            if (email && password) {
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    const userId = userCredential.user.uid;

                    const q = query(
                        collection(db, "addresses"),
                        where("userId", "==", userId)
                    );

                    const unsubscribe = onSnapshot(q, async (snapshot) => {
                        console.log("onSnapshot");
                        if (snapshot.empty) {
                            store.dispatch(updateAddressStatus(false));
                            console.log(
                                "No address information found for this user"
                            );
                        } else {
                            store.dispatch(updateAddressStatus(true));
                            const userAddress = snapshot.docs[0].data();
                            const userProvinceId = userAddress.provinceId;

                            const branchesSnapshot = await getDocs(
                                collection(db, "branches")
                            );
                            let matchFound = false;

                            branchesSnapshot.forEach((branchDoc) => {
                                const branchData = branchDoc.data();
                                if (branchData.provinceId === userProvinceId) {
                                    matchFound = true;
                                }
                            });

                            if (matchFound) {
                                store.dispatch(updateDeliveryStatus(true));
                                console.log(
                                    "User address province matches a branch address province"
                                );
                            } else {
                                store.dispatch(updateDeliveryStatus(false));
                                console.log(
                                    "User address province does not match any branch address province"
                                );
                            }
                        }
                    });

                    return () => unsubscribe();
                } catch (error) {
                    console.error("Error setting up address listener:", error);
                    throw error;
                }
            }
        };

        setUpAddressListener();
    }, []);

    if (loaded) {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <IsOpenProvider>
                        {role ? (
                            <AppNavigator role={role} />
                        ) : (
                            <AuthNavigator />
                        )}
                    </IsOpenProvider>
                    <Toast position="bottom" />
                </NavigationContainer>
            </Provider>
        );
    }
}
