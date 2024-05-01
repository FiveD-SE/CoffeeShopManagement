import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Entypo'
import Checkbox from 'expo-checkbox'

export default function ShiftCard2({ item }) {
    const [toggleCheckBox, setToggleCheckBox] = useState(true)
    return (
        <TouchableOpacity style={styles.cardWrapper}>
            <View>
                <Text style={styles.nameShift}>{item.nameShift}</Text>
                <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                    <Feather name='clock' size={20} color={'#9c9c9c'} />
                    <View style={styles.timeWrapper}>
                        <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                    </View>
                </View>
            </View>
            <Checkbox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardWrapper: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: '5%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '3%'
    },
    timeWrapper: {
        backgroundColor: '#f2f8f7',
        padding: '2%',
        borderRadius: 20,
        paddingHorizontal: '5%',
        marginStart: '3%'
    },
    nameShift: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
    },
    timeText: {
        color: '#006c5e',
    },
    quantityText: {
        color: '#9c9c9c'
    }
})