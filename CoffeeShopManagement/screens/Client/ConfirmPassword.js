import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { deleteUser, getUserData } from "../../api";
import store from "../../redux/store/store";
import * as Updates from "expo-updates";
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { db } from "../../services/firebaseService"; // Import your Firebase auth instance
import { doc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { colors } from "../../assets/colors/colors"; // Assuming you have a colors file
import { connect } from "react-redux";
import { saveUserData } from "../../redux/actions/userActions";

const ConfirmPassword = ({ userData, saveUserData }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleConfirmDeleteAccount = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                Alert.alert("Lỗi", "Vui lòng đăng nhập để xoá tài khoản.");
                return;
            }

            // Kiểm tra xem người dùng đã nhập mật khẩu xác nhận chưa
            if (!password) {
                Alert.alert(
                    "Lỗi",
                    "Vui lòng nhập mật khẩu để xác nhận xóa tài khoản."
                );
                return;
            }

            // Xác nhận xóa tài khoản
            Alert.alert(
                "Xác nhận",
                "Bạn có chắc chắn muốn xoá tài khoản? Hành động này không thể hoàn tác.",
                [
                    {
                        text: "Huỷ",
                        style: "cancel",
                    },
                    {
                        text: "Xoá",
                        style: "destructive",
                        onPress: async () => {
                            // Xác thực lại tài khoản bằng mật khẩu
                            const credential = EmailAuthProvider.credential(
                                userData.email,
                                password
                            );
                            try {
                                await reauthenticateWithCredential(
                                    user,
                                    credential
                                );
                            } catch (error) {
                                console.log("Error reauthenticating:", error);
                                Toast.show({
                                    type: "error",
                                    text1: "Lỗi",
                                    text2: "Mật khẩu không chính xác.",
                                    text1Style: {
                                        fontSize: 16,
                                        fontFamily: "lato-regular",
                                        color: colors.black_100,
                                    },
                                    text2Style: {
                                        fontSize: 12,
                                        fontFamily: "lato-regular",
                                        color: colors.grey_100,
                                    },
                                });
                                return;
                            }

                            // Xoá tài khoản trên Firebase
                            try {
                                await user.delete();
                            } catch (error) {
                                console.log("Error deleting account:", error);
                                Toast.show({
                                    type: "error",
                                    text1: "Lỗi",
                                    text2: "Đã có lỗi xảy ra khi xoá tài khoản.",
                                    text1Style: {
                                        fontSize: 16,
                                        fontFamily: "lato-regular",
                                        color: colors.black_100,
                                    },
                                    text2Style: {
                                        fontSize: 12,
                                        fontFamily: "lato-regular",
                                        color: colors.grey_100,
                                    },
                                });
                                return;
                            }

                            // Xoá dữ liệu liên quan đến tài khoản người dùng
                            // ...

                            // Xoá thông tin đăng nhập trên thiết bị
                            await AsyncStorage.removeItem("email");
                            await AsyncStorage.removeItem("password");
                            await AsyncStorage.removeItem("isRemembered");

                            // Tải lại ứng dụng
                            await Updates.reloadAsync();

                            Toast.show({
                                type: "success",
                                text1: "Thành công",
                                text2: "Tài khoản của bạn đã được xoá.",
                                text1Style: {
                                    fontSize: 16,
                                    fontFamily: "lato-regular",
                                    color: colors.black_100,
                                },
                                text2Style: {
                                    fontSize: 12,
                                    fontFamily: "lato-regular",
                                    color: colors.grey_100,
                                },
                            });
                        },
                    },
                ]
            );
        } catch (error) {
            console.log("Error deleting account:", error);
            // Xử lý lỗi chung
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Đã có lỗi xảy ra khi xoá tài khoản.",
                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-regular",
                    color: colors.black_100,
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-regular",
                    color: colors.grey_100,
                },
            });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <View style={styles.rowLabelText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={!showPassword}
                        />
                        <Pressable onPress={togglePasswordVisibility}>
                            <Feather
                                name={showPassword ? "eye" : "eye-off"}
                                size={25}
                                style={styles.icon}
                            />
                        </Pressable>
                    </View>
                </View>

                <Pressable
                    style={styles.button}
                    onPress={handleConfirmDeleteAccount}
                >
                    <Text style={styles.buttonText}>Xoá tài khoản</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    section: {
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    passwordRequirement: {
        marginBottom: 20,
        fontSize: 14,
        color: "#9C9C9C",
        fontFamily: "Lato-Regular",
    },
    button: {
        backgroundColor: "#3A3A3A",
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontFamily: "lato-regular",
        fontSize: 18,
    },
    rowLabelText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#9C9C9C",
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
    },
    icon: {
        color: "#3A3A3A",
        marginRight: 15,
    },
});

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

const mapDispatchToProps = {
    saveUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPassword);
