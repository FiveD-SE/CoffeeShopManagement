import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserInfoRow = ({ label, value, highlight }) => (
	<View style={styles.userInfoRow}>
		<Text style={[highlight ? styles.titleText : styles.infoText]}>
			{label}:
		</Text>
		<Text
			style={[
				styles.infoText,
				styles.userInfoValue,
				highlight && styles.highlightedText,
			]}
		>
			{value}
		</Text>
	</View>
);

export default UserInfoRow;

const styles = StyleSheet.create({
	userInfoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "2%",
	},
	userInfoValue: {
		marginLeft: "2%",
	},
	titleText: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
	},
	infoText: {
		color: "rgba(58, 58, 58, 0.5)",
		fontSize: 16,
		fontWeight: "500",
	},
	highlightedText: {
		color: "#F61A3D",
	},
});
