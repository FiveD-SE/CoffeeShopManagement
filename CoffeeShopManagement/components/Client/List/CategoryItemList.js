import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import CategoryIcon from "../Button/CategoryIcon";

const GOOGLE_ICON = require("../../../assets/google.png");
const FRUITS_ICON = require("../../../assets/fruits.png");
const MILKTEA_ICON = require("../../../assets/milktea.png");

const categoriesData = [
	{ type: "Category 1", iconSource: GOOGLE_ICON },
	{ type: "Category 2", iconSource: GOOGLE_ICON },
	{ type: "Category 1", iconSource: GOOGLE_ICON },
	{ type: "Category 2", iconSource: GOOGLE_ICON },

	{ type: "Category 2", iconSource: FRUITS_ICON },
	{ type: "Category 2", iconSource: FRUITS_ICON },
	{ type: "Category 2", iconSource: FRUITS_ICON },

	{ type: "Category 2", iconSource: MILKTEA_ICON },
	{ type: "Category 2", iconSource: MILKTEA_ICON },
];

const itemsPerPage = 4;

const CategoryItemList = () => {
	const [currentPage, setCurrentPage] = useState(0);

	const totalPages = Math.ceil(categoriesData.length / itemsPerPage);

	const getCurrentPageCategories = () => {
		const startIndex = currentPage * itemsPerPage;
		const endIndex = Math.min(startIndex + itemsPerPage, categoriesData.length);
		return categoriesData.slice(startIndex, endIndex);
	};

	const renderPageIndicators = () => {
		const indicators = [];
		for (let i = 0; i < totalPages; i++) {
			indicators.push(
				<Pressable
					key={i}
					style={[
						styles.pageIndicator,
						i === currentPage && styles.activePageIndicator,
					]}
					onPress={() => setCurrentPage(i)}
				></Pressable>
			);
		}
		return indicators;
	};

	return (
		<>
			<View style={styles.container}>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						width: "100%",
						justifyContent: "space-evenly",
					}}
					pagingEnabled
				>
					{getCurrentPageCategories().map((category, index) => (
						<CategoryIcon key={index} iconSource={category.iconSource} />
					))}
				</ScrollView>
			</View>
			<View style={styles.pageIndicatorsContainer}>
				{renderPageIndicators()}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "rgba(58, 58, 58, 0.10)",
		padding: "5%",
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
