import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'

const OptionModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Tùy chọn" onClose={onClose} />
          <View style={styles.main}>
            <TouchableOpacity
              style={styles.buttonContainer} >
              <Image
                source={require("../../../assets/hideIcon.png")} />
              <Text style={styles.title}>Ẩn</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer} >
              <Image
                source={require("../../../assets/editIcon.png")} />
              <Text style={styles.title}>Chỉnh sửa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer} >
              <Image
                source={require("../../../assets/trashbinIcon.png")} />
              <Text style={styles.title}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal >
  )
}

export default OptionModal

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
    height: "23%",
  },
  imageContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center"
  },
  main: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: "3%",
    marginVertical: "3%",
  },
  title: {
    marginTop: "3%",
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center"
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: "1%",
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ECECEC"
  }
});