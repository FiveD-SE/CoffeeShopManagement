import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const RecentlyViewedItem = ({ title, price, imageSource, onPress }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={imageSource} resizeMode="cover" />
			</View>
			<View style={styles.main}>
				<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
					{title}
				</Text>
				<View style={styles.priceContainer}>
					<Text style={styles.price}>{price}</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default RecentlyViewedItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		maxWidth: 150,
		marginRight: "2%",
		borderWidth: 0.5,
		borderRadius: 10,
		borderColor: "rgba(58,58,58,0.2)",
		backgroundColor: "#FFFFFF",
	},
	imageContainer: {
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		overflow: "hidden",
		maxHeight: 120,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	main: {
		flex: 1,
		flexDirection: "column",
		padding: "5%",
		justifyContent: "space-between",
	},
	title: {
		width: "100%",
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 20,
	},
	priceContainer: {
		backgroundColor: "rgba(255, 232, 210, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "10%",
		paddingVertical: "3%",
		borderRadius: 20,
	},
	price: {
		color: "#C25452",
		fontSize: 14,
		fontWeight: "500",
	},
	addButton: {
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "4%",
		paddingHorizontal: "6%",
		marginTop: "8%",
		backgroundColor: "#FFE8D2",
		borderRadius: 5,
	},
	addButtonText: {
		color: "#FFA730",
		fontSize: 12,
		fontWeight: "600",
	},
});
