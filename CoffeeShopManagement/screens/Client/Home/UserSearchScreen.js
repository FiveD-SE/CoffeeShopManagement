import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../../components/Client/SearchBar";
import MustTryItemCard from "../../../components/Client/Card/MustTryItemCard";

const UserSearchScreen = () => {
  const navigation = useNavigation();

  const itemList = [
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderItemList = ({ item }) => (
    <MustTryItemCard
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
      <View style={styles.header}>
        <SearchBar />
        <Pressable
          style={styles.cancelButton}
          onPress={handleGoBack}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Text style={styles.cancelButtonText}>Huỷ</Text>
        </Pressable>
      </View>
      <View style={styles.main}>
        <FlatList
          data={itemList}
          renderItem={renderItemList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default UserSearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    padding: "5%",
    alignItems: "center",
    marginTop: "10%",
  },
  cancelButton: {
    marginLeft: "5%",
  },
  cancelButtonText: {
    color: "#006C5E",
    fontSize: 12,
    fontWeight: "600",
  },
  main: {
    flex: 1,
    backgroundColor: "#F8F7FA",
    padding: "5%",
  },
});
