import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../assets/colors/colors";
const UserVoucherCard = ({
	title,
	quantity,
	expiryDate,
	imageSource,
	onPress,
}) => {
	return (
		<Pressable style={styles.item} onPress={onPress}>
			<Image source={{ uri: imageSource }} style={styles.itemImage} />
			<View style={styles.itemDetails}>
				<Text style={styles.itemTitle}>{title}</Text>
				<Text style={styles.itemQuantity}>Số lượng: {quantity}</Text>
				<Text style={styles.itemExpiry}>Hết hạn: {expiryDate}</Text>
			</View>
		</Pressable>
	);
};

export default UserVoucherCard;

const styles = StyleSheet.create({
	item: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: "4%",
		backgroundColor: colors.white_100,
		padding: "4%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.grey_50,
	},
	itemImage: {
		width: 80,
		height: 80,
		marginRight: "4%",
	},
	itemDetails: {
		flexDirection: "column",
	},
	itemTitle: {
		flex: 1,
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
	itemQuantity: {
		flex: 1,
		color: colors.grey_100,
		fontFamily: "lato-regular",
		fontSize: 14,
	},
	itemExpiry: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
});
