import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon1 from "react-native-vector-icons/Feather";
import StaffCard from '../../components/Admin/StaffCard';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';

export default function DetailShiftScreen() {
    const DATA = [
        {
            id: "123456",
            name: "Tánh Trần",
            SDT: "0352085655",
            role: "Nhân viên",
        },
        {
            id: "123457",
            name: "Tánh Trần",
            SDT: "0352085656",
            role: "Nhân viên",
        },
        {
            id: "123458",
            name: "Tánh Trần",
            SDT: "0352085657",
            role: "Nhân viên",
        },
        {
            id: "123459",
            name: "Tánh Trần",
            SDT: "0352085658",
            role: "Nhân viên",
        },
    ];
    const navigation = useNavigation();
    const goToEditStaff = () => {
        navigation.navigate('EditStaff')
    }
    const goToAddStaff = () => {
        navigation.navigate("AddStaff");
    };
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Danh sách nhân viên trong ca</Text>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder="Tìm kiếm theo tên nhân viên, số điện thoại"
                    placeholderTextColor={"#9c9c9c"}
                />
                <TouchableOpacity>
                    <Icon1 name="search" size={24} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.listStaff}>
                <StaffCard DATA={DATA} handleNavigate={goToEditStaff} />
                <TouchableOpacity
                    onPress={goToAddStaff}
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    topText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
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
    addStaffButton: {
        backgroundColor: "#fff",
        padding: "3%",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
    },
})