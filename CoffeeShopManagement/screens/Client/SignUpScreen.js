import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  useAnimatedValue,
} from "react-native";
import Checkbox from "expo-checkbox";
import InputField from "../../components/Client/InputField";
import PasswordInput from "../../components/Client/PasswordInput";
import BrownButton from "../../components/Client/BrownButton";
import BrownTextButton from "../../components/Client/BrownTextButton";
import { useNavigation } from "@react-navigation/native";

const BACKGROUND_SOURCE = require("../../assets/background.png");

const SignUpScreen = () => {
  const navigation = useNavigation();

  const goToSignIn = () => {
    navigation.navigate("SignInScreen");
  };

  const handleSignUp = () => {
    navigation.navigate("EnterOTP", { isSignUp: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.header} source={BACKGROUND_SOURCE} />
      <View style={styles.content}>
        <Text style={styles.title}>Đăng ký</Text>
        <InputField placeholder="Họ và tên" />
        <InputField placeholder="Số điện thoại" />
        <PasswordInput
          placeholder="Mật khẩu"
          iconName="eye-slash"
          iconSize={16}
        />
        <PasswordInput
          placeholder="Nhập lại mật khẩu"
          iconName="eye-slash"
          iconSize={16}
        />
        <View style={styles.helperContainer}>
          <Checkbox style={styles.checkbox} />
          <Text style={{ flex: 1 }}>
            <Text style={styles.helperText}>Tôi đồng ý với tất cả</Text>
            <Text style={styles.termsText}>
              {"  "}
              Điều khoản, Chính sách quyền riêng tư và các khoản phí
            </Text>
          </Text>
        </View>
        <BrownButton text="Đăng ký" onPress={handleSignUp} />
        <View style={styles.loginContainer}>
          <Text style={styles.helperText}>Đã có tài khoản? </Text>
          <BrownTextButton text="Đăng nhập ngay" onPress={goToSignIn} />
        </View>
      </View>
    </SafeAreaView>
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

export default SignUpScreen;
