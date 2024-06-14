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

const UserOrderCard = ({ orderId, status, total, onPress }) => {
	const setOrderStatusIcon = (status) => {
		switch (status) {
			case 1:
				return "hourglass";
			case 2:
				return "compass";
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
				backgroundColor = colors.grey_20;
				textColor = colors.grey_100;
				break;
			case 2:
				backgroundColor = "#F0F0F9";
				textColor = "#8080AB";
				break;
			case 3:
				backgroundColor = colors.yellow_20;
				textColor = "#EE7214";
				break;
			case 4:
				backgroundColor = colors.green_20;
				textColor = colors.green_100;
				break;
			case 5:
				backgroundColor = "#FFE4E5";
				textColor = colors.error;
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

	const { backgroundColor, textColor } = getStatusColors(status);

	return (
		<TouchableOpacity
			style={styles.orderContainer}
			onPress={onPress}
			activeOpacity={0.9}
		>
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
					<Text style={styles.orderTotalText}>Tổng tiền:</Text>
					<Text style={styles.orderTotalValue}>{formatCurrency(total)}</Text>
				</View>
			</View>
			<Icon name="chevron-right" size={14} color={colors.grey_100} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	orderContainer: {
		backgroundColor: "#FFFFFF",
		padding: "4%",
		borderRadius: 16,
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "4%",
		...Platform.select({
			ios: {
				shadowColor: colors.black_100,
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
		marginRight: "4%",
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
		fontFamily: "lato-regular",
		fontSize: 12,
		marginLeft: "2%",
	},
	orderTotal: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderTotalText: {
		color: colors.grey_100,
		fontFamily: "lato-bold",
		fontSize: 14,
	},
	orderTotalValue: {
		color: colors.black_100,
		fontFamily: "lato-bold",
		fontSize: 14,
		marginLeft: "4%",
	},
});

export default UserOrderCard;
