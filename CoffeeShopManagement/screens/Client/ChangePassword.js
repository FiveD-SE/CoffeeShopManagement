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
import { getUserData, updatePassword } from "../../api";
import store from "../../redux/store/store";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                setPhoneNumber(store.getState().auth.phoneNumber);
                console.log("Phone number:", phoneNumber);
            } catch (error) {
                console.error("Error fetching phone number:", error);
            }
        };

        fetchPhoneNumber();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(phoneNumber);
                console.log("User data:", userData);
                if (userData) {
                    setUserData(userData);
                } else {
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (phoneNumber) {
            fetchUserData();
        }
    }, [phoneNumber]);

    const updatePasswordHandler = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Mật khẩu mới không khớp");
            return;
        }

        if (oldPassword === newPassword) {
            Alert.alert("Mật khẩu mới không được trùng với mật khẩu cũ");
            return;
        }

        if (newPassword.length < 8) {
            Alert.alert("Mật khẩu mới phải chứa ít nhất 8 ký tự");
            return;
        }

        try {
            const response = await updatePassword(
                phoneNumber,
                oldPassword,
                newPassword
            );
            if (response) {
                Alert.alert("Cập nhật mật khẩu thành công");
            } else {
                Alert.alert("Mật khẩu cũ không chính xác");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật mật khẩu:", error.message);
            Alert.alert("Đã xảy ra lỗi khi cập nhật mật khẩu");
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

                <Pressable
                    style={styles.button}
                    onPress={updatePasswordHandler}
                >
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
        fontFamily: "Lato-Bold",
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

export default ChangePassword;
