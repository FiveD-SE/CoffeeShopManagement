// ModalHeader.js

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const ModalHeader = ({ title, onClose }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Icon name="times-circle" size={24} color="#CBCBD4" />
      </Pressable>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderColor: "#CBCBD4",
  },
  headerTitle: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    position: "absolute",
    right: "5%",
  },
});
