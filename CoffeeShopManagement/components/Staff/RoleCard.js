import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import SettingSalaryModal from "../Admin/SettingSalaryModal";
import { colors } from "../../assets/colors/colors";
export default function RoleCard({ roleName, salary, staffRoleId }) {
	const [modalVisible, setModalVisible] = useState(false);

	const showSettingSalaryModal = () => {
		setModalVisible(true);
	};

	const hideSettingSalaryModal = () => {
		setModalVisible(false);
	};

	const formatSalary = (salary) => {
		const formattedSalary = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(salary);
		return formattedSalary;
	};

	return (
		<View>
			<TouchableOpacity
				onPress={showSettingSalaryModal}
				style={styles.cardWrapper}
			>
				<View>
					<Text style={styles.roleName}>{roleName}</Text>
					<Text style={styles.salary}>Lương: {formatSalary(salary)} / giờ</Text>
				</View>
				<View>
					<Icon name="chevron-right" size={24} color={colors.grey_50} />
				</View>
				<SettingSalaryModal
					visible={modalVisible}
					onClose={hideSettingSalaryModal}
					roleName={roleName}
					staffRoleId={staffRoleId}
					salary={salary}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	cardWrapper: {
		backgroundColor: colors.white_100,
		borderWidth: 1,
		borderColor: colors.grey_50,
		marginBottom: "5%",
		padding: "4%",
		borderRadius: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	roleName: {
		fontSize: 16,
		fontFamily: "lato-bold",
		marginBottom: "2%",
	},
	salary: {
		fontSize: 16,
		fontFamily: "lato-regular",
		color: colors.grey_100,
	},
});
