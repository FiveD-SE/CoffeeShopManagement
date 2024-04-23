import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const BottomSheet = ({ bottomSheetRef, snapPoints, setIsOpen, children }) => {
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

	return (
		<BottomSheetModal
			ref={bottomSheetRef}
			snapPoints={snapPoints}
			backgroundStyle={styles.bottomSheet}
			onDismiss={() => setIsOpen(false)}
			backdropComponent={renderBackdrop}
			enableContentPanningGesture={false}
		>
			<View style={styles.container}>{children}</View>
		</BottomSheetModal>
	);
};

const styles = StyleSheet.create({
	bottomSheet: {
		borderRadius: 30,
	},
	container: {
		flex: 1,
		backgroundColor: "transparent",
	},
});

export default BottomSheet;
