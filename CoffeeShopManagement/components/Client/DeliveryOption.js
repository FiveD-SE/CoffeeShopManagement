import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../assets/colors/colors";

const DeliveryOption = ({ title, iconName, onPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.contentContainer}>
				<Icon name={iconName} size={24} />
				<Text style={styles.title}>{title}</Text>
			</View>
			<Pressable style={styles.buttonContainer} onPress={onPress}>
				<Text style={styles.buttonText}>Chọn</Text>
			</Pressable>
		</View>
	);
};

export default DeliveryOption;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white_100,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "6%",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: colors.grey_50,
	},
	contentContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	title: {
		marginLeft: "10%",
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	buttonContainer: {
		backgroundColor: colors.green_100,
		paddingHorizontal: "4%",
		paddingVertical: "2%",
		borderRadius: 30,
		borderWidth: 1,
		borderColor: colors.grey_50,
		elevation: 2,
	},
	buttonText: {
		color: colors.white_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
});
