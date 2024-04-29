import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	Pressable,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Section from "../Section";
import SizeItem from "../../../components/Client/Button/SizeItem";
import OptionSection from "../List/OptionSection";
import ToppingButton from "../../../components/Client/Button/ToppingButton";
import ToppingItemList from "../List/ToppingItemList";
import BottomSheet from "./BottomSheet";
import { useIsOpen } from "../../../utils/IsOpenContext";
const ItemDetailBottomSheet = ({
	bottomSheetRef,
	snapPoints,
	selectedItem,
}) => {
	const { setIsOpen } = useIsOpen();
	const navigation = useNavigation();
	const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
	const [isFavorite, setIsFavorite] = useState(false);
	const optionList = [{ title: "Đường" }, { title: "Sữa" }, { title: "Đá" }];
	const sugarOptionList = ["Bình thường", "Ít đường", "Không đường"];
	const milkOptionList = ["Bình thường", "Ít sữa", "Không sữa"];
	const iceOptionList = ["Bình thường", "Ít đá", "Không đá"];
	const sizeItemList = [
		{ size: "S", price: 59000 },
		{ size: "M", price: 79000 },
		{ size: "L", price: 99000 },
	];

	const handleSizePress = (index) => setSelectedSizeIndex(index);

	const chooseOptionList = (title) => {
		switch (title) {
			case "Đường":
				return sugarOptionList;
			case "Sữa":
				return milkOptionList;
			case "Đá":
				return iceOptionList;
			default:
				return [];
		}
	};

	const renderSizeItemList = () =>
		sizeItemList.map(({ size, price }, index) => (
			<SizeItem
				key={index}
				index={index}
				size={size}
				price={price.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
				isSelected={selectedSizeIndex === index}
				onPress={handleSizePress}
			/>
		));

	const renderOptionSection = () =>
		optionList.map((item, index) => (
			<OptionSection
				key={index}
				title={item.title}
				options={chooseOptionList(item.title)}
			/>
		));

	const goToCartScreen = () => navigation.navigate("UserCartScreen");
	const toggleFavorite = () => setIsFavorite(!isFavorite);
	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
		>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				<View style={styles.container}>
					<Image
						style={styles.image}
						source={require("../../../assets/starbucks.jpeg")}
					/>
					<View style={styles.main}>
						<View style={styles.header}>
							<View style={styles.contentContainer}>
								<Text style={styles.title}>
									{selectedItem ? selectedItem.title : ""}
								</Text>
								<Text style={styles.price}>
									{selectedItem
										? selectedItem.price.toLocaleString("vi-VN", {
												style: "currency",
												currency: "VND",
										  })
										: ""}
								</Text>
							</View>
							<Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
								{isFavorite ? (
									<FontAwesome name="heart" size={24} color={"#F61A3D"} />
								) : (
									<Icon name="heart" size={24} />
								)}
							</Pressable>
						</View>
						<Text style={styles.description}>
							{selectedItem ? selectedItem.description : ""}
						</Text>
						<View style={{ marginTop: "5%" }}>
							<Section title="Kích cỡ">
								<View style={styles.sizeContainer}>{renderSizeItemList()}</View>
							</Section>
						</View>
						<View style={{ marginTop: "5%" }}>
							<Section title="Tuỳ chọn khác">
								<View style={styles.optionContainer}>
									{renderOptionSection()}
								</View>
							</Section>
						</View>
						<View style={{ marginTop: "5%" }}>
							<ToppingButton />
						</View>
						<View style={{ marginTop: "5%" }}>
							<ToppingItemList />
						</View>
					</View>
				</View>
				<View style={styles.footer}>
					<Pressable style={styles.addToCartButton}>
						<Text style={styles.addToCartButtonText}>Thêm vào giỏ</Text>
						<Icon name="ellipsis-vertical" color="#FFFFFF" />
						<Text style={styles.addToCartButtonText}>59.000đ</Text>
					</Pressable>
					<Pressable style={styles.viewCartButton} onPress={goToCartScreen}>
						<Icon style={styles.viewCartButtonIcon} name="cart-shopping" />
					</Pressable>
				</View>
			</ScrollView>
		</BottomSheet>
	);
};

export default ItemDetailBottomSheet;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "transparent",
	},
	scrollViewContent: {
		flexGrow: 1,
	},
	image: {
		width: "100%",
		height: 300,
	},
	main: {
		flex: 0.5,
		padding: "5%",
	},
	header: {
		flexDirection: "row",
	},
	contentContainer: {
		flex: 1,
	},
	title: {
		color: "#3A3A3A",
		fontSize: 20,
		lineHeight: 24,
		fontWeight: "600",
	},
	price: {
		color: "#A6A6AA",
		fontSize: 16,
		fontWeight: "500",
		marginTop: "5%",
	},
	favoriteButton: {},
	description: {
		color: "#3A3A3A",
		fontSize: 14,
		lineHeight: 20,
		fontWeight: "400",
		marginTop: "5%",
	},
	sizeContainer: {
		flexDirection: "row",
		marginTop: "5%",
		borderBottomWidth: 1,
		borderColor: "rgba(58, 58, 58, 0.10)",
		paddingBottom: "5%",
	},
	optionContainer: {
		borderBottomWidth: 1,
		borderColor: "rgba(58, 58, 58, 0.10)",
		paddingBottom: "5%",
	},
	footer: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		padding: "5%",
		borderColor: "rgba(58, 58, 58, 0.20)",
		borderTopWidth: 1,
	},
	totalPriceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	label: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "700",
	},
	addToCartButton: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#00A188",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingVertical: "4%",
		borderRadius: 20,
		marginRight: "2%",
	},
	addToCartButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "400",
	},
	viewCartButton: {
		flexDirection: "row",
		backgroundColor: "rgba(166, 166, 170, 0.20)",
		alignItems: "center",
		paddingHorizontal: "6%",
		borderRadius: 20,
	},
	viewCartButtonIcon: {
		color: "#A6A6AA",
		fontSize: 16,
		fontWeight: "600",
	},
});
