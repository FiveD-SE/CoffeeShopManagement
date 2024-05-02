import { View, Text, Modal, StyleSheet, ScrollView, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import DatePicker from 'react-native-modern-datepicker'

const DaySelectModal = ({ visible, onClose }) => {
  const [date, setDate] = useState(null);
  function handleChanged(propDate) {
    setDate(propDate)
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
          <ModalHeader title="Chọn thời hạn sử dụng" onClose={onClose} />
          <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
            <DatePicker
              mode='calendar'
              selected={date}
              onDateChange={handleChanged}
            />
          </ScrollView>
        </View>
      </View>
    </Modal >
  )
}

export default DaySelectModal

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
    height: "55%",
  },
  imageContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center"
  },
  main: {
    paddingHorizontal: "5%",
    marginBottom: "10%",
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
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ECECEC"
  }
});