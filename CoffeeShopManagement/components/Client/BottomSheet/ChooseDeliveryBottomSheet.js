import { StyleSheet, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import BottomSheet from "./BottomSheet";
import DeliveryOption from "../DeliveryOption";

const ChooseDeliveryBottomSheet = ({
	bottomSheetRef,
	snapPoints,
	setIsOpen,
}) => {
	const navigation = useNavigation();

	const deliveryOption = [
		{ title: "Giao hàng tận nơi", iconName: "moped", type: "Delivery" },
		{ title: "Tự đến lấy hàng", iconName: "handshake", type: "Pickup" },
	];

	const goToSelectAddressScreen = () => {
		navigation.navigate("SelectAddressScreen");
	};

	const goToSelectBranchScreen = () => {
		navigation.navigate("SelectBranchScreen");
	};

	const renderDeliveryOption = () => {
		return deliveryOption.map((item, index) => {
			let deliveryType;
			if (item.type === "Delivery") {
				deliveryType = goToSelectAddressScreen;
			} else if (item.type === "Pickup") {
				deliveryType = goToSelectBranchScreen;
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
