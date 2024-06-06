import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SquareWithBorder from '../../../components/Admin/SquarewithBorder'
import CustomChooseButton from '../../../components/Admin/Button/CustomChooseButton'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import VoucherTypeModal from '../../../components/Admin/Modal/VoucherTypeModal';
import RankUserModal from '../../../components/Admin/Modal/RankUserModal';
import DaySelectModal from '../../../components/Admin/Modal/DaySelectModal';

const AdminAddVoucherScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [voucherName, setVoucherName] = useState("");
  const [voucherPrice, setVoucherPrice] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [voucherDescription, setVoucherDescription] = useState("");

  const [rankUserModalVisible, setRankUserModalVisible] = useState(false);


  const [voucherTypeModalVisible, setVoucherTypeModalVisible] = useState(false);
  const [voucherType, setVoucherType] = useState(null);


  const [daySelectModalVisible, setDaySelectModalVisible] = useState(false);

  //Image Selection Handler
  const handleImageSelected = (uri) => {
    setSelectedImage(uri);
  };

  const showRankUserModal = () => {
    setRankUserModalVisible(true);
  };

  const hideRankUserModal = () => {
    setRankUserModalVisible(false);
  };

  const showVoucherTypeModal = () => {
    setVoucherTypeModalVisible(true);
  };

  const hideVoucherTypeModal = () => {
    setVoucherTypeModalVisible(false);
  };

  const showDaySelectModal = () => {
    setDaySelectModalVisible(true);
  };

  const hideDaySelectModal = () => {
    setDaySelectModalVisible(false);
  };

  const formatPrice = (price) => {

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(price);
  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/\D/g, '');
    setVoucherName(numericValue);
  };

  const getDisplayPrice = () => {
    return isFocused || voucherPrice === "" ? voucherPrice : formatPrice(voucherPrice);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <SquareWithBorder
          text="Ảnh khuyến mãi"
          onImageSelected={handleImageSelected}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Thông tin khuyến mãi</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Tên khuyến mãi"
            onChangeText={(text) => setVoucherName(text)}
          />
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showVoucherTypeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Loại khuyến mãi</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
          </TouchableOpacity>
          <VoucherTypeModal visible={voucherTypeModalVisible} onClose={hideVoucherTypeModal} />
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showRankUserModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Đối tượng</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
          </TouchableOpacity>
          <RankUserModal visible={rankUserModalVisible} onClose={hideRankUserModal} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "2%" }]}>
            <Text style={styles.input}>Chiết khấu</Text>
          </View>
          <View style={[styles.inputBox, { flex: 1, marginLeft: "2%" }]}>
            <TextInput
              style={styles.input}
              value={getDisplayPrice() === "" ? null : getDisplayPrice()}
              placeholder="Giá tiền giảm"
              onChangeText={handlePriceChange}
              onBlur={() => setIsFocused(false)}
              onFocus={() => setIsFocused(true)}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showDaySelectModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Thời hạn sử dụng</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
          </TouchableOpacity>
          <DaySelectModal visible={daySelectModalVisible} onClose={hideDaySelectModal} />
        </View>
      </View>
      <View style={[styles.inputBox, { marginTop: "0%", marginBottom: "3%" }]}>
        <TextInput
          style={[styles.input, { flex: 1, textAlignVertical: "top" }]}
          placeholder="Mô tả khuyến mãi"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setVoucherDescription(text)}
        />
      </View>
      <ColorButton color="#00A188" text="Thêm mới" textColor="#ffffff" />
    </ScrollView >
  )
}

export default AdminAddVoucherScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "4%",
    marginHorizontal: "3%"
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    marginVertical: "3%"
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
  },
  header: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: "4%"
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
})