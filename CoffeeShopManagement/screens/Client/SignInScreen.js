import { View, Text, StyleSheet, Image, Pressable, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import InputField from "../../components/Client/InputField";
import PasswordInput from "../../components/Client/PasswordInput";
import BrownButton from "../../components/Client/Button/BrownButton";
import BrownTextButton from "../../components/Client/Button/BrownTextButton";
import { signIn, getFavoritesListById, getProductsList } from "../../api";
import {
    signInSuccess,
    saveEmail,
    saveUserData,
    initializeFavorites,
    getProductList,
    updateUserLikes,
} from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { saveToken } from "../../services/authServices";
import store from "../../redux/store/store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
    getDocs,
    query,
    where,
    getDoc,
    doc,
    collection,
} from "firebase/firestore";
import { colors } from "../../assets/colors/colors";

const GOOGLE_ICON_SOURCE = require("../../assets/google.png");
const BACKGROUND_SOURCE = require("../../assets/background.png");

const SignInScreen = ({ saveUserData }) => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState(""); // Changed to email
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const goToForgotPassword = () => {
        navigation.navigate("SendOTP");
    };

    const goToSignUp = () => {
        navigation.navigate("SignUpScreen");
    };

    const handleRememberMe = () => {
        setChecked(!isChecked);
    };

    const getFavoritesListById = async (userId) => {
        try {
            const favoritesRef = collection(db, "favorites");
            // Create a query to find favorites belonging to the current user
            const q = query(favoritesRef, where("userId", "==", userId));
            const favoritesSnapshot = await getDocs(q);
            if (favoritesSnapshot.empty) {
                console.log("Favorites not found for this user");
                return null;
            }
            const favoritesData = favoritesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return favoritesData.map((favorite) => favorite.products); // Get the products array
        } catch (error) {
            console.error("Error fetching favorites:", error);
            throw error;
        }
    };

    const getProductsList = async () => {
        try {
            const productsRef = collection(db, "products");
            const productsSnapshot = await getDocs(productsRef);
            const productsData = productsSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return productsData;
        } catch (error) {
            console.error("Error fetching product list:", error);
            throw error;
        }
    };

    useEffect(() => {
        if (role === "user") {
            console.log("Role is user");
            navigation.navigate("UserNavigator");
        } else if (role === "cashier") {
            console.log("Role is cashier");
            navigation.navigate("CashierNavigator");
        } else if (role === "admin") {
            console.log("Role is admin");
            navigation.navigate("AdminNavigator");
        } else {
            console.log("Role is not defined");
        }
    }, [role]);

    const handleSignIn = async () => {
        console.log("Signing in...");
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;
            console.log("User ID:", user.uid);
            // Kiểm tra xem email đã được xác minh hay chưa
            if (user.emailVerified) {
                // Thực hiện đăng nhập
                const userDocSnap = await getDoc(doc(db, "users", user.uid));
                if (userDocSnap.exists()) {
                    const userDoc = userDocSnap.data();

                    const userData = {
                        id: user.uid,
                        email: userDoc.email,
                        name: userDoc.fullName,
                        likedProductId: userDoc.likedProductId,
                        userImage: userDoc.userImage,
                        role: userDoc.role,
                        phoneNumber: userDoc.phoneNumber,
                        credit: userDoc.credit,
                        recentlyViewedItems: userDoc.recentlyViewedItems,
                    };

                    saveUserData(userData);
                    console.log("User data: ", userData);
                    setRole(userDoc.role);
                    console.log("Role: ", userDoc.role);

                    if (isChecked) {
                        await AsyncStorage.setItem("email", email);
                        await AsyncStorage.setItem("password", password);
                        await AsyncStorage.setItem("isRemembered", "true");
                    } else {
                        await AsyncStorage.removeItem("email");
                        await AsyncStorage.removeItem("password");
                        await AsyncStorage.setItem("isRemembered", "false");
                    }
                    updateUserLikes(userData.likedProductId || []);
                    const favorites = await getFavoritesListById(user.uid);
                    if (favorites) {
                        initializeFavorites(favorites);
                    }
                    const products = await getProductsList();
                    getProductList(products);
                    signInSuccess(userData);
                }
            } else {
                // Nếu email chưa được xác minh, hiển thị thông báo lỗi
                Toast.show({
                    type: "error",
                    text1: "Lỗi đăng nhập",
                    text2: "Email của bạn chưa được xác minh. Vui lòng kiểm tra email và xác minh tài khoản của bạn trước khi đăng nhập.",
                    text1Style: {
                        fontSize: 16,
                        fontFamily: "lato-bold",
                        color: colors.black_100,
                    },
                    text2Style: {
                        fontSize: 12,
                        fontFamily: "lato-bold",
                        color: colors.grey_100,
                    },
                });
            }
        } catch (error) {
            console.log("Error signing in:", error);
            Toast.show({
                type: "error",
                text1: "Lỗi đăng nhập",
                text2: "Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập của bạn.",
                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-bold",
                    color: colors.black_100,
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-bold",
                    color: colors.grey_100,
                },
            });
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.header} source={BACKGROUND_SOURCE} />
            <View style={styles.main}>
                <Text style={styles.title}>Đăng nhập</Text>
                <InputField
                    placeholder="Email" // Changed to Email
                    keyboardType="email-address" // Added keyboard type
                    onChangeText={setEmail}
                />
                <PasswordInput
                    placeholder="Mật khẩu"
                    onChangeText={setPassword}
                />
                <View style={styles.helperContainer}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            marginRight: "auto",
                        }}
                    >
                        <Checkbox
                            style={styles.checkbox}
                            value={isChecked}
                            color={isChecked ? "#a8a19b" : undefined}
                            onValueChange={handleRememberMe}
                        />
                        <Text style={styles.helperText}>Ghi nhớ tôi</Text>
                    </View>
                    <BrownTextButton
                        text="Quên mật khẩu?"
                        onPress={goToForgotPassword}
                    />
                </View>
                <BrownButton text="Đăng nhập" onPress={handleSignIn} />
                <View style={styles.labelContainer}>
                    <View style={styles.divider}></View>
                    <Text style={styles.label}>hoặc đăng nhập bằng</Text>
                    <View style={styles.divider}></View>
                </View>
                <Pressable style={styles.iconButton}>
                    <Image source={GOOGLE_ICON_SOURCE} style={styles.icon} />
                </Pressable>
                <View style={styles.helperContainer}>
                    <Text style={styles.helperText}>Khách hàng mới?</Text>
                    <View style={{ marginLeft: "2%" }}>
                        <BrownTextButton
                            text="Tạo một tài khoản mới"
                            onPress={goToSignUp}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        width: "100%",
        resizeMode: "stretch",
    },
    main: {
        flex: 1,
        alignItems: "center",
        padding: "5%",
    },
    title: {
        fontSize: 32,
        fontWeight: "600",
        color: "#54433A",
    },
    helperContainer: {
        flexDirection: "row",
        marginTop: "5%",
    },
    checkbox: {
        borderColor: "#A8A19B",
        borderRadius: 100,
        marginRight: "2%",
    },
    helperText: {
        color: "#3a3a3a",
        fontWeight: "400",
        fontSize: 16,
    },
    labelContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
    },
    divider: {
        flex: 1,
        borderWidth: 0.5,
        height: 1,
    },
    label: {
        marginHorizontal: "3%",
        color: "#3a3a3a",
        fontSize: 12,
        fontWeight: "500",
    },
    iconButton: {
        marginTop: "5%",
        borderWidth: 1,
        borderRadius: 30,
        padding: "2%",
        borderColor: "rgba(58,58,58,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        resizeMode: "cover",
        width: 24,
        height: 24,
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    signInSuccess,
    saveUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
