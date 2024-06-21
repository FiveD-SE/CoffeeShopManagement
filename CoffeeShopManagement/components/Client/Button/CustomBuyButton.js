import { StyleSheet, Text, Pressable, Animated } from "react-native";
import React from "react";

import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../../assets/colors/colors";

const CustomBuyButton = ({ totalPrice, onPress }) => {
	const buyButtonScaleValue = React.useRef(new Animated.Value(1)).current;

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const handleBuyPressIn = () => {
		Animated.spring(buyButtonScaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handleBuyPressOut = () => {
		Animated.spring(buyButtonScaleValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Pressable
			style={{ width: "100%" }}
			onPress={onPress}
			onPressIn={handleBuyPressIn}
			onPressOut={handleBuyPressOut}
		>
			<Animated.View
				style={[
					styles.buyButton,
					{
						transform: [{ scale: buyButtonScaleValue }],
					},
				]}
			>
				<Text style={styles.buyButtonText}>Mua hàng</Text>
				<Icon name="ellipsis-vertical" color="#FFFFFF" size={16} />
				<Text style={styles.buyButtonText}>{formatCurrency(totalPrice)}</Text>
			</Animated.View>
		</Pressable>
	);
};

export default CustomBuyButton;

const styles = StyleSheet.create({
	buyButton: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: colors.green_100,
		justifyContent: "space-evenly",
		alignItems: "center",
		marginBottom: "2%",
		paddingVertical: "4%",
		borderRadius: 12,
		shadowColor: colors.black_100,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	buyButtonText: {
		color: colors.white_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
});
