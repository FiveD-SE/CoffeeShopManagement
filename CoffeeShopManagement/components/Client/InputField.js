import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const InputField = ({ placeholder, keyboardType }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default InputField;

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
    color: "#3a3a3a",
    fontWeight: "400",
    fontSize: 16,
  },
});
