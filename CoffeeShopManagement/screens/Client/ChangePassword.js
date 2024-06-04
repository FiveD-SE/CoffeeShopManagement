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
import {
    getAuth,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { db } from "../../services/firebaseService";
import { doc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";
import Toast from "react-native-toast-message";
import { colors } from "../../assets/colors/colors";
import { connect } from "react-redux";
import { saveUserData } from "../../redux/actions/userActions";

const ChangePassword = ({ userData, saveUserData }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = async () => {
        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Vui lòng điền đầy đủ thông tin",
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
                return;
            }

            if (newPassword !== confirmPassword) {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Mật khẩu mới không trùng khớp",
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
                return;
            }

            if (oldPassword === newPassword) {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Mật khẩu mới không được trùng với mật khẩu cũ",
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
                return;
            }

            if (newPassword.length < 6) {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Mật khẩu mới phải có ít nhất 6 ký tự",
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
                return;
            }

            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                Alert.alert("Lỗi", "Người dùng chưa đăng nhập");
                return;
            }

            const credential = EmailAuthProvider.credential(
                userData.email,
                oldPassword
            );
            await reauthenticateWithCredential(user, credential);

            await updatePassword(user, newPassword);
            // set password to firestore
            const userDocRef = doc(db, "users", userData.id);
            await updateDoc(userDocRef, {
                password: newPassword,
            });

            // Update Redux state with the new password (optional)
            saveUserData({ ...userData, password: newPassword });

            await AsyncStorage.setItem("password", newPassword);

            await AsyncStorage.removeItem("email");
            await AsyncStorage.removeItem("password");
            await AsyncStorage.removeItem("isRemembered");
            await Updates.reloadAsync();

            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Mật khẩu đã được thay đổi thành công",
                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-bold",
                    color: colors.text.black_100,
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-bold",
                    color: colors.text.black_50,
                },
            });
        } catch (error) {
            console.error("Lỗi khi cập nhật mật khẩu:", error.message);

            if (error.code === "auth/wrong-password") {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Mật khẩu cũ không chính xác",
                    text1Style: {
                        fontSize: 16,
                        fontFamily: "lato-bold",
                        color: colors.text.black_100,
                    },
                    text2Style: {
                        fontSize: 12,
                        fontFamily: "lato-bold",
                        color: colors.text.black_50,
                    },
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Đã xảy ra lỗi khi cập nhật mật khẩu",
                    text1Style: {
                        fontSize: 16,
                        fontFamily: "lato-bold",
                        color: colors.text.black_100,
                    },
                    text2Style: {
                        fontSize: 12,
                        fontFamily: "lato-bold",
                        color: colors.text.black_50,
                    },
                });
            }
        }
    };

    const toggleOldPasswordVisibility = () => {
        setShowOldPassword(!showOldPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <View style={styles.rowLabelText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setOldPassword}
                            value={oldPassword}
                            placeholder="Mật khẩu cũ"
                            secureTextEntry={!showOldPassword}
                        />
                        <Pressable onPress={toggleOldPasswordVisibility}>
                            <Feather
                                name={showOldPassword ? "eye" : "eye-off"}
                                size={25}
                                style={styles.icon}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.rowLabelText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNewPassword}
                            value={newPassword}
                            placeholder="Mật khẩu mới"
                            secureTextEntry={!showNewPassword}
                        />
                        <Pressable onPress={toggleNewPasswordVisibility}>
                            <Feather
                                name={showNewPassword ? "eye" : "eye-off"}
                                size={25}
                                style={styles.icon}
                            />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.rowLabelText}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setConfirmPassword}
                            value={confirmPassword}
                            placeholder="Nhập lại mật khẩu mới"
                            secureTextEntry={!showConfirmPassword}
                        />
                        <Pressable onPress={toggleConfirmPasswordVisibility}>
                            <Feather
                                name={showConfirmPassword ? "eye" : "eye-off"}
                                size={25}
                                style={styles.icon}
                            />
                        </Pressable>
                    </View>
                </View>

                <Pressable style={styles.button} onPress={handlePasswordChange}>
                    <Text style={styles.buttonText}>Xác nhận</Text>
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
        fontFamily: "lato-regular",
    },
    button: {
        backgroundColor: "#3A3A3A",
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontFamily: "lato-bold",
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
