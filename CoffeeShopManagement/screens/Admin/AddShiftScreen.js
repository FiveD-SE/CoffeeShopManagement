import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import ShiftCard2 from '../../components/Admin/ShiftCard2'

export default function AddShiftScreen() {
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
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Các ca làm việc sẵn có</Text>
            <FlatList
                data={DATA}
                keyExtractor={item => item.idShift}
                renderItem={({ item }) => (
                    <ShiftCard2 item={item} />
                )}
            />
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
        marginBottom: '5%'
    }
})