import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import CategoryIcon from "../Button/CategoryIcon";
import BottomSheet from "./BottomSheet";

const GOOGLE_ICON = require("../../../assets/google.png");
const FRUITS_ICON = require("../../../assets/fruits.png");
const MILKTEA_ICON = require("../../../assets/milktea.png");

const CategoryBottomSheet = ({ bottomSheetRef, snapPoints, setIsOpen }) => {
	const categoriesData = [
		{ type: "Category 1", iconSource: GOOGLE_ICON },
		{ type: "Category 2", iconSource: GOOGLE_ICON },
		{ type: "Category 1", iconSource: GOOGLE_ICON },
		{ type: "Category 2", iconSource: GOOGLE_ICON },
		{ type: "Category 2", iconSource: FRUITS_ICON },
		{ type: "Category 2", iconSource: FRUITS_ICON },
		{ type: "Category 2", iconSource: FRUITS_ICON },
	];

	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
		>
			<ScrollView contentContainerStyle={styles.container}>
				{categoriesData.map((item, index) => (
					<CategoryIcon key={index} iconSource={item.iconSource} size={56} />
				))}
			</ScrollView>
		</BottomSheet>
	);
};

export default CategoryBottomSheet;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: "transparent",
		paddingLeft: "10%",
		paddingTop: "5%",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 40,
	},
});
