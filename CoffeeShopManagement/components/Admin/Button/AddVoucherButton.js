import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function AddVoucherButton() {
    const navigation = useNavigation();

    const goToAddVoucherScreen = () => {
        navigation.navigate("AdminAddVoucher");
    };

    return (
        <TouchableOpacity
            style={styles.addButton}
            onPress={goToAddVoucherScreen}
            testID="addVoucherButton"
        >
            <Ionicons name="add" size={24} color="#006C5E" testID="addIcon" />
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
