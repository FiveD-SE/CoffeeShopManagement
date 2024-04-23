import { Text, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

const BranchSelectBar = ({ onFocus, OnPress, branchName }) => {
  return (
    <TouchableOpacity style={styles.branchSelectContainer}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Chi nhánh</Text>
        <Text style={styles.selectBranchText}>{branchName}</Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={30} color="#3a3a3a" />
    </TouchableOpacity>
  );
};

export default BranchSelectBar;

const styles = StyleSheet.create({
  selectBranchText: {
    color: "rgba(58,58,58,0.5)",
    fontSize: 16,
    fontWeight: "400",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "500",
    marginRight: "10%"
  },
  branchSelectContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    borderRadius: 10,
    backgroundColor: "#ffffff",
    justifyContent: "space-between"
  },
});
