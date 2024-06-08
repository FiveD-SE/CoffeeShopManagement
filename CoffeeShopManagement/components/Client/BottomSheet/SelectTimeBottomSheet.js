import { StyleSheet, View, Text } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";

import BottomSheet from "./BottomSheet";
import { colors } from "../../../assets/colors/colors";

const SelectTimeBottomSheet = ({
	bottomSheetRef,
	snapPoints,
	setIsOpen,
	onDateSelected,
	onTimeSelected,
}) => {
	const [selectedDate, setSelectedDate] = useState();
	const [selectedTime, setSelectedTime] = useState();

	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	const todayFormatted = today.toLocaleDateString("vi-VN", {
		weekday: "long",
		month: "numeric",
		day: "numeric",
	});

	const tomorrowFormatted = tomorrow.toLocaleDateString("vi-VN", {
		weekday: "long",
		month: "numeric",
		day: "numeric",
	});

	const timeSlots = [];
	for (let hour = 7; hour <= 22; hour++) {
		const hourString = hour.toString().padStart(2, "0");
		timeSlots.push({ label: `${hourString}:00`, value: `${hourString}:00` });
		if (hour !== 22) {
			timeSlots.push({ label: `${hourString}:30`, value: `${hourString}:30` });
		}
	}

	const handleDateChange = (itemValue) => {
		setSelectedDate(itemValue);
		onDateSelected(itemValue);
	};

	const handleTimeChange = (itemValue) => {
		setSelectedTime(itemValue);
		onTimeSelected(itemValue);
	};

	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Thời gian nhận hàng</Text>
					{selectedDate && selectedTime && (
						<Text style={styles.headerDetails}>
							{selectedDate} - {selectedTime}
						</Text>
					)}
				</View>
				<View style={styles.main}>
					<Picker
						mode="dropdown"
						style={{ flex: 1 }}
						selectedValue={selectedDate}
						onValueChange={handleDateChange}
					>
						<Picker.Item label={todayFormatted} value={todayFormatted} />
						<Picker.Item label={tomorrowFormatted} value={tomorrowFormatted} />
					</Picker>
					<Picker
						mode="dropdown"
						style={{ flex: 1 }}
						selectedValue={selectedTime}
						onValueChange={handleTimeChange}
					>
						{timeSlots.map((time) => (
							<Picker.Item
								key={time.value}
								label={time.label}
								value={time.value}
							/>
						))}
					</Picker>
				</View>
			</View>
		</BottomSheet>
	);
};

export default SelectTimeBottomSheet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F7FA",
	},
	header: {
		backgroundColor: colors.white_100,
		justifyContent: "center",
		alignItems: "center",
		padding: "4%",
		borderBottomWidth: 1,
		borderBottomColor: colors.grey_50,
	},
	headerTitle: {
		color: colors.grey_100,
		fontSize: 14,
		fontFamily: "lato-regular",
		marginBottom: "2%",
	},
	headerDetails: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	main: {
		flex: 1,
		flexDirection: "row",
	},
});
