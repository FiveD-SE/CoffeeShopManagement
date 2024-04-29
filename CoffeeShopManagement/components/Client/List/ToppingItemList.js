import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Section from "../Section";
import ToppingItem2 from "../ToppingItem2";

const ToppingItemList = ({ toppings }) => {
	const toppingItemList = [
		{
			title: "Trân châu đen",
			price: 10000,
		},
		{ title: "Trân châu trắng", price: 10000 },
		{ title: "Pudding trứng", price: 15000 },
	];
	const renderToppingItemList = () => {
		return toppings.map((item, index) => (
			<ToppingItem2
				key={index}
				title={item.title}
				price={item.price.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
			/>
		));
	};

	return (
		<View style={styles.container}>
			<Section title="Topping">{renderToppingItemList()}</Section>
		</View>
	);
};

export default ToppingItemList;

const styles = StyleSheet.create({
	container: {
		paddingVertical: "5%",
		paddingHorizontal: "10%",
		borderWidth: 1,
		borderColor: "rgba(58, 58, 58, 0.10)",
		borderRadius: 20,
	},
});
