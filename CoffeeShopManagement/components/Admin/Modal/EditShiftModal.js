import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import ColorButton from '../Button/ColorButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db, uploadImageToFirebase } from "../../../services/firebaseService";
import { colors } from '../../../assets/colors/colors'
import DeleteButton from '../../../components/Admin/Button/DeleteButton';

const EditShiftModal = ({ visible, onClose, shift }) => {

    const [modalHeight, setModalHeight] = useState('50%');
    const [hasChanges, setHasChanges] = useState(false);

    const [shiftName, setShiftName] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [selectStartTimePickerShow, setSelectStartTimePickerShow] = useState(false);
    const [isStartTimeChange, setIsStartTimeChange] = useState(false);

    const [endTime, setEndTime] = useState(new Date());
    const [selectEndTimePickerShow, setSelectEndTimePickerShow] = useState(false);
    const [isEndTimeChange, setIsEndTimeChange] = useState(false);

    useEffect(() => {
        if (shift) {
            setShiftName(shift.shiftName || '');
            setStartTime(shift.startTime.toDate());
            setEndTime(shift.endTime.toDate());
            setHasChanges(false);
        }
    }, [shift]);

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
        setHasChanges(true);
    };

    const showEndTimePicker = () => {
        setSelectEndTimePickerShow(true);
    };

    const onEndTimePickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectEndTimePickerShow(false);
        setEndTime(currentDate);
        setIsEndTimeChange(true);
        setHasChanges(true);
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

    const handleCancel = () => {
        setHasChanges(false);
        onClose();
    };

    const handleDeleteShift = async () => {
        const currentTime = new Date();
        const startTimeToday = new Date(startTime);
        const endTimeToday = new Date(endTime);

       
        startTimeToday.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
        endTimeToday.setFullYear(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());

        if (endTime <= startTime) {
            
            const endTimeTomorrow = new Date(endTimeToday);
            endTimeTomorrow.setDate(endTimeToday.getDate() + 1);

            if ((currentTime >= startTimeToday && currentTime <= new Date(startTimeToday.getTime() + (24 * 60 * 60 * 1000))) || currentTime <= endTimeTomorrow) {
                Toast.show({
                    type: "info",
                    text1: "Thông báo",
                    text2: "Đang trong thời gian ca làm việc, không thể xóa.",
                    text1Style: {
                        fontSize: 16,
                    },
                    text2Style: {
                        fontSize: 12,
                    },
                });
                return; 
            }
        } else {
            
            if (currentTime >= startTimeToday && currentTime <= endTimeToday) {
                Toast.show({
                    type: "info",
                    text1: "Thông báo",
                    text2: "Đang trong thời gian ca làm việc, không thể xóa.",
                    text1Style: {
                        fontSize: 16,
                    },
                    text2Style: {
                        fontSize: 12,
                    },
                });
                return;
            }
        }
        Alert.alert(
            "Xác nhận xóa ca làm việc này không",
            "Bạn có chắc chắn muốn xóa ca làm việc này không?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteDoc(
                                doc(db, "shifts", shift.shiftId)
                            );
                            Toast.show({
                                type: "success",
                                text1: "Thành công",
                                text2: "Đã xóa ca làm việc",
                            });
                            navigation.goBack();
                        } catch (error) {
                            console.log("Error deleting shift:", error);
                            Toast.show({
                                type: "error",
                                text1: "Lỗi",
                                text2: "Đã xảy ra lỗi khi xóa ca làm việc",
                            });
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const handleEditShift = async () => {
        let errorMessage = null;
        if (!hasChanges) {
            Toast.show({
                type: 'info',
                text1: 'Thông báo',
                text2: 'Bạn chưa thay đổi thông tin của chi nhánh',
            });
            return;
        }

        if (!shiftName) {
            errorMessage = "Vui lòng nhập tên ca làm";
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

        const selectedIds = {
            shiftName: shiftName,
            startTime: startTime,
            endTime: endTime,
        };

        try {
            await updateDoc(doc(db, "shifts", shift.shiftId), selectedIds);
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Đã chỉnh sửa ca làm việc",
                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-bold",
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-regular",
                    color: colors.black_100,
                },
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Có lỗi xảy ra khi chỉnh sửa ca làm việc",
            });
            console.log(error);
        }
        onClose();
    };

    useEffect(() => {
        console.log(hasChanges);
    }, [hasChanges])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={handleCancel}>
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { height: modalHeight }]}>
                    <ModalHeader title="Chỉnh sửa ca làm việc" onClose={onClose} />
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
                                    setHasChanges(true);
                                }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '4%', }}>

                            <TouchableOpacity
                                style={[styles.addTime]}
                                onPress={showStartTimePicker}
                            >
                                <Text
                                    style={!startTime ? styles.input : styles.selectedText}>
                                    {!startTime ? "Giờ mở cửa" : formatTime(startTime)}
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
                                <Text style={!endTime ? styles.input : styles.selectedText}>
                                    {!endTime ? "Giờ đóng cửa" : formatTime(endTime)}
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
                        <DeleteButton OnPress={handleDeleteShift} />
                        <ColorButton
                            OnPress={handleEditShift}
                            color="#00A188"
                            text="Chỉnh sửa"
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
        marginVertical: "4%",
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
        fontFamily: "lato-regular"
    },
    header: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "lato-bold"
    },
    selectedText: {
        color: "#00A188",
        fontSize: 15,
        fontWeight: "500",
        fontFamily: "lato-regular"
    },
})

export default EditShiftModal