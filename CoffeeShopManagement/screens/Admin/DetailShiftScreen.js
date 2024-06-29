import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon1 from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import StaffCard2 from '../../components/Admin/StaffCard2';

const DetailShiftScreen = ({ route }) => {

    const staffList = route.params.selectedStaff;
    console.log(staffList);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Danh sách nhân viên trong ca</Text>
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
                {/* {staffList.map((item) => (
                    <StaffCard2 key={item.id} item={item} />
                ))} */}
            </ScrollView>
        </View>
    )
}

export default DetailShiftScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "3%",
        marginVertical: "3%"
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
    deleteShiftButton: {
        backgroundColor: "#fff",
        padding: "3%",
        borderRadius: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'center',
    },
    listStaff: {
        marginBottom: '5%'
    },
    titleText: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        fontFamily:"lato-bold"
    },
})