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
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(58, 58, 58, 0.10)",
    boxShadow: "1px 3px 2px 0px rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    flexDirection: "row",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    marginHorizontal: "2%",
    marginVertical: "3%",
    backgroundColor: "#ffffff"
  },
  input: {
    width: '100%',
    color: "rgba(58,58,58,0.5)",
    fontSize: 16,
    fontWeight: "400"
  },
});
