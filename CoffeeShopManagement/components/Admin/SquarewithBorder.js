import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const SquareWithBorder = ({ text }) => {
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.content}>
                <Entypo name="plus" size={24} color="#9D9D9D" />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#9D9D9D",
        borderRadius: 10,
        paddingHorizontal: "4%",
        paddingVertical: "8%",
        borderStyle: "dashed",
        alignItems: "center"
    },
    content: {
        flexDirection: "column",
        alignItems: "center",
    },
    text: {
        color: "#9D9D9D",
        fontSize: 14,
        fontWeight: "600",
        marginTop: "2%"
    },
});

export default SquareWithBorder;
