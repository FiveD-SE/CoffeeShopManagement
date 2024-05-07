import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const OptionButton = ({ option, index, onPress, isSelected }) => {
	const handlePress = () => {
		onPress(index);
	};
	return (
		<Pressable
			style={[
				styles.optionButton,
				{
					backgroundColor: isSelected ? "rgba(203, 203, 212, 0.30)" : "#FFFFFF",
				},
			]}
			onPress={handlePress}
		>
			<Text style={styles.optionText}>{option}</Text>
		</Pressable>
	);
};

export default OptionButton;

const styles = StyleSheet.create({
	optionButton: {
		marginRight: "2%",
		alignSelf: "flex-start",
		borderWidth: 1,
		borderColor: "rgba(58, 58, 58, 0.20)",
		paddingHorizontal: "5%",
		paddingVertical: "2%",
		borderRadius: 100,
	},
	optionText: {
		color: "#3a3a3a",
		fontSize: 14,
		fontWeight: "400",
	},
});
