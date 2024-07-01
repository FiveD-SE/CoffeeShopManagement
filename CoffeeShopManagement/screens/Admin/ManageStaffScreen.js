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
import SearchBar from "../../components/Client/SearchBar";
import AddNewStaffButton from "../../components/Admin/Button/AddNewStaffButton";

export default function ManageStaffScreen({ route }) {
    const [cashiers, setCashiers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredCashiers, setFilteredCashiers] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "staffs")),
            (snapshot) => {
                const staffData = snapshot.docs.map((doc) => doc.data());
                setCashiers(staffData);
                setFilteredCashiers(staffData);
            }
        );

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
            const filteredList = cashiers.filter(cashier =>
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

    const handleback = () => {
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
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
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
                        <Text style={{ paddingStart: "2%", color: "#fff", fontFamily: "lato-bold", fontSize: 18 }}>
                            Danh sách vai trò
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    <AddNewStaffButton onPress={() => goToAddStaff()} />
                    <Text
                        style={{
                            fontWeight: "600",
                            fontSize: 18,
                            marginVertical: "3%",
                            fontFamily: "lato-bold"

                        }}
                    >
                        Danh sách nhân viên
                    </Text>
                    <SearchBar
                        onChangeText={(query) => handleSearch(query)}
                    />
                    <ScrollView
                        style={styles.listStaff}
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
        fontFamily: "lato-bold"
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
        padding: "3%",
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
