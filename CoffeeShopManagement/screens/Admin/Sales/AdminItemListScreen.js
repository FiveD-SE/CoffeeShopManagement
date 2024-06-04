import { View, Text, SafeAreaView, ScrollView, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from '../../../components/Client/SearchBar'
import ItemCard from '../../../components/Admin/Card/ItemCard';
import CategoryIcon from '../../../components/Client/Button/CategoryIcon';
import { colors } from '../../../assets/colors/colors';
const COFFEE_ICON = require("../../../assets/images/coffee.png");
const JUICE_ICON = require("../../../assets/images/juice.png");
const MILKTEA_ICON = require("../../../assets/images/milktea.png");
const ICE_BLENDED_ICON = require("../../../assets/images/ice-blended.png");
const PRODUCT_IMAGE_SOURCE = require("../../../assets/starbucks.jpeg");
import { connect } from "react-redux";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { db } from '../../../services/firebaseService';
import Toast from "react-native-toast-message";


const AdminItemListScreen = ({ userData }) => {
  const ItemCardList = [
    {
      title: "Smoothie Xoài Nhiệt Đới Granola",
      price: 65000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
  ];

  const [products, setProducts] = useState(ItemCardList);
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const q = query(
          collection(db, "products"),
        );
        const querySnapshot = await getDocs(q);
        const loadedProducts = [];
        querySnapshot.forEach((doc) => {
          loadedProducts.push(doc.data());
        });
        setProducts(loadedProducts);
      } catch (error) {
        console.log("Error loading products:", error);
      }
    };

    loadProduct();
  });

  const formatPrice = (price) => {

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(price);
  };

  const renderItemList = () => {

    return products.map((item, index) => (
      <ItemCard
        key={index}
        title={item.productName}
        price={formatPrice(item.productPrice)}
        imageSource={{ uri: item.productImage }}
      />
    )
    );
  };

  const categoriesData = [
    { type: "Cà phê", iconSource: COFFEE_ICON },
    { type: "Trà sữa", iconSource: MILKTEA_ICON },
    { type: "Nước trái cây", iconSource: JUICE_ICON },
    { type: "Đá xay", iconSource: ICE_BLENDED_ICON },
  ];

  const renderCategoryItemList = () => {
    return (
      <View style={styles.categoryList}>
        {categoriesData.map((category, index) => (
          <CategoryIcon
            key={index}
            iconSource={category.iconSource}
            size={64}
            name={category.type}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {renderCategoryItemList()}
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

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};

export default connect(mapStateToProps)(AdminItemListScreen);

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

  },
  categoryList: {
    flexDirection: "row",
    borderColor: colors.grey_50,
    backgroundColor: colors.white_100,
    justifyContent: "space-between",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: "5%"
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
    paddingVertical: "2%"
  },
})