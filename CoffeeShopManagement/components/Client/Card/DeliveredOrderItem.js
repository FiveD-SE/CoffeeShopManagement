import React from "react";
import { Pressable, StyleSheet, Text, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const DeliveredOrderItem = ({ orderId, status, total, onPress }) => {
	let statusColor = "#3a3a3a";
	let statusIndicatorColor = "rgba(0, 0, 0, 0.1)";

	if (status === "Đang giao") {
		statusColor = "#FFA730";
		statusIndicatorColor = "rgba(255, 167, 48, 0.10)";
	} else if (status === "Đã giao") {
		statusColor = "#4ECB71";
		statusIndicatorColor = "rgba(78, 203, 113, 0.10)";
	} else if (status === "Đã huỷ") {
		statusColor = "#F61A3D";
		statusIndicatorColor = "rgba(246, 26, 61, 0.10)";
	}
	return (
		<Pressable style={styles.orderContainer} onPress={onPress}>
			<View style={styles.orderDetails}>
				<View style={styles.orderId}>
					<Text style={styles.orderIdText}>Mã đơn hàng:</Text>
					<Text style={styles.orderIdValue}>{orderId}</Text>
				</View>
				<View style={styles.orderStatus}>
					<Text style={styles.orderStatusText}>Trạng thái:</Text>
					<View
						style={[
							styles.statusIndicator,
							{ backgroundColor: statusIndicatorColor },
						]}
					>
						<Text style={[styles.statusText, { color: statusColor }]}>
							{status}
						</Text>
					</View>
				</View>
				<View style={styles.orderTotal}>
					<Text style={styles.orderTotalText}>Tổng tiền:</Text>
					<Text style={styles.orderTotalValue}>
						{total.toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
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
		padding: "5%",
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
		fontSize: 16,
		fontWeight: "500",
	},
	orderIdValue: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
		marginLeft: "2%",
	},
	orderStatus: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderStatusText: {
		color: "#3a3a3a",
		fontSize: 12,
		fontWeight: "600",
	},
	statusIndicator: {
		backgroundColor: "rgba(255, 167, 48, 0.10)",
		paddingVertical: "1%",
		paddingHorizontal: "4%",
		marginLeft: "2%",
		borderRadius: 30,
	},
	statusText: {
		color: "#FFA730",
		fontSize: 12,
		fontWeight: "500",
	},
	orderTotal: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderTotalText: {
		color: "#3a3a3a",
		fontSize: 12,
		fontWeight: "600",
	},
	orderTotalValue: {
		color: "#3a3a3a",
		fontSize: 12,
		fontWeight: "400",
		marginLeft: "5%",
	},
});

export default DeliveredOrderItem;
