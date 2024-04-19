import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import IconButton from "../../components/Client/IconButton";
import CategoryIcon from "../../components/Client/CategoryIcon";
import ProductCardVertical from "../../components/Client/ProductCardVertical";
import RecentItemCard from "../../components/Client/RecentItemCard";

const GOOGLE_ICON_SOURCE = require("../../assets/google.png");

const PRODUCT_IMAGE_SOURCE = require("../../assets/starbucks.jpeg");

const UserPlaceOrderScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 8;

  const categories = [{ type: "Milk Tea", iconSource: GOOGLE_ICON_SOURCE }];

  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const renderCategoriesList = () => {};

  const mustTryList = [
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
  ];

  const renderMustTryList = () => {
    return mustTryList.map((item, index) => (
      <ProductCardVertical
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
  const recentItemList = [
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
      price: 45000,
      imageSource: PRODUCT_IMAGE_SOURCE,
    },
  ];

  const renderRecentItemList = () => {
    return recentItemList.map((item, index) => (
      <RecentItemCard
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

  const renderIndicators = () => {
    const indicators = [];
    for (let i = 0; i < totalPages; i++) {
      indicators.push(
        <View
          key={i}
          style={[
            styles.indicator,
            i === currentPage && styles.activeIndicator,
          ]}
        />
      );
    }
    return indicators;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: "5%" }}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable style={styles.chooseCategoriesContainer}>
              <Text style={styles.chooseCategoriesText}>Danh mục</Text>
              <Icon name="chevron-down" size={20} />
            </Pressable>
          </View>
          <View style={styles.headerRight}>
            <IconButton iconName="rectangle-list" />
            <IconButton iconName="cart-shopping" />
            <IconButton iconName="heart" />
            <IconButton iconName="magnifying-glass" />
          </View>
        </View>
        {/* INCOMPLETE */}
        <View style={styles.categoriesContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
            <CategoryIcon iconSource={GOOGLE_ICON_SOURCE} />
          </View>
        </View>
        <View style={styles.pagination}>{renderIndicators()}</View>
        <View style={styles.mustTryListContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Món Mới Phải Thử</Text>
            <Pressable style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>Xem thêm</Text>
              <Icon name="chevron-right" color="#00A188" size={10} />
            </Pressable>
          </View>
          <View style={styles.mustTryList}>{renderMustTryList()}</View>
        </View>
        <View style={styles.recentItemListContainer}>
          <Text style={styles.title}>Món Đã Đặt Gần Đây</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentItemList}
          >
            {renderRecentItemList()}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserPlaceOrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    marginTop: Platform.select({
      android: "10%",
    }),
  },
  headerLeft: {
    flex: 0.8,
    justifyContent: "center",
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  chooseCategoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chooseCategoriesText: {
    marginRight: "8%",
    color: "#3a3a3a",
    fontSize: 20,
    fontWeight: "600",
  },
  categoriesContainer: {
    flexDirection: "column",
    padding: "2%",
    marginTop: "5%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "rgba(58,58,58,0.1)",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2%",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#CBCBD4",
    marginHorizontal: "1%",
  },
  activeIndicator: {
    backgroundColor: "#FFA730",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "600",
  },
  subtitleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    marginRight: "2%",
    color: "#00A188",
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 12,
    textDecorationLine: "underline",
  },
  mustTryListContainer: {
    paddingVertical: "5%",
  },
  mustTryList: {
    flexDirection: "column",
    marginTop: "2%",
  },
  recentItemListContainer: {
    paddingVertical: "5%",
  },
  recentItemList: {
    width: "300%", // CALCULATE BASED ON recentItemList LENGTH
    alignItems: "center",
    flexDirection: "row",
    marginTop: "2%",
  },
});
