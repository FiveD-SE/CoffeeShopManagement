import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import SearchBar from '../../../components/Client/SearchBar'
import ItemCard from '../../../components/Admin/Card/ItemCard';
import CategoryIcon from '../../../components/Client/Button/CategoryIcon';
const PRODUCT_IMAGE_SOURCE = require("../../../assets/starbucks.jpeg");
const GOOGLE_ICON = require("../../../assets/google.png");
const FRUITS_ICON = require("../../../assets/fruits.png");
const MILKTEA_ICON = require("../../../assets/milktea.png");

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

  const categoriesData = [
    { type: "Category 1", iconSource: GOOGLE_ICON },
    { type: "Category 2", iconSource: GOOGLE_ICON },
    { type: "Category 1", iconSource: GOOGLE_ICON },
    { type: "Category 2", iconSource: GOOGLE_ICON },
    { type: "Category 2", iconSource: FRUITS_ICON },
    { type: "Category 2", iconSource: FRUITS_ICON },
    { type: "Category 2", iconSource: FRUITS_ICON },
    { type: "Category 2", iconSource: MILKTEA_ICON },
  ];

  const renderCategoryItemList = ({ item }) => (
    <CategoryIcon iconSource={item.iconSource} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.typeRoundButtonContainer}>
        <FlatList
          data={categoriesData}
          renderItem={renderCategoryItemList}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
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
    marginHorizontal: "3%"
  },
  itemListContainer: {
    marginTop: "3%"
  },
  sreachBar: {
    flexDirection: "row",
    marginTop: "3%"
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
  listContent: {
    paddingHorizontal: "5%",
    paddingVertical: "3%",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
})