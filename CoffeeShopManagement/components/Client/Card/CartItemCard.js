import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome6";

const CartItemCard = ({ title, price, imageSource, onQuantityChange }) => {
	const [quantity, setQuantity] = useState(1);

	const handleIncrement = () => {
		setQuantity(quantity + 1);
	};

	const handleDecrement = () => {
		const newQuantity = quantity - 1;
		if (newQuantity <= 0) {
			onQuantityChange(newQuantity);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={imageSource} resizeMode="cover" />
			</View>
			<View style={styles.main}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
			<View style={styles.adjustButtonContainer}>
				<Pressable style={styles.adjustButton} onPress={handleDecrement}>
					<Icon name="minus" color="#FFFFFF" size={12} />
				</Pressable>
				<Text style={styles.quantity}>{quantity}</Text>
				<Pressable style={styles.adjustButton} onPress={handleIncrement}>
					<Icon name="plus" color="#FFFFFF" size={12} />
				</Pressable>
			</View>
		</View>
	);
};

export default CartItemCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		flexDirection: "row",
		alignItems: "center",
		marginVertical: "1%",
		padding: "3%",
		borderRadius: 20,
		justifyContent: "space-between",
	},
	imageContainer: {
		flex: 0.5,
	},
	image: {
		width: "100%",
		height: 80,
		borderRadius: 10,
	},
	main: {
		flex: 1,
		paddingHorizontal: "5%",
	},
	title: {
		width: "100%",
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 20,
	},
	price: {
		marginTop: "5%",
		color: "rgba(58,58,58,0.5)",
		fontSize: 14,
		fontWeight: "500",
	},
	adjustButtonContainer: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	adjustButton: {
		padding: "4%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00A188",
		borderRadius: 100,
	},
	quantity: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
	},
});
