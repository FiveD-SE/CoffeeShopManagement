import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/MaterialIcons";

const DeliveryOption = ({ title, iconName, onPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Icon name={iconName} size={24} />
				<Text style={styles.title}>{title}</Text>
			</View>
			<Pressable style={styles.buttonContainer} onPress={onPress}>
				<Text style={styles.buttonText}>Chọn địa chỉ</Text>
			</Pressable>
		</View>
	);
};

export default DeliveryOption;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "5%",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(58,58,58,0.1)",
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		marginLeft: "10%",
		fontSize: 16,
		fontWeight: "600",
	},
	buttonContainer: {
		backgroundColor: "#00A188",
		paddingHorizontal: "4%",
		paddingVertical: "2%",
		borderRadius: 30,
		borderWidth: 1,
		borderColor: "rgba(58,58,58,0.2)",
	},
	buttonText: {
		fontSize: 12,
		fontWeight: "700",
		color: "#FFFFFF",
	},
});
