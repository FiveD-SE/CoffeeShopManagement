import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const OrderConfirmationFooter = ({ onPress }) => {
	return (
		<View style={styles.footer}>
			<View style={styles.totalPriceContainer}>
				<Text style={styles.label}>Tổng cộng:</Text>
				<Text style={styles.price}>
					{(10000).toLocaleString("vi-VN", {
						style: "currency",
						currency: "VND",
					})}
				</Text>
			</View>
			<Pressable style={styles.orderButton} onPress={onPress}>
				<Text style={styles.orderButtonText}>Đặt hàng</Text>
			</Pressable>
		</View>
	);
};

export default OrderConfirmationFooter;

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: "5%",
		paddingVertical: "2%",
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
	price: {
		color: "#3a3a3a",
		fontSize: 20,
		fontWeight: "700",
	},
	orderButton: {
		backgroundColor: "#00A188",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "4%",
		borderRadius: 20,
		marginTop: "5%",
	},
	orderButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
