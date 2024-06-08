import { View, Text, Modal, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';

const ExpirationDaySelectModal = ({ visible, onClose, setSelectDay }) => {
  const [circle, setCircle] = useState(null);
  const [isCircleFocus, setIsCircleFocus] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const circleSelect = [
    { label: "Ngày", value: "Day" },
    { label: "Tuần", value: "Week" },
    { label: "Tháng", value: "Month" },
    { label: "Năm", value: "Year" }
  ]
  const handleSave = () => {
    if (circle === null || quantity === null) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập đầy đủ thông tin",
      });
    }
    else {
      setSelectDay({
        amount: quantity,
        circle: circle
      })
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
          <ModalHeader title="Chọn thời hạn sử dụng" onClose={onClose} />
          <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Chu kỳ sử dụng</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="phone-pad"
                  style={styles.input}
                  placeholder="Số lượng"
                  value={quantity}
                  onChangeText={(newText) => setQuantity(newText)}
                />
              </View>
              <Dropdown
                style={[styles.dropDown, isCircleFocus && { borderColor: '#006C5E' }]}
                placeholder='Chọn chu kỳ'
                placeholderStyle={{ color: "#808080" }}
                data={circleSelect}
                selectedTextStyle={styles.selectedTextStyle}
                labelField="label"
                valueField="value"
                onFocus={() => setIsCircleFocus(true)}
                value={circle}
                onChange={item => {
                  setCircle(item.value);
                  setIsCircleFocus(false);
                }} />
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

export default ExpirationDaySelectModal

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
    height: "43%",
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
  },
  saveButton: {
    backgroundColor: '#00A188',
    borderRadius: 10,
    paddingVertical: "4%",
    paddingHorizontal: "5%",
    alignItems: 'center',
    marginVertical: "3%",
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: "3%"
  },
  inputBox: {
    marginVertical: "2%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ECECEC",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    backgroundColor: "#ffffff"
  },
  input: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "400",
    flex: 1,
  },
  dropDown: {
    backgroundColor: "#ffffff",
    borderColor: "rgba(58,58,58,0.2)",
    marginVertical: "3%",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ECECEC",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
  },



  selectedTextStyle: {
    fontSize: 16,
  },
});