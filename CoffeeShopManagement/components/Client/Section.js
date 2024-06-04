import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../assets/colors/colors";

const Section = ({
	title,
	showSubtitle,
	subtitle,
	children,
	onPressSubtitle,
}) => {
	return (
		<View style={styles.sectionContainer}>
			<View style={styles.headerContainer}>
				<Text style={styles.title}>{title}</Text>
				{showSubtitle && (
					<Pressable style={styles.subtitleContainer} onPress={onPressSubtitle}>
						<Text style={styles.subtitle}>{subtitle}</Text>
						<Ionicons
							name="chevron-forward"
							color={colors.green_100}
							size={12}
						/>
					</Pressable>
				)}
			</View>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		color: "#3a3a3a",
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	subtitleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	subtitle: {
		marginRight: "5%",
		color: colors.green_100,
		fontSize: 14,
		fontFamily: "lato-bold",
	},
});

export default Section;
