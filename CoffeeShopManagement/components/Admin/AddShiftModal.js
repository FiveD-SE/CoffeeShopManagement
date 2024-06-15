import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../Client/Header/ModalHeader'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import ColorButton from './Button/ColorButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db, uploadImageToFirebase } from "../../services/firebaseService";
import { MaterialIcons } from '@expo/vector-icons'

const AddShiftModal = ({ visible, onClose }) => {
    const [modalHeight, setModalHeight] = useState('50%'); // Kích thước mặc định của modal

    const [shiftName, setShiftName] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [selectStartTimePickerShow, setSelectStartTimePickerShow] = useState(false);
    const [isStartTimeChange, setIsStartTimeChange] = useState(false);

    const [endTime, setEndTime] = useState(new Date());
    const [selectEndTimePickerShow, setSelectEndTimePickerShow] = useState(false);
    const [isEndTimeChange, setIsEndTimeChange] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            // Khi bàn phím xuất hiện, giảm kích thước của modal
            setModalHeight('60%');
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            // Khi bàn phím ẩn đi, khôi phục kích thước mặc định của modal
            setModalHeight('50%');
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    const showStartTimePicker = () => {
        setSelectStartTimePickerShow(true);
    };

    const onStartTimePickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectStartTimePickerShow(false);
        setStartTime(currentDate);
        setIsStartTimeChange(true);
    };

    const showEndTimePicker = () => {
        setSelectEndTimePickerShow(true);
    };

    const onEndTimePickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectEndTimePickerShow(false);
        setEndTime(currentDate);
        setIsEndTimeChange(true);
    };

    const formatTime = (date) => {
        if (date === undefined) {
            return "";
        }
        else {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
    };

    useEffect(() => {
        if (visible) {
            resetForm();
        }
    }, [visible]);

    const resetForm = () => {
        setShiftName('');
        setStartTime(new Date());
        setEndTime(new Date());
        setIsStartTimeChange(false);
        setIsEndTimeChange(false);
    };

    const handleCancel = () => {
        resetForm();
        onClose();
    };

    const handleAddShift = async () => {
        let errorMessage = null;
        if (!shiftName) {
            errorMessage = "Vui lòng nhập tên ca làm";
        }
        else if (!isStartTimeChange) {
            errorMessage = "Vui lòng chọn giờ bắt đầu";
        }

        else if (!isEndTimeChange) {
            errorMessage = "Vui lòng chọn giờ kết thúc";
        }

        if (errorMessage) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: errorMessage,
                text1Style: {
                    fontSize: 16,
                },
                text2Style: {
                    fontSize: 12,
                },
            });
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "shifts"), {
                shiftName: shiftName,
                startTime: startTime,
                endTime: endTime,
                dateCreated: new Date(),
            });
            const shiftId = docRef.id;

            await updateDoc(doc(collection(db, "shifts"), shiftId), {
                shiftId: shiftId,
            });

            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Ca làm việc đã được thêm mới",
            });
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Có lỗi xảy ra khi thêm ca làm",
            });
        }

        resetForm();
        onClose();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { height: modalHeight }]}>
                    <ModalHeader title="Ca làm việc mới" onClose={onClose} />
                    <View style={styles.bodyModal}>
                        <Text style={styles.header}>Thông tin ca làm việc</Text>
                        <View style={styles.inputBox}>
                            <TextInput
                                placeholder='Tên ca mới'
                                placeholderTextColor={'#3a3a3a'}
                                style={styles.input}
                                value={shiftName}
                                onChangeText={(text) => {
                                    setShiftName(text)
                                }} />
                        </View>

                        <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <Text style={styles.input}>Chi nhánh áp dụng</Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <MaterialIcons
                                    name="keyboard-arrow-right"
                                    size={30}
                                    color="#CCCCCC"
                                />
                            </View>
                        </TouchableOpacity>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: '3%', }}>

                            <TouchableOpacity
                                style={[styles.addTime]}
                                onPress={showStartTimePicker}
                            >
                                <Text
                                    style={!isStartTimeChange ? styles.input : styles.selectedText}>
                                    {!isStartTimeChange ? "Giờ mở cửa" : formatTime(startTime)}
                                </Text>
                                <Feather name='clock' size={24} />
                            </TouchableOpacity>
                            {selectStartTimePickerShow && (
                                <DateTimePicker
                                    value={endTime}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={onStartTimePickerChange}
                                />
                            )}

                            <TouchableOpacity
                                style={styles.addTime}
                                onPress={showEndTimePicker}>
                                <Text style={!isEndTimeChange ? styles.input : styles.selectedText}>
                                    {!isEndTimeChange ? "Giờ đóng cửa" : formatTime(endTime)}
                                </Text>
                                <Feather name='clock' size={24} />
                            </TouchableOpacity>
                            {selectEndTimePickerShow && (
                                <DateTimePicker
                                    value={endTime}
                                    mode="time"
                                    is24Hour={true}
                                    onChange={onEndTimePickerChange}
                                />
                            )}
                        </View>
                        <ColorButton
                            OnPress={handleAddShift}
                            color="#00A188"
                            text="Thêm mới"
                            textColor="#ffffff"
                        />
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
        height: "40%",
    },
    bodyModal: {
        padding: '5%'
    },
    acceptButton: {
        borderRadius: 10,
        backgroundColor: '#006c5e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%'
    },
    topText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
    },
    addTime: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: "3%",
        paddingVertical: "4%",
    },
    inputBox: {
        marginVertical: "3%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        backgroundColor: "#ffffff",
    },
    input: {
        color: "#3a3a3a",
        fontSize: 15,
        fontWeight: "500",
        flex: 1,
    },
    header: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
    },
    selectedText: {
        color: "#00A188",
        fontSize: 15,
        fontWeight: "500",
    },
})

export default AddShiftModal