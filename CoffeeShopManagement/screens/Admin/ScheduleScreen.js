import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import ShiftCard from '../../components/Admin/ShiftCard';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { doc, updateDoc, setDoc, getDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { colors } from '../../assets/colors/colors';
import SelectBranchModal from '../../components/Admin/Modal/SelectBranchModal';
import Toast from 'react-native-toast-message';
export default function ScheduleScreen() {
    const navigation = useNavigation();
    const [selectedBranch, setSelectedBranch] = useState();
    const [todaySchedule, setTodaySchedule] = useState([]);
    const [branchList, setBranchList] = useState([]);
    const [selectBranchModalVisible, setSelectBranchModalVisible] = useState(false);
    const [staffList, setStaffList] = useState([]);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (timestamp) => {
        const date = timestamp.toDate();
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const showSelectBranchModal = () => {
        setSelectBranchModalVisible(true);
    };

    const hideSelectBranchModal = () => {
        setSelectBranchModalVisible(false);
    };

    useEffect(() => {
        const loadBranches = async () => {
            try {
                const q = query(
                    collection(db, "branches"),
                );
                const querySnapshot = await getDocs(q);
                const loadBranches = [];
                querySnapshot.forEach((doc) => {
                    loadBranches.push(doc.data());
                });
                setBranchList(loadBranches);
            } catch (error) {
                console.log("Error loading branches:", error);
            }
        };

        loadBranches();
        const unsubscribe = navigation.addListener("focus", () => {
            loadBranches();
        });

        return unsubscribe;
    }, [navigation]);

    const fetchBranchSchedule = async () => {
        try {
            if (!selectedBranch) return;

            const q = query(collection(db, 'shifts'), where('branch.branchId', '==', selectedBranch.branchId));
            const querySnapshot = await getDocs(q);

            const shifts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                shifts.push({
                    shiftId: data.shiftId,
                    shiftName: data.shiftName,
                    startTime: formatTime(data.startTime),
                    endTime: formatTime(data.endTime),
                    staffList: staffList,
                });
            });

            const branchId = selectedBranch.branchId;
            const branchScheduleRef = doc(db, 'branchSchedules', branchId);
            const branchScheduleDoc = await getDoc(branchScheduleRef);

            const todayDate = formatDate(new Date());
            const newScheduleEntry = {
                date: todayDate,
                shifts: shifts,
            };

            if (branchScheduleDoc.exists()) {
                const branchScheduleData = branchScheduleDoc.data();
                const dayList = branchScheduleData.dayList || [];

                const existingEntryIndex = dayList.findIndex((day) => day.date === todayDate);

                if (existingEntryIndex !== -1) {
                    const existingShifts = dayList[existingEntryIndex].shifts;

                    // Calculate working hours for staff members
                    existingShifts.forEach(shift => {
                        shift.staffList.forEach(staffId => {
                            const staffIndex = staffList.findIndex(staff => staff.staffId === staffId);
                            if (staffIndex !== -1) {
                                const shiftDuration = calculateShiftDuration(shift.startTime, shift.endTime);
                                const updatedWorkingHours = staffList[staffIndex].workingHours + shiftDuration;

                                // Update working hours in staffList
                                const updatedStaffList = [...staffList];
                                updatedStaffList[staffIndex] = {
                                    ...updatedStaffList[staffIndex],
                                    workingHours: updatedWorkingHours,
                                };
                                setStaffList(updatedStaffList);
                            }
                        });
                    });
                    
                    setTodaySchedule(dayList[existingEntryIndex].shifts);
                } else {
                    // Entry for today does not exist, add new entry to dayList
                    dayList.push(newScheduleEntry);
                    await updateDoc(branchScheduleRef, { dayList });
                    setTodaySchedule(newScheduleEntry.shifts);
                }
            } else {
                // No existing schedule document, create new with today's entry
                await setDoc(branchScheduleRef, {
                    branchId: branchId,
                    dayList: [newScheduleEntry],
                });
                setTodaySchedule(newScheduleEntry.shifts);
            }

        } catch (error) {
            console.error('Error fetching or updating branch schedule:', error);
        }
    };

    useEffect(() => {
        fetchBranchSchedule();
    }, [selectedBranch, staffList]);

    const calculateShiftDuration = (startTime, endTime) => {
        const start = parseTime(startTime);
        const end = parseTime(endTime);
        const durationInMillis = end.getTime() - start.getTime();
        const durationInHours = durationInMillis / (1000 * 60 * 60); // Convert milliseconds to hours
        return durationInHours;
    };

    const goToDetailShift = (item) => {
        const currentTime = new Date();

        const parseTime = (timeString) => {
            const [hours, minutes] = timeString.split(':').map(Number);
            const date = new Date();
            date.setHours(hours);
            date.setMinutes(minutes);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        };

        const shiftStartTime = parseTime(item.startTime);
        const shiftEndTime = parseTime(item.endTime);

        console.log(shiftStartTime);
        console.log(shiftEndTime);

        if (currentTime >= shiftStartTime && currentTime <= shiftEndTime) {
            Toast.show({
                type: "info",
                text1: "Thông báo",
                text2: "Đang trong ca làm việc, không thể chỉnh sửa",
            });
        } else if (currentTime > shiftEndTime) {
            Toast.show({
                type: "info",
                text1: "Thông báo",
                text2: "Ca làm việc đã kết thúc, không thể chỉnh sửa",
            });
        } else if (currentTime < shiftStartTime) {
            navigation.navigate('DetailShiftScreen', { selectedShift: item, selectedBranch: selectedBranch });
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            if (selectedBranch) {
                fetchBranchSchedule();
            }
        }, [selectedBranch])
    );

    useEffect(() => {
        const fetchStaffs = async () => {
            try {
                const q = query(collection(db, "staffs"), where("branch.branchId", "==", selectedBranch.branchId));
                const querySnapshot = await getDocs(q);

                const staffData = querySnapshot.docs.map(doc => doc.id);
                setStaffList(staffData);
            } catch (error) {
                console.log("Error fetching staff data: ", error);
            }
        };

        fetchStaffs();
    }, [selectedBranch]);


    const renderView = () => {
        if (selectedBranch) {
            return (
                <View style={styles.bodyApp}>
                    <Text style={styles.bodyAppText}>{selectedBranch.branchName}</Text>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={todaySchedule}
                        keyExtractor={item => item.shiftId}
                        renderItem={({ item }) => {
                            return (
                                <ShiftCard item={item} onPress={() => goToDetailShift(item)} quantity={item.staffList.length} />
                            );
                        }}
                    />

                </View>
            );
        } else {
            return (
                <View style={[styles.bodyApp, { justifyContent: "center" }]}>
                    <View style={styles.noBranchSelectContainer}>
                        <Image
                            source={require("../../assets/icons/coffee-shop-location-icon.png")}
                            style={styles.noBranchSelectImage}
                        />
                        <Text style={styles.noBranchSelectText}>
                            Vui lòng chọn chi nhánh trước để xem lịch làm việc!
                        </Text>
                    </View>
                </View>
            );
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.topApp}>
                <View style={[styles.topButton, { marginEnd: '2%' }]}>
                    <FontAwesome name='calendar' size={24} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Hôm nay | {formatDate(new Date())}</Text>
                </View>
                <TouchableOpacity style={styles.topButton} onPress={showSelectBranchModal}>
                    <Icon name='location-pin' size={24} color={'#d22f27'} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Chọn chi nhánh</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {renderView()}
                <SelectBranchModal visible={selectBranchModalVisible} onClose={hideSelectBranchModal} branches={branchList} setBranch={setSelectedBranch} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    topButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: '3%',
        width: '50%'
    },
    topApp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '3%'
    },
    bodyApp: {
        flex: 1,
        paddingBottom: '20%'
    },
    bodyAppText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%',
        fontFamily: "lato-bold",
    },
    noBranchSelectContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    noBranchSelectImage: {
        width: "100%",
        height: "40%",
        marginBottom: 20,
        resizeMode: "contain",
    },
    noBranchSelectText: {
        textAlign: "center",
        color: colors.black_100,
        fontFamily: "lato-bold",
        fontSize: 16,
        lineHeight: 24,
    },
});
