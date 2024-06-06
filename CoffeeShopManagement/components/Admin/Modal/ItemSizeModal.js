import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import { colors } from '../../../assets/colors/colors';

const ItemSizeModal = ({ visible, onClose, setSize }) => {
    const [selectedTypes, setSelectedTypes] = useState({
        smallEnabled: false,
        mediumEnabled: false,
        largeEnabled: false,
    });
    const handleSelectType = (type) => {
        setSelectedTypes(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };
    const handleSave = () => {
        if (!selectedTypes.smallEnabled && !selectedTypes.mediumEnabled && !selectedTypes.largeEnabled) {
            setSize(null);
        }
        else {
            setSize(selectedTypes);
            onClose();
        }
    }
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
                                onPress={() => handleSelectType("smallEnabled")}
                                style={[styles.buttonContainer, { backgroundColor: selectedTypes.smallEnabled ? colors.green_20 : "#ffffff" }]}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Nhỏ</Text>
                                <Text style={styles.title}>+0đ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectType("mediumEnabled")}
                                style={[styles.buttonContainer, { backgroundColor: selectedTypes.mediumEnabled ? colors.green_20 : "#ffffff" }]}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Trung bình</Text>
                                <Text style={styles.title}>+5.000đ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handleSelectType("largeEnabled")}
                                style={[styles.buttonContainer, { backgroundColor: selectedTypes.largeEnabled ? colors.green_20 : "#ffffff" }]}>
                                <Image
                                    source={require("../../../assets/coffee-cup.png")} />
                                <Text style={styles.title}>Lớn</Text>
                                <Text style={styles.title}>+10.000đ</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Lưu</Text>
                        </TouchableOpacity>
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
        height: "34%",
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
    },
    saveButton: {
        backgroundColor: '#00A188',
        borderRadius: 10,
        paddingVertical: "4%",
        paddingHorizontal: "5%",
        alignItems: 'center',
        marginVertical: "5%",
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    }
});