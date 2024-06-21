import { StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
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

	const currentHour = today.getHours();
	const currentMinute = today.getMinutes();

	let startHour = currentHour;
	let startMinute = currentMinute + 30;

	if (startMinute >= 60) {
		startHour += 1;
		startMinute = startMinute - 60;
	}

	const startTime = `${startHour.toString().padStart(2, "0")}:${startMinute
		.toString()
		.padStart(2, "0")}`;

	const generateTimeSlots = (selectedDate) => {
		const slots = [];
		const startTimeToCompare =
			selectedDate === todayFormatted ? startTime : "07:00";

		for (let hour = 7; hour <= 22; hour++) {
			const hourString = hour.toString().padStart(2, "0");
			const time00 = `${hourString}:00`;
			const time30 = `${hourString}:30`;

			if (time00 >= startTimeToCompare) {
				slots.push({ label: time00, value: time00 });
			}
			if (time30 >= startTimeToCompare && hour !== 22) {
				slots.push({ label: time30, value: time30 });
			}
		}
		return slots;
	};

	const initialTimeSlots = generateTimeSlots(todayFormatted);
	const [selectedDate, setSelectedDate] = useState(todayFormatted);
	const [selectedTime, setSelectedTime] = useState(initialTimeSlots[0]?.value);

	const timeSlots = generateTimeSlots(selectedDate);

	const handleDateChange = (itemValue) => {
		setSelectedDate(itemValue);
		const newTimeSlots = generateTimeSlots(itemValue);
		setSelectedTime(newTimeSlots[0]?.value);
		onDateSelected(itemValue);
		onTimeSelected(newTimeSlots[0]?.value);
	};

	const handleTimeChange = (itemValue) => {
		setSelectedTime(itemValue);
		onTimeSelected(itemValue);
	};

	useEffect(() => {
		onDateSelected(selectedDate);
		onTimeSelected(selectedTime);
	}, []);

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
