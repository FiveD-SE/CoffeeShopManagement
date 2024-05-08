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

const ConfirmPassword = () => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

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

    const deleteAccountHandler = async () => {
        if (!password) {
            Alert.alert("Vui lòng điền mật khẩu");
            return;
        }

        try {
            const deleteSuccess = await deleteUser(phoneNumber, password);
            if (deleteSuccess) {
                Alert.alert(
                    "Xoá tài khoản thành công",
                    "Tài khoản đã được xoá",
                    [{ text: "OK", onPress: () => Updates.reloadAsync() }]
                );
            } else {
                Alert.alert("Xoá tài khoản thất bại", "Mật khẩu không đúng");
            }
        } catch (error) {
            console.error("Lỗi khi xóa tài khoản:", error.message);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa tài khoản");
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

                <Pressable style={styles.button} onPress={deleteAccountHandler}>
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

export default ConfirmPassword;
