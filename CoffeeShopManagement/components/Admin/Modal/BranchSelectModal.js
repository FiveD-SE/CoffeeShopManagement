import { View, Text, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import { FontAwesome5, Entypo, MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import BranchCard from '../Card/BranchCard';
import SearchBar from '../../Client/SearchBar';

const BranchSelectModal = ({ visible, onClose }) => {
    const DATA = [
        {
            id: 1,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D1",
            distance: "3.3",
            image: require("../../../assets/images/branch1.jpg"),
        },
        {
            id: 2,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D2",
            distance: "3.3",
            image: require("../../../assets/images/branch1.jpg"),
        },
        {
            id: 3,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D3",
            distance: "3.3",
            image: require("../../../assets/images/branch1.jpg"),
        },
        {
            id: 4,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D4",
            distance: "3.3",
            image: require("../../../assets/images/branch1.jpg"),
        },
        {
            id: 5,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D4",
            distance: "3.3",
            image: require("../../../assets/images/branch1.jpg"),
        },
        {
            id: 6,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D4",
            distance: "3.3",
            image: require("../../../assets/images/branch1.jpg"),
        },
    ];

    const renderBranchList = () => {
        return DATA.map((item, index) => (
            <BranchCard
                key={index}
                storeName={item.storeName}
                branchName={item.branchName}
                distance={item.distance}
                image={item.image}
            />
        ));
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose} >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title="Chi nhánh" onClose={onClose} />
                    <View style={styles.addressContainer}>
                        <TouchableOpacity style={[styles.addressButtonContainer, { borderRightWidth: 1 }]}>
                            <Text style={styles.text}>Tỉnh/Thành phố</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#CCCCCC" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addressButtonContainer}>
                            <Text style={styles.text}>Quận/Huyện</Text>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#CCCCCC" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.main}>
                        <View style={{ flexDirection: "row" }}>
                            <SearchBar />
                        </View>
                        <ScrollView style={{ marginTop: "2%" }} showsVerticalScrollIndicator={false}>
                            {renderBranchList()}
                        </ScrollView>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default BranchSelectModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalContent: {
        backgroundColor: "#F8F7FA",
        borderRadius: 20,
        width: "90%",
        height: "75%",
    },
    imageContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center"
    },
    main: {
        paddingHorizontal: "3%",
        marginTop: "3%",
        marginBottom: "46%"
    },
    text: {
        color: "#CCCCCC",
        fontSize: 16,
        fontWeight: "500",
    },
    title: {
        color: "#3a3a3a",
        marginLeft: "5%",
        fontSize: 18,
        fontWeight: "600",
    },
    checkbox: {
        borderRadius: 5
    },
    addressContainer: {
        alignItems: 'center',
        flexDirection: "row"
    },
    addressButtonContainer: {
        flex: 1,
        padding: "3%",
        flexDirection: "row",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "space-evenly",
        borderBottomWidth: 1,
        borderColor: "#CCCCCC"
    },
});