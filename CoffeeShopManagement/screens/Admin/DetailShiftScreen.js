import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import StaffCard2 from '../../components/Admin/StaffCard2';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { doc, updateDoc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import AddStaffButton from '../../components/Admin/Button/AddStaffButton';
import SelectStaffModal from '../../components/Admin/Modal/SelectStaffModal';
import Toast from 'react-native-toast-message';

const DetailShiftScreen = ({ route }) => {
    const selectedShift = route.params.selectedShift;
    const selectedBranch = route.params.selectedBranch;
    const navigation = useNavigation();
    const [selectStaffModalVisible, setSelectStaffModalVisible] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [availableStaffIds, setAvailableStaffIds] = useState([]);

    const showSelectStaffModal = () => {
        setSelectStaffModalVisible(true);
    };
    const hideSelectStaffModal = () => {
        setSelectStaffModalVisible(false);
    };
    useEffect(() => {
        if (selectedShift && selectedShift.staffList) {
            setStaffList(selectedShift.staffList);
        }
    }, [selectedShift]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchStaffIds = async () => {
                try {
                    if (!selectedBranch) return;

                    const q = query(collection(db, "staffs"), where("branch.branchId", "==", selectedBranch.branchId));
                    const querySnapshot = await getDocs(q);

                    const existingStaffIds = querySnapshot.docs.map(doc => doc.id);
                    const filteredStaffIds = existingStaffIds.filter(staffId => !staffList.includes(staffId));

                    setAvailableStaffIds(filteredStaffIds);
                } catch (error) {
                    console.log("Error fetching staff IDs:", error);
                }
            };

            fetchStaffIds();
        }, [selectedBranch, staffList])
    );

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const addStaffToShift = async (newStaffIds) => {
        try {
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
                        if (shift.shiftId === selectedShift.shiftId) {
                            const updatedStaffList = Array.from(new Set([...shift.staffList, ...newStaffIds]));
                            return { ...shift, staffList: updatedStaffList };
                        }
                        return shift;
                    });

                    dayList[existingEntryIndex].shifts = updatedShifts;
                    await updateDoc(branchScheduleRef, { dayList });

                    setStaffList(updatedShifts.find(shift => shift.shiftId === selectedShift.shiftId).staffList);
                }
            }
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Nhân viên đã được thêm thành công",
            });
        } catch (error) {
            console.error('Error adding staff to shift:', error);
        }
    };

    const removeFromShift = async (shiftId, staffIdToRemove) => {
        try {
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

                                    setStaffList(updatedShifts.find(shift => shift.shiftId === shiftId).staffList);
                                }
                            }
                        },
                    },
                ],
                { cancelable: true }
            );
        } catch (error) {
            console.log('Error removing staff from shift:', error);
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
            <AddStaffButton
                onPress={showSelectStaffModal} />
            <SelectStaffModal
                visible={selectStaffModalVisible}
                onClose={() => hideSelectStaffModal()}
                staffList={availableStaffIds}
                onAddStaff={addStaffToShift}
            />
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
