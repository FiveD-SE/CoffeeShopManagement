import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const SearchBar = ({ onFocus }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Tìm kiếm"
        onFocus={onFocus}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(58, 58, 58, 0.5)",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
  },
  input: {
    color: "rgba(58,58,58,0.5)",
    fontSize: 16,
    fontWeight: "400",
  },
});
