import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Entypo'
import ShiftCard from '../../components/Admin/ShiftCard'
import { useNavigation } from '@react-navigation/native'
export default function ScheduleScreen() {
    const DATA = [
        {
            'shift': [
                {
                    idShift: '1',
                    nameShift: 'Ca sáng',
                    startTime: '7:00',
                    endTime: '8:00',
                    quantity: 100,
                },
                {
                    idShift: '2',
                    nameShift: 'Ca tối',
                    startTime: '7:00',
                    endTime: '8:00',
                    quantity: 100,
                },
                {
                    idShift: '3',
                    nameShift: 'Ca khuya',
                    startTime: '7:00',
                    endTime: '8:00',
                    quantity: 100,
                },
                {
                    idShift: '4',
                    nameShift: 'Ca chiều',
                    startTime: '7:00',
                    endTime: '8:00',
                    quantity: 100,
                },
                {
                    idShift: '5',
                    nameShift: 'Ca chiều',
                    startTime: '7:00',
                    endTime: '8:00',
                    quantity: 100,
                }
            ],
            'staff': [
                {
                    idShift: '1',
                    id: "123456",
                    name: "Tánh Trần",
                    SDT: "0352085655",
                    role: "Nhân viên",
                },
                {
                    idShift: '1',
                    id: "123457",
                    name: "Tánh Chan",
                    SDT: "0352085656",
                    role: "Nhân viên",
                },
                {
                    idShift: '1',
                    id: "123458",
                    name: "Tánh hello",
                    SDT: "0352085657",
                    role: "Nhân viên",
                },
                {
                    idShift: '1',
                    id: "123459",
                    name: "Tánh Dep Trai",
                    SDT: "0352085658",
                    role: "Nhân viên",
                },
                {
                    idShift: '1',
                    id: "123",
                    name: "Tánh Phan",
                    SDT: "0352085658",
                    role: "Nhân viên",
                },
                {
                    idShift: '1',
                    id: "124",
                    name: "Tánh Luu",
                    SDT: "0352085658",
                    role: "Nhân viên",
                },
                {
                    idShift: '3',
                    id: "125",
                    name: "Tánh Nguyen",
                    SDT: "0352085658",
                    role: "Nhân viên",
                },
                {
                    idShift: '3',
                    id: "126",
                    name: "Tánh Truong",
                    SDT: "0352085658",
                    role: "Nhân viên",
                },
            ]
        }
    ]
    const navigation = useNavigation();
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const goToDetailShift = (item) => {
        const { idShift } = item; // Trích xuất idShift từ item

        const selectedStaff = DATA[0].staff.filter(staff => staff.idShift === idShift);

        navigation.navigate('DetailShift', { selectedStaff: selectedStaff })
    }
    return (
        <View style={styles.container}>
            <View style={styles.topApp}>
                <TouchableOpacity style={[styles.topButton, { marginEnd: '2%' }]}>
                    <FontAwesome name='calendar' size={24} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Hôm nay | {formatDate(new Date())}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton}>
                    <Icon name='location-pin' size={24} color={'#d22f27'} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Chọn chi nhánh</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bodyApp}>
                <Text style={styles.bodyAppText}>Tên chi nhánh</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={DATA[0].shift}
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
})