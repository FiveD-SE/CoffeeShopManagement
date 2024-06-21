import { StyleSheet, Text, View, Pressable, Animated } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";

const CustomAddToCartButton = ({ onPress }) => {
	const addToCartButtonScaleValue = React.useRef(new Animated.Value(1)).current;

	const handleAddToCartPressIn = () => {
		Animated.spring(addToCartButtonScaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handleAddToCartPressOut = () => {
		Animated.spring(addToCartButtonScaleValue, {
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
			onPressIn={handleAddToCartPressIn}
			onPressOut={handleAddToCartPressOut}
		>
			<Animated.View
				style={[
					styles.addToCartButton,
					{
						transform: [{ scale: addToCartButtonScaleValue }],
					},
				]}
			>
				<Ionicons style={styles.addToCartIcon} name="cart" size={24} />
				<Text style={styles.addToCartText}>Thêm vào giỏ</Text>
			</Animated.View>
		</Pressable>
	);
};

export default CustomAddToCartButton;

const styles = StyleSheet.create({
	addToCartButton: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: colors.grey_20,
		borderColor: colors.grey_50,
		borderWidth: 1,
		paddingVertical: "4%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: "6%",
		borderRadius: 12,
		shadowColor: colors.grey_100,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	addToCartIcon: {
		color: colors.grey_100,
	},
	addToCartText: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
		marginLeft: "4%",
	},
});
