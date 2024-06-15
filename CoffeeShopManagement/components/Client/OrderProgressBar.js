import { StyleSheet, Text, View } from "react-native";
import React from "react";

import StepIndicator from "react-native-step-indicator";
import { MaterialIcons } from "@expo/vector-icons";
const OrderProgressBar = ({ currentPage, setCurrentPage }) => {
	const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
		const iconConfig = {
			size: 24,
		};
		switch (position) {
			case 0: {
				iconConfig.name = "receipt";
				break;
			}
			case 1: {
				iconConfig.name = "loop";
				break;
			}
			case 2: {
				iconConfig.name = "delivery-dining";
				break;
			}
			case 3: {
				iconConfig.name = "home";
				break;
			}
			default: {
				break;
			}
		}
		if (stepStatus === "finished") {
			iconConfig.color = "#FFFFFF";
		} else {
			iconConfig.color = position === currentPage ? "#00A188" : "#CBCBD4";
		}
		return iconConfig;
	};

	const renderStepIndicator = (params) => (
		<MaterialIcons {...getStepIndicatorIconConfig(params)} />
	);

	return (
		<StepIndicator
			currentPosition={currentPage}
			stepCount={4}
			customStyles={styles.customStyles}
			renderStepIndicator={renderStepIndicator}
			labels={["Chờ xác nhận", "Đang thực hiện", "Đang giao", "Đã hoàn thành"]}
		/>
	);
};

export default OrderProgressBar;

const styles = StyleSheet.create({
	customStyles: {
		stepIndicatorSize: 40,
		currentStepIndicatorSize: 50,
		separatorStrokeWidth: 2,
		currentStepStrokeWidth: 3,
		stepStrokeCurrentColor: "#00A188",
		stepStrokeWidth: 2,
		separatorStrokeFinishedWidth: 4,
		stepStrokeFinishedColor: "#00A188",
		stepStrokeUnFinishedColor: "#CBCBD4",
		separatorFinishedColor: "#00A188",
		separatorUnFinishedColor: "#CBCBD4",
		stepIndicatorFinishedColor: "#00A188",
		stepIndicatorUnFinishedColor: "#ffffff",
		stepIndicatorCurrentColor: "#ffffff",
		stepIndicatorLabelFontSize: 12,
		currentStepIndicatorLabelFontSize: 12,
		labelColor: "#AAAAAA",
		labelSize: 12,
		currentStepLabelColor: "#00A188",
	},
});
