import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const BrownButton = ({ text, onPress }) => {
  return (
    <Pressable style={styles.brownButton} onPress={onPress}>
      <Text style={styles.brownButtonText}>{text}</Text>
    </Pressable>
  );
};

export default BrownButton;

const styles = StyleSheet.create({
  brownButton: {
    width: "100%",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#514438",
    paddingVertical: "4%",
    marginTop: "5%",
  },
  brownButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "600",
  },
});
