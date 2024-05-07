import { StyleSheet, View } from "react-native";
import React from "react";

import BottomSheet from "./BottomSheet";
import DeliveryOption from "../DeliveryOption";

const ChooseDeliveryBottomSheet = ({
	bottomSheetRef,
	snapPoints,
	setIsOpen,
	onDeliveryTypeSelect,
}) => {
	const deliveryOption = [
		{ title: "Giao hàng tận nơi", iconName: "moped", type: "delivery" },
		{ title: "Tự đến lấy hàng", iconName: "handshake", type: "takeaway" },
	];

	const handleSelectDelivery = () => {
		onDeliveryTypeSelect("delivery");
	};

	const handleSelectTakeaway = () => {
		onDeliveryTypeSelect("takeaway");
	};

	const renderDeliveryOption = () => {
		return deliveryOption.map((item, index) => {
			let deliveryType;
			if (item.type === "delivery") {
				deliveryType = handleSelectDelivery;
			} else if (item.type === "takeaway") {
				deliveryType = handleSelectTakeaway;
			}
			return (
				<View key={index} style={{ marginVertical: "1%" }}>
					<DeliveryOption
						title={item.title}
						iconName={item.iconName}
						onPress={deliveryType}
					/>
				</View>
			);
		});
	};

	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
		>
			<View style={styles.container}>{renderDeliveryOption()}</View>
		</BottomSheet>
	);
};

export default ChooseDeliveryBottomSheet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F7FA",
		padding: "5%",
	},
});
