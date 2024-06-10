import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const SelectCouponCard = ({
	title,
	quantity,
	expireDate,
	imageSource,
	isChecked,
	onPress,
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.container,
				{ backgroundColor: isChecked ? "rgba(0, 108, 94, 0.05)" : "#FFFFFF" },
			]}
		>
			<View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
				<Image source={{ uri: imageSource }} style={styles.image} />
				<View style={styles.contentContainer}>
					<Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
						{title}
					</Text>
					<Text style={styles.quantity}>Số lượng: {quantity}</Text>
					<Text style={styles.expireDate}>Hết hạn: {expireDate}</Text>
				</View>
			</View>
			<View>
				<MaterialIcons
					name={isChecked ? "radio-button-checked" : "radio-button-unchecked"}
					size={24}
					color={isChecked ? "#006C5E" : "#3a3a3a"}
				/>
			</View>
		</Pressable>
	);
};

export default SelectCouponCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderWidth: 1,
		borderColor: colors.grey_50,
		borderRadius: 10,
		padding: "4%",
		alignItems: "center",
		marginVertical: "1%",
	},
	contentContainer: {
		flex: 1,
		marginLeft: "2%",
		marginRight: "2%",
	},
	image: {
		width: 80,
		height: 80,
		marginRight: "4%",
	},
	title: {
		flex: 1,
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
	quantity: {
		flex: 1,
		color: colors.grey_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
	expireDate: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
});
