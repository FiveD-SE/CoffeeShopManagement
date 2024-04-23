import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TotalOrderList = () => {
  const selectedProductList = [
    {
      title: "Thành tiền:",
      price: 65000,
    },
    {
      title: "Phí giao hàng:",
      price: 0,
    },
  ];

  const renderSelectedProductItem = () => {
    return selectedProductList.map((item, index) => (
      <View style={styles.itemContainer} key={index}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>
          {item.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </Text>
      </View>
    ));
  };
  return <View style={styles.container}>{renderSelectedProductItem()}</View>;
};

export default TotalOrderList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(221, 235, 233, 0.20)",
    padding: "5%",
    borderRadius: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: "2%",
  },
  itemContent: {
    flexDirection: "column",
    flex: 1,
    marginRight: "10%",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  price: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "600",
  },
});
