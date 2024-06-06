import {
	StyleSheet,
	Text,
	View,
	Image,
	Pressable,
	Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { colors } from "../../../assets/colors/colors";

const COFFEE_BEAN_ICONS = require("../../../assets/coffee-bean.png");

const UserHomeScreenHeader = ({
	username,
	totalPoint,
	onPressBean,
	onPressNotify,
	onPressFavorite,
}) => {
	return (
		<View style={styles.header}>
			<View style={styles.headerLeft}>
				<View>
					<Text style={styles.welcomeText}>Xin chào,</Text>
					<Text style={styles.usernameText}>{username}</Text>
				</View>
			</View>
			<View style={styles.headerRight}>
				<Pressable style={styles.iconContainer} onPress={onPressBean}>
					<Image source={COFFEE_BEAN_ICONS} style={styles.icon} />
					<Text style={styles.iconText}>{totalPoint}</Text>
				</Pressable>
				<Pressable style={styles.iconContainer} onPress={onPressNotify}>
					<Ionicons name="notifications-outline" size={20} />
				</Pressable>
				<Pressable style={styles.iconContainer} onPress={onPressFavorite}>
					<Ionicons name="heart-outline" size={20} />
				</Pressable>
			</View>
		</View>
	);
};

export default UserHomeScreenHeader;

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		marginTop: Platform.select({
			android: "10%",
		}),
	},
	headerLeft: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	headerRight: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	imageContainer: {
		width: 48,
		height: 48,
		justifyContent: "center",
		alignItems: "center",
		marginRight: "10%",
		borderRadius: 30,
	},
	userImage: {
		width: "100%",
		height: "100%",
	},
	welcomeText: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
	usernameText: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	iconContainer: {
		minWidth: 48,
		minHeight: 48,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		margin: "2%",
		padding: "6%",
		borderWidth: 1,
		borderRadius: 30,
		borderColor: colors.grey_50,
		backgroundColor: colors.white_100,
		shadowColor: colors.grey_100,
		elevation: 4,
	},
	icon: {
		marginRight: "5%",
	},
	iconText: {
		color: colors.black_100,
		fontSize: 14,
		fontWeight: "600",
	},
});
