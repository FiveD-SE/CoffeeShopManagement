import { StyleSheet, FlatList, View } from "react-native";
import React from "react";
import ProductCardVertical from "../../../components/Client/ProductCardVertical";

const UserFavoriteItemScreen = () => {
  const favoriteItemList = [
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../../assets/vietnam.png"),
    },
  ];
  const renderFavoriteItemList = ({ item }) => (
    <ProductCardVertical
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
      <View style={styles.favoriteItemListContainer}>
        <FlatList
          data={favoriteItemList}
          renderItem={renderFavoriteItemList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default UserFavoriteItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
  },
  favoriteItemListContainer: {
    flex: 1,
    marginTop: "5%",
    paddingHorizontal: "5%",
  },
});
