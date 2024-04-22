import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";

const COFFEE_CUP_ICON = require("../../../assets/coffee-cup.png");

const SizeItem = ({ size, price, index, onPress, isSelected }) => {
  const setSize = () => {
    if (size === "S") {
      return "Nhỏ";
    }
    if (size === "M") {
      return "Vừa";
    }
    if (size === "L") {
      return "Lớn";
    }
  };

  const handlePress = () => {
    onPress(index);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View
        style={[
          styles.main,
          {
            backgroundColor: isSelected
              ? "rgba(203, 203, 212, 0.30)"
              : "#FFFFFF",
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={COFFEE_CUP_ICON} style={styles.image} />
        </View>
        <Text
          style={[styles.sizeText, { fontWeight: isSelected ? "600" : "400" }]}
        >
          {setSize()}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{price}</Text>
      </View>
    </Pressable>
  );
};

export default SizeItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginRight: "5%",
  },
  main: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "20%",
    paddingHorizontal: "5%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(58, 58, 58, 0.10)",
  },
  imageContainer: {},
  image: {},
  sizeText: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "400",
    marginTop: "10%",
  },
  priceContainer: {
    marginTop: "20%",
    alignItems: "center",
  },
  priceText: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "500",
  },
});
