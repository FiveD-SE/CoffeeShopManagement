import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SquareWithBorder from '../../../components/Admin/SquarewithBorder'
import CustomChooseButton from '../../../components/Admin/Button/CustomChooseButton'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import DeleteButton from '../../../components/Admin/Button/DeleteButton';
import VoucherTypeModal from '../../../components/Admin/Modal/VoucherTypeModal';
import ServiceTypeModal from '../../../components/Admin/Modal/ServiceTypeModal';
import RankUserModal from '../../../components/Admin/Modal/RankUserModal';

const AdminEditVoucherScreen = () => {
  const [voucherType, setVoucherType] = useState(null);
  const [rankUserModalVisible, setRankUserModalVisible] = useState(false);
  const [voucherTypeModalVisible, setVoucherTypeModalVisible] = useState(false);
  const [daySelectModalVisible, setDaySelectModalVisible] = useState(false);

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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <SquareWithBorder text="Ảnh khuyến mãi" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Thông tin khuyến mãi</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Tên khuyến mãi"
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
              placeholder="Giá tiền sản phẩm"
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
          {/* <DaySelectModal visible={daySelectModalVisible} onClose={hideDaySelectModal} /> */}
        </View>
      </View>
      <View style={[styles.inputBox, { marginTop: "0%", marginBottom: "3%" }]}>
        <TextInput
          style={[styles.input, { flex: 1, textAlignVertical: "top" }]}
          placeholder="Mô tả khuyến mãi"
          multiline={true}
          numberOfLines={4}
        />
      </View>
      <DeleteButton />
      <ColorButton color="#00A188" text="Hoàn thành" textColor="#ffffff" />
    </ScrollView >
  )
}

export default AdminEditVoucherScreen

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