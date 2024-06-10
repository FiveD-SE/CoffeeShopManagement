import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../../assets/colors/colors";

const DeliveryInformationButton = ({ title, details, onPress }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.contentContainer}>
				<Text style={styles.title}>{title}</Text>
				{details && <Text style={styles.details}>{details}</Text>}
			</View>
			<Icon name="chevron-right" size={12} />
		</Pressable>
	);
};

export default DeliveryInformationButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white_100,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "4%",
		borderWidth: 1,
		borderColor: colors.grey_50,
		borderRadius: 8,
	},
	contentContainer: {
		flex: 1,
		marginRight: "5%",
	},
	title: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	details: {
		color: colors.grey_100,
		fontSize: 14,
		fontFamily: "lato-regular",
		lineHeight: 20,
		marginTop: "1%",
	},
});
