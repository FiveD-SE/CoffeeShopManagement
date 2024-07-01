import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import ItemCard from "../../../components/Admin/Card/ItemCard";
import CategoryIcon from "../../../components/Client/Button/CategoryIcon";
import { colors } from "../../../assets/colors/colors";
import { connect } from "react-redux";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";

const COFFEE_ICON = require("../../../assets/images/coffee.png");
const JUICE_ICON = require("../../../assets/images/juice.png");
const MILKTEA_ICON = require("../../../assets/images/milktea.png");
const ICE_BLENDED_ICON = require("../../../assets/images/ice-blended.png");

const categoriesData = [
	{ type: "Cà phê", iconSource: COFFEE_ICON },
	{ type: "Trà sữa", iconSource: MILKTEA_ICON },
	{ type: "Nước trái cây", iconSource: JUICE_ICON },
	{ type: "Đá xay", iconSource: ICE_BLENDED_ICON },
];

const AdminItemListScreen = ({ userData }) => {
	const navigation = useNavigation();
	const [products, setProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [categoryTitle, setCategoryTitle] = useState("Tất cả sản phẩm");

	const loadProduct = async () => {
		try {
			const q = query(collection(db, "products"));
			const querySnapshot = await getDocs(q);
			const loadedProducts = [];
			querySnapshot.forEach((doc) => {
				loadedProducts.push(doc.data());
			});
			setProducts(loadedProducts);
			setFilteredProducts(loadedProducts);
		} catch (error) {
			console.log("Error loading products:", error);
		}
	};

	const formatPrice = (price) => {
		const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		});
		return formatter.format(price);
	};

	const goToEditItemScreen = (product) => {
		navigation.navigate("AdminEditItem", { product });
	};

	const renderItemList = () => {
		return filteredProducts.map((item, index) => (
			<ItemCard
				key={index}
				title={item.productName}
				price={formatPrice(item.productPrice)}
				imageSource={{ uri: item.productImage }}
				onPress={() => goToEditItemScreen(item)}
				enablePress={true}
			/>
		));
	};

	const handleCategorySelect = (category) => {
		if (selectedCategory === category) {
			setFilteredProducts(products);
			setCategoryTitle("Tất cả sản phẩm");
			setSelectedCategory(null);
		} else {
			const filtered = products.filter(
				(product) => product.productType === category
			);
			setFilteredProducts(filtered);
			setCategoryTitle(category);
			setSelectedCategory(category);
		}
	};

	const renderCategoryItemList = () => {
		return (
			<View style={styles.categoryList}>
				{categoriesData.map((category, index) => (
					<CategoryIcon
						key={index}
						iconSource={category.iconSource}
						size={64}
						name={category.type}
						onPress={() => handleCategorySelect(category.type)}
					/>
				))}
			</View>
		);
	};

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			loadProduct();
		});

		return unsubscribe;
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<View>{renderCategoryItemList()}</View>
			<Text style={styles.header}>{categoryTitle}</Text>
			<ScrollView
				contentContainerStyle={styles.itemListContainer}
				showsVerticalScrollIndicator={false}
			>
				{renderItemList()}
			</ScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => {
	return {
		userData: state.auth.userData,
	};
};

export default connect(mapStateToProps)(AdminItemListScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: "4%",
	},
	itemListContainer: {
		marginTop: "2%",
	},
	header: {
		color: "#3a3a3a",
		fontSize: 16,
		marginTop: "4%",
		fontFamily: "lato-bold",
	},
	categoryList: {
		flexDirection: "row",
		borderColor: colors.grey_50,
		backgroundColor: colors.white_100,
		justifyContent: "space-between",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: "4%",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#D8D8D8",
	},
});
