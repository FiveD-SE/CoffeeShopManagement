import { StyleSheet, FlatList, View } from "react-native";
import React, { useState, useMemo, useRef } from "react";
import ProductCardVertical from "../../../components/Client/Card/ProductCardHorizontal";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import ItemDetailBottomSheet from "../../../components/Client/BottomSheet/ItemDetailBottomSheet";
const UserFavoriteItemScreen = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const itemDetailSnapPoints = useMemo(() => ["85%"], []);
	const itemDetailBottomSheetRef = useRef(null);
	const productItemList = [
		{
			title: "Phở Gà Việt Nam",
			price: 45000,
			description: "Phở gà thơm nồng",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Bún Chả Hà Nội",
			price: 55000,
			description: "Bún chả thơm ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Gỏi Cuốn Sài Gòn",
			price: 25000,
			description: "Gỏi cuốn tươi ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Cà Phê Sữa Đá",
			price: 30000,
			description: "Cà phê sữa đá thơm ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Bánh Mì Bì Hà Nội",
			price: 40000,
			description: "Bánh mì bì thơm ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
		{
			title: "Bánh Mì Trứng",
			price: 20000,
			description: "Bánh mì trứng thơm ngon",
			imageSource: require("../../../assets/vietnam.png"),
		},
	];
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
						data={productItemList}
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
