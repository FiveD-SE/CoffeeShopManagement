import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SelectedProductList = ({}) => {
  const selectedProductList = [
    {
      title: "Smoothie Xoài Nhiệt Đới Granola",
      description: "Dở vcb",
      quantity: 1,
      price: 65000,
    },
    {
      title: "Smoothie Xoài Nhiệt Đới Granola",
      description: "Dở vcb",
      quantity: 1,
      price: 65000,
    },
    {
      title: "Smoothie Xoài Nhiệt Đới Granola",
      description: "Dở vcb",
      quantity: 1,
      price: 65000,
    },
  ];

  const renderSelectedProductItem = () => {
    return selectedProductList.map((item, index) => (
      <View style={styles.itemContainer} key={index}>
        <View style={styles.itemContent}>
          <View>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
            {item.description}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
            Số lượng: {item.quantity}
          </Text>
        </View>
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

export default SelectedProductList;

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
    marginVertical: "5%",
  },
  itemContent: {
    flexDirection: "column",
    flex: 1,
    marginRight: "10%",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 20,
  },
  subtitle: {
    color: "rgba(58, 58, 58, 0.50)",
    fontSize: 12,
    fontWeight: "400",
    marginTop: "2%",
  },
  price: {
    color: "#3a3a3a",
    fontSize: 12,
    fontWeight: "600",
  },
});
