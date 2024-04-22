// ToppingButton.js

import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import ToppingModal from "../ToppingModal";

const TOPPING_ICON = require("../../../assets/topping-icon.png");

const ToppingButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showToppingModal = () => {
    setModalVisible(true);
  };

  const hideToppingModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Pressable style={styles.container} onPress={showToppingModal}>
        <Image source={TOPPING_ICON} style={styles.image} />
        <Text style={styles.title}>Dùng thêm topping bạn nhé</Text>
        <Icon name="chevron-right" style={styles.icon} size={16} />
      </Pressable>
      <ToppingModal visible={modalVisible} onClose={hideToppingModal} />
    </>
  );
};

export default ToppingButton;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "rgba(58, 58, 58, 0.2)",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: "5%",
    marginTop: "5%",
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
