import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import React from "react";

import { colors } from "../../assets/colors/colors";

const OrderCard1 = ({
	orderId,
	orderTime,
	orderOwner,
	orderState,
	handleDetailOrder,
	onLongPress,
}) => {
	const scaleValue = React.useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	const getTitleForState = (state) => {
		switch (state) {
			case 1:
				return "Chờ xác nhận";
			case 2:
				return "Đang thực hiện";
			case 3:
				return "Đang giao";
			case 4:
				return "Đã giao";
			case 5:
				return "Đã huỷ";
		}
	};

	return (
		<Pressable
			onPress={handleDetailOrder}
			onLongPress={onLongPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View
				style={[styles.orderDetail, { transform: [{ scale: scaleValue }] }]}
			>
				<Text style={styles.orderId}>
					Mã đơn hàng: #{orderId.substring(0, 5)}
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
					<Text style={styles.label}>Trạng thái đơn hàng: </Text>
					<Text style={styles.details}>{getTitleForState(orderState)}</Text>
				</View>
				{/* <View style={styles.textContainer}>
				<Text style={styles.label}>Trạng thái thanh toán: </Text>
				<Text style={styles.details}>{orderPaymentState}</Text>
			</View> */}
			</Animated.View>
		</Pressable>
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
		borderWidth: 2,
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
		fontFamily: "lato-regular",
	},
	details: {
		fontSize: 14,
		fontFamily: "lato-bold",
	},
});

export default OrderCard1;
