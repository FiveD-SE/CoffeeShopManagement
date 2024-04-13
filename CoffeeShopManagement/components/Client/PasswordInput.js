import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome6";
const InputFieldWithIcon = ({ placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const toogleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={!isShowPassword}
      />
      <Icon
        name={isShowPassword ? "eye" : "eye-slash"}
        onPress={toogleShowPassword}
        size={16}
      />
    </View>
  );
};

export default InputFieldWithIcon;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(58, 58, 58, 0.5)",
    paddingHorizontal: "5%",
    paddingVertical: "5%",
    marginTop: "5%",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
