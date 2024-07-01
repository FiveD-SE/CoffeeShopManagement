import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Update from "expo-updates";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import { saveUserData } from "../../redux/actions/userActions";
import { db, uploadImageToFirebase } from "../../services/firebaseService";
import { updateDoc } from "firebase/firestore";
import { colors } from "../../assets/colors/colors";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Ionicons } from "@expo/vector-icons";

const shift = [
	{
		shiftId: "1",
		date: "2024-07-02",
		morning: {
			shiftName: "Ca sáng",
			note: [
				"• Đi sớm dọn quán, kiểm tra vệ sinh trước khi bắt đầu ca.",
				"• Đón khách với nụ cười và thái độ niềm nở.",
				"• Kiểm tra máy pha cà phê và đảm bảo hoạt động tốt.",
				"• Chuẩn bị sẵn các loại bánh và đồ uống phổ biến cho buổi sáng.",
			],
		},
		afternoon: {
			shiftName: "Ca chiều",
			note: [
				"• Tiếp quản từ ca sáng, kiểm tra lại khu vực làm việc.",
				"• Tập trung vào việc phục vụ bữa trưa cho khách hàng.",
				"• Thực hiện kiểm tra định kỳ các thiết bị điện.",
				"• Tạo bầu không khí thoải mái cho khách hàng nghỉ trưa.",
			],
		},
	},
	{
		shiftId: "2",
		date: "2024-07-05",
		morning: {
			shiftName: "Ca sáng",
			note: [
				"• Đi sớm dọn quán, kiểm tra vệ sinh trước khi bắt đầu ca.",
				"• Chuẩn bị nguyên liệu và sắp xếp dụng cụ pha chế.",
				"• Đảm bảo khu vực vệ sinh sạch sẽ và ngăn nắp.",
				"• Lập danh sách các nguyên liệu cần bổ sung cho tuần sau.",
			],
		},
		afternoon: {
			shiftName: "Ca chiều",
			note: [
				"• Tiếp quản từ ca sáng, kiểm tra lại khu vực làm việc.",
				"• Giám sát việc giao hàng và nhận hàng từ các nhà cung cấp.",
				"• Thực hiện kiểm tra chất lượng đồ uống trước khi phục vụ.",
				"• Lên kế hoạch và chuẩn bị cho sự kiện buổi tối nếu có.",
			],
		},
	},
	{
		shiftId: "3",
		date: "2024-07-07",
		morning: {
			shiftName: "Ca sáng",
			note: [
				"• Đi sớm dọn quán, kiểm tra vệ sinh trước khi bắt đầu ca.",
				"• Tạo danh sách công việc cho các nhân viên trong ca.",
				"• Kiểm tra và sắp xếp lại khu vực lưu trữ hàng hóa.",
				"• Tổ chức buổi họp ngắn với toàn bộ nhân viên để đánh giá công việc.",
			],
		},
		afternoon: {
			shiftName: "Ca chiều",
			note: [
				"• Tiếp quản từ ca sáng, kiểm tra lại khu vực làm việc.",
				"• Đảm bảo các sản phẩm bày bán được trưng bày đẹp mắt.",
				"• Tổ chức các hoạt động quảng bá và khuyến mãi cho quán.",
				"• Dọn dẹp kỹ lưỡng và đóng cửa quán vào cuối ca.",
			],
		},
	},
];

const CashierInformation = ({ userData, saveUserData }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [currentMonth, setCurrentMonth] = useState(new Date());
	const handleImagePicker = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("Sorry, we need camera roll permissions to make this work!");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			const userImage = await uploadImageToFirebase(
				result.assets[0].uri,
				"user_" + userData.id
			);
			const updatedUserData = { ...userData, userImage: userImage };
			saveUserData(updatedUserData);
			const userDocRef = doc(db, "users", userData.id);
			await updateDoc(userDocRef, {
				userImage: userImage,
			});
		}
	};
	const Capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
	const renderHeader = (date) => {
		const formattedDate = selectedDate
			? format(new Date(selectedDate), "'Ngày' dd 'tháng' MM 'năm' yyyy", {
					locale: vi,
			  })
			: format(new Date(date), "'Ngày' dd 'tháng' MM 'năm' yyyy", {
					locale: vi,
			  });

		return (
			<View>
				<Text style={{ fontSize: 16, fontFamily: "lato-bold" }}>
					{formattedDate}
				</Text>
			</View>
		);
	};

	const renderShiftNote = (note) => {
		return note.map((item, index) => (
			<Text style={styles.noteText} key={index}>
				{item}
			</Text>
		));
	};

	const renderShift = (shift) => {
		const date = new Date(selectedDate);
		const shiftDate = new Date(shift.date);
		if (date.toDateString() === shiftDate.toDateString()) {
			return (
				<View key={shift.shiftId}>
					<View style={styles.shiftContainer}>
						<Text style={styles.shiftText}>{shift.morning.shiftName}</Text>
						{renderShiftNote(shift.morning.note)}
					</View>
					<View style={styles.shiftContainer}>
						<Text style={styles.shiftText}>{shift.afternoon.shiftName}</Text>
						{renderShiftNote(shift.afternoon.note)}
					</View>
				</View>
			);
		}
		return null;
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.inforWrapper}>
				<TouchableOpacity
					style={styles.imageWrapper}
					onPress={() => handleImagePicker()}
				>
					<Image
						source={{ uri: userData.userImage }}
						resizeMode="stretch"
						style={styles.userImage}
					/>
				</TouchableOpacity>
				<View style={styles.inforTextWrapper}>
					<Text style={styles.cashierName}>{userData.name}</Text>
					<Ionicons
						name="remove-outline"
						size={16}
						color={colors.white_100}
						style={{ marginHorizontal: "2%", transform: [{ rotate: "90deg" }] }}
					/>
					<Text style={styles.cashierRole}>{Capitalize(userData.role)}</Text>
				</View>
			</View>
			<View style={styles.bodyApp}>
				<Text
					style={{
						fontSize: 16,
						fontWeight: "600",
						marginBottom: "5%",
					}}
				>
					Lịch làm việc
				</Text>
				<View style={styles.calendar}>
					<Calendar
						onDayPress={(day) => {
							setSelectedDate(day.dateString);
						}}
						onMonthChange={(date) => {
							setCurrentMonth(new Date(date.dateString));
						}}
						renderArrow={(direction) => {
							return direction === "left" ? (
								<Ionicons
									name="chevron-back"
									size={24}
									color={colors.black_100}
								/>
							) : (
								<Ionicons
									name="chevron-forward"
									size={24}
									color={colors.black_100}
								/>
							);
						}}
						markedDates={{
							[selectedDate]: {
								selected: true,
								disableTouchEvent: true,
								selectedColor: colors.green_100,
							},
							"2024-07-02": {
								marked: true,
								dotColor: "red",
								selectedColor: colors.green_100,
							},
							"2024-07-05": { marked: true, dotColor: "red" },
							"2024-07-07": {
								marked: true,
								dotColor: "red",
							},
						}}
						renderHeader={renderHeader}
					/>
				</View>
				<Text style={styles.dateText}>
					{selectedDate
						? format(
								new Date(selectedDate),
								"'Ngày' dd 'tháng' MM 'năm' yyyy",
								{
									locale: vi,
								}
						  )
						: ""}
				</Text>
				{shift.map((shift) => renderShift(shift))}
				<TouchableOpacity
					onPress={() => {
						AsyncStorage.removeItem("isRemembered");
						AsyncStorage.removeItem("email");
						AsyncStorage.removeItem("password");
						Update.reloadAsync();
					}}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Đăng xuất</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

const mapDispatchToProps = {
	saveUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(CashierInformation);

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.green_100,
	},
	inforWrapper: {
		flexDirection: "row",
		alignItems: "center",
		padding: "4%",
	},
	inforTextWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	cashierName: {
		fontSize: 16,
		fontFamily: "lato-bold",
		color: colors.white_100,
	},
	cashierRole: {
		fontSize: 16,
		fontFamily: "lato-bold",
		color: colors.white_100,
	},
	bodyApp: {
		flex: 1,
		backgroundColor: colors.grey_10,
		padding: "4%",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	calendar: {
		backgroundColor: "#fff",
		width: "100%",
		borderRadius: 10,
		marginBottom: "5%",
		padding: "3%",
	},
	dateText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: "5%",
	},
	shiftContainer: {
		backgroundColor: colors.green_20,
		borderRadius: 10,
		padding: "4%",
		marginBottom: "5%",
		borderWidth: 1,
		borderColor: colors.grey_50,
	},
	shiftText: {
		fontSize: 16,
		fontFamily: "lato-bold",
		marginBottom: "2%",
	},
	noteContainer: {},
	noteText: {
		fontSize: 14,
		lineHeight: 24,
		fontFamily: "lato-regular",
		textDecorationStyle: "dotted",
	},
	button: {
		backgroundColor: "#006d5d",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		padding: "4%",
	},
	buttonText: {
		fontSize: 16,
		fontWeight: "600",
		color: "#fff",
	},
	imageWrapper: {
		width: 64,
		height: 64,
		justifyContent: "center",
		alignItems: "center",
		marginRight: "4%",
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colors.grey_100,
		backgroundColor: colors.grey_10,
		elevation: 4,
	},
	userImage: {
		width: "100%",
		height: "100%",
		borderRadius: 100,
		aspectRatio: 1,
	},
});
