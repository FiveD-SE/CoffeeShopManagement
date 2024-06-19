import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import InputField from "../../components/Client/InputField";
import PasswordInput from "../../components/Client/PasswordInput";
import BrownButton from "../../components/Client/Button/BrownButton";
import BrownTextButton from "../../components/Client/Button/BrownTextButton";
import {
    saveUserData,
    initializeFavorites,
    getProductList,
    updateUserLikes,
    updateAddressStatus,
    updateDeliveryStatus,
} from "../../redux/actions/userActions";
import { connect } from "react-redux";
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
    onSnapshot,
} from "firebase/firestore";
import { colors } from "../../assets/colors/colors";

const GOOGLE_ICON_SOURCE = require("../../assets/google.png");
const BACKGROUND_SOURCE = require("../../assets/background.png");

const SignInScreen = ({
    saveUserData,
    updateAddressStatus,
    updateDeliveryStatus,
}) => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const [email, setEmail] = useState("");
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
            return favoritesData.map((favorite) => favorite.products);
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
            if (user.emailVerified) {
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
                        rankPoint: userDoc.rankPoint,
                        recentlyViewedItems: userDoc.recentlyViewedItems,
                    };
                    saveUserData(userData);
                    setRole(userDoc.role);

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

                    const q = query(
                        collection(db, "addresses"),
                        where("userId", "==", user.uid)
                    );
                    const unsubscribe = onSnapshot(q, async (snapshot) => {
                        if (snapshot.empty) {
                            updateAddressStatus(false);
                            console.log(
                                "No address information found for this user"
                            );
                        } else {
                            updateAddressStatus(true);
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
                                updateDeliveryStatus(true);
                                console.log(
                                    "User address province matches a branch address province"
                                );
                            } else {
                                updateDeliveryStatus(false);
                                console.log(
                                    "User address province does not match any branch address province"
                                );
                            }
                        }
                    });

                    return () => unsubscribe();
                }
            } else {
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

    const handleSignInByGoodle = () => {
        Toast.show({
            type: "info",
            text1: "Thông báo",
            text2: "Chức năng đang được phát triển",
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
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView contentContainerStyle={styles.main}>
                    <Image style={styles.header} source={BACKGROUND_SOURCE} />
                    <Image
                        source={require("../../assets/fived.png")}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text style={styles.title}>Đăng nhập</Text>

                    <View style={styles.inputContainer}>
                        <InputField
                            placeholder="Email"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                        />
                        <PasswordInput
                            placeholder="Mật khẩu"
                            onChangeText={setPassword}
                        />
                        <View style={styles.helperContainer}>
                            <View style={styles.rememberMeContainer}>
                                <Checkbox
                                    style={styles.checkbox}
                                    value={isChecked}
                                    color={isChecked ? "#a8a19b" : undefined}
                                    onValueChange={handleRememberMe}
                                />
                                <Text style={styles.helperText}>
                                    Ghi nhớ tôi
                                </Text>
                            </View>
                            <BrownTextButton
                                text="Quên mật khẩu?"
                                onPress={goToForgotPassword}
                            />
                        </View>
                    </View>
                    <BrownButton text="Đăng nhập" onPress={handleSignIn} />
                    <View style={styles.labelContainer}>
                        <View style={styles.divider}></View>
                        <Text style={styles.label}>hoặc đăng nhập bằng</Text>
                        <View style={styles.divider}></View>
                    </View>
                    <Pressable
                        style={styles.iconButton}
                        onPress={handleSignInByGoodle}
                    >
                        <Image
                            source={GOOGLE_ICON_SOURCE}
                            style={styles.icon}
                        />
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <View style={styles.helperContainer}>
                            <Text style={styles.helperText}>
                                Khách hàng mới?
                            </Text>
                            <View style={{ marginLeft: "2%" }}>
                                <BrownTextButton
                                    text="Tạo một tài khoản mới"
                                    onPress={goToSignUp}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        width: "100%",
        resizeMode: "cover",
        height: 200,
    },
    main: {
        flexGrow: 1,
        alignItems: "center",
    },
    title: {
        fontSize: 32,
        fontWeight: "600",
        color: "#54433A",
        marginBottom: 20,
    },
    helperContainer: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    rememberMeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkbox: {
        borderColor: "#A8A19B",
        borderRadius: 100,
        marginRight: 8,
    },
    helperText: {
        color: "#3a3a3a",
        fontWeight: "400",
        fontSize: 16,
    },
    labelContainer: {
        width: "95%",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    divider: {
        flex: 1,
        borderWidth: 0.5,
        height: 1,
    },
    label: {
        marginHorizontal: 10,
        color: "#3a3a3a",
        fontSize: 12,
        fontWeight: "500",
    },
    iconButton: {
        marginTop: 20,
        borderWidth: 1,
        borderRadius: 30,
        padding: 10,
        borderColor: "rgba(58,58,58,0.2)",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        resizeMode: "cover",
        width: 24,
        height: 24,
    },
    inputContainer: {
        paddingHorizontal: "5%",
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.user,
        addressStatus: state.user.addressStatus,
    };
};

const mapDispatchToProps = {
    saveUserData,
    updateAddressStatus,
    updateDeliveryStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
