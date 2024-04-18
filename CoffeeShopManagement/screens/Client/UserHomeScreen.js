import React, { useState } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";

import UserHomeScreenHeader from "../../components/Client/UserHomeScreenHeader";
import Carousel from "../../components/Client/Carousel";
import SearchBar from "../../components/Client/SearchBar";
import CategoryItem from "../../components/Client/CategoryItem";
import Section from "../../components/Client/Section";
import BestSellerItem from "../../components/Client/BestSellerItem";
import RecentlyViewedItem from "../../components/Client/RecentlyViewedItem";

const UserHomeScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCategoryPress = (index) => {
    setSelectedIndex(index);
  };

  const categoriesList = [
    {
      backgroundColor: "210, 124, 44",
      icon: require("../../assets/coffee-beans.png"),
      title: "Cà phê",
    },
    {
      backgroundColor: "255, 156, 178",
      icon: require("../../assets/milktea.png"),
      title: "Trà sữa",
    },
    {
      backgroundColor: "78, 203, 113",
      icon: require("../../assets/fruits.png"),
      title: "Trà ",
    },
    { backgroundColor: "203, 203, 212", title: "Khác" },
  ];

  const bestSellerItemList = [
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../assets/vietnam.png"),
    },
  ];

  const recentlyViewedItemList = [
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../assets/vietnam.png"),
    },
    {
      title: "Bánh Mì Thịt Nguội VN",
      price: 35000,
      imageSource: require("../../assets/vietnam.png"),
    },
  ];

  const renderCategoryItem = () => {
    return categoriesList.map((category, index) => (
      <CategoryItem
        key={index}
        index={index}
        backgroundColor={category.backgroundColor}
        icon={category.icon}
        title={category.title}
        isSelected={selectedIndex === index}
        onPress={handleCategoryPress}
      />
    ));
  };

  const renderBestSellerItemList = () => {
    return bestSellerItemList.map((item, index) => (
      <BestSellerItem
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

  const renderRecentlyViewedItemList = () => {
    return recentlyViewedItemList.map((item, index) => (
      <RecentlyViewedItem
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <UserHomeScreenHeader />
        <SearchBar />
        <Carousel />
        <Section title="Danh Mục Sản Phẩm">
          <View style={styles.categoryContainer}>{renderCategoryItem()}</View>
        </Section>
        <Section
          title="Sản Phẩm Bán Chạy"
          showSubtitle={true}
          subtitle="Xem thêm"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemList}
          >
            {renderBestSellerItemList()}
          </ScrollView>
        </Section>
        <Section title="Đã Xem Gần Đây">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemList}
          >
            {renderRecentlyViewedItemList()}
          </ScrollView>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    padding: "5%",
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: "5%",
  },
  itemList: {
    width: "300%",
    flexDirection: "row",
    marginTop: "5%",
  },
});

export default UserHomeScreen;
