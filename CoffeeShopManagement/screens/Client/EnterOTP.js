import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { signUp } from "../../api";
import BrownButton from "../../components/Client/Button/BrownButton";
const EnterOTP = ({ route }) => {
    const { isSignUp, userData } = route.params;
    // console.log(route);
    const [otp, setOTP] = useState(["", "", "", "", "", ""]);

    const navigation = useNavigation();

    const handleEnterOTP = async () => {
        if (isSignUp) {
            const { fullName, phoneNumber, password } = userData;
            // console.log(userData);
            const signUpSuccess = await signUp(fullName, phoneNumber, password);

            if (signUpSuccess) {
                navigation.navigate("SignInScreen");
            } else {
                navigation.navigate("SignUpScreen");
            }
        } else {
            navigation.navigate("ResetPassword");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Nhập mã xác thực</Text>
            <View style={styles.helperContainer}>
                <Text style={styles.helperText}>
                    Mã xác thực đã được gửi đến số điện thoại *******455
                </Text>
            </View>
            <View style={styles.main}>
                {otp.map((value, index) => (
                    <View style={styles.otpContainer} key={index}>
                        <TextInput
                            style={styles.input}
                            maxLength={1}
                            keyboardType="numeric"
                        />
                    </View>
                ))}
            </View>
            <Pressable style={styles.resendCodeContainer}>
                <Text style={styles.resendCodeText}>Gửi lại mã</Text>
            </Pressable>
            <BrownButton text="Xác nhận" onPress={handleEnterOTP} />
        </View>
    );
};

export default EnterOTP;

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
        fontSize: 14,
        fontWeight: "500",
    },
    main: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    otpContainer: {
        borderWidth: 1,
        borderRadius: 15,
        borderColor: "rgba(58, 58, 58, 0.2)",
        paddingVertical: Platform.select({
            ios: "4%",
            android: "4%",
        }),
        paddingHorizontal: Platform.select({
            ios: "5%",
            android: "5%",
        }),
        marginTop: "5%",
    },
    input: {
        textAlign: "center",
        color: "#3a3a3a",
        fontWeight: "500",
        fontSize: Platform.select({
            ios: 24,
            android: 20,
        }),
    },
    resendCodeContainer: {
        marginTop: "5%",
    },
    resendCodeText: {
        color: "#006C5E",
        fontSize: 16,
        fontWeight: "600",
    },
});
