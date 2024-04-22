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
    width: 48,
    height: 48,
    padding: "2%",
    borderRadius: 30,
    borderWidth: 1,
    margin: "2%",
    borderColor: "rgba(58,58,58,0.2)",
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});
