import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Checkbox from 'expo-checkbox';
import { Feather } from "@expo/vector-icons";

const BranchCard = ({ storeName,
    branchName,
    address,
    image,
    onPress,
    openingHour,
    closingHour, }) => {

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
        <Pressable style={styles.root} onPress={onPress}>
            <View style={styles.image}>
                <Image source={image} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.title}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <Text style={styles.branchName}>{branchName}</Text>
                    <Text style={styles.address}>Địa chỉ: {address}</Text>
                    <View style={{ flexDirection: 'row', alignItems: "center" }}>
                        <Feather name='clock' size={20} color={'#9c9c9c'} />
                        <View style={styles.timeWrapper}>
                            <Text style={styles.timeText}>{formatTime(convertTimestampToDate(openingHour))} - {formatTime(convertTimestampToDate(closingHour))}</Text>
                        </View>
                    </View>
                </View>
            </View>

        </Pressable>
    )
}

export default BranchCard

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        width: "100%",
        padding: 15,
        alignItems: "center",
        rowGap: 15,
        columnGap: 15,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 1)",
        marginBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
        flexShrink: 0,
        borderRadius: 5,
        backgroundColor: "rgba(203, 203, 212, 1)",
    },
    storeName: {
        color: "#9c9c9c",
        textAlign: "center",
        fontFamily: "lato-light",
        fontSize: 10,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 12,
        textTransform: "uppercase",
    },
    branchName: {
        color: "#3A3A3A",
        textAlign: "center",
        fontFamily: "lato-bold",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",

    },
    content: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        alignSelf: "stretch",
    },
    title: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    address: {
        color: "#3a3a3a",
        fontFamily: "lato-regular",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "500",
        marginBottom:"3%"
    },
    timeText: {
        color: '#006c5e',
    },
    timeWrapper: {
        backgroundColor: '#f2f8f7',
        padding: '2%',
        borderRadius: 20,
        paddingHorizontal: '5%',
        marginStart: '3%'
    },
});