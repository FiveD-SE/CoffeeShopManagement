import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'

const ItemSizeModal = ({ visible, onClose }) => {
    const [selectedTypes, setSelectedTypes] = useState({
        small: false,
        medium: false,
        large: false,
    });
    const handleSelectType = (type) => {
        setSelectedTypes(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };
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
                    <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                                onPress={() => handleSelectType("small")}
                                style={[styles.buttonContainer, { backgroundColor: selectedTypes.small ? "#D3D3D3" : "#ffffff" }]}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Nhỏ</Text>
                                <Text style={styles.title}>+0đ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectType("medium")}
                                style={[styles.buttonContainer, { backgroundColor: selectedTypes.medium ? "#D3D3D3" : "#ffffff" }]}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Trung bình</Text>
                                <Text style={styles.title}>+5.000đ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectType("large")}
                                style={[styles.buttonContainer, { backgroundColor: selectedTypes.large ? "#D3D3D3" : "#ffffff" }]}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Lớn</Text>
                                <Text style={styles.title}>+10.000đ</Text>
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