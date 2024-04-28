import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const RecentItemCard = ({ title, price, imageSource, onPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={imageSource} resizeMode="cover" />
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{title}
				</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
			<Pressable style={styles.addButton} onPress={onPress}>
				<Text style={styles.textAddButton}>Chọn</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		maxWidth: 110,
		maxHeight: 200,
		flex: 1,
		flexDirection: "column",
		marginRight: "2%",
	},
	imageContainer: {
		aspectRatio: 1,
		borderRadius: 10,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: "100%",
	},
	textContainer: {
		width: "100%",
		marginTop: "5%",
	},
	title: {
		width: "100%",
		fontSize: 14,
		fontWeight: "500",
		color: "#3a3a3a",
	},
	price: {
		marginTop: "5%",
		fontSize: 12,
		fontWeight: "500",
		color: "rgba(58,58,58,0.5)",
	},
	addButton: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%",
		paddingVertical: "5%",
		borderRadius: 10,
		backgroundColor: "rgba(0, 161, 136, 0.1)",
	},
	textAddButton: {
		color: "#00A188",
		fontSize: 12,
		fontWeight: "600",
	},
});

export default RecentItemCard;
