import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, {useState} from 'react'
import { Entypo, MaterialIcons } from '@expo/vector-icons';

import AddNewGoodModal from './Modal/AddNewGoodModal';

const AddGoodButton = ({ title}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const showAddNewGoodModal = () => {
        setModalVisible(true);
    };

    const hideAddNewGoodModal = () => {
        setModalVisible(false);
    };
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={showAddNewGoodModal}>
                <View style={styles.titleContainer}>
                    <MaterialIcons name="add-box" size={30} color="#FFA730" />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <MaterialIcons name="keyboard-arrow-right" size={36} color="#3a3a3a" />
            </TouchableOpacity>
            <AddNewGoodModal visible={modalVisible} onClose={hideAddNewGoodModal} />
        </View>
    )
}

export default AddGoodButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        fontWeight: "600",
        marginLeft: "10%"
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    }
});