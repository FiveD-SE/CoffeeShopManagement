import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import BrownButton from "../../components/Client/BrownButton";

const SUCCESS_ICON_SOURCE = require("../../assets/Success Icon.png");

const SuccessScreen = () => {
  const navigation = useNavigation();

  const handleQuit = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.successIconContainer}>
          <Image source={SUCCESS_ICON_SOURCE} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Hoàn thành</Text>
        </View>
        <View style={styles.helperContainer}>
          <Text style={styles.helperText}>
            Congratulations! You have been successfully authenticated
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <BrownButton text="Thoát" onPress={handleQuit} />
        </View>
      </View>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
  },
  main: {
    top: "20%",
  },
  successIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
  },
  titleContainer: {
    marginTop: "10%",
    alignItems: "center",
  },
  titleText: {
    color: "#54433A",
    fontSize: 28,
    fontWeight: "600",
  },
  helperContainer: {
    marginTop: "10%",
    paddingHorizontal: "5%",
  },
  helperText: {
    color: "#A6A6AA",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: "10%",
  },
});
