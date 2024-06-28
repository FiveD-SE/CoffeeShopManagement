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

const UserOrderCard = ({ orderId, status, total, date , onPress }) => {
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

	const formatCurrency = (amount) => {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
	};

	const formatDate = (date) => {
		const formatedDate = new Date(date.seconds * 1000).toLocaleDateString("en-US");
		return formatedDate;
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
					<Text style={styles.orderDate}>{formatDate(date)}</Text>
					<Text style={styles.orderTotalValue}>{formatCurrency(total)} <Text style={styles.currency}>VND</Text></Text>
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
		fontSize: 13,
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
		fontSize: 18,
	},
	orderTotalValue: {
		color: colors.black_100,
		fontFamily: "lato-bold",
		fontSize: 18,
		marginLeft: "4%",
	},
	currency: {
		color: colors.grey_100,
		fontFamily: "lato-bold",
		fontSize: 20,
	}
});

export default UserOrderCard;
