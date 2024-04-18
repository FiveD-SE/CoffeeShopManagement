import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const SearchBar = () => {
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.input} placeholder="Tìm kiếm" />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "rgba(58, 58, 58, 0.5)",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    marginTop: "5%",
  },
  input: {
    flex: 1,
    color: "rgba(58,58,58,0.5)",
    fontSize: 16,
    fontWeight: "400",
  },
});
