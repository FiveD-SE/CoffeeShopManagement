import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../assets/colors/colors";

const ProductCard = ({ item }) => {
	const renderOptionList = (item) => {
		const optionLabels = ["Đường", "Sữa", "Đá"];
		return item
			.map(
				(option, index) =>
					`${optionLabels[index]}: ${
						option.charAt(0).toLowerCase() + option.slice(1).toLowerCase()
					}`
			)
			.join(", ");
	};

	const renderToppingsList = (toppings) => {
		return toppings
			.map(
				(topping) =>
					topping.title.charAt(0).toUpperCase() +
					topping.title.slice(1).toLowerCase()
			)
			.join(", ");
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};
	return (
		<View style={styles.productCard}>
			<View style={styles.productDetailsContainer}>
				<Text style={styles.title}>{item.productName}</Text>
				<Text style={styles.price}>{formatCurrency(item.productPrice)}</Text>
				{item.toppings && item.toppings.length > 0 && (
					<Text style={styles.options}>
						{renderToppingsList(item.toppings)}
					</Text>
				)}
				{item.options && item.options.length > 0 && (
					<Text style={styles.options}>{renderOptionList(item.options)}</Text>
				)}
			</View>
			<Text style={styles.quantity}>SL: {item.quantity}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	productCard: {
		backgroundColor: "rgba(255, 255, 255, 1)",
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "4%",
		marginBottom: "2%",
	},
	productDetailsContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	price: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
	options: {
		color: colors.black_100,
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "lato-regular",
		marginVertical: "2%",
	},
	quantity: {
		fontSize: 16,
		fontFamily: "lato-regular",
	},
});

export default ProductCard;
