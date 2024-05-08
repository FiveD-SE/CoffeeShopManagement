import React, { useState, useMemo, useRef, useEffect } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserHomeScreenHeader from "../../../components/Client/Header/UserHomeScreenHeader";
import Carousel from "../../../components/Client/Carousel";
import SearchBar from "../../../components/Client/SearchBar";
import CategoryItem from "../../../components/Client/Button/CategoryItem";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import Section from "../../../components/Client/Section";
import RecentlyViewedItem from "../../../components/Client/Card/RecentlyViewedItem";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { useSelector } from "react-redux";
import store from "../../../redux/store/store";
import { getUserData } from "../../../api";

import { getProductsList } from "../../../api";
const USER_IMAGE_SOURCE = require("../../../assets/google.png");

const COFFEE_BEANS_ICONS = require("../../../assets/coffee-beans.png");
const MILK_TEA_ICONS = require("../../../assets/milktea.png");
const FRUITS_ICONS = require("../../../assets/fruits.png");

const UserHomeScreen = () => {
    const navigation = useNavigation();
    const itemDetailBottomSheetRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const handleCategoryPress = (index) => setSelectedIndex(index);
    const handleOpenItemDetail = (item) => {
        setSelectedItem(item);
        setIsItemDetailVisible(true);
    };
    const handleCloseItemDetail = () => setIsItemDetailVisible(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                setPhoneNumber(store.getState().auth.phoneNumber);
                console.log("Phone number:", phoneNumber);
            } catch (error) {
                console.error("Error fetching phone number:", error);
            }
        };

        fetchPhoneNumber();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(phoneNumber);
                console.log("User data:", userData);
                if (userData) {
                    setUserData(userData);
                } else {
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (phoneNumber) {
            fetchUserData();
        }
    }, [phoneNumber]);

    const goToExchangeVoucher = () => navigation.navigate("ExchangeVoucher");
    const goToSearchScreen = () => navigation.navigate("SearchScreen");
    const goToBestSellerScreen = () => navigation.navigate("BestSeller");
    const goToFavoriteItemScreen = () => navigation.navigate("FavoriteItem");
    const goToNotificationScreen = () =>
        navigation.navigate("CashierNotification");

    const categoriesList = [
        {
            backgroundColor: "210, 124, 44",
            icon: COFFEE_BEANS_ICONS,
            title: "Cà phê",
        },
        {
            backgroundColor: "255, 156, 178",
            icon: MILK_TEA_ICONS,
            title: "Trà sữa",
        },
        { backgroundColor: "78, 203, 113", icon: FRUITS_ICONS, title: "Trà" },
        { backgroundColor: "203, 203, 212", title: "Khác" },
    ];

    const renderCategoryItem = () =>
        categoriesList.map((category, index) => (
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

    const renderBestSellerItemList = () =>
        productList.map((item, index) => {
            return (
                <BestSellerItem
                    key={index}
                    id={item._id}
                    name={item.name}
                    price={item.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                    imageSource={item.imageSource}
                    onPress={() => handleOpenItemDetail(item)}
                    horizontal={true}
                />
            );
        });

    const renderRecentlyViewedItemList = () =>
        productList.map((item, index) => (
            <RecentlyViewedItem
                key={index}
                id={item._id}
                title={item.title}
                price={item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
                imageSource={item.imageSource}
                onPress={() => handleOpenItemDetail(item)}
            />
        ));

    useEffect(() => {
        if (isItemDetailVisible) {
            itemDetailBottomSheetRef.current?.present();
        }
    }, [isItemDetailVisible]);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const productList = await getProductsList();
                setProductList(productList);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };

        fetchProductList();
    }, []);

    return (
        <IsOpenProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainer}
                >
                    <UserHomeScreenHeader
                        username={userData.lastName + " " + userData.firstName}
                        userImageSource={USER_IMAGE_SOURCE}
                        totalPoint={20}
                        onPressBean={goToExchangeVoucher}
                        onPressFavorite={goToFavoriteItemScreen}
                        onPressNotify={goToNotificationScreen}
                    />
                    <View style={styles.searchBarContainer}>
                        <SearchBar onFocus={goToSearchScreen} />
                    </View>
                    <Carousel />
                    <View style={{ marginTop: "5%" }}>
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
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <Section title="Đã Xem Gần Đây">
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.itemList}
                            >
                                {renderRecentlyViewedItemList()}
                            </ScrollView>
                        </Section>
                    </View>
                </ScrollView>
                {isItemDetailVisible && (
                    <ItemDetailBottomSheet
                        bottomSheetRef={itemDetailBottomSheetRef}
                        snapPoints={["85%"]}
                        selectedItem={selectedItem}
                        isVisible={isItemDetailVisible}
                        onClose={handleCloseItemDetail}
                    />
                )}
            </SafeAreaView>
        </IsOpenProvider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ffffff" },
    contentContainer: { padding: "5%" },
    searchBarContainer: { marginTop: "5%" },
    categoryContainer: { flexDirection: "row", marginTop: "5%" },
    itemList: { width: "500%", flexDirection: "row", marginTop: "5%" },
});

export default UserHomeScreen;
