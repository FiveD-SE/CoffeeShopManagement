import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Entypo'

export default function ShiftCard({ item, onPress, quantity }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.cardWrapper}>
            <View>
                <Text style={styles.nameShift}>{item.shiftName}</Text>
                <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                    <Feather name='clock' size={20} color={'#9c9c9c'} />
                    <View style={styles.timeWrapper}>
                        <Text style={styles.timeText}>{item.startTime} - {item.endTime}</Text>
                    </View>
                </View>
                <Text style={styles.quantityText}>Số nhân viên trong ca: {quantity}</Text>
            </View>
            <Icon name='chevron-small-right' size={32} color={'#9c9c9c'} />
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
        marginBottom: '3%',
        fontFamily: 'lato-bold'
    },
    timeText: {
        color: '#006c5e',
        fontFamily: 'lato-regular'
    },
    quantityText: {
        color: '#9c9c9c',
        fontFamily: 'lato-regular'
    }
})