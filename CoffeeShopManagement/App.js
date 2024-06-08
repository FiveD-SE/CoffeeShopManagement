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
import { saveToken, getToken, removeToken } from "./services/authServices";
import { initializeFavorites } from "./services/favoritesService";
import { getProductsList } from "./api";
import { getProductList } from "./redux/actions/userActions";
import { auth, db } from "../CoffeeShopManagement/services/firebaseService";
import { getDoc, doc } from "firebase/firestore";
import { saveUserData, updateUserLikes } from "./redux/actions/userActions";
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
							console.log("User data:", userDocSnap.data());
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
							};
							console.log("User data:", userData);
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

	if (loaded) {
		return (
			<Provider store={store}>
				<NavigationContainer>
					<IsOpenProvider>
						{role ? <AppNavigator role={role} /> : <AuthNavigator />}
					</IsOpenProvider>
					<Toast position="bottom" />
				</NavigationContainer>
			</Provider>
		);
	}
}
