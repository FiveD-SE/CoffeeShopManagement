import { Pressable } from "react-native";
import React from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";

export default HeaderBackButton = ({ isBackToHome, isBackToPlaceOrder }) => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		if (isBackToPlaceOrder) {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "Đặt hàng" }],
				})
			);
		} else if (isBackToHome) {
			navigation.dispatch(
				CommonActions.reset({
					index: 0,
					routes: [{ name: "Trang chủ" }],
				})
			);
		} else {
			navigation.goBack();
		}
	};

	return (
		<Pressable
			hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
			onPress={handleGoBack}
		>
			<Icon name="chevron-left" size={16} />
		</Pressable>
	);
};
