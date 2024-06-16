import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

import { colors } from "../../assets/colors/colors";

const OrderCard1 = ({
	orderId,
	orderTime,
	orderType,
	orderOwner,
	orderState,
	orderPaymentState,
	handleDetailOrder,
}) => {
	const getColorForState = (state) => {
		switch (state) {
			case "Đã hoàn thành":
				return "#4ecb71";
			case "Chờ xác nhận":
				return "#FFA730";
			case "Đang làm":
				return "#f61a3d";
			default:
				return "#FFA730"; // Màu mặc định
		}
	};

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={handleDetailOrder}
			style={styles.orderDetail}
		>
			<Text style={styles.orderId}>
				Mã đơn hàng: FiveD-{orderId.substring(0, 5)}
			</Text>
			<View style={styles.textContainer}>
				<Text style={styles.label}>Đã đặt vào: </Text>
				<Text style={[styles.details, { color: colors.bronze }]}>
					{orderTime}
				</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.label}>Khách hàng: </Text>
				<Text style={styles.details}>{orderOwner}</Text>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.label}>Trạng thái thanh toán: </Text>
				<Text style={styles.details}>{orderPaymentState}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	orderDetail: {
		borderRadius: 20,
		padding: "4%",
		flexDirection: "column",
		justifyContent: "space-between",
		backgroundColor: colors.white_100,
		marginBottom: "4%",
		borderWidth: 1,
		borderColor: colors.grey_50,
		elevation: 2,
	},
	orderId: {
		color: colors.green_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	textContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: "2%",
	},
	label: {
		flex: 1,
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-bold",
	},
	details: {
		fontSize: 14,
		fontFamily: "lato-regular",
	},
});

export default OrderCard1;
