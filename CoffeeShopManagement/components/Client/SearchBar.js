import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { colors } from "../../assets/colors/colors";
const SearchBar = ({ onFocus, onChangeText }) => {
	const handleTextChange = (text) => {
		onChangeText(text);
	};
	const handleBlur = () => {
		if (typeof onBlur === "function") {
			onBlur();
		}
	};
	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.input}
				placeholder="Tìm kiếm"
				placeholderTextColor={colors.grey_100}
				onChangeText={handleTextChange}
				onFocus={onFocus}
				onBlur={handleBlur}
			/>
		</View>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		minHeight: 48,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 8,
		borderColor: "#CCCCCC",
		paddingHorizontal: "5%",
		paddingVertical: "2%",
		backgroundColor: colors.grey_10,
	},
	input: {
		flex: 1,
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
});
