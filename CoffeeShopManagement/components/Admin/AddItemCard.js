import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const AddItemCard = ({ type, title, OnPress}) => {
    let icon;
    if (type === 'item') {
        icon = <MaterialIcons name="add-box" size={30} color="#FFA730" />
    } else if (type === 'voucher') {
        icon = <Entypo name="ticket" size={30} color="#F61A3D" />
    }
    return (
        <TouchableOpacity style={styles.container} onPress={OnPress}>
            <View style={styles.titleContainer}>
                {icon}
                <Text style={styles.title}>{title}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={36} color="#3a3a3a" />
        </TouchableOpacity>
    )
}

export default AddItemCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        marginLeft: "10%"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    }
});