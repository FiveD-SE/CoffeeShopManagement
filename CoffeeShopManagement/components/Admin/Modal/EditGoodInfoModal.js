import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import SquareWithBorder from '../SquarewithBorder'
import ColorButton from '../ColorButton'
import DeleteButton from '../DeleteButton'

const EditGoodInfoModal = ({ visible, onClose }) => {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title="Chỉnh sửa thông tin mặt hàng" onClose={onClose} />
                    <View style={styles.main}>
                        <View style={styles.imageContainer}>
                            <SquareWithBorder text="Ảnh mặt hàng" />
                        </View>
                        <Text style={styles.header}>Thông tin mặt hàng</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tên mặt hàng"
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Đơn vị"
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Giá nhập mới"
                                />
                            </View>
                        </View>
                        <DeleteButton />
                        <ColorButton color="#00A188" text="Lưu" textColor="#ffffff" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EditGoodInfoModal

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
        height: "69%",
    },
    imageContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center"
    },
    main: {
        paddingHorizontal: "5%",
        marginBottom: "10%",
        backgroundColor:"#F8F7FA",
    },
    header: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "600",
        marginVertical: "4%"
    },
    inputContainer: {
        flexDirection: "column",
        marginBottom: "5%",

    },
    inputBox: {
        marginVertical: "2%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ECECEC",
        paddingHorizontal: "5%",
        paddingVertical: "2%",
        backgroundColor: "#ffffff"
    },
    input: {
        color: "#9D9D9D",
        fontSize: 15,
        fontWeight: "400",
    },
});