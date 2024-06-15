import React from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";

const UserOrderCard = ({ orderId, status, total, onPress }) => {

	const setOrderStatus = (status) => {
		switch (status) {
			case 1:
				return "Chờ xác nhận";
			case 2:
				return "Đang thực hiện";
			case 3:
				return "Đang giao";
			case 4:
				return "Đã hoàn thành";
			case 5:
				return "Đã huỷ";
			default:
				return;
		}
	};


	const setOrderStatusIcon = (status) => {
		switch (status) {
			case 1:
				return "hourglass-start";
			case 2:
				return "pause-circle";
			case 3:
				return "shipping-fast";
			case 4:
				return "check-circle";
			case 5:
				return "times-circle";
			default:
				return "";
		}
	};

	const getStatusColors = (status) => {
		let backgroundColor, textColor;

		switch (status) {
			case 1:
				backgroundColor = '#C6EBC5';
				textColor = '#799351';
				break;
			case 2:
				backgroundColor = '#FFE8C5';
				textColor = '#A3A3A3';
				break;
			case 3:
				backgroundColor = '#B2EBF2';
				textColor = '#006989';
				break;
			case 4:
				backgroundColor = '#F9E8D9';
				textColor = '#EE7214';
				break;
			case 5:
				backgroundColor = '#FFCAC2';
				textColor = '#C81912';
				break;
			default:
				break;
		}

		return { backgroundColor, textColor };
	};

	const formatCurrency = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	const { backgroundColor, textColor } = getStatusColors(status);

	return (
		<Pressable style={styles.orderContainer} onPress={onPress}>
			<View style={styles.orderDetails}>
				<View style={styles.orderId}>
					<Text style={styles.orderIdText}>Mã đơn hàng:</Text>
					<Text style={styles.orderIdValue}>#{(orderId.substring(0, 6)).toUpperCase()}</Text>
				</View>
				<View style={styles.orderStatus}>
					<Text style={styles.orderStatusText}>Trạng thái:</Text>
					<View
						style={[
							styles.statusIndicator,
							{ backgroundColor: backgroundColor },
						]}
					>
						<FontAwesome5 name={setOrderStatusIcon(status)} size={20} color={textColor} />
						<Text style={[styles.statusText, { color: textColor }]}>  {setOrderStatus(status)}</Text>
					</View>
				</View>
				<View style={styles.orderTotal}>
					<Text style={styles.orderTotalText}>Tổng tiền:</Text>
					<Text style={styles.orderTotalValue}>
						{formatCurrency(total)} VND
					</Text>
				</View>
			</View>
			<Icon name="chevron-right" size={18} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	orderContainer: {
		backgroundColor: "#FFFFFF",
		paddingVertical: "3%",
		paddingHorizontal: "5%",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "5%",
		...Platform.select({
			ios: {
				shadowColor: "#3a3a3a",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.1,
				shadowRadius: 2,
			},
			android: {
				elevation: 2,
			},
		}),
	},
	orderDetails: {
		flex: 1,
	},
	orderId: {
		flexDirection: "row",
		alignItems: "center",
	},
	orderIdText: {
		color: "#3a3a3a",
		fontFamily: "lato-bold",
		fontSize: 18,
	},
	orderIdValue: {
		color: "#3a3a3a",
		fontFamily: "lato-bold",
		fontSize: 18,
		marginLeft: "2%",
	},
	orderStatus: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderStatusText: {
		color: "#3a3a3a",
		fontFamily: "lato-bold",
		fontSize: 18,
	},
	statusIndicator: {
		paddingVertical: "1%",
		paddingHorizontal: "4%",
		marginLeft: "2%",
		borderRadius: 30,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	statusText: {
		color: "#FFA730",
		fontFamily: "lato-regular",
		fontSize: 18,
	},
	orderTotal: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderTotalText: {
		color: "#3a3a3a",
		fontFamily: "lato-bold",
		fontSize: 18,
	},
	orderTotalValue: {
		color: "#3a3a3a",
		fontFamily: "lato-bold",
		fontSize: 18,
		marginLeft: "5%",
	},
});

export default UserOrderCard;
