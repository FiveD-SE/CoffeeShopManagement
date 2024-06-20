import { Image, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { MaterialIcons } from "@expo/vector-icons";
const ItemCard = ({ title, price, imageSource, OnPress }) => {
	return (
		<TouchableOpacity style={styles.container} onPress={OnPress}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={imageSource} resizeMode="cover" />
			</View>
			<View style={styles.main}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
			<MaterialIcons name="keyboard-arrow-right" size={30} color="rgba(58,58,58,0.5)" />
		</TouchableOpacity>
	);
};

export default ItemCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: "2%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#D8D8D8",
		padding: "2%",
		backgroundColor: "#FFFFFF",
	},
	imageContainer: {
		borderWidth: 1,
		borderColor: "#D8D8D8",
		borderRadius: 10,
		overflow: "hidden",
	},
	image: {
		width: "100%",
		height: 100,
		aspectRatio: 1,
	},
	main: {
		flex: 1,
		paddingHorizontal: "5%",
	},
	title: {
		width: "100%",
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 20,
		fontFamily:"lato-bold"
	},
	price: {
		marginTop: "5%",
		color: "rgba(58,58,58,0.5)",
		fontSize: 14,
		fontWeight: "500",
		fontFamily:"lato-regular"
	},
	addButton: {
		justifyContent: "center",
		alignItems: "center",
		padding: "2%",
		backgroundColor: "#00A188",
		borderRadius: 100,
	},
});
