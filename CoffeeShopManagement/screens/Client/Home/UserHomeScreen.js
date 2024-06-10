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
import { db, auth } from "../../../services/firebaseService";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { connect } from "react-redux";

const cardWidth = Dimensions.get("window").width;

const UserHomeScreen = ({ userData }) => {
	const navigation = useNavigation();
	const itemDetailBottomSheetRef = useRef(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
	const [productList, setProductList] = useState([]);
	const [bestSellerList, setBestSellerList] = useState([]);
	const [recentlyViewedList, setRecentlyViewedList] = useState([]);
	const [currentCredit, setCurrentCredit] = useState(0);
	const [username, setUsername] = useState("");

	const handleOpenItemDetail = (item) => {
		setSelectedItem(item);
		setIsItemDetailVisible(true);
	};
	const handleCloseItemDetail = () => setIsItemDetailVisible(false);

	const goToExchangeVoucher = () => navigation.navigate("ExchangeVoucher");
	const goToSearchScreen = () => navigation.navigate("SearchScreen");
	const goToBestSellerScreen = () => navigation.navigate("BestSeller");
	const goToNotificationScreen = () =>
		navigation.navigate("CashierNotification");

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const renderBestSellerItemList = () =>
		productList.map((item, index) => {
			return (
				<BestSellerItem
					key={index}
					id={item.productId}
					name={item.productName}
					price={formatCurrency(item.productPrice)}
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
				name={item.productName}
				price={formatCurrency(item.productPrice)}
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
			const productList = [];

			try {
				const querySnapshot = await getDocs(collection(db, "products"));
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					productList.push({ ...data, id: doc.id });
				});

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
					username={userData.name}
					totalPoint={userData.credit}
					onPressBean={goToExchangeVoucher}
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
		width: cardWidth * 5,
		flexDirection: "row",
		marginTop: "5%",
	},
});

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserHomeScreen);
