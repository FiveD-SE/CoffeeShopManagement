import { StyleSheet, TextInput, View } from "react-native";
import React from "react";

const SearchBar = ({ onFocus, onChangeText }) => {
	const handleTextChange = (text) => {
		onChangeText(text);
	};
	return (
		<View style={styles.inputContainer}>
			<TextInput
				style={styles.input}
				placeholder="Tìm kiếm"
				onChangeText={handleTextChange}
				onFocus={onFocus}
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
		backgroundColor: "#ffffff",
	},
	input: {
		flex: 1,
		color: "rgba(58,58,58,0.5)",
		fontSize: 16,
		fontWeight: "400",
	},
});
