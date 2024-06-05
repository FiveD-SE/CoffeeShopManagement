import { StyleSheet, FlatList, View } from "react-native";
import React, {
	useState,
	useMemo,
	useRef,
	useEffect,
	useCallback,
} from "react";
import ProductCardVertical from "../../../components/Client/Card/ProductCardHorizontal";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { connect } from "react-redux";
import { getFavoritesListById } from "../../../api";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
const UserFavoriteItemScreen = ({ userData }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const [favoritesList, setFavoritesList] = useState([]);

	const [productList, setProductList] = useState([]);

	const itemDetailSnapPoints = useMemo(() => ["85%"]);

	const itemDetailBottomSheetRef = useRef(null);

	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

	const renderFavoriteItemList = useCallback(
		({ item }) => {
			const productInfo = productList.find((product) => product.id === item);
			console.log(productInfo);

			if (productInfo) {
				return (
					<ProductCardVertical
						id={productInfo.productId}
						name={productInfo.productName}
						price={productInfo.productPrice?.toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
						imageSource={productInfo.productImage}
						onPress={() => handleOpenItemDetail(productInfo)}
					/>
				);
			} else {
				return null;
			}
		},
		[productList, handleOpenItemDetail]
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
		const fetchFavorite = async () => {
			const favoritesRef = doc(db, "favorites", userData.id);
			const favoritesDoc = await getDoc(favoritesRef);

			if (favoritesDoc.exists()) {
				const favoriteProductIds = favoritesDoc.data().productIds;
				setFavoritesList(favoriteProductIds);
			}
		};

		const fetchProducts = async () => {
			const productsSnapshot = await getDocs(collection(db, "products"));
			const productsData = productsSnapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setProductList(productsData);
		};

		fetchFavorite();
		fetchProducts();
	}, [userData, isItemDetailVisible]);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.favoriteItemListContainer}>
					<FlatList
						data={favoritesList}
						renderItem={renderFavoriteItemList}
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
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F7FA",
	},
	favoriteItemListContainer: {
		flex: 1,
		marginTop: "5%",
		paddingHorizontal: "5%",
	},
});

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserFavoriteItemScreen);
