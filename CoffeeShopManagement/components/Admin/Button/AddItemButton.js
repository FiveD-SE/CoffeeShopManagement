import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AddItemButton() {
    const navigation = useNavigation();

    const goToAddItemScreen = () => {
        navigation.navigate("AdminAddItem");
    };

    return (
        <TouchableOpacity
            style={styles.addButton}
            onPress={goToAddItemScreen}
        >
            <Ionicons name="add" size={24} color="#006C5E" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#fff",
        width: "100%",
        padding: 10,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(58, 58, 58, 0.10)",
        boxShadow: "1px 3px 2px 0px rgba(0, 0, 0, 0.05)",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginRight: 10,
    },
    addButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});
