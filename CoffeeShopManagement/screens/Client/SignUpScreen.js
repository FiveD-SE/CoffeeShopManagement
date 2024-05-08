import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import InputField from "../../components/Client/InputField";
import PasswordInput from "../../components/Client/PasswordInput";
import BrownButton from "../../components/Client/Button/BrownButton";
import BrownTextButton from "../../components/Client/Button/BrownTextButton";
import { useNavigation } from "@react-navigation/native";
// import { connect } from "react-redux"; // Commented out
// import { signUpRequest } from "../../redux/actions/userActions"; // Commented out
import { signUp } from "../../api";

const BACKGROUND_SOURCE = require("../../assets/background.png");

export default function SignUpScreen() {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isChecked, setChecked] = useState(false);

    const navigation = useNavigation();

    const goToSignIn = () => {
        navigation.navigate("SignInScreen");
    };

    const handleSignUp = async () => {
        if (isChecked && fullName && phoneNumber && password) {
            if (phoneNumber.length !== 10) {
                Alert.alert("Đăng ký thất bại", "Số điện thoại không hợp lệ");
                return;
            }

            if (password.length < 8) {
                Alert.alert(
                    "Đăng ký thất bại",
                    "Mật khẩu phải chứa ít nhất 8 ký tự"
                );
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert("Đăng ký thất bại", "Mật khẩu không khớp");
                return;
            }

            try {
                const signUpSuccess = await signUp(
                    fullName,
                    phoneNumber,
                    password
                );
                if (signUpSuccess) {
                    Alert.alert("Đăng ký thành công", "Vui lòng đăng nhập");
                    navigation.navigate("SignInScreen");
                }
            } catch (error) {
                Alert.alert(
                    "Đăng ký thất bại",
                    "Người dùng đã tồn tại",
                    [{ text: "OK", onPress: () => {}, style: "cancel" }],
                    { cancelable: false }
                );
                console.error("Error signing up:", error);
            }
        } else {
            Alert.alert("Đăng ký thất bại", "Vui lòng điền đầy đủ thông tin");
        }
    };

    const handleCheckBox = () => {
        setChecked(!isChecked);
    };

    return (
        <ScrollView style={styles.container}>
            <Image style={styles.header} source={BACKGROUND_SOURCE} />
            <View style={styles.content}>
                <Text style={styles.title}>Đăng ký</Text>
                <InputField
                    placeholder="Họ và tên"
                    onChangeText={setFullName}
                />
                <InputField
                    placeholder="Số điện thoại"
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <PasswordInput
                    placeholder="Mật khẩu"
                    iconName="eye-slash"
                    iconSize={16}
                    onChangeText={setPassword}
                />
                <PasswordInput
                    placeholder="Nhập lại mật khẩu"
                    iconName="eye-slash"
                    iconSize={16}
                    onChangeText={setConfirmPassword}
                />
                <View style={styles.helperContainer}>
                    <Checkbox
                        style={styles.checkbox}
                        value={isChecked}
                        color={isChecked ? "#a8a19b" : undefined}
                        onValueChange={handleCheckBox}
                    />
                    <Text style={{ flex: 1 }}>
                        <Text style={styles.helperText}>
                            Tôi đồng ý với tất cả
                        </Text>
                        <Text style={styles.termsText}>
                            {"  "}
                            Điều khoản, Chính sách quyền riêng tư và các khoản
                            phí
                        </Text>
                    </Text>
                </View>
                <BrownButton text="Đăng ký" onPress={handleSignUp} />
                <View style={styles.loginContainer}>
                    <Text style={styles.helperText}>Đã có tài khoản? </Text>
                    <BrownTextButton
                        text="Đăng nhập ngay"
                        onPress={goToSignIn}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        width: "100%",
        resizeMode: "stretch",
    },
    content: {
        flex: 1,
        alignItems: "center",
        padding: "5%",
    },
    title: {
        fontSize: 32,
        fontWeight: "600",
        color: "#54433A",
        marginBottom: "5%",
    },
    helperContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
    },
    checkbox: {
        borderColor: "#A8A19B",
        borderRadius: 100,
        marginRight: "4%",
    },
    termsText: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "700",
    },
    helperText: {
        color: "#3a3a3a",
        fontWeight: "400",
        fontSize: 16,
    },
    loginContainer: {
        flexDirection: "row",
        marginTop: "5%",
    },
});

// const mapStateToProps = (state) => {
//     return {
//         user: state.user,
//     };
// };

// const mapDispatchToProps = {
//     signUpRequest,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
