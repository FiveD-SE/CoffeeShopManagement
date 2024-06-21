import React, { useState } from "react";
import {
	Modal,
	View,
	StyleSheet,
	Animated,
	Pressable,
	Text,
	Dimensions,
} from "react-native";
import { colors } from "../../assets/colors/colors";
import LottieView from "lottie-react-native";
import CustomButton from "./Button/CustomButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const modalHeight = Dimensions.get("window").height * 0.4;

const SuccessModal = ({ visible, onClose }) => {
	const scaleValue = React.useRef(new Animated.Value(1)).current;
	const scaleTextValue = React.useRef(new Animated.Value(1)).current;
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

	const handleViewOrder = () => {
		navigation.navigate("UserOrderScreen");

		onClose();
	};

	const handlePressIn = () => {
		Animated.spring(scaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	const handleTextPressIn = () => {
		Animated.spring(scaleTextValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handleTextPressOut = () => {
		Animated.spring(scaleTextValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
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
								width: 100,
								height: 100,
							}}
							source={require("../../assets/success.json")}
							autoPlay
						/>
						<Text style={styles.title}>Thành công</Text>
						<Text style={styles.subtitle}>
							Đơn hàng của bạn đang chờ xác nhận
						</Text>
					</View>
					<Pressable
						style={{ width: "100%" }}
						onPress={handleConfirm}
						onPressIn={handlePressIn}
						onPressOut={handlePressOut}
					>
						<Animated.View
							style={[
								styles.confirmButton,
								{
									transform: [{ scale: scaleValue }],
								},
							]}
						>
							<Text style={styles.confirmButtonText}>Tiếp tục mua hàng</Text>
						</Animated.View>
					</Pressable>
					<Pressable
						style={{ width: "100%" }}
						onPress={handleViewOrder}
						onPressIn={handleTextPressIn}
						onPressOut={handleTextPressOut}
					>
						<Animated.View
							style={[
								styles.viewOrderButton,
								{
									transform: [{ scale: scaleTextValue }],
								},
							]}
						>
							<Text style={styles.viewOrderButtonText}>Xem lại đơn hàng</Text>
							<Ionicons
								name="arrow-forward"
								size={14}
								color={colors.grey_100}
							/>
						</Animated.View>
					</Pressable>
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
		padding: "10%",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 12,
		width: "100%",
		height: modalHeight,
		alignItems: "center",
		padding: "4%",
	},
	main: {
		paddingHorizontal: "5%",
		marginBottom: "10%",
	},
	title: {
		fontSize: 20,
		fontFamily: "lato-bold",
		color: colors.black_100,
		marginTop: "4%",
		textTransform: "uppercase",
	},
	subtitle: {
		fontSize: 14,
		fontFamily: "lato-regular",
		color: colors.grey_100,
		marginTop: "1%",
	},
	confirmButton: {
		backgroundColor: colors.green_100,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 8,
		marginTop: "5%",
		paddingVertical: "4%",
		elevation: 2,
		shadowColor: colors.black_100,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowRadius: 10,
		shadowOpacity: 0.3,
	},
	confirmButtonText: {
		color: colors.white_100,
		fontFamily: "lato-bold",
		fontSize: 14,
		lineHeight: 24,
		marginRight: "2%",
	},
	viewOrderButton: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 8,
		marginTop: "2%",
		paddingVertical: "2%",
	},
	viewOrderButtonText: {
		color: colors.grey_100,
		fontFamily: "lato-bold",
		fontSize: 14,
		lineHeight: 24,
		marginRight: "2%",
	},
});
