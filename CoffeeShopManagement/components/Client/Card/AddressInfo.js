import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const AddressInfo = ({
	name,
	phoneNumber,
	address,
	isDefault,
	onSetDefaultAddress,
	onChangeAddress,
	onPress,
}) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<View style={{ flex: 1, flexDirection: "column" }}>
				<View style={styles.header}>
					<View style={styles.profileInfoContainer}>
						<Text style={styles.profileInfo}>{name}</Text>
						<Text style={styles.divider}>|</Text>
						<Text style={[styles.profileInfo, { letterSpacing: 1 }]}>
							{phoneNumber}
						</Text>
					</View>
				</View>
				<View style={styles.addressInfoContainer}>
					<Text style={styles.addressInfo}>{address}</Text>
				</View>
				{isDefault ? (
					<Pressable style={styles.defaultButton}>
						<Text style={styles.defaultText}>Mặc định</Text>
					</Pressable>
				) : (
					<Pressable
						style={styles.setDefaultButton}
						onPress={onSetDefaultAddress}
					>
						<Text style={styles.setDefaultText}>Đặt làm mặc định</Text>
					</Pressable>
				)}
			</View>
			<Pressable onPress={onChangeAddress}>
				<FontAwesome5 name="edit" size={20} style={styles.editIcon} />
			</Pressable>
		</Pressable>
	);
};

export default AddressInfo;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginBottom: "5%",
		borderRadius: 10,
		borderColor: "#CCCCCC",
		borderWidth: 1,
		padding: "5%",
		backgroundColor: colors.white_100,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	profileInfoContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	profileInfo: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-bold",
	},
	divider: {
		color: colors.grey_100,
		opacity: 0.5,
		marginHorizontal: "2%",
	},
	addressInfoContainer: {
		marginTop: "2%",
	},
	addressInfo: {
		color: colors.black_100,
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "lato-regular",
	},
	defaultButton: {
		backgroundColor: colors.green_100,
		padding: "2%",
		alignSelf: "flex-start",
		borderRadius: 5,
		marginTop: "4%",
		alignItems: "center",
	},
	defaultText: {
		color: colors.white_100,
		fontSize: 12,
		fontFamily: "lato-regular",
	},
	setDefaultButton: {
		backgroundColor: colors.white_100,
		borderColor: colors.black_100,
		borderWidth: 1,
		padding: "2%",
		alignSelf: "flex-start",
		borderRadius: 5,
		marginTop: "4%",
		alignItems: "center",
	},
	setDefaultText: {
		color: colors.black_100,
		fontSize: 12,
		fontFamily: "lato-regular",
	},
	editIcon: {
		color: colors.green_100,
	},
});
