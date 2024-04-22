import React, { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import CategoryIcon from "../Button/CategoryIcon";

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
    { type: "Category 2", iconSource: MILKTEA_ICON },
    { type: "Category 2", iconSource: MILKTEA_ICON },
  ];

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );

  const renderCategoryItemList = ({ item }) => (
    <CategoryIcon iconSource={item.iconSource} />
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={{ borderRadius: 30 }}
      onDismiss={() => setIsOpen(false)}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <FlatList
          data={categoriesData}
          renderItem={renderCategoryItemList}
          numColumns={4}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
    </BottomSheetModal>
  );
};

export default CategoryBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  listContent: {
    paddingHorizontal: "5%",
    paddingTop: "5%",
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
});
