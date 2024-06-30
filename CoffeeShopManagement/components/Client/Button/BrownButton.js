import { StyleSheet, Text, Pressable, Animated } from "react-native";
import React from "react";
const BrownButton = ({ text, onPress }) => {
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
			onPress={onPress}
			onPressIn={handlePressIn}
			onPressOut={handlePressOut}
		>
			<Animated.View
				style={[
					styles.brownButton,
					{
						transform: [{ scale: scaleValue }],
					},
				]}
			>
				<Text style={styles.brownButtonText}>{text}</Text>
			</Animated.View>
		</Pressable>
	);
};

export default BrownButton;

const styles = StyleSheet.create({
	brownButton: {
		minHeight: 48,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#514438",
		paddingVertical: "4%",
		marginTop: "4%",
		elevation: 2,
	},
	brownButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		lineHeight: 20,
		fontWeight: "600",
	},
});
