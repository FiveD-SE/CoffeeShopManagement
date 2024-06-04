import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth"; // Import from firebase/auth
import { auth } from "../../services/firebaseService"; // Import your Firebase auth instance
import BrownButton from "../../components/Client/Button/BrownButton";
import InputField from "../../components/Client/InputField";
import Toast from "react-native-toast-message"; // Import Toast
import { colors } from "../../assets/colors/colors"; // Assuming you have a colors file

const SendOTP = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");

    const handleSendResetEmail = async () => {
        if (!email) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Vui lòng nhập địa chỉ email.",
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

        try {
            await sendPasswordResetEmail(auth, email);
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Chúng tôi đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.",
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

            navigation.goBack();
            // You might want to navigate to a different screen after sending the email
        } catch (error) {
            console.error("Error sending reset email:", error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Lỗi khi gửi email đặt lại mật khẩu.",
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
            <Text style={styles.titleText}>Đặt lại mật khẩu</Text>
            <InputField
                placeholder="Địa chỉ email"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />
            <View style={styles.helperContainer}>
                <Text style={styles.helperText}>
                    Chúng tôi sẽ gửi email với hướng dẫn đặt lại mật khẩu.
                </Text>
            </View>
            <BrownButton text="Gửi" onPress={handleSendResetEmail} />
        </View>
    );
};

export default SendOTP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingVertical: "5%",
        paddingHorizontal: "5%",
    },
    titleText: {
        color: "#54433A",
        fontSize: 28,
        fontWeight: "600",
    },
    helperContainer: {
        marginTop: "5%",
    },
    helperText: {
        color: "rgba(58,58,58,0.5)",
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 16,
    },
});
