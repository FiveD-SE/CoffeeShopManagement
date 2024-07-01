import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";
import StaffCard from "../../components/Admin/StaffCard";
import RoleListScreen from "./RoleListScreen";
import SearchBar from "../../components/Client/SearchBar";
import AddNewStaffButton from "../../components/Admin/Button/AddNewStaffButton";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function ManageStaffScreen({ route }) {
	const [cashiers, setCashiers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [searchKeyword, setSearchKeyword] = useState("");
	const [filteredCashiers, setFilteredCashiers] = useState([]);

	useEffect(() => {
		const unsub = onSnapshot(query(collection(db, "staffs")), (snapshot) => {
			const staffData = snapshot.docs.map((doc) => doc.data());
			setCashiers(staffData);
			setFilteredCashiers(staffData);
		});

		return () => unsub();
	}, []);

	useEffect(() => {
		const unsub = onSnapshot(
			query(collection(db, "staffRoles")),
			(snapshot) => {
				setRoles(snapshot.docs.map((doc) => doc.data()));
			}
		);
		return () => unsub();
	}, []);

	useEffect(() => {
		handleSearch(searchKeyword);
	}, [cashiers, searchKeyword]);

	const handleSearch = (query) => {
		setSearchKeyword(query);
		if (query) {
			const filteredList = cashiers.filter((cashier) =>
				cashier.fullName.toLowerCase().includes(query.toLowerCase())
			);
			setFilteredCashiers(filteredList);
		} else {
			setFilteredCashiers(cashiers);
		}
	};

	const [isOpen, setIsOpen] = useState(false);
	const chooseRoleListSnapPoints = useMemo(() => ["60%"], []);
	const chooseRoleListBottomSheetRef = useRef(null);

	const handleChooseRoleList = () => {
		chooseRoleListBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};
	const goToAddStaff = () => {
		navigation.navigate("AddStaff");
	};
	const goToEditStaff = (staffs) => {
		navigation.navigate("EditStaff", { staffs: staffs });
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.topApp}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<TouchableOpacity onPress={handleGoBack}>
							<Icon name="chevron-left" size={16} />
						</TouchableOpacity>
						<Text style={styles.topAppText}>Nhân viên</Text>
					</View>
					<TouchableOpacity
						onPress={handleChooseRoleList}
						style={styles.roleButton}
					>
						<Icon name="list" size={14} color={"#fff"} />
						<Text
							style={{
								marginLeft: "4%",
								color: "#fff",
								fontFamily: "lato-bold",
								fontSize: 14,
							}}
						>
							Danh sách vai trò
						</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.content}>
					<AddNewStaffButton onPress={() => goToAddStaff()} />
					<Text
						style={{
							fontSize: 16,
							marginVertical: "4%",
							fontFamily: "lato-bold",
						}}
					>
						Danh sách nhân viên
					</Text>
					<SearchBar onChangeText={(query) => handleSearch(query)} />
					<ScrollView
						contentContainerStyle={styles.listStaff}
						showsVerticalScrollIndicator={false}
					>
						<View>
							{filteredCashiers.map((item, index) => (
								<StaffCard
									key={index}
									cashierName={item.fullName}
									cashierPhone={item.phoneNumber}
									cashierImage={item.staffImage}
									role={item.role?.roleName}
									onPress={() => goToEditStaff(item)}
								/>
							))}
						</View>
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
		fontSize: 18,
		fontWeight: "600",
		paddingStart: "4%",
		fontFamily: "lato-bold",
	},
	roleButton: {
		backgroundColor: "#006c5e",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: "2%",
		elevation: 2,
	},
	content: {
		padding: "4%",
	},
	listStaff: {
		marginTop: "3%",
		marginBottom: "58%",
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
