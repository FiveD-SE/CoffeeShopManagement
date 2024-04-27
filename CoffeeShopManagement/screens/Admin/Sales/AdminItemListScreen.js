import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import SearchBar from '../../../components/Client/SearchBar'
import ItemCard from '../../../components/Admin/Card/ItemCard';
import RoundItemTypeButton from '../../../components/Admin/Button/RoundItemTypeButton';
const PRODUCT_IMAGE_SOURCE = require("../../../assets/starbucks.jpeg");

const AdminItemListScreen = () => {
  const ItemCardList = [
    {
      title: "Smoothie Xoài Nhiệt Đới Granola",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
    {
      title: "Smoothie Phúc Bồn Tử Granola",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
    {
      title: "Oolong Tứ Quý Vải",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
    {
      title: "Oolong Tứ Quý Vải",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
    {
      title: "Oolong Tứ Quý Vải",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
    {
      title: "Oolong Tứ Quý Vải",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
    {
      title: "Oolong Tứ Quý Vải",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
  ];
  const TypeList = [
    {
      typeName: "Cafe",
      typeImage: PRODUCT_IMAGE_SOURCE,
    },
    {
      typeName: "Cafe",
      typeImage: PRODUCT_IMAGE_SOURCE,
    },
    {
      typeName: "Cafe",
      typeImage: PRODUCT_IMAGE_SOURCE,
    },
    {
      typeName: "Cafe",
      typeImage: PRODUCT_IMAGE_SOURCE,
    },
    {
      typeName: "Cafe",
      typeImage: PRODUCT_IMAGE_SOURCE,
    },

  ];

  const renderItemList = () => {
    return ItemCardList.map((item, index) => (
      <ItemCard
        key={index}
        title={item.title}
        price={item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
        imageSource={item.imageSource}
      />
    ));
  };

  const renderTypeList = () => {
    return TypeList.map((item, index) => (
      <RoundItemTypeButton
        key={index}
        typeName={item.typeName}
        typeImage={item.typeImage}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.typeRoundButtonContainer}>

      </ScrollView>
      <View style={styles.sreachBar}>
        <SearchBar />
      </View>
      <ScrollView style={styles.itemListContainer} showsVerticalScrollIndicator={false}>
        {renderItemList()}
      </ScrollView>
    </SafeAreaView>
  )
}

export default AdminItemListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "3%",
    marginHorizontal:"3%"
  },
  itemListContainer: {
    marginTop: "3%"
  },
  sreachBar: {
    flexDirection: "row",
  },
  typeRoundButtonContainer: {

    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20
  },
  description: {
		color: "#3A3A3A",
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "400",
		marginTop: "5%",
	},
})