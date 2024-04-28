import React, { useRef, useState, useMemo } from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	ScrollView,
	SafeAreaView,
	Platform,
} from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";

import Section from "../../../components/Client/Section";
import IconButton from "../../../components/Client/Button/IconButton";
import ProductCardHorizontal from "../../../components/Client/Card/ProductCardHorizontal";
import RecentItemCard from "../../../components/Client/Card/RecentItemCard";
import CategoryItemList from "../../../components/Client/List/CategoryItemList";
import CategoryBottomSheet from "../../../components/Client/BottomSheet/CategoryBottomSheet";
import ItemDetailBottomSheet from "../../../components/Client/BottomSheet/ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
const PRODUCT_IMAGE_SOURCE = require("../../../assets/starbucks.jpeg");

const UserPlaceOrderScreen = () => {
	const navigation = useNavigation();
	const [isOpen, setIsOpen] = useState(false);
	const categorySnapPoints = useMemo(() => ["30%"], []);

	const itemDetailSnapPoints = useMemo(() => ["85%"], []);
	const itemDetailBottomSheetRef = useRef(null);
	const categoryBottomSheetRef = useRef(null);

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

	const renderMustTryList = () => {
		return mustTryList.map((item, index) => (
			<ProductCardHorizontal
				key={index}
				title={item.title}
				price={item.price.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
				imageSource={item.imageSource}
				onPress={handleOpenItemDetail}
			/>
		));
	};

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
				onPress={handleOpenItemDetail}
			/>
		));
	};

	const handleOpenCategoryItemList = () => {
		categoryBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const handleOpenItemDetail = () => {
		itemDetailBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const goToSearchScreen = () => {
		navigation.navigate("UserSearchScreen");
	};

	const goToFavoriteItemScreen = () => {
		navigation.navigate("UserFavoriteItemScreen");
	};

	const goToCartScreen = () => {
		navigation.navigate("UserCartScreen");
	};

	return (
		<IsOpenProvider>
			<SafeAreaView style={styles.container}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ padding: "5%" }}
				>
					<View style={styles.header}>
						<View style={styles.headerLeft}>
							<Pressable
								style={styles.chooseCategoriesContainer}
								onPress={handleOpenCategoryItemList}
							>
								<Text style={styles.chooseCategoriesText}>Danh mục</Text>
								<Icon name="chevron-down" size={20} />
							</Pressable>
						</View>
						<View style={styles.headerRight}>
							<IconButton iconName="rectangle-list" />
							<IconButton iconName="cart-shopping" onPress={goToCartScreen} />
							<IconButton iconName="heart" onPress={goToFavoriteItemScreen} />
							<IconButton
								iconName="magnifying-glass"
								onPress={goToSearchScreen}
							/>
						</View>
					</View>
					<View>
						<CategoryItemList />
					</View>
					<View style={{ marginTop: "5%" }}>
						<Section
							title="Món Mới Phải Thử"
							showSubtitle={true}
							subtitle="Xem thêm"
							onPressSubtitle={goToFavoriteItemScreen}
						>
							<ScrollView contentContainerStyle={styles.mustTryList}>
								{renderMustTryList()}
							</ScrollView>
						</Section>
					</View>
					<View style={{ marginTop: "5%" }}>
						<Section title="Món Đã Đặt Gần Đây">
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
								contentContainerStyle={styles.recentItemList}
							>
								{renderRecentItemList()}
							</ScrollView>
						</Section>
					</View>
					<CategoryBottomSheet
						bottomSheetRef={categoryBottomSheetRef}
						snapPoints={categorySnapPoints}
						setIsOpen={setIsOpen}
					/>
					<ItemDetailBottomSheet
						bottomSheetRef={itemDetailBottomSheetRef}
						snapPoints={itemDetailSnapPoints}
						setIsOpen={setIsOpen}
					/>
				</ScrollView>
			</SafeAreaView>
		</IsOpenProvider>
	);
};

export default UserPlaceOrderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		flexDirection: "row",
		marginTop: Platform.select({
			android: "15%",
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
		width: "300%",
		alignItems: "center",
		flexDirection: "row",
		marginTop: "2%",
	},
});
