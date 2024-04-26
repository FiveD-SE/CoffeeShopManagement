import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Entypo'
import ShiftCard from '../../components/Admin/ShiftCard'
import { useNavigation } from '@react-navigation/native'
export default function ScheduleScreen() {
    const DATA = [
        {
            idShift: '1',
            nameShift: 'Ca sáng',
            startTime: '7:00',
            endTime: '8:00',
            quantity: 100,
        },
        {
            idShift: '2',
            nameShift: 'Ca sáng',
            startTime: '7:00',
            endTime: '8:00',
            quantity: 100,
        },
        {
            idShift: '3',
            nameShift: 'Ca sáng',
            startTime: '7:00',
            endTime: '8:00',
            quantity: 100,
        },
        {
            idShift: '4',
            nameShift: 'Ca sáng',
            startTime: '7:00',
            endTime: '8:00',
            quantity: 100,
        }
    ]
    const navigation = useNavigation();
    const goToDetailShift = () => {
        navigation.navigate('DetailShift')
    }
    return (
        <View style={styles.container}>
            <View style={styles.topApp}>
                <TouchableOpacity style={[styles.topButton, { marginEnd: '2%' }]}>
                    <FontAwesome name='calendar' size={24} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Hôm nay | 18/03/2024</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.topButton}>
                    <Icon name='location-pin' size={24} color={'#d22f27'} />
                    <Text style={{ fontSize: 13, marginStart: '2%', fontWeight: '600' }}>Chọn chi nhánh</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bodyApp}>
                <Text style={styles.bodyAppText}>Tên chi nhánh</Text>
                <FlatList
                    data={DATA}
                    keyExtractor={item => item.idShift}
                    renderItem={({ item, onPress }) => (
                        <ShiftCard item={item} onPress={goToDetailShift} />
                    )} />
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

    },
    bodyAppText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
    }
})