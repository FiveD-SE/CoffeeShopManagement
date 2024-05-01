import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

export default function SelectPositionButton() {
    return (
        <TouchableOpacity style={styles.addButton} onPress={{}}>
            <FontAwesome name="map-marker" size={24} color="#D22F27" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#fff",
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
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
