import { StyleSheet, Pressable, Image } from "react-native";
import React from "react";

const IconButton = ({ iconSource }) => {
  return (
    <Pressable style={styles.iconButton}>
      <Image source={iconSource} style={styles.icon} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  iconButton: {
    marginTop: "5%",
    borderWidth: 1,
    borderRadius: 30,
    padding: "2%",
    borderColor: "rgba(58,58,58,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    resizeMode: "cover",
    width: 24,
    height: 24,
  },
});
