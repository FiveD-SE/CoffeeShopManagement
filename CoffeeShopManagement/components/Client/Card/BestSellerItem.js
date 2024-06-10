import React from "react";
import {
	Dimensions,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { colors } from "../../../assets/colors/colors";

const cardWidth = (Dimensions.get("window").width - 10) / 2 - 10;

const cardHeight = Dimensions.get("window").height / 5;

const BestSellerItem = ({
	name,
	price,
	imageSource,
	onPress,
	vertical,
	horizontal,
}) => {
	return (
		<View
			style={[
				styles.container,
				{ marginTop: vertical ? "5%" : "0%" },
				{ marginRight: horizontal ? "1%" : "0%" },
				{ padding: vertical ? "2%" : "0%" },
			]}
		>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: imageSource }}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.main}>
				<Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
					{name}
				</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
			<Pressable style={styles.addButton} onPress={onPress}>
				<Text style={styles.addButtonText}>Chọn</Text>
			</Pressable>
		</View>
	);
};

export default BestSellerItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		maxWidth: cardWidth,
	},
	imageContainer: {
		borderRadius: 10,
		overflow: "hidden",
		maxHeight: cardHeight,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	main: {
		flex: 1,
		flexDirection: "column",
		marginTop: "5%",
	},
	name: {
		width: "100%",
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
		lineHeight: 24,
	},
	price: {
		marginTop: "5%",
		color: colors.grey_100,
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "lato-regular",
	},
	addButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "4%",
		paddingHorizontal: "6%",
		marginTop: "8%",
		backgroundColor: colors.green_100,
		borderRadius: 5,
	},
	addButtonText: {
		color: colors.white_100,
		fontSize: 14,
		fontFamily: "lato-bold",
	},
});
