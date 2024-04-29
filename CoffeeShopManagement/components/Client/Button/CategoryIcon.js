import { StyleSheet, Pressable, Image } from "react-native";
import React from "react";

const CategoryIcon = ({ iconSource, size }) => {
	return (
		<Pressable style={[styles.iconButton, { width: size, height: size }]}>
			<Image source={iconSource} style={styles.icon} />
		</Pressable>
	);
};

export default CategoryIcon;

const styles = StyleSheet.create({
	iconButton: {
		padding: "3%",
		borderRadius: 30,
		borderWidth: 1,
		borderColor: "rgba(58,58,58,0.2)",
	},
	icon: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
});
