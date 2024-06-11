import { StyleSheet, Text, Pressable, Animated } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const CustomButton = ({ text, onPress, arrow }) => {
	const scaleValue = React.useRef(new Animated.Value(1)).current;

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

	return (
		<Pressable
			style={{ width: "100%" }}
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View
				style={[
					styles.customButton,
					{
						transform: [{ scale: scaleValue }],
					},
				]}
			>
				<Text style={styles.customButtonText}>{text}</Text>
				{arrow && <Ionicons name="arrow-forward" size={24} color="#FFF" />}
			</Animated.View>
		</Pressable>
	);
};

export default CustomButton;

const styles = StyleSheet.create({
	customButton: {
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
	customButtonText: {
		color: colors.white_100,
		fontFamily: "lato-bold",
		fontSize: 16,
		lineHeight: 24,
		marginRight: "2%",
	},
});
