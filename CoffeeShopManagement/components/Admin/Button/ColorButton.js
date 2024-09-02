import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const ColorButton = ({ color, text, textColor, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.colorButton, { backgroundColor: color }]}
            onPress={onPress}
            testID="colorButton"
        >
            <Text style={[styles.title, { color: textColor }]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default ColorButton;

const styles = StyleSheet.create({
    colorButton: {
        borderRadius: 15,
        margin: "2%",
        paddingVertical: "5%",
        paddingHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "3%",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        fontFamily: "lato-bold",
    },
});
