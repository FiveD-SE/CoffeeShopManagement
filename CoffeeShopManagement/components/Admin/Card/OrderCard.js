import React from "react";
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Platform,
	TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const OrderCard = ({ orderId, status, total, date }) => {
	const setOrderStatus = (status) => {
		switch (status) {
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
			case 6:
				return "Đã nhận hàng";
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
			case 6:
				return "money-bill-alt";
			default:
				return "";
		}
	};

	const getStatusColors = (status) => {
		let backgroundColor, textColor;

		switch (status) {
			case 1:
				backgroundColor = "#FFF9D0";
				textColor = "#FFC100";
				break;
			case 2:
				backgroundColor = "#FFE8C5";
				textColor = "#A3A3A3";
				break;
			case 3:
				backgroundColor = "#B2EBF2";
				textColor = "#006989";
				break;
			case 4:
				backgroundColor = "#F9E8D9";
				textColor = "#EE7214";
				break;
			case 5:
				backgroundColor = "#FFCAC2";
				textColor = "#C81912";
				break;
			case 6:
				backgroundColor = "#D9F8C4";
				textColor = "#3EC70B";
				break;
			default:
				break;
		}

		return { backgroundColor, textColor };
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const formatDate = (date) => {
		const formatedDate = new Date(date.seconds * 1000).toLocaleDateString(
			"vi-VN"
		);
		return formatedDate;
	};

	const { backgroundColor, textColor } = getStatusColors(status);

	return (
		<View style={styles.orderContainer}>
			<View style={styles.orderDetails}>
				<View style={styles.orderId}>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<Text style={styles.orderIdText}>Đơn hàng:</Text>
						<Text style={styles.orderIdValue}>
							#{orderId.substring(0, 6).toUpperCase()}
						</Text>
					</View>
					<View
						style={[
							styles.statusIndicator,
							{ backgroundColor: backgroundColor },
						]}
					>
						<FontAwesome5
							name={setOrderStatusIcon(status)}
							size={14}
							color={textColor}
						/>
						<Text style={[styles.statusText, { color: textColor }]}>
							{" "}
							{setOrderStatus(status)}
						</Text>
					</View>
				</View>

				<View style={styles.orderTotal}>
					<Text style={styles.orderDate}>{formatDate(date)}</Text>
					<Text style={styles.orderTotalValue}>{formatCurrency(total)} </Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	orderContainer: {
		backgroundColor: "#FFFFFF",
		padding: "6%",
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "4%",
		elevation: 2,
	},
	orderDetails: {
		flex: 1,
	},
	orderId: {
		flexDirection: "row",
		alignItems: "center",
	},
	orderIdText: {
		color: colors.black_100,
		fontFamily: "lato-bold",
		fontSize: 16,
	},
	orderIdValue: {
		color: colors.black_100,
		fontFamily: "lato-bold",
		fontSize: 16,
		marginLeft: "4%",
	},
	orderStatus: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderStatusText: {
		color: colors.black_100,
		fontFamily: "lato-bold",
		fontSize: 16,
	},
	statusIndicator: {
		paddingVertical: "1%",
		paddingHorizontal: "4%",
		borderRadius: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	statusText: {
		color: "#FFA730",
		fontFamily: "lato-bold",
		fontSize: 12,
		marginLeft: "2%",
	},
	orderTotal: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: "5%",
	},
	orderDate: {
		color: colors.grey_100,
		fontFamily: "lato-bold",
		fontSize: 16,
	},
	orderTotalValue: {
		color: colors.black_100,
		fontFamily: "lato-bold",
		fontSize: 16,
		marginLeft: "4%",
	},
	currency: {
		color: colors.grey_100,
		fontFamily: "lato-bold",
		fontSize: 20,
	},
});

export default OrderCard;