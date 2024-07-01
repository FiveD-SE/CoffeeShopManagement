import React, { useRef, useState, useMemo, useEffect } from "react";
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
import { PRODUCT_ITEM_LIST } from "../../../utils/constants";
import { getProductsList } from "../../../api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import RequestAddressModal from "../../../components/Client/RequestAddressModal";
import { connect } from "react-redux";

const UserPlaceOrderScreen = ({ addressStatus }) => {
	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

	const [productList, setProductList] = useState([]);
	const itemDetailSnapPoints = useMemo(() => ["85%"], []);
	const itemDetailBottomSheetRef = useRef(null);
	const scrollViewRef = useRef(null);
	const sectionRefs = useRef({
		"Cà phê": useRef(null),
		"Trà sữa": useRef(null),
		"Nước trái cây": useRef(null),
		"Đá xay": useRef(null),
	});
	const [sectionPositions, setSectionPositions] = useState({});

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const renderProductList = (productType) => {
		let filteredProductList = [];
	
		if (productType === "New") {
			const fifteenDaysAgo = new Date();
			fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 30);
	
			filteredProductList = productList.filter(item => {
				const productDate = new Date(item.dateCreated.seconds * 1000 + item.dateCreated.nanoseconds / 1000000);
				return productDate.getTime() > fifteenDaysAgo.getTime();
			}).sort((a, b) => {
				const dateA = new Date(a.dateCreated.seconds * 1000 + a.dateCreated.nanoseconds / 1000000);
				const dateB = new Date(b.dateCreated.seconds * 1000 + b.dateCreated.nanoseconds / 1000000);
				return dateB - dateA;
			}).slice(0, 5);
		} else {
			filteredProductList = productList.filter(item => item.productType === productType);
		}
	
		const sortedProductList = filteredProductList.sort((a, b) => a.productPrice - b.productPrice);
	
		return sortedProductList.map((item, index) => (
			<ProductCardHorizontal
				key={index}
				id={item.productId}
				name={item.productName}
				price={formatCurrency(item.productPrice)}
				imageSource={item?.productImage}
				onPress={() => handleOpenItemDetail(item)}
			/>
		));
	};
	
	const showRequestAddressModal = () => {
		setModalVisible(true);
	};

	const hideRequestAddressModal = () => {
		setModalVisible(false);
	};

	const handleOpenItemDetail = (item) => {
		if (addressStatus === false) {
			showRequestAddressModal();
			return;
		}
		setSelectedItem(item);
		setIsItemDetailVisible(true);
	};

	const handleCloseItemDetail = () => setIsItemDetailVisible(false);

	const goToMustTryItemList = () => {
		navigation.navigate("UserMustTryItemScreen");
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
	const handleSectionLayout = (event, category) => {
		const { y } = event.nativeEvent.layout;
		setSectionPositions((prevPositions) => ({
			...prevPositions,
			[category]: y,
		}));
	};
	useEffect(() => {
		const refs = {
			"Cà phê": sectionRefs.current["Cà phê"],
			"Trà sữa": sectionRefs.current["Trà sữa"],
			"Nước trái cây": sectionRefs.current["Nước trái cây"],
			"Đá xay": sectionRefs.current["Đá xay"],
		};

		Object.entries(refs).forEach(([category, ref]) => {
			if (ref && ref.current) {
				ref.current.setNativeProps({
					onLayout: (event) => handleSectionLayout(event, category),
				});
			}
		});
	}, [handleSectionLayout]);

	const handleCategoryPress = (category) => {
		if (sectionPositions[category] !== undefined && scrollViewRef.current) {
			scrollViewRef.current.scrollTo({
				y: sectionPositions[category] - 10, // Adjust offset if needed
				animated: true,
			});
		}
	};

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

	const renderSection = (title, category) => {
		return (
			<View
				style={{ marginTop: "5%" }}
				ref={sectionRefs.current[category]}
				onLayout={(event) => handleSectionLayout(event, category)}
			>
				<Section title={title}>
					<ScrollView contentContainerStyle={styles.mustTryList} showsVerticalScrollIndicator={false}>
						{renderProductList(category)}
					</ScrollView>
				</Section>
			</View>
		);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setModalVisible(false);
		}, 3000);

		return () => clearTimeout(timeout);
	}, [modalVisible]);

	return (
		<>
			<SafeAreaView style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.header}>
						<View style={styles.headerLeft}>
							<Text style={styles.chooseCategoriesText}>Danh mục</Text>
						</View>
						<View style={styles.headerRight}>
							<IconButton
								iconName="receipt-outline"
								onPress={goToDeliverdOrderScreen}
							/>
							<IconButton iconName="cart-outline" onPress={goToCartScreen} />
							<IconButton
								iconName="heart-outline"
								onPress={goToFavoriteItemScreen}
							/>
							<IconButton
								iconName="search-outline"
								onPress={goToSearchScreen}
							/>
						</View>
					</View>
					<View>
						<CategoryItemList handleCategoryPress={handleCategoryPress} />
					</View>
				</View>

				<ScrollView
					ref={scrollViewRef}
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ padding: "5%" }}
				>
					<View>
						<Section
							title="Món Mới Phải Thử"
							showSubtitle={true}
							subtitle="Xem thêm"
							onPressSubtitle={goToMustTryItemList}
						>
							<View style={styles.mustTryList}>
								{renderProductList("New")}
							</View>
						</Section>
					</View>

					{renderSection("Cà Phê", "Cà phê")}
					{renderSection("Trà Sữa", "Trà sữa")}
					{renderSection("Nước Trái Cây", "Nước trái cây")}
					{renderSection("Đá Xay", "Đá xay")}
				</ScrollView>
				{isItemDetailVisible && (
					<ItemDetailBottomSheet
						bottomSheetRef={itemDetailBottomSheetRef}
						snapPoints={itemDetailSnapPoints}
						selectedItem={selectedItem}
						isVisible={isItemDetailVisible}
						onClose={handleCloseItemDetail}
					/>
				)}
				<RequestAddressModal
					visible={modalVisible}
					onClose={hideRequestAddressModal}
				/>
			</SafeAreaView>
		</>
	);
};

const mapStateToProps = (state) => ({
	addressStatus: state.user.addressStatus,
});

export default connect(mapStateToProps)(UserPlaceOrderScreen);

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
		flex: 0.5,
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
		fontFamily: "lato-bold",
	},
	headerContainer: {
		padding: "5%",
	},
	title: {
		color: "#3a3a3a",
		fontSize: 18,
		fontWeight: "600",
		fontFamily: "lato-bold",
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
