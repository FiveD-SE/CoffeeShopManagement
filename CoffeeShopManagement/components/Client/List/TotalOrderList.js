import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const TotalOrderList = ({ orderInformation, totalDiscount }) => {
	const totalPrice = orderInformation.reduce((accumulator, currentItem) => {
		return accumulator + currentItem.totalPrice * currentItem.quantity;
	}, 0);

	const selectedProductList = [
		{
			title: "Thành tiền:",
			price: totalPrice,
		},
		{
			title: "Phí giao hàng:",
			price: 0,
		},
		{
			title: "Chiết khấu:",
			price: totalDiscount,
		},
	];

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const renderItem = () => {
		return selectedProductList.map((item, index) => (
			<View style={styles.itemContainer} key={index}>
				<Text style={styles.title}>{item.title}</Text>
				<Text style={styles.price}>{formatCurrency(item.price)}</Text>
			</View>
		));
	};
	return <View style={styles.container}>{renderItem()}</View>;
};

export default TotalOrderList;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.green_10,
		borderWidth: 1,
		borderColor: colors.grey_50,
		padding: "4%",
		borderRadius: 8,
	},
	itemContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: "2%",
	},
	itemContent: {
		flex: 1,
		flexDirection: "column",
		marginRight: "10%",
	},
	title: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
		lineHeight: 20,
	},
	price: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
});
