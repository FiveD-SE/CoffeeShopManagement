import React, { useState, useMemo, useRef, useEffect } from "react";
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
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { useSelector } from "react-redux";
import store from "../../../redux/store/store";
import { getUserData } from "../../../api";
import { getProductsList } from "../../../api";

import {
    getDocs,
    query,
    where,
    getDoc,
    doc,
    collection,
} from "firebase/firestore";
import { auth, db } from "../../../services/firebaseService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { saveToken, loadToken } from "../../../services/authServices"; // Import saveToken and loadToken
import { getUser } from "../../../redux/actions/userActions"; // Import getUser

const USER_IMAGE_SOURCE = require("../../../assets/google.png");
const COFFEE_BEANS_ICONS = require("../../../assets/coffee-beans.png");
const MILK_TEA_ICONS = require("../../../assets/milktea.png");
const FRUITS_ICONS = require("../../../assets/fruits.png");

const cardWidth = Dimensions.get("window").width;

const UserHomeScreen = () => {
 const navigation = useNavigation();
    const itemDetailBottomSheetRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const [userData, setUserData] = useState({});
    const user = useSelector((state) => state.user.user); // Get user data from Redux

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocSnap = await getDoc(
                        doc(db, "users", user.uid)
                    );
                    if (userDocSnap.exists()) {
                        const userDoc = userDocSnap.data();
                        setUserData(userDoc);
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
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
					username={"Trương Lê Vĩnh Phúc"}
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

export default UserHomeScreen;
