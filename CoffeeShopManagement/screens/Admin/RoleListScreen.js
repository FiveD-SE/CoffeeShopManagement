import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import BottomSheet from "../../components/Client/BottomSheet/BottomSheet";
import RoleCard from "../../components/Staff/RoleCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddRoleModal from "../../components/Admin/AddRoleModal";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { colors } from "../../assets/colors/colors";

export default function RoleListScreen({
	bottomSheetRef,
	snapPoints,
	setIsOpen,
	listRoles,
}) {
	const [roles, setRoles] = useState(listRoles);

	useEffect(() => {
		setRoles(listRoles);
	}, [listRoles]);

	const [modalVisible, setModalVisible] = useState(false);

	const showAddRoleModal = () => {
		setModalVisible(true);
	};

	const hideAddRoleModal = () => {
		setModalVisible(false);
	};
	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
		>
			<View style={styles.container}>
				<View style={styles.topApp}>
					<Text style={styles.topAppText}>Danh sách vai trò</Text>
				</View>
				<View style={styles.bodyApp}>
					<ScrollView style={styles.listStaff}>
						{roles.map((item, index) => (
							<RoleCard
								key={index}
								roleName={item.roleName}
								salary={item.salary}
								staffRoleId={item.staffRoleId}
							/>
						))}
					</ScrollView>
					<TouchableOpacity
						onPress={showAddRoleModal}
						style={styles.addStaffButton}
					>
						<Ionicons name="add" size={24} />
						<Text
							style={{
								fontSize: 16,
								fontFamily: "lato-bold",
								marginLeft: "4%",
							}}
						>
							Thêm vai trò
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			<AddRoleModal visible={modalVisible} onClose={hideAddRoleModal} />
		</BottomSheet>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey_20,
	},
	topApp: {
		justifyContent: "center",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: colors.grey_50,
		padding: "2%",
		backgroundColor: colors.white_100,
	},
	topAppText: {
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	bodyApp: {
		padding: "4%",
	},
	addStaffButton: {
		backgroundColor: colors.white_100,
		padding: "4%",
		borderRadius: 10,
		alignItems: "center",
		flexDirection: "row",
		elevation: 2,
	},
});
