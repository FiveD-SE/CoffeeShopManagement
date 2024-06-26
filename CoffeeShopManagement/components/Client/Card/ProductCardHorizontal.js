import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
	Dimensions,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";

const cardHeight = Dimensions.get("window").height / 7;

const ProductCardHorizontal = ({ id, name, price, imageSource, onPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: imageSource }}
					resizeMode="stretch"
				/>
			</View>
			<View style={styles.main}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
			<Pressable style={styles.addButton} onPress={onPress}>
				<Icon name="plus" color="#FFFFFF" size={14} />
			</Pressable>
		</View>
	);
};

export default ProductCardHorizontal;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: "2%",
	},
	imageContainer: {
		flex: 0.7,
	},
	image: {
		width: "100%",
		height: cardHeight,
		borderRadius: 10,
	},
	main: {
		flex: 1,
		paddingHorizontal: "5%",
	},
	name: {
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
		padding: "2%",
		backgroundColor: "#00A188",
		borderRadius: 100,
	},
});
