import React, { useState } from "react";
import { Text, StyleSheet, Image, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AddShiftModal from "../../components/Admin/AddShiftModal";

export default function AddShiftButton2() {
    const [modalVisible, setModalVisible] = useState(false);

    const showAddShiftModal = () => {
        setModalVisible(true);
    };

    const hideAddShiftModal = () => {
        setModalVisible(false);
    };
    return (
        <View style={styles.addButton}>
            <TouchableOpacity
                onPress={showAddShiftModal}
            >
                <Ionicons name="add" size={24} color="#006C5E" />
            </TouchableOpacity>
            <AddShiftModal visible={modalVisible} onClose={hideAddShiftModal} />
        </View>
    );
}

const styles = StyleSheet.create({
    addButton: {
        backgroundColor: "#fff",
        padding: '5%',
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
