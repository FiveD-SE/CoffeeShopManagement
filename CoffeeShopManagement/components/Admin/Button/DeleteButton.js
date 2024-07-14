import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const DeleteButton = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={onPress}
            testID="deleteButton"
        >
            <MaterialIcons
                name="delete-forever"
                size={24}
                color="#F61A3D"
                testID="deleteIcon"
            />
            <Text style={styles.title}>Xóa</Text>
        </TouchableOpacity>
    );
};

export default DeleteButton;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        margin: "2%",
        paddingVertical: "4%",
        paddingHorizontal: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        flexDirection: "row",
    },
    title: {
        marginLeft: "2%",
        fontSize: 16,
        fontWeight: "700",
        color: "#F61A3D",
        fontFamily: "lato-bold",
    },
});
