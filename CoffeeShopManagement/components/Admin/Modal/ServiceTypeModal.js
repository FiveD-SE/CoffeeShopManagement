import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import { FontAwesome5, Entypo  } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const ServiceTypeModal = ({ visible, onClose }) => {
  const [isShipChecked, setShipChecked] = useState(false);
  const [isChecked, setChecked] = useState(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Chọn loại hình phục vụ" onClose={onClose} />
          <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
            <View style={styles.checkBoxContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="shipping-fast" size={28} color="#3a3a3a" />
                <Text style={styles.title}>Giao hàng tận nơi</Text>
              </View>
              <Checkbox
                style={styles.checkbox}
                value={isShipChecked}
                onValueChange={setShipChecked}
                color={isShipChecked ? '#00A188' : undefined}
              />
            </View>
            <View style={styles.checkBoxContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo  name="drink" size={28} color="#3a3a3a" />
                <Text style={styles.title}>Tự đến lấy hàng</Text>
              </View>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#00A188' : undefined}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

export default ServiceTypeModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    backgroundColor: "#F8F7FA",
    borderRadius: 20,
    width: "90%",
    height: "35%",
  },
  imageContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center"
  },
  main: {
    paddingHorizontal: "3%",
    marginVertical:"2%"
  },
  checkBoxContainer: {
    padding: "8%",
    marginVertical:"2%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#ECECEC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  
  title: {
    color: "#3a3a3a",
    marginLeft: "5%",
    fontSize: 18,
    fontWeight: "600",
  },
  checkbox: {
    borderRadius: 5
  }
});