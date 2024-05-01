import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ColorButton = (
    {
        color,
        text,
        textColor,
        OnPress
    }) => {
    return (
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: color }]}  onPress={OnPress}>
            <Text style={[styles.title, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ColorButton

const styles = StyleSheet.create({
    colorButton: {
        borderRadius: 15,
        margin: "2%",
        paddingVertical: "5%",
        paddingHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
    }
});