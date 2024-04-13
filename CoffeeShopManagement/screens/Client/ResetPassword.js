import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import BrownButton from "../../components/Client/BrownButton";
import PasswordInput from "../../components/Client/PasswordInput";

const ResetPassword = () => {
  const navigation = useNavigation();

  const handleResetPassword = () => {
    navigation.navigate("SuccessScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Đặt lại mật khẩu</Text>
      <PasswordInput placeholder="Nhập mật khẩu mới" />
      <View style={styles.helperContainer}>
        <Text style={styles.helperText}>Mật khẩu cần dài ít nhất 8 ký tự</Text>
      </View>
      <PasswordInput placeholder="Nhập lại mật khẩu mới" />
      <BrownButton text="Xác nhận" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPassword;

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
});
