import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import StaffCard2 from '../../components/Admin/StaffCard2';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import AddStaffButton from '../../components/Admin/Button/AddStaffButton';

const DetailShiftScreen = ({ route }) => {
    const selectedShift = route.params.selectedShift;
    const selectedBranch = route.params.selectedBranch;
    const navigation = useNavigation();

    const [staffList, setStaffList] = useState([]);

    useEffect(() => {
        if (selectedShift && selectedShift.staffList) {
            setStaffList(selectedShift.staffList);
        }
    }, [selectedShift]);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const removeFromShift = async (shiftId, staffIdToRemove) => {
        try {
            // Display alert confirmation
            Alert.alert(
                'Xác nhận xóa nhân viên',
                'Bạn có chắc chắn muốn xóa nhân viên này khỏi ca làm việc?',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel',
                    },
                    {
                        text: 'Xóa',
                        onPress: async () => {
                            console.log('Removing staff from shift:', shiftId, staffIdToRemove);
                            const branchId = selectedBranch.branchId;
                            const branchScheduleRef = doc(db, 'branchSchedules', branchId);
                            const branchScheduleDoc = await getDoc(branchScheduleRef);

                            if (branchScheduleDoc.exists()) {
                                const branchScheduleData = branchScheduleDoc.data();
                                const dayList = branchScheduleData.dayList || [];
                                const todayDate = formatDate(new Date());

                                const existingEntryIndex = dayList.findIndex((day) => day.date === todayDate);

                                if (existingEntryIndex !== -1) {
                                    const updatedShifts = dayList[existingEntryIndex].shifts.map(shift => {
                                        if (shift.shiftId === shiftId) {
                                            const updatedStaffList = shift.staffList.filter(staffId => staffId !== staffIdToRemove);
                                            return { ...shift, staffList: updatedStaffList };
                                        }
                                        return shift;
                                    });

                                    dayList[existingEntryIndex].shifts = updatedShifts;
                                    await updateDoc(branchScheduleRef, { dayList });

                                    // Update local state
                                    setStaffList(updatedShifts.find(shift => shift.shiftId === shiftId).staffList);
                                }
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        } catch (error) {
            console.error('Error removing staff from shift:', error);
        }
    };

    const renderStaffList = () => {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={staffList}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <StaffCard2 item={item} onPress={() => removeFromShift(selectedShift.shiftId, item)} />
                )}
            />
        )
    }

    return (
        <View style={styles.container}>
            <AddStaffButton />
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
        marginTop: "3%",
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "lato-bold"
    },
});
