import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../assets/colors/colors";

const InputField = (props) => {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View
			style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}
		>
			<TextInput
				style={styles.input}
				placeholderTextColor={colors.grey_100}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...props}
			/>
		</View>
	);
};

export default InputField;

const styles = StyleSheet.create({
	inputContainer: {
		minHeight: 48,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 12,
		borderColor: colors.grey_100,
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		marginTop: "2%",
		backgroundColor: colors.grey_10,
	},
	inputContainerFocused: {
		borderWidth: 2,
	},
	input: {
		flex: 1,
		color: "#3a3a3a",
		fontFamily: "lato-regular",
		fontSize: 16,
	},
});
