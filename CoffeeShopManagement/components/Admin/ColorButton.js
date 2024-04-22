import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const ColorButton = (
    {
        color,
        text,
        textColor
    }) => {
    return (
        <TouchableOpacity style={[styles.colorButton, { backgroundColor: color }]}>
            <Text style={[styles.title, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default ColorButton

const styles = StyleSheet.create({
    colorButton: {
        borderRadius: 15,
        margin: "2%",
        paddingVertical: "4%",
        paddingHorizontal: "8%",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 14,
        fontWeight: "700",
    }
});