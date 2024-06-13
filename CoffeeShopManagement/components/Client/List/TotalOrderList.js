import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const TotalOrderList = ({ totalPrice, deliveryfee, productDiscount, deliveryDiscount }) => {

	const selectedProductList = [
		{
			title: "Thành tiền:",
			price: totalPrice,
		},
		{
			title: "Phí giao hàng:",
			price: deliveryfee,
		},
		{
			title: "Giảm giá sản phẩm:",
			price: -productDiscount,
		},
		{
			title: "Giảm giá phí vận chuyển:",
			price: -deliveryDiscount,
		},
	];

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const renderItem = () => {
		return selectedProductList.map((item, index) => {
			const isDiscountProduct = item.title === "Giảm giá sản phẩm:";
			const isDiscountDelivery = item.title === "Giảm giá phí vận chuyển:";
			const isDiscount = isDiscountProduct || isDiscountDelivery;

			return (
				<View style={styles.itemContainer} key={index}>
					<Text style={[styles.title, isDiscount && styles.discountTitle]}>
						{item.title}
					</Text>
					<Text style={[styles.price, isDiscount && styles.discountTitle]}>
						{formatCurrency(item.price)}
					</Text>
				</View>
			);
		});
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
	discountTitle: {
		color: colors.grey_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	}
});
