import { StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";

import Icon from "react-native-vector-icons/FontAwesome6";
import { colors } from "../../assets/colors/colors";
const PasswordInput = (props) => {
	const [isFocused, setIsFocused] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(false);
	const toggleShowPassword = () => {
		setIsShowPassword(!isShowPassword);
	};
	return (
		<View
			style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}
		>
			<TextInput
				style={styles.input}
				placeholderTextColor={colors.grey_100}
				secureTextEntry={!isShowPassword}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...props}
			/>
			<Icon
				name={isShowPassword ? "eye" : "eye-slash"}
				onPress={toggleShowPassword}
				size={16}
			/>
		</View>
	);
};

export default PasswordInput;

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
		marginTop: "4%",
		backgroundColor: colors.grey_10,
	},
	inputContainerFocused: {
		borderWidth: 2,
	},
	input: {
		flex: 1,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
});
