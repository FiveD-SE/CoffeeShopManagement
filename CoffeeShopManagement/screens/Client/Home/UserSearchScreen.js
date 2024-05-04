import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import unidecode from "unidecode";
import SearchBar from "../../../components/Client/SearchBar";
import ProductCardHorizontal from "../../../components/Client/Card/ProductCardHorizontal";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { PRODUCT_ITEM_LIST } from "../../../utils/constants";
import { getProductsList } from "../../../api";
const UserSearchScreen = () => {
	const navigation = useNavigation();

	const [searchQuery, setSearchQuery] = useState("");

	const [filteredProductList, setFilteredProductList] = useState([]);

	const [selectedItem, setSelectedItem] = useState(null);

	const itemDetailSnapPoints = useMemo(() => ["85%"], []);

	const itemDetailBottomSheetRef = useRef(null);

	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

	const [productList, setProductList] = useState([]);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const handleSearch = (text) => {
		setSearchQuery(text);
		const normalizedSearchText = unidecode(text.toLowerCase().trim());
		const filteredList = productList.filter((item) =>
			unidecode(item.name.toLowerCase()).includes(normalizedSearchText)
		);
		setFilteredProductList(filteredList);
	};

	const renderItemList = ({ item }) => (
		<ProductCardHorizontal
			id={item._id}
			name={item.name}
			price={item.price.toLocaleString("vi-VN", {
				style: "currency",
				currency: "VND",
			})}
			imageSource={item.imageSource}
			onPress={() => handleOpenItemDetail(item)}
		/>
	);
	const handleOpenItemDetail = (item) => {
		setSelectedItem(item);
		setIsItemDetailVisible(true);
	};

	const handleCloseItemDetail = () => setIsItemDetailVisible(false);

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
					<FlatList
						data={searchQuery ? filteredProductList : productList}
						renderItem={renderItemList}
						showsVerticalScrollIndicator={false}
					/>
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
		</IsOpenProvider>
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
