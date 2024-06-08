import { StyleSheet, Text, Image, Pressable } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../../assets/colors/colors";

const COUPON_ICON = require("../../../assets/voucher.png");

const ApplyVoucherButton = ({ onPress }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Image source={COUPON_ICON} style={styles.image} />
			<Text style={styles.title}>Áp dụng ưu đãi</Text>
			<Icon name="chevron-right" style={styles.icon} size={16} />
		</Pressable>
	);
};

export default ApplyVoucherButton;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: colors.white_100,
		borderWidth: 1,
		borderRadius: 12,
		borderColor: colors.grey_50,
		justifyContent: "space-between",
		alignItems: "center",
		padding: "6%",
		shadowColor: colors.grey_100,
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 4,
	},
	image: {
		width: 24,
		height: 24,
	},
	title: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
	},
	icon: {
		alignSelf: "center",
	},
});
