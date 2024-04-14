import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import InputField from "../../components/Client/InputField";
import PasswordInput from "../../components/Client/PasswordInput";
import BrownButton from "../../components/Client/BrownButton";
import IconButton from "../../components/Client/IconButton";
import BrownTextButton from "../../components/Client/BrownTextButton";

const GOOGLE_ICON_SOURCE = require("../../assets/google.png");
const BACKGROUND_SOURCE = require("../../assets/background.png");

const SignInScreen = () => {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  const goToForgotPassword = () => {
    navigation.navigate("SendOTP");
  };

  const goToSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  const handleRememberMe = () => {
    setChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.header} source={BACKGROUND_SOURCE} />
      <View style={styles.main}>
        <Text style={styles.title}>Đăng nhập</Text>
        <InputField placeholder="Số điện thoại" keyboardType="phone-pad" />
        <PasswordInput placeholder="Mật khẩu" />
        <View style={styles.helperContainer}>
          <View style={{ flex: 1, flexDirection: "row", marginRight: "auto" }}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              color={isChecked ? "#a8a19b" : undefined}
              onValueChange={handleRememberMe}
            />
            <Text style={styles.helperText}>Ghi nhớ tôi</Text>
          </View>
          <BrownTextButton text="Quên mật khẩu?" onPress={goToForgotPassword} />
        </View>
        <BrownButton text="Đăng nhập" />
        <View style={styles.labelContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.label}>hoặc đăng nhập bằng</Text>
          <View style={styles.divider}></View>
        </View>
        <IconButton iconSource={GOOGLE_ICON_SOURCE} />
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

export default SignInScreen;

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
    marginTop: "8%",
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
    marginTop: "8%",
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
});
