import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import React, { useState, useMemo, useRef } from "react";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { useNavigation } from "@react-navigation/native";

import UserHomeScreenHeader from "../../../components/Client/Header/UserHomeScreenHeader";
import Carousel from "../../../components/Client/Carousel";
import SearchBar from "../../../components/Client/SearchBar";
import CategoryItem from "../../../components/Client/Button/CategoryItem";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import Section from "../../../components/Client/Section";
import RecentlyViewedItem from "../../../components/Client/Card/RecentlyViewedItem";
import ItemDetailBottomSheet from "../../../components/Client/BottomSheet/ItemDetailBottomSheet";

const USER_IMAGE_SOURCE = require("../../../assets/google.png");

const COFFEE_BEANS_ICONS = require("../../../assets/coffee-beans.png");

const MILK_TEA_ICONS = require("../../../assets/milktea.png");

const FRUITS_ICONS = require("../../../assets/fruits.png");

const UserHomeScreen = () => {
	const navigation = useNavigation();

	const itemDetailSnapPoints = useMemo(() => ["85%"], []);
	const itemDetailBottomSheetRef = useRef(null);

	const [selectedIndex, setSelectedIndex] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

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

	const goToNotificationScreen = () => {
		navigation.navigate("CashierNotification");
	};

	const handleOpenItemDetail = (item) => {
		setSelectedItem(item);
		itemDetailBottomSheetRef.current?.present();
	};

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
			title: "Trà ",
		},
		{ backgroundColor: "203, 203, 212", title: "Khác" },
	];

	const productItemList = [
		{
			title: "Phở Gà Việt Nam",
			price: 45000,
			description: "Phở gà thơm nồng",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Bún Chả Hà Nội",
			price: 55000,
			description: "Bún chả thơm ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Gỏi Cuốn Sài Gòn",
			price: 25000,
			description: "Gỏi cuốn tươi ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Cà Phê Sữa Đá",
			price: 30000,
			description: "Cà phê sữa đá thơm ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Bánh Mì Bì Hà Nội",
			price: 40000,
			description: "Bánh mì bì thơm ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Bánh Mì Trứng",
			price: 20000,
			description: "Bánh mì trứng thơm ngon",
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
		return productItemList.map((item, index) => (
			<BestSellerItem
				key={index}
				title={item.title}
				price={item.price.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
				imageSource={item.imageSource}
				onPress={() => handleOpenItemDetail(item)}
				horizontal={true}
			/>
		));
	};

	const renderRecentlyViewedItemList = () => {
		return productItemList.map((item, index) => (
			<RecentlyViewedItem
				key={index}
				title={item.title}
				price={item.price.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
				imageSource={item.imageSource}
				onPress={() => handleOpenItemDetail(item)}
			/>
		));
	};

	return (
		<IsOpenProvider>
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
				<ItemDetailBottomSheet
					bottomSheetRef={itemDetailBottomSheetRef}
					snapPoints={itemDetailSnapPoints}
					selectedItem={selectedItem}
				/>
			</SafeAreaView>
		</IsOpenProvider>
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
		width: "500%",
		flexDirection: "row",
		marginTop: "5%",
	},
});

export default UserHomeScreen;
