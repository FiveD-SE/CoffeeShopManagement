import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import Icon1 from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import StaffCard2 from '../../components/Admin/StaffCard2';
import { doc, updateDoc, setDoc, getDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { FlatList } from 'react-native-gesture-handler';

const DetailShiftScreen = ({ route }) => {
    const [staffList, setStaffList] = useState([]);
    const selectedShift = route.params.selectedShift;
    const selectedBranch = route.params.selectedBranch;
    console.log(selectedShift, selectedBranch);
    const navigation = useNavigation();
    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const q = query(collection(db, "staffs"), where("branch.branchId", "==", selectedBranch.branchId));
                const querySnapshot = await getDocs(q);

                const staffData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                console.log('Fetched Staff Data:', staffData);
                setStaffList(staffData);
            } catch (error) {
                console.log("Error fetching staff data: ", error);
            }
        };

        fetchStaffs();
    }, [selectedBranch.branchId]);

    const renderStaffList = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={staffList}
                keyExtractor={item => item.staffId}
                renderItem={({ item }) => (
                    <StaffCard2 item={item} />
                )}
            />
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Danh sách nhân viên trong ca</Text>

            <View style={styles.listStaff}>
                {renderStaffList()}
            </View>
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
    listStaff: {
        flex: 1,
        marginBottom: '5%'
    },
    titleText: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "lato-bold"
    },
})