import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

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
		padding: "5%",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(58, 58, 58, 0.10)",
		flexDirection: "row",
		alignItems: "center",
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
		fontSize: 14,
		fontWeight: "500",
	},
	itemPrice: {
		color: "rgba(58, 58, 58, 0.50)",
		fontSize: 12,
		fontWeight: "600",
		marginTop: "5%",
	},
	itemQuantity: {
		color: "#3A3A3A",
		fontSize: 12,
		fontWeight: "600",
		lineHeight: 12,
	},
});
