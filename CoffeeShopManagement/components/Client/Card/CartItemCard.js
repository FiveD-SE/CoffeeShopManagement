import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../../assets/colors/colors";

const CartItemCard = ({
	id,
	name,
	price,
	imageSource,
	quantity,
	options,
	onQuantityChange,
}) => {
	const handleIncrement = () => {
		onQuantityChange(quantity + 1);
	};

	const handleDecrement = () => {
		onQuantityChange(quantity - 1);
	};

	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: imageSource }}
					resizeMode="cover"
				/>
			</View>
			<View style={styles.main}>
				<Text style={styles.name}>{name}</Text>
				<Text style={styles.subtitle}>{price}</Text>
				<Text style={styles.subtitle}>{options}</Text>
			</View>
			<View style={styles.adjustButtonContainer}>
				<Pressable style={styles.adjustButton} onPress={handleDecrement}>
					<Icon name="minus" color="#FFFFFF" size={14} />
				</Pressable>
				<Text style={styles.quantity}>{quantity}</Text>
				<Pressable style={styles.adjustButton} onPress={handleIncrement}>
					<Icon name="plus" color="#FFFFFF" size={14} />
				</Pressable>
			</View>
		</View>
	);
};

export default CartItemCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white_100,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: "2%",
		padding: "4%",
		borderRadius: 12,
		shadowColor: colors.grey_100,
		shadowOffset: {
			width: -5,
			height: 10,
		},
		shadowOpacity: 0.2,
		shadowRadius: 10,
		elevation: 2,
	},
	imageContainer: {
		flex: 0.5,
	},
	image: {
		width: "100%",
		height: 80,
		borderRadius: 10,
	},
	main: {
		flex: 1,
		paddingHorizontal: "5%",
	},
	name: {
		width: "100%",
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
		lineHeight: 20,
	},
	subtitle: {
		marginTop: "5%",
		color: colors.grey_100,
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "lato-regular",
	},
	adjustButtonContainer: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	adjustButton: {
		padding: "6%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.green_100,
		borderRadius: 100,
	},
	quantity: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
});
