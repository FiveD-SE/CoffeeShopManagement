import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ModalHeader from '../Client/Header/ModalHeader'
import Ionicons from 'react-native-vector-icons/Ionicons'

const DeleteStaffModal = ({ visible, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title="Thiết lập mức lương" onClose={onClose} />
                    <View style={styles.bodyModal}>
                        <View style={styles.textWrapper}>
                            <Text style={styles.notiText}>Xác nhận xoá nhân viên?</Text>
                        </View>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#006c5e' }]}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>Xác nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#f73755' }]}>
                                <Text style={{ fontSize: 20, color: '#fff' }}>Huỷ</Text>
                            </TouchableOpacity>
                        </View>
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        height: "35%",
    },
    bodyModal: {
        padding: '5%'
    },
    textWrapper: {
        marginTop: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20%'
    },
    notiText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#f73755'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 10,
        backgroundColor: 'red',
        padding: '5%',
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default DeleteStaffModal