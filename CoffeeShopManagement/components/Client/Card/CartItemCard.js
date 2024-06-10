import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

import Checkbox from "expo-checkbox";

import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../../assets/colors/colors";

const CartItemCard = ({
	id,
	name,
	price,
	imageSource,
	quantity,
	toppings,
	options,
	handleIncrease,
	handleDecrease,
	isChecked,
	onChecked,
}) => {
	return (
		<View style={styles.container}>
			<Checkbox
				style={styles.checkbox}
				value={isChecked}
				color={isChecked ? colors.grey_100 : undefined}
				onValueChange={onChecked}
			/>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: imageSource }}
					resizeMode="contain"
				/>
			</View>
			<View style={styles.main}>
				<Text style={styles.name}>{name}</Text>
				<Text style={[styles.subtitle, { fontSize: 16 }]}>{price}</Text>
				{toppings.length > 0 && (
					<Text style={styles.subtitle} numberOfLines={2}>
						{toppings}
					</Text>
				)}
				<Text style={styles.subtitle}>{options}</Text>
			</View>
			<View style={styles.adjustButtonContainer}>
				<Pressable style={styles.adjustButton} onPress={handleDecrease}>
					<Icon name="minus" color="#FFFFFF" size={14} />
				</Pressable>
				<Text style={styles.quantity}>{quantity}</Text>
				<Pressable style={styles.adjustButton} onPress={handleIncrease}>
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
		borderWidth: 1,
		borderColor: colors.grey_50,
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
		flex: 0.2,
	},
	image: {
		width: "100%",
		height: 50,
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
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "lato-regular",
	},
	adjustButtonContainer: {
		flex: 0.5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	adjustButton: {
		minWidth: 28,
		minHeight: 28,
		padding: "6%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.green_100,
		borderRadius: 4,
	},
	quantity: {
		flex: 1,
		textAlign: "center",
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-regular",
		marginHorizontal: "6%",
	},
	checkbox: {
		borderColor: colors.black_100,
		borderRadius: 4,
		marginRight: "5%",
	},
});
