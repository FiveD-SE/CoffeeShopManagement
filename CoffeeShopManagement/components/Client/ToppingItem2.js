import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome";
const ToppingItem2 = ({ title, price }) => {
  return (
    <>
      {title && price && (
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="circle" size={6} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.price}>+ {price}</Text>
        </View>
      )}
    </>
  );
};

export default ToppingItem2;

const styles = StyleSheet.create({
  container: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginLeft: "20%",
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "500",
  },
  price: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "400",
  },
});
