import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../../assets/colors/colors";

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
		minHeight: 48,
		justifyContent: "center",
		alignItems: "center",
		marginRight: "2%",
		alignSelf: "flex-start",
		borderWidth: 1,
		borderColor: colors.grey_50,
		paddingHorizontal: "6%",
		paddingVertical: "2%",
		borderRadius: 100,
	},
	optionText: {
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
	},
});
