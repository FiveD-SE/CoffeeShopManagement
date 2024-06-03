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

import { getProductsList } from "../../../api";
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
				name={item.name}
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
