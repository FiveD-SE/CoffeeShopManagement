import { StyleSheet, FlatList, View } from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import ProductCardVertical from "../../../components/Client/Card/ProductCardHorizontal";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { connect } from "react-redux";
const UserFavoriteItemScreen = ({ favoriteList }) => {
	const [selectedItem, setSelectedItem] = useState(null);

	const itemDetailSnapPoints = useMemo(() => ["85%"]);

	const itemDetailBottomSheetRef = useRef(null);

	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

	const renderFavoriteItemList = ({ item }) => (
		<ProductCardVertical
			id={item.id}
			name={item.itemId}
			price={item.price?.toLocaleString("vi-VN", {
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

	return (
		<IsOpenProvider>
			<View style={styles.container}>
				<View style={styles.favoriteItemListContainer}>
					<FlatList
						data={favoriteList}
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
	favoriteList: state.user.favoriteList,
});

export default connect(mapStateToProps)(UserFavoriteItemScreen);
