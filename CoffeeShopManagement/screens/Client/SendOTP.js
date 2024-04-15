import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import BrownButton from "../../components/Client/BrownButton";
import InputField from "../../components/Client/InputField";

const SendOTP = () => {
  const navigation = useNavigation();

  const goToEnterOTP = () => {
    navigation.navigate("EnterOTP", { isSignUp: false });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Gửi mã xác thực</Text>
      <InputField placeholder="Số điện thoại" keyboardType="phone-pad" />
      <View style={styles.helperContainer}>
        <Text style={styles.helperText}>
          Chúng tôi sẽ gửi thông báo qua SMS để phục vụ mục đích bảo mật và hỗ
          trợ bạn đăng nhập
        </Text>
      </View>
      <BrownButton text="Tiếp tục" onPress={goToEnterOTP} />
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
