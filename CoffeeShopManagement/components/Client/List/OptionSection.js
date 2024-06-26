import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import OptionButton from "../Button/OptionButton";

const OptionSection = ({ title, options, onSelectOption }) => {
	const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);

	const handleOptionPress = (index) => {
		setSelectedOptionIndex(index);
		onSelectOption(title, options[index]);
	};

	const renderOptionList = () => {
		return options.map((option, index) => (
			<OptionButton
				key={index}
				option={option}
				index={index}
				isSelected={selectedOptionIndex === index}
				onPress={() => handleOptionPress(index)}
			/>
		));
	};

	return (
		<View style={{ marginTop: "5%" }}>
			<Text style={styles.optionTitle}>{title}</Text>
			<View style={styles.optionContainer}>{renderOptionList()}</View>
		</View>
	);
};

export default OptionSection;

const styles = StyleSheet.create({
	optionHeader: {},
	optionTitle: {
		color: "#3a3a3a",
		fontSize: 14,
		fontWeight: "600",
	},
	optionContainer: {
		flexDirection: "row",
		marginTop: "2%",
	},
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
