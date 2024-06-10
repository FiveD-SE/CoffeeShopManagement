import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const IconButton = ({ iconName, onPress }) => {
    return (
        <TouchableOpacity style={styles.iconButton} onPress={onPress}>
            <Ionicons name={iconName} size={18} />
        </TouchableOpacity>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    iconButton: {
        backgroundColor: colors.white_100,
        borderWidth: 1,
        borderRadius: 30,
        padding: "6%",
        borderColor: colors.grey_50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: colors.grey_100,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 6,
    },
});
