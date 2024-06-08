import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../assets/colors/colors";
const UserVoucherCard = ({ title, expiryDate, imageSource, onPress }) => {
	return (
		<Pressable style={styles.item} onPress={onPress}>
			<Image source={imageSource} style={styles.itemImage} />
			<View style={styles.itemDetails}>
				<Text style={styles.itemTitle}>{title}</Text>
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
		fontFamily: "lato-regular",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 25,
	},
	itemExpiry: {
		fontFamily: "lato-regular",
		fontSize: 14,
	},
});
