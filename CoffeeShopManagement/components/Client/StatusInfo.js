import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatusInfo = ({ label, isPaid }) => {
	const paidColor = "#4ECB71";
	const unpaidColor = "#F61A3D";

	const textColor = isPaid ? paidColor : unpaidColor;
	const value = isPaid ? "Đã thanh toán" : "Chưa thanh toán";

	return (
		<View style={styles.container}>
			<Text style={styles.labelText}>{label}:</Text>
			<Text style={[styles.statusText, { color: textColor }]}>{value}</Text>
		</View>
	);
};

export default StatusInfo;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "2%",
	},
	labelText: {
		fontSize: 16,
		fontWeight: "500",
	},
	statusText: {
		marginLeft: "2%",
		fontSize: 16,
		fontWeight: "600",
	},
});
