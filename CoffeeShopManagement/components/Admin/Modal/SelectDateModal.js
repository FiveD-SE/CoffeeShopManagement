import { View, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import ModalHeader from "../../Client/Header/ModalHeader";
import DatePicker from "react-native-modern-datepicker";

const SelectDateModal = ({ visible, onClose, onSelectOption }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    function handleChanged(propDate) {
        setSelectedDate(propDate); // Cập nhật state selectedDate
        onSelectOption(propDate); // Truyền giá trị date lên component cha
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
                    <ModalHeader title="Lịch" onClose={onClose} />
                    <DatePicker
                        mode="calendar"
                        selected={selectedDate} // Sử dụng state selectedDate
                        onDateChange={handleChanged}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default SelectDateModal;

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
        height: "56%",
    },
    imageContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center",
    },
    main: {
        height: "100%",
        paddingHorizontal: "5%",
        marginBottom: "10%",
        backgroundColor: "#F8F7FA",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    header: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "600",
        marginVertical: "4%",
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
        backgroundColor: "#ffffff",
    },
    input: {
        color: "#9D9D9D",
        fontSize: 15,
        fontWeight: "400",
    },
    title: {
        marginTop: "2%",
        color: "#3a3a3a",
        fontSize: 15,
        fontWeight: "500",
    },
});
