import React, { useState, useMemo, useRef, useEffect } from "react";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import unidecode from "unidecode";

import SearchBar from "../../../components/Client/SearchBar";
import ProductCardHorizontal from "../../../components/Client/Card/ProductCardHorizontal";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";

import { db } from "../../../services/firebaseService";
import { colors } from "../../../assets/colors/colors";

const UserSearchScreen = () => {
	const navigation = useNavigation();

	const [searchQuery, setSearchQuery] = useState("");

	const [filteredProductList, setFilteredProductList] = useState([]);

	const [selectedItem, setSelectedItem] = useState(null);

	const [productList, setProductList] = useState([]);

	const [loading, setLoading] = useState(true);

	const itemDetailSnapPoints = useMemo(() => ["85%"], []);

	const itemDetailBottomSheetRef = useRef(null);

	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const handleSearch = (text) => {
		setSearchQuery(text);
		const normalizedSearchText = unidecode(text.toLowerCase().trim());
		const filteredList = productList.filter(
			(item) =>
				item.productName &&
				unidecode(item.productName.toLowerCase()).includes(normalizedSearchText)
		);
		setFilteredProductList(filteredList);
	};

	const renderItemList = ({ item }) => (
		<ProductCardHorizontal
			id={item.productId}
			name={item.productName}
			price={formatCurrency(item.productPrice)}
			imageSource={item?.productImage}
			onPress={() => handleOpenItemDetail(item)}
		/>
	);

	const handleOpenItemDetail = (item) => {
		setSelectedItem(item);
		setIsItemDetailVisible(true);
	};

	const handleCloseItemDetail = () => setIsItemDetailVisible(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const productRef = await getDocs(collection(db, "products"));

				const productList = productRef.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setProductList(productList);
			} catch (error) {
				console.error("Error fetching product: ", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (isItemDetailVisible) {
			itemDetailBottomSheetRef.current?.present();
		}
	}, [isItemDetailVisible]);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<SearchBar onChangeText={handleSearch} />
					<Pressable
						style={styles.cancelButton}
						onPress={handleGoBack}
						hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
					>
						<Text style={styles.cancelButtonText}>Huỷ</Text>
					</Pressable>
				</View>
				<View style={styles.main}>
					{loading ? (
						<ActivityIndicator
							size="large"
							color={colors.green_100}
							style={{ flex: 1 }}
						/>
					) : (
						<FlatList
							data={searchQuery ? filteredProductList : productList}
							renderItem={renderItemList}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</View>
				{isItemDetailVisible && (
					<ItemDetailBottomSheet
						bottomSheetRef={itemDetailBottomSheetRef}
						snapPoints={itemDetailSnapPoints}
						selectedItem={selectedItem}
						isVisible={isItemDetailVisible}
						onClose={handleCloseItemDetail}
					/>
				)}
			</View>
		</>
	);
};

export default UserSearchScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		width: "100%",
		flexDirection: "row",
		padding: "5%",
		alignItems: "center",
		marginTop: "10%",
	},
	cancelButton: {
		marginLeft: "5%",
	},
	cancelButtonText: {
		color: "#006C5E",
		fontSize: 12,
		fontWeight: "600",
	},
	main: {
		flex: 1,
		backgroundColor: "#F8F7FA",
		padding: "5%",
	},
});
