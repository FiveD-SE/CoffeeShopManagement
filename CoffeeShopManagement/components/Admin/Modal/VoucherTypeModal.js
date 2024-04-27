import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import SquareWithBorder from '../SquarewithBorder'
import ColorButton from '../Button/ColorButton'

const VoucherTypeModal = ({ visible, onClose, onSelect }) => {
  const [type, setType] = useState(null);
  const [selectedType, setSelectedType] = useState("exchange");
  const [selectedDiscount, setSelectedDiscount] = useState("discount");
  const handleSelectType = (selectedType) => {
    setType(selectedType);
    onSelect(selectedType); 
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
          <View style={styles.main}>
            <Text style={styles.header}>Loại khuyến mãi</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={[
                styles.buttonContainer,
                { marginRight: "1%", backgroundColor: selectedType === "exchange" ? "#D3D3D3" : "#ffffff" }
              ]}
                onPress={() => setSelectedType("exchange")}
              >
                <Image
                  source={require("../../../assets/exchangeCoin.png")} />
                <Text style={styles.title}>Quy đổi</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[
                styles.buttonContainer,
                { marginLeft: "1%", backgroundColor: selectedType === "free" ? "#D3D3D3" : "#ffffff" }
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
                  { marginRight: "1%", backgroundColor: selectedDiscount === "discount" ? "#D3D3D3" : "#ffffff" }
                ]}
                onPress={() => setSelectedDiscount("discount")}
              >
                <Image
                  source={require("../../../assets/discountIcon.png")} />
                <Text style={styles.title}>Mã giảm giá</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { marginLeft: "1%", backgroundColor: selectedDiscount === "ship" ? "#D3D3D3" : "#ffffff" }
                ]}
                onPress={() => setSelectedDiscount("ship")}
              >
                <Image
                  source={require("../../../assets/shipIcon.png")} />
                <Text style={styles.title}>Ưu đãi vận chuyển</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    height: "42%",
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
    fontSize: 15,
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
  }
});