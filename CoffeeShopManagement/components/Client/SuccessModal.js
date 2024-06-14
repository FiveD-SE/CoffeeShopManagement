import React, { useState } from "react";
import {
	Modal,
	View,
	StyleSheet,
	ScrollView,
	Pressable,
	Text,
	Platform,
	Dimensions,
} from "react-native";
import { colors } from "../../assets/colors/colors";
import LottieView from "lottie-react-native";
import CustomButton from "./Button/CustomButton";
import { CommonActions, useNavigation } from "@react-navigation/native";

const modalHeight = Dimensions.get("window").height * 0.45;

const SuccessModal = ({ visible, onClose }) => {
	const navigation = useNavigation();

	const handleConfirm = () => {
		navigation.dispatch(
			CommonActions.reset({
				index: 0,
				routes: [{ name: "Trang chủ" }],
			})
		);
		onClose();
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
					<View style={{ flex: 1, alignItems: "center" }}>
						<LottieView
							style={{
								width: 150,
								height: 150,
							}}
							source={require("../../assets/success.json")}
							autoPlay
						/>
						<Text style={styles.title}>Thành công</Text>
						<Text style={styles.subtitle}>
							Đơn hàng của bạn đang chờ xác nhận
						</Text>
					</View>
					<CustomButton
						text={"Tiếp tục mua hàng"}
						arrow={true}
						onPress={handleConfirm}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default SuccessModal;

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.black_100,
		padding: "6%",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 12,
		width: "100%",
		height: modalHeight,
		alignItems: "center",
		padding: "6%",
	},
	main: {
		paddingHorizontal: "5%",
		marginBottom: "10%",
	},
	title: {
		fontSize: 24,
		fontFamily: "lato-bold",
		color: colors.black_100,
		marginTop: "4%",
		textTransform: "uppercase",
	},
	subtitle: {
		fontSize: 16,
		fontFamily: "lato-regular",
		color: colors.grey_100,
		marginTop: "2%",
	},
});
