import { Text, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from '@expo/vector-icons';

const CustomChooseButton = ({ onFocus, OnPress, title }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={OnPress}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#3a3a3a" />
        </TouchableOpacity>
    );
};

export default CustomChooseButton;

const styles = StyleSheet.create({
    title: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "400",
        marginRight: "10%"
    },
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: "5%",
        paddingVertical: "3%",
        borderRadius: 10,
        backgroundColor: "#ffffff",
        justifyContent: "space-between"
    },

});
