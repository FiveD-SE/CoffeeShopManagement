import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../../components/Client/SearchBar";
import ProductCardHorizontal from "../../../components/Client/Card/ProductCardHorizontal";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { PRODUCT_ITEM_LIST } from "../../../utils/constants";
const UserSearchScreen = () => {
	const navigation = useNavigation();

	const [selectedItem, setSelectedItem] = useState(null);
	const itemDetailSnapPoints = useMemo(() => ["85%"], []);
	const itemDetailBottomSheetRef = useRef(null);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const renderItemList = ({ item }) => (
		<ProductCardHorizontal
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
				<View style={styles.header}>
					<SearchBar />
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
						data={PRODUCT_ITEM_LIST}
						renderItem={renderItemList}
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
