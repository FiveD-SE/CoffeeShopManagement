import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import CategoryIcon from "../Button/CategoryIcon";
import { colors } from "../../../assets/colors/colors";

const COFFEE_ICON = require("../../../assets/images/coffee.png");
const JUICE_ICON = require("../../../assets/images/juice.png");
const MILKTEA_ICON = require("../../../assets/images/milktea.png");
const ICE_BLENDED_ICON = require("../../../assets/images/ice-blended.png");

const categoriesData = [
	{ type: "Cà phê", iconSource: COFFEE_ICON },
	{ type: "Trà sữa", iconSource: MILKTEA_ICON },
	{ type: "Nước trái cây", iconSource: JUICE_ICON },
	{ type: "Đá xay", iconSource: ICE_BLENDED_ICON },
];

const CategoryItemList = () => {
	return (
		<View style={styles.container}>
			{categoriesData.map((category, index) => (
				<CategoryIcon
					key={index}
					iconSource={category.iconSource}
					size={56}
					name={category.type}
				/>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: colors.grey_50,
		padding: "5%",
		backgroundColor: colors.grey_20,
		justifyContent: "space-between",
		alignItems: "center",
		justifyContent: "center",
		marginTop: "5%",
	},
	pageIndicatorsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: "2%",
	},
	pageIndicator: {
		paddingHorizontal: "3%",
		paddingVertical: "1%",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 30,
		marginHorizontal: "1%",
	},
	activePageIndicator: {
		backgroundColor: "#00A188",
	},
});

export default CategoryItemList;
