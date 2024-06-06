import React, { useEffect, useState, useRef } from "react";
import {
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import UserHomeScreenHeader from "../../../components/Client/Header/UserHomeScreenHeader";
import Carousel from "../../../components/Client/Carousel";
import SearchBar from "../../../components/Client/SearchBar";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import Section from "../../../components/Client/Section";
import RecentlyViewedItem from "../../../components/Client/Card/RecentlyViewedItem";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { useSelector } from "react-redux";
import { db, auth } from "../../../services/firebaseService";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { connect } from "react-redux";

const USER_IMAGE_SOURCE = require("../../../assets/google.png");
const COFFEE_BEANS_ICONS = require("../../../assets/coffee-beans.png");
const MILK_TEA_ICONS = require("../../../assets/milktea.png");
const FRUITS_ICONS = require("../../../assets/fruits.png");

const cardWidth = Dimensions.get("window").width;

const UserHomeScreen = ({ userData }) => {
    const navigation = useNavigation();
    const itemDetailBottomSheetRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const [bestSellerList, setBestSellerList] = useState([]);
    const [recentlyViewedList, setRecentlyViewedList] = useState([]);
    const [currentCredit, setCurrentCredit] = useState(0);
    const [username, setUsername] = useState("");

    const handleCategoryPress = (index) => setSelectedIndex(index);
    const handleOpenItemDetail = (item) => {
        setSelectedItem(item);
        setIsItemDetailVisible(true);
    };
    const handleCloseItemDetail = () => setIsItemDetailVisible(false);

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
        {
            backgroundColor: "78, 203, 113",
            icon: FRUITS_ICONS,
            title: "Trà",
        },
        { backgroundColor: "203, 203, 212", title: "Khác" },
    ];

    const renderBestSellerItemList = () =>
        productList.map((item, index) => {
            return (
                <BestSellerItem
                    key={index}
                    id={item.productId}
                    name={item.productName}
                    price={item.productPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                    imageSource={item.productImage}
                    onPress={() => handleOpenItemDetail(item)}
                    horizontal={true}
                />
            );
        });

    const renderRecentlyViewedItemList = () =>
        productList.map((item, index) => (
            <RecentlyViewedItem
                key={index}
                id={item.productId}
                title={item.productName}
                price={item.productPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
                imageSource={item.productImage}
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
                const productsCollectionRef = collection(db, "products");
                const querySnapshot = await getDocs(productsCollectionRef);
                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    productId: doc.id,
                }));
                setProductList(fetchedProducts);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };

        fetchProductList();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setCurrentCredit(userDoc.data().credit);
                setUsername(userDoc.data().fullName);
            } else {
                console.log("User document does not exist.");
            }
        };

        fetchUserData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <UserHomeScreenHeader
                    username={username}
                    userImageSource={USER_IMAGE_SOURCE}
                    totalPoint={currentCredit}
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
        width: cardWidth * 1.5,
        flexDirection: "row",
        marginTop: "5%",
    },
});

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
    };
};

export default connect(mapStateToProps)(UserHomeScreen);
