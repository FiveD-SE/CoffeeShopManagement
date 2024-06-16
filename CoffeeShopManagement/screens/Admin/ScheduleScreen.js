import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import ShiftCard from '../../components/Admin/ShiftCard';
import { useNavigation } from '@react-navigation/native';
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseService";

export default function ScheduleScreen() {
    const navigation = useNavigation();
    const [selectedBranch, setSelectedBranch] = useState('H21mgNlSv8Q30Om4s043');
    const [todaySchedule, setTodaySchedule] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const hii = () => {
        setSelectedBranch('H21mgNlSv8Q30Om4s043');
    };

    useEffect(() => {
        const fetchBranchSchedule = async () => {
            try {
                if (!selectedBranch) return;

                const branchId = selectedBranch;
                const branchScheduleRef = doc(db, 'branchSchedules', branchId);
                const branchScheduleDoc = await getDoc(branchScheduleRef);

                const todayDate = formatDate(new Date());
                const newScheduleEntry = {
                    date: todayDate,
                    shifts: [
                        {
                            idShift: '1',
                            nameShift: 'Ca sáng',
                            startTime: '7:00',
                            endTime: '8:00',
                            quantity: 100,
                        },
                        // Add other shifts as needed
                    ],
                };

                if (branchScheduleDoc.exists()) {
                    const branchScheduleData = branchScheduleDoc.data();
                    const dayList = branchScheduleData.dayList || [];

                    const existingEntryIndex = dayList.findIndex((day) => day.date === todayDate);

                    if (existingEntryIndex !== -1) {
                        // Entry for today already exists
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

                setLoading(false);
            } catch (error) {
                console.error('Error fetching or updating branch schedule:', error);
                // Implement error handling as needed
            }
        };

        fetchBranchSchedule();
    }, [selectedBranch]);

    const goToDetailShift = (item) => {
        navigation.navigate('DetailShift', { selectedShift: item });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.topApp}>
                <TouchableOpacity style={[styles.topButton, { marginEnd: '2%' }]}>
                    <FontAwesome name='calendar' size={24} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Hôm nay | {formatDate(new Date())}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton} onPress={hii}>
                    <Icon name='location-pin' size={24} color={'#d22f27'} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Chọn chi nhánh</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bodyApp}>
                <Text style={styles.bodyAppText}>Tên chi nhánh</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={todaySchedule}
                    keyExtractor={item => item.idShift}
                    renderItem={({ item }) => (
                        <ShiftCard item={item} onPress={() => goToDetailShift(item)} />
                    )}
                />
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
        borderRadius: 20,
        padding: '3%',
        width: '50%'
    },
    topApp: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '3%'
    },
    bodyApp: {
        paddingBottom: '20%'
    },
    bodyAppText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%',
    }
});
