import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../assets/colors/colors";

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
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
	infoText: {
		color: colors.grey_100,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
	highlightedText: {
		color: colors.error,
	},
});
