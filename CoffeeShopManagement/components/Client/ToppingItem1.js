import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";

import Checkbox from "expo-checkbox";
const ToppingItem1 = ({ title, price }) => {
	const [isChecked, setChecked] = useState(false);
	const handleRememberMe = () => {
		setChecked(!isChecked);
	};
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.price}>{price}</Text>
			</View>
			<Checkbox
				style={styles.checkbox}
				value={isChecked}
				color={isChecked ? "#00A188" : undefined}
				onValueChange={handleRememberMe}
			/>
		</View>
	);
};

export default ToppingItem1;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: "5%",
	},
	title: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
		lineHeight: 20,
	},
	price: {
		color: "rgba(58, 58, 58, 0.50)",
		fontSize: 12,
		fontWeight: "500",
		marginTop: "10%",
	},
	checkbox: {
		borderColor: "#A8A19B",
		marginRight: "2%",
	},
});
