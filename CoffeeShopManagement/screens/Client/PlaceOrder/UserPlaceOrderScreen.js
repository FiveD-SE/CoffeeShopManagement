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
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";

import Section from "../../../components/Client/Section";
import IconButton from "../../../components/Client/Button/IconButton";
import ProductCardHorizontal from "../../../components/Client/Card/ProductCardHorizontal";
import RecentItemCard from "../../../components/Client/Card/RecentItemCard";
import CategoryItemList from "../../../components/Client/List/CategoryItemList";
import CategoryBottomSheet from "../../../components/Client/BottomSheet/CategoryBottomSheet";
import ItemDetailBottomSheet from "./ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { PRODUCT_ITEM_LIST } from "../Home/UserHomeScreen";
const UserPlaceOrderScreen = () => {
	const navigation = useNavigation();
	const categorySnapPoints = useMemo(() => ["40%"], []);
	const itemDetailSnapPoints = useMemo(() => ["85%"], []);
	const itemDetailBottomSheetRef = useRef(null);
	const categoryBottomSheetRef = useRef(null);

	const renderMustTryList = () => {
		return PRODUCT_ITEM_LIST.map((item, index) => (
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
		return PRODUCT_ITEM_LIST.map((item, index) => (
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
	};

	const handleOpenItemDetail = () => {
		itemDetailBottomSheetRef.current?.present();
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

	const goToDeliverdOrderScreen = () => {
		navigation.navigate("UserOrderScreen");
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
							<IconButton
								iconName="rectangle-list"
								onPress={goToDeliverdOrderScreen}
							/>
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
					/>
					<ItemDetailBottomSheet
						bottomSheetRef={itemDetailBottomSheetRef}
						snapPoints={itemDetailSnapPoints}
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
