import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	Dimensions,
} from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const cardWidth = (Dimensions.get("window").width - 10) / 2 - 10;
const RecentlyViewedItem = ({ id, name, price, imageSource, onPress }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={require("../../../assets/starbucks.jpeg")}
					resizeMode="stretch"
				/>
			</View>
			<View style={styles.main}>
				<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
					{name}
				</Text>
				<View style={styles.priceContainer}>
					<Text style={styles.price}>{price}</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default RecentlyViewedItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		maxWidth: cardWidth,
		marginRight: "1%",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: colors.grey_50,
		backgroundColor: colors.white_100,
	},
	imageContainer: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		overflow: "hidden",
		maxHeight: 120,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	main: {
		flex: 1,
		flexDirection: "column",
		padding: "5%",
		justifyContent: "space-between",
	},
	title: {
		width: "100%",
		color: colors.black_100,
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 20,
	},
	priceContainer: {
		backgroundColor: colors.green_20,
		justifyContent: "center",
		alignItems: "center",
		marginTop: "10%",
		paddingVertical: "3%",
		borderRadius: 20,
	},
	price: {
		color: colors.green_100,
		fontSize: 14,
		fontWeight: "500",
	},
});
