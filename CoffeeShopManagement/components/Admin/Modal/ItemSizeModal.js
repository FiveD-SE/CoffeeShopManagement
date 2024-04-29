import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'

const ItemSizeModal = ({ visible, onClose }) => {
    const [selectedTypes, setSelectedTypes] = useState({
        small: false,
        medium: false,
        large: false,
    });
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title="Chọn kích cỡ" onClose={onClose} />
                    <ScrollView style={styles.main}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.buttonContainer}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Nhỏ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Trung bình</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Lớn</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal >
    )
}

export default ItemSizeModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#F8F7FA",
        borderRadius: 20,
        width: "90%",
        height: "24%",
    },
    imageContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center"
    },
    main: {
        paddingHorizontal: "3%",
        marginTop: "3%",
    },
    header: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "600",
        marginVertical: "4%"
    },
    title: {
        marginTop: "3%",
        color: "#3a3a3a",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: "1%",
        padding: "5%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ECECEC"
    }
});