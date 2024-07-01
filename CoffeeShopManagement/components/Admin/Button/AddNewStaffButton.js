import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import { Entypo, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { colors } from '../../../assets/colors/colors';


const AddNewStaffButton = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPress}>
                <View style={styles.titleContainer}>
                    <FontAwesome6 name="people-group" size={30} color="#FFA730" />
                    <Text style={styles.title}>Thêm nhân viên mới</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={36} color="#3a3a3a" />
            </TouchableOpacity>
        </View>
    )
}

export default AddNewStaffButton

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
        color: "#3a3a3a",
        fontSize: 17,
        fontWeight: "600",
        marginLeft: "10%",
        fontFamily: "lato-bold"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    }
});