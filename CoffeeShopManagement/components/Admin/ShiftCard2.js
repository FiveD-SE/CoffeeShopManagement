import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/Entypo'
import Checkbox from 'expo-checkbox'
import { MaterialIcons } from '@expo/vector-icons'

export default function ShiftCard2({ item, onPress }) {
    const convertTimestampToDate = (timestamp) => {
        const isSeconds = timestamp.seconds !== undefined;

        const ts = isSeconds ? timestamp.seconds * 1000 : timestamp;

        const date = new Date(ts);

        return date;
    };

    const formatTime = (date) => {
        if (date === undefined) {
            return "";
        }
        else {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
    };
    return (
        <TouchableOpacity style={styles.cardWrapper} onPress={onPress}>
            <View>
                <Text style={styles.nameShift}>{item.shiftName}</Text>
                <View style={{ marginBottom: "3%" }}>
                    <Text style={styles.input}>{item.branch.branchName}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Feather name='clock' size={20} color={'#9c9c9c'} />
                    <View style={styles.timeWrapper}>
                        <Text style={styles.timeText}>{formatTime(convertTimestampToDate(item.startTime))} - {formatTime(convertTimestampToDate(item.endTime))}</Text>
                    </View>
                </View>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="rgba(58,58,58,0.5)" />
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
        marginStart: '3%',
    },
    nameShift: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "lato-bold"
    },
    timeText: {
        color: "#00A188",
        fontSize: 15,
        fontWeight: "500",
        fontFamily: "lato-regular"
    },
    input: {
        color: "#3a3a3a",
        fontSize: 15,
        fontWeight: "500",
        flex: 1,
        fontFamily: "lato-regular"
    },
})