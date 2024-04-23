import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const ChooseDeliveryButton = ({ title, onPress }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Pressable style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>Chọn</Text>
      </Pressable>
    </View>
  );
};

export default ChooseDeliveryButton;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonContainer: {
    backgroundColor: "rgba(0, 161, 136, 0.1)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
    paddingHorizontal: "4%",
    borderRadius: 30,
  },
  buttonText: {
    marginRight: "5%",
    color: "#00A188",
    fontSize: 14,
    fontWeight: "700",
  },
});
