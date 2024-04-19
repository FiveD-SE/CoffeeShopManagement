import { StyleSheet, Pressable, Image } from "react-native";
import React from "react";

const CategoryIcon = ({ iconSource }) => {
  return (
    <Pressable style={styles.iconButton}>
      <Image source={iconSource} style={styles.icon} />
    </Pressable>
  );
};

export default CategoryIcon;

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    margin: "2%",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "rgba(58,58,58,0.2)",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "cover",
  },
});
