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
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { connect } from "react-redux";
import { getFavoritesListById } from "../../../api";
const UserFavoriteItemScreen = ({ userId, productList }) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [favoritesList, setFavoritesList] = useState([]);
	const itemDetailSnapPoints = useMemo(() => ["85%"]);

	const itemDetailBottomSheetRef = useRef(null);

	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
	console.log("productList:", productList);
	const getProductInfo = useCallback((itemId) => {
		return productList.find((product) => product._id === itemId);
	}, []);

	const renderFavoriteItemList = useCallback(
		({ item }) => {
			console.log("item: ", item);
			const productInfo = getProductInfo(item._id);
			console.log("productInfo: ", productInfo);
			if (productInfo) {
				return (
					<ProductCardVertical
						id={productInfo.id}
						name={productInfo.name}
						price={productInfo.price?.toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
						imageSource={productInfo.imageSource}
						onPress={() => handleOpenItemDetail(productInfo)}
					/>
				);
			} else {
				return null;
			}
		},
		[getProductInfo, handleOpenItemDetail]
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
		getFavoritesListById(userId)
			.then((favorites) => {
				setFavoritesList(favorites.products);
			})
			.catch((error) => {
				console.error("Error fetching favorites:", error);
			});
	}, []);
	return (
		<IsOpenProvider>
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
		</IsOpenProvider>
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
	productList: state.user.productList,
	userId: state.auth.userData._id,
});

export default connect(mapStateToProps)(UserFavoriteItemScreen);
