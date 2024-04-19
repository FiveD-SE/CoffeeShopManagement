import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";

import UserHomeScreenHeader from "../../../components/Client/UserHomeScreenHeader";
import Carousel from "../../../components/Client/Carousel";
import SearchBar from "../../../components/Client/SearchBar";
import CategoryItem from "../../../components/Client/CategoryItem";
import Section from "../../../components/Client/Section";
import BestSellerItem from "../../../components/Client/BestSellerItem";
import RecentlyViewedItem from "../../../components/Client/RecentlyViewedItem";

const USER_IMAGE_SOURCE = require("../../../assets/google.png");

const UserHomeScreen = () => {
  const navigation = useNavigation();

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleCategoryPress = (index) => {
    setSelectedIndex(index);
  };

  const goToExchangeVoucher = () => {
    navigation.navigate("ExchangeVoucher");
  };

  const goToSearchScreen = () => {
    navigation.navigate("SearchScreen");
  };

  const goToBestSellerScreen = () => {
    navigation.navigate("BestSeller");
  };

  const goToFavoriteItemScreen = () => {
    navigation.navigate("FavoriteItem");
  };

  const categoriesList = [
    {
      backgroundColor: "210, 124, 44",
      icon: require("../../../assets/coffee-beans.png"),
      title: "Cà phê",
    },
    {
      backgroundColor: "255, 156, 178",
      icon: require("../../../assets/milktea.png"),
      title: "Trà sữa",
    },
    {
      backgroundColor: "78, 203, 113",
      icon: require("../../../assets/fruits.png"),
      title: "Trà ",
    },
    { backgroundColor: "203, 203, 212", title: "Khác" },
  ];

  const bestSellerItemList = [
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

  const recentlyViewedItemList = [
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
        <UserHomeScreenHeader
          username={"Trương Lê Vĩnh Phúc"}
          userImageSource={USER_IMAGE_SOURCE}
          totalPoint={20}
          onPressBean={goToExchangeVoucher}
          onPressFavorite={goToFavoriteItemScreen}
        />
        <View style={styles.searchBarContainer}>
          <SearchBar onFocus={goToSearchScreen} />
        </View>
        <Carousel />
        <Section title="Danh Mục Sản Phẩm">
          <View style={styles.categoryContainer}>{renderCategoryItem()}</View>
        </Section>
        <Section
          title="Sản Phẩm Bán Chạy"
          showSubtitle={true}
          subtitle="Xem thêm"
          onPressSubtitle={goToBestSellerScreen}
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
  searchBarContainer: {
    marginTop: "5%",
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
