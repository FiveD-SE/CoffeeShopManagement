import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
} from "react-native";
import React, { useRef, useState, useMemo, useEffect } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import Icon1 from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import StaffCard from "../../components/Admin/StaffCard";

import RoleListScreen from "./RoleListScreen";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseService";

export default function ManageStaffScreen({ route }) {
	const [cashiers, setCashiers] = useState([]);
	const [roles, setRoles] = useState([]);

	useEffect(() => {
		const unsub = onSnapshot(
			query(
				collection(db, "cashier"),
			),
			(snapshot) => {
				setCashiers(snapshot.docs.map((doc) => doc.data()));
			}
		);
	}, []);

	useEffect(() => {
		const unsub = onSnapshot(
			query(
				collection(db, "staffRole"),
			),
			(snapshot) => {
				setRoles(snapshot.docs.map((doc) => doc.data()));
			}
		);
		return () => unsub();
	}, []);


	const [isOpen, setIsOpen] = useState(false);
	const chooseRoleListSnapPoints = useMemo(() => ["60%"], []);
	const chooseRoleListBottomSheetRef = useRef(null);

	const handleChooseRoleList = () => {
		chooseRoleListBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const navigation = useNavigation();

	// useEffect(() => {
	//     // Update DATA with the updatedData received from EditStaffScreen
	//     setDATA(prevData => {
	//         // Find the index of the item to be updated
	//         const index = prevData.findIndex(item => item.id === updatedData.id);
	//         if (index !== -1) {
	//             // Replace the old item with the updatedData
	//             const newData = [...prevData];
	//             newData[index] = updatedData;
	//             return newData;
	//         }
	//         // If the item is not found, return the previous data
	//         return prevData;
	//     });
	// }, [updatedData]);

	const handleback = () => {
		navigation.goBack();
	};
	const goToAddStaff = () => {
		navigation.navigate("AddStaff");
	};
	const goToEditStaff = (cashiers) => {
		navigation.navigate("EditStaff", { cashiers: cashiers });
	};
	return (
		<>
			<View style={styles.container}>
				<View style={styles.topApp}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TouchableOpacity onPress={handleback}>
							<Icon name="chevron-left" size={32} />
						</TouchableOpacity>
						<Text style={styles.topAppText}>Nhân viên</Text>
					</View>
					<TouchableOpacity
						onPress={handleChooseRoleList}
						style={styles.roleButton}
					>
						<Icon name="list" size={20} color={"#fff"} />
						<Text style={{ paddingStart: "2%", color: "#fff" }}>
							Danh sách vai trò
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.content}>
					<Text
						style={{
							fontWeight: "600",
							fontSize: 16,
							marginBottom: "3%",
						}}
					>
						Danh sách nhân viên
					</Text>
					<View style={styles.searchBox}>
						<TextInput
							placeholder="Tìm kiếm theo tên nhân viên, số điện thoại"
							placeholderTextColor={"#9c9c9c"}
							style={{ width: "90%" }}
						/>
						<TouchableOpacity>
							<Icon1 name="search" size={24} />
						</TouchableOpacity>
					</View>
					<ScrollView style={styles.listStaff}>
						<View>

							{cashiers.map((item, index) => (
								<StaffCard
									key={index}
									cashierName={item.fullName}
									cashierPhone={item.phoneNumber}
									cashierImage={item.cashierImage}
									onPress={() => goToEditStaff(item)}
								/>
							))}
						</View>
						<TouchableOpacity
							onPress={() => goToAddStaff()}
							style={styles.addStaffButton}
						>
							<Ionicons name="add" size={24} />
							<Text
								style={{
									fontSize: 14,
									fontWeight: "600",
									marginStart: "3%",
								}}
							>
								Thêm nhân viên
							</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			</View>
			<RoleListScreen
				bottomSheetRef={chooseRoleListBottomSheetRef}
				snapPoints={chooseRoleListSnapPoints}
				setIsOpen={setIsOpen}
				listRoles={roles}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	topApp: {
		paddingTop: "10%",
		backgroundColor: "#fff",
		padding: "3%",
		borderBottomWidth: 1,
		borderColor: "#cbcbd4",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	topAppText: {
		fontSize: 16,
		fontWeight: "600",
		paddingStart: "4%",
	},
	roleButton: {
		backgroundColor: "#006c5e",
		borderRadius: 25,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: "3%",
	},
	content: {
		padding: "5%",
	},
	searchBox: {
		width: "100%",
		borderRadius: 10,
		borderWidth: 1,
		paddingVertical: "1%",
		paddingStart: "3%",
		backgroundColor: "#fff",
		borderColor: "#e5e4e7",
		marginBottom: "5%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingEnd: "3%",
		alignItems: "center",
	},
	listStaff: {
		marginBottom: "50%",
	},
	staffItem: {
		backgroundColor: "#fff",
		padding: "3%",
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius: 10,
		alignItems: "center",
		marginBottom: "3%",
	},
	addStaffButton: {
		backgroundColor: "#fff",
		padding: "3%",
		borderRadius: 10,
		alignItems: "center",
		flexDirection: "row",
	},
});
