import { StyleSheet, FlatList, View } from "react-native";
import React, { useState, useMemo, useRef } from "react";
import ProductCardVertical from "../../../components/Client/Card/ProductCardHorizontal";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { PRODUCT_ITEM_LIST } from "./UserHomeScreen";
const UserFavoriteItemScreen = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const itemDetailSnapPoints = useMemo(() => ["85%"], []);
	const itemDetailBottomSheetRef = useRef(null);

	const renderFavoriteItemList = ({ item }) => (
		<ProductCardVertical
			title={item.title}
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
		itemDetailBottomSheetRef.current?.present();
	};
	return (
		<IsOpenProvider>
			<View style={styles.container}>
				<View style={styles.favoriteItemListContainer}>
					<FlatList
						data={PRODUCT_ITEM_LIST}
						renderItem={renderFavoriteItemList}
						showsVerticalScrollIndicator={false}
					/>
				</View>
				<ItemDetailBottomSheet
					bottomSheetRef={itemDetailBottomSheetRef}
					snapPoints={itemDetailSnapPoints}
					selectedItem={selectedItem}
				/>
			</View>
		</IsOpenProvider>
	);
};

export default UserFavoriteItemScreen;

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
