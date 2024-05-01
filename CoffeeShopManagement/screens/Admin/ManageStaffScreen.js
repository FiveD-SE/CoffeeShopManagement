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
import {
	BottomSheetModal,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import RoleListScreen from "./RoleListScreen";


export default function ManageStaffScreen({ route }) {
    // console.log(route.params.updatedData);
    const [DATA, setDATA] = useState([
        {
            id: "123456",
            name: "Tánh Trần",
            SDT: "0352085655",
            role: "Nhân viên",
            birth: "22/07/2004",
            sex: 'Nam',
            cccd: '0123456789',
            email: 'henrytsuki@gmail.com'
        },
        {
            id: "123457",
            name: "Gia Bảo",
            SDT: "0352085656",
            role: "Nhân viên",
            birth: "22/07/2004",
            sex: 'Nam',
            cccd: '0123456789',
            email: 'henrytsuki@gmail.com'
        },
        {
            id: "123458",
            name: "Quốc Thắng",
            SDT: "0352085657",
            role: "Nhân viên",
            birth: "22/07/2004",
            sex: 'Nam',
            cccd: '0123456789',
            email: 'henrytsuki@gmail.com'
        },
        {
            id: "123459",
            name: "Thành Tài",
            SDT: "0352085658",
            role: "Nhân viên",
            birth: "22/07/2004",
            sex: 'Nam',
            cccd: '0123456789',
            email: 'henrytsuki@gmail.com'
        },
    ]);
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


    const addNewStaff = (newStaff) => {
        setDATA([...DATA, newStaff]); // Thêm nhân viên mới vào DATA
    };
    const handleback = () => {
        navigation.goBack();
    };
    const goToAddStaff = (addNewStaff) => {
        navigation.navigate("AddStaff", { onAddNewStaff: addNewStaff });
    };
    const goToEditStaff = (item, setValue) => {
        navigation.navigate('EditStaff', { staffItem: item, setValue: setValue });
    }
    return (
        <BottomSheetModalProvider>
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
                        <Icon name="list" size={20} color={'#fff'} />
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
                            style={{ width: '90%' }}
                        />
                        <TouchableOpacity>
                            <Icon1 name="search" size={24} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.listStaff}>
                        <View>
                            {DATA.map((item) => (
                                <StaffCard key={item.id} item={item} onPress={() => goToEditStaff(item, setDATA)} />
                            ))}
                        </View>
                        <TouchableOpacity
                            onPress={() => goToAddStaff(addNewStaff)}
                            style={styles.addStaffButton}>
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
                setIsOpen={setIsOpen} />
        </BottomSheetModalProvider>
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
        marginBottom: '50%'
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
