import React, { useEffect, useState } from "react";
import {
	Modal,
	View,
	StyleSheet,
	Text,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { colors } from "../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const modalHeight = Dimensions.get("window").height * 0.1;

const RequestAddressModal = ({ visible, onClose }) => {
	const navigation = useNavigation();

	const handleContinue = () => {
		navigation.navigate("AddNewAddress");
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<View style={{ flex: 1, marginRight: "1%" }}>
						<Text style={styles.title}>Chưa có thông tin địa chỉ</Text>
						<Text style={styles.subtitle}>
							Thêm địa chỉ để bắt đầu mua hàng
						</Text>
					</View>

					<TouchableOpacity onPress={handleContinue}>
						<Ionicons name="chevron-forward" size={24} />
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default RequestAddressModal;

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		padding: "6%",
		justifyContent: "flex-end",
		backgroundColor: colors.green_10,
	},
	modalContent: {
		flexDirection: "row",
		backgroundColor: "white",
		borderRadius: 12,
		width: "100%",
		height: modalHeight,
		alignItems: "center",
		padding: "6%",
		elevation: 4,
		borderLeftWidth: 6,
		borderLeftColor: colors.gold,
		marginBottom: "6%",
	},
	main: {
		paddingHorizontal: "5%",
		marginBottom: "10%",
	},
	title: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "lato-bold",
		color: colors.black_100,
		textTransform: "uppercase",
	},
	subtitle: {
		fontSize: 14,
		lineHeight: 24,
		fontFamily: "lato-regular",
		color: colors.grey_100,
		marginTop: "1%",
	},
});
