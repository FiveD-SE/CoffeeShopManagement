import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const BestSellerItem = ({
	title,
	price,
	imageSource,
	description,
	onPress,
	vertical,
	horizontal,
}) => {
	return (
		<View
			style={[
				styles.container,
				{ marginTop: vertical ? "5%" : "0%" },
				{ marginRight: horizontal ? "2%" : "0%" },
				{ padding: vertical ? "2%" : "0%" },
			]}
		>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={imageSource} resizeMode="cover" />
			</View>
			<View style={styles.main}>
				<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
					{title}
				</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
			<Pressable style={styles.addButton} onPress={onPress}>
				<Text style={styles.addButtonText}>Chọn</Text>
			</Pressable>
		</View>
	);
};

export default BestSellerItem;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		maxWidth: 200,
	},
	imageContainer: {
		borderRadius: 10,
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
		marginTop: "5%",
	},
	title: {
		width: "100%",
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 20,
	},
	price: {
		marginTop: "5%",
		color: "rgba(58,58,58,0.5)",
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
