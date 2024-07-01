import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"; // Import các thành phần cần thiết từ react-native
import Icon from "react-native-vector-icons/Entypo";
import { colors } from "../../assets/colors/colors";

const StaffCard = ({
	cashierName,
	cashierPhone,
	cashierImage,
	role,
	onPress,
}) => {
	const formatPhoneNumber = (phoneNumber) => {
		if (phoneNumber.startsWith("0")) {
			phoneNumber = phoneNumber.substring(1);
		}
		return phoneNumber.replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles.staffItem}
			activeOpacity={0.8}
		>
			<View style={{ flexDirection: "row" }}>
				<Image
					style={{
						width: 80,
						height: 80,
						borderRadius: 10,
					}}
					source={{ uri: cashierImage }}
				/>
				<View
					style={{
						marginStart: "5%",
						justifyContent: "space-between",
					}}
				>
					<Text style={{ fontSize: 16, fontWeight: "600" }}>{cashierName}</Text>
					<Text style={{ fontSize: 14, color: "#808080" }}>
						{formatPhoneNumber(cashierPhone)}
					</Text>
					<Text style={styles.role}>{role}</Text>
				</View>
			</View>
			<Icon name="chevron-right" size={24} />
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	staffItem: {
		backgroundColor: colors.white_100,
		padding: "4%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 16,
		marginBottom: "4%",
		elevation: 2,
	},
	role: {
		color: colors.green_100,
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "lato-bold",
	},
});

export default StaffCard;
