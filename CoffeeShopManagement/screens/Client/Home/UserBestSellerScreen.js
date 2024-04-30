import { FlatList, StyleSheet, View } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { PRODUCT_ITEM_LIST } from "../../../utils/constants";
const UserBestSellerScreen = () => {
	const [selectedItem, setSelectedItem] = useState(null);

	const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

	const itemDetailSnapPoints = useMemo(() => ["85%"]);

	const itemDetailBottomSheetRef = useRef(null);

	const renderBestSellerItemList = ({ item }) => (
		<BestSellerItem
			title={item.title}
			price={item.price.toLocaleString("vi-VN", {
				style: "currency",
				currency: "VND",
			})}
			imageSource={item.imageSource}
			vertical={true}
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
				<View style={styles.bestSellerItemListContainer}>
					<FlatList
						data={PRODUCT_ITEM_LIST}
						renderItem={renderBestSellerItemList}
						numColumns={2}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={styles.bestSellerItemListContainer}
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

export default UserBestSellerScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	bestSellerItemListContainer: {
		marginTop: "2%",
		paddingHorizontal: "2%",
	},
});
