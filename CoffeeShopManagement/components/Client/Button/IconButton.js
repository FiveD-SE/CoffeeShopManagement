import { StyleSheet, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome6";
const IconButton = ({ iconName, onPress }) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Icon name={iconName} size={16} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    borderWidth: 1,
    borderRadius: 30,
    padding: "5%",
    borderColor: "rgba(58,58,58,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
