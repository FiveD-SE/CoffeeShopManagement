import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome6";

const COUPON_ICON = require("../../../assets/coupon.png");

const ApplyVoucherButton = () => {
  return (
    <>
      <Pressable style={styles.container}>
        <Image source={COUPON_ICON} style={styles.image} />
        <Text style={styles.title}>Áp dụng ưu đãi</Text>
        <Icon name="chevron-right" style={styles.icon} size={16} />
      </Pressable>
    </>
  );
};

export default ApplyVoucherButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "rgba(58, 58, 58, 0.2)",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: "5%",
    alignItems: "center",
  },
  image: {},
  title: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    alignSelf: "center",
  },
});
