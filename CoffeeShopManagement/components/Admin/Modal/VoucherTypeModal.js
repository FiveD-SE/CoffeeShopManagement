import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import SquareWithBorder from '../SquarewithBorder'
import ColorButton from '../Button/ColorButton'
import { colors } from '../../../assets/colors/colors'
import Toast from 'react-native-toast-message'

const VoucherTypeModal = ({ visible, onClose, onSelect, setVoucherType }) => {
  const [type, setType] = useState(null);
  const [selectedType, setSelectedType] = useState();
  const [selectedDiscount, setSelectedDiscount] = useState();

  const handleSave = () => {
    if (!selectedType || !selectedDiscount) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập đầy đủ thông tin",
      });
      setVoucherType(null);
    } else {
      setVoucherType({
        voucherType: selectedType,
        discountType: selectedDiscount,
      });
      onClose();
    }
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Chọn loại khuyến mãi" onClose={onClose} />
          <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
            <Text style={styles.header}>Loại khuyến mãi</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={[
                styles.buttonContainer,
                { marginRight: "1%", backgroundColor: selectedType === "exchange" ? colors.green_20 : "#ffffff" }
              ]}
                onPress={() => setSelectedType("exchange")}
              >
                <Image
                  source={require("../../../assets/exchangeCoin.png")} />
                <Text style={styles.title}>Quy đổi</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[
                styles.buttonContainer,
                { marginLeft: "1%", backgroundColor: selectedType === "free" ? colors.green_20 : "#ffffff" }
              ]}
                onPress={() => setSelectedType("free")}>
                <Image
                  source={require("../../../assets/free.png")} />
                <Text style={styles.title}>Miễn phí</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.header}>Loại hình ưu đãi</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { marginRight: "1%", backgroundColor: selectedDiscount === "productDiscount" ? colors.green_20 : "#ffffff" }
                ]}
                onPress={() => setSelectedDiscount("productDiscount")}
              >
                <Image
                  source={require("../../../assets/discountIcon.png")} />
                <Text style={styles.title}>Mã giảm giá</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { marginLeft: "1%", backgroundColor: selectedDiscount === "shipDiscount" ? colors.green_20 : "#ffffff" }
                ]}
                onPress={() => setSelectedDiscount("shipDiscount")}
              >
                <Image
                  source={require("../../../assets/shipIcon.png")} />
                <Text style={styles.title}>Ưu đãi vận chuyển</Text>
              </TouchableOpacity>
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

export default VoucherTypeModal

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
    height: "51%",
  },
  imageContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center"
  },
  main: {
    paddingHorizontal: "5%",
    marginBottom: "5%",
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
  },
  buttonContainer: {
    flex: 1,
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
    marginVertical: "5%",
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  }
});