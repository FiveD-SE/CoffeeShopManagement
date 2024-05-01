import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../Client/Header/ModalHeader'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SettingSalaryModal = ({ visible, onClose, roleName }) => {
    const [modalHeight, setModalHeight] = useState('40%'); // Kích thước mặc định của modal

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            // Khi bàn phím xuất hiện, giảm kích thước của modal
            setModalHeight('70%');
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // Khi bàn phím ẩn đi, khôi phục kích thước mặc định của modal
            setModalHeight('40%');
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { height: modalHeight }]}>
                    <ModalHeader title="Thiết lập mức lương" onClose={onClose} />
                    <View style={styles.bodyModal}>
                        <Text style={styles.roleName}>{roleName}</Text>
                        <TextInput
                            placeholder='Mức lương mới'
                            placeholderTextColor={'#3a3a3a'}
                            padding={'3%'}
                            style={styles.addSalary} />
                        <TouchableOpacity style={styles.deleteButton}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Ionicons name='trash-outline' size={32} color={'#f61a3d'} />
                                <Text style={{ marginStart: '2%', fontSize: 16, fontWeight: '600', color: '#f61a3d' }}>Xoá vai trò</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButton}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
    },
    bodyModal: {
        padding: '5%'
    },
    roleName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
    },
    addSalary: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        marginBottom: '5%'
    },
    deleteButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 20,
        marginBottom: '5%',
        padding: '3%'
    },
    acceptButton: {
        borderRadius: 10,
        backgroundColor: '#006c5e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%'
    }
})

export default SettingSalaryModal