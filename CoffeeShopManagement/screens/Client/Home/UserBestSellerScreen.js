import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import BestSellerItem from "../../../components/Client/BestSellerItem";
const UserBestSellerScreen = () => {
  const bestSellerItemList = [
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Heo Quay VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Heo Quay VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Heo Quay VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Heo Quay VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
  ];
  const renderBestSellerItemList = ({ item }) => (
    <BestSellerItem
      title={item.title}
      price={item.price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      })}
      imageSource={item.imageSource}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.bestSellerItemListContainer}>
        <FlatList
          data={bestSellerItemList}
          renderItem={renderBestSellerItemList}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default UserBestSellerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
  },
  bestSellerItemListContainer: {
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
});
