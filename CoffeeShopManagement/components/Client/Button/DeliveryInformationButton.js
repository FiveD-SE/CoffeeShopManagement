import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome6";

const DeliveryInformationButton = ({ title, details, onPress }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.details}>{details}</Text>
			</View>
			<Icon name="chevron-right" size={12} />
		</Pressable>
	);
};

export default DeliveryInformationButton;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: "4%",
		borderBottomWidth: 1,
		borderBottomColor: "rgba(58,58,58,0.1)",
	},
	contentContainer: {
		flex: 1,
		marginRight: "15%",
	},
	title: {
		color: "#3a3a3a",
		fontSize: 14,
		fontWeight: "700",
	},
	details: {
		color: "rgba(58, 58, 58, 0.50)",
		fontSize: 12,
		fontWeight: "400",
		lineHeight: 16,
		marginTop: "2%",
	},
});
