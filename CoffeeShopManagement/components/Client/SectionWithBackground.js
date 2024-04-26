import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SectionWithBackground = ({ title, children }) => {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.titleText}>{title}</Text>
			<View>{children}</View>
		</View>
	);
};

export default SectionWithBackground;

const styles = StyleSheet.create({
	sectionContainer: {
		backgroundColor: "#FFFFFF",
		padding: "5%",
		borderRadius: 20,
		marginTop: "5%",
	},
	titleText: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
	},
});
