import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import SquareWithBorder from '../SquarewithBorder'
import ColorButton from '../Button/ColorButton'
import DeleteButton from '../Button/DeleteButton'
import { db } from '../../../services/firebaseService'
import { collection, doc, updateDoc, deleteDoc } from "firebase/firestore"; 

const EditGoodInfoModal = ({ visible, onClose, selectedGoods }) => {
    const [image, setImage] = useState(selectedGoods?.goodsImage);
    const [name, setName] = useState(selectedGoods?.goodsName);
    const [unit, setUnit] = useState(selectedGoods?.goodsUnit);
    const [price, setPrice] = useState(selectedGoods?.goodsPrice);

    useEffect(() => {
        setImage(selectedGoods?.goodsImage);
        setName(selectedGoods?.goodsName);
        setUnit(selectedGoods?.goodsUnit);
        setPrice((selectedGoods?.goodsPrice || 0).toString());
    }
    , [selectedGoods]);

    useEffect(() => {
        setImage(selectedGoods?.goodsImage);
        setName(selectedGoods?.goodsName);
        setUnit(selectedGoods?.goodsUnit);
        setPrice((selectedGoods?.goodsPrice || 0).toString());
    }
    , [selectedGoods]);


    const handleSave = async () => {
        if (!image || !name || !unit || !price) {
            Alert.alert("Cảnh báo", "Hãy điền đầy đủ thông tin.");
            return;
        }
        if (image === selectedGoods?.goodsImage && name === selectedGoods?.goodsName && unit === selectedGoods?.goodsUnit && price === selectedGoods?.goodsPrice) {
            onClose();
        }
        try {
            const goodsDoc = doc(db, 'goods', selectedGoods?.goodsId);
            await updateDoc(goodsDoc, {
                goodsImage: image,
                goodsName: name,
                goodsUnit: unit,
                goodsPrice: price,
            });
            onClose();
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    }

    const handleDelete = async () => {
        Alert.alert(
            "Xác nhận",
            "Bạn có chắc muốn xóa mặt hàng này không?",
            [
                { text: "Hủy", style: "cancel" },
                { 
                    text: "Xác nhận", 
                    onPress: async () => {
                        try {
                            const goodsDoc = doc(db, 'goods', selectedGoods?.goodsId);
                            await deleteDoc(goodsDoc);
                            onClose();
                        } catch (error) {
                            console.error("Error removing document: ", error);
                        }
                    } 
                }
            ]
        );
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
                    <ModalHeader title="Chỉnh sửa thông tin mặt hàng" onClose={onClose} />
                    <View style={styles.main}>
                        <View style={styles.imageContainer}>
                            <SquareWithBorder text="Ảnh mặt hàng" selectedImage={image} onImageSelected={setImage}/>                        
                        </View>
                        <Text style={styles.header}>Thông tin mặt hàng</Text>
                        <View style={styles.inputContainer}>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Tên mặt hàng"
                                    onChangeText={(newText) => setName(newText)}
                                    value={name}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Đơn vị"
                                    onChangeText={(newText) => setUnit(newText)}
                                    value={unit}
                                />
                            </View>
                            <View style={styles.inputBox}>
                                <TextInput
                                    keyboardType="phone-pad"
                                    style={styles.input}
                                    placeholder="Giá nhập mới"
                                    onChangeText={(newText) => setPrice(newText)}
                                    value={price}
                                />
                            </View>
                        </View>
                        <DeleteButton OnPress={handleDelete}/>
                        <ColorButton color="#00A188" text="Lưu" textColor="#ffffff" OnPress={handleSave}/>
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
        height: "auto",
    },
    imageContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center"
    },
    main: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		borderRadius: 20,
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
        width: "100%",
        fontWeight: "400",
    },
});