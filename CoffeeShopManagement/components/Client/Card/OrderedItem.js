import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const OrderedItem = ({ title, price, quantity, imageSource }) => (
	<View style={styles.orderedItemContainer}>
		<Image source={imageSource} style={styles.itemImage} />
		<View style={styles.itemDetails}>
			<Text style={styles.itemName}>{title}</Text>
			<Text style={styles.itemPrice}>{price}</Text>
		</View>
		<Text style={styles.itemQuantity}>x{quantity}</Text>
	</View>
);

export default OrderedItem;

const styles = StyleSheet.create({
	orderedItemContainer: {
		marginVertical: "2%",
		padding: "4%",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.grey_50,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: colors.white_100,
	},
	itemImage: {
		width: 80,
		height: 80,
		backgroundColor: "#CBCBD4",
		borderRadius: 10,
	},
	itemDetails: {
		flex: 1,
		alignSelf: "stretch",
		flexDirection: "column",
		marginLeft: "5%",
	},
	itemName: {
		color: "#3A3A3A",
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	itemPrice: {
		color: "rgba(58, 58, 58, 0.50)",
		fontSize: 14,
		fontFamily: "lato-regular",
		marginTop: "4%",
	},
	itemQuantity: {
		color: "#3A3A3A",
		fontSize: 14,
		fontFamily: "lato-regular",
		lineHeight: 12,
	},
});
