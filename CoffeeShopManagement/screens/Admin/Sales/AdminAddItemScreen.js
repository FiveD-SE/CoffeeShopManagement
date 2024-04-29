import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SquareWithBorder from '../../../components/Admin/SquarewithBorder'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import ServiceTypeModal from '../../../components/Admin/Modal/ServiceTypeModal';
import ItemTypeModal from '../../../components/Admin/Modal/ItemTypeModal';
import BranchSelectModal from '../../../components/Admin/Modal/BranchSelectModal';
import ItemSizeModal from '../../../components/Admin/Modal/ItemSizeModal';
const AdminAddItemScreen = () => {
  const [sugarEnable, setSugarEnable] = useState(false)
  const [iceEnable, setIceEnable] = useState(false)
  const [milkEnable, setMilkEnable] = useState(false)
  const [serviceTypeVisible, setServiceTypeVisible] = useState(null);
  const [branchSelectModalVisible, setBranchSelectModalVisible] = useState(null);
  const [itemTypeModalVisible, setItemTypeModalVisible] = useState(false);
  const [itemSizeModalVisible, setItemSizeModalVisible] = useState(false);

  const showServiceTypeModal = () => {
    setServiceTypeVisible(true);
  };

  const hideServiceTypeModal = () => {
    setServiceTypeVisible(false);
  };

  const showBranchSelectModal = () => {
    setBranchSelectModalVisible(true);
  };

  const hideBranchSelectModal = () => {
    setBranchSelectModalVisible(false);
  };

  const showItemSizeModal = () => {
    setItemSizeModalVisible(true);
  };

  const hideItemSizeModal = () => {
    setItemSizeModalVisible(false);
  };

  const showItemTypeModal = () => {
    setItemTypeModalVisible(true);
  };

  const hideItemTypeModal = () => {
    setItemTypeModalVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <SquareWithBorder text="Ảnh sản phẩm" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Thông tin sản phẩm</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Tên sản phẩm"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Giá tiền sản phẩm"
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Mô tả sản phẩm"
            multiline={true}
            numberOfLines={4}
          />
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showItemTypeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Loại sản phẩm</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
            <ItemTypeModal visible={itemTypeModalVisible} onClose={hideItemTypeModal} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showItemSizeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Kích cỡ</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
          </TouchableOpacity>
          <ItemSizeModal visible={itemSizeModalVisible} onClose={hideItemSizeModal} />
        </View>

        <Text style={styles.header}>Phục vụ</Text>
        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showServiceTypeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Loại hình phục vụ</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
          </TouchableOpacity>
          <ServiceTypeModal visible={serviceTypeVisible} onClose={hideServiceTypeModal} />
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showBranchSelectModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Chi nhánh</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
          </TouchableOpacity>
          <BranchSelectModal visible={branchSelectModalVisible} onClose={hideBranchSelectModal} />
        </View>

        <Text style={styles.header}>Tùy chọn</Text>
        <View style={styles.toggleContainer}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "1%" }]}>
            <Text style={styles.input}>Đường</Text>
          </View>
          <Switch
            value={sugarEnable}
            onValueChange={(value) => setSugarEnable(value)}
            trackColor={{ true: "#006C5E" }}
          />
        </View>

        <View style={styles.toggleContainer}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "1%" }]}>
            <Text style={styles.input}>Đá</Text>
          </View>
          <Switch
            value={iceEnable}
            onValueChange={(value) => setIceEnable(value)}
            trackColor={{ true: "#006C5E" }}
          />
        </View>

        <View style={styles.toggleContainer}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "1%" }]}>
            <Text style={styles.input}>Sữa</Text>
          </View>
          <Switch
            value={milkEnable}
            onValueChange={(value) => setMilkEnable(value)}
            trackColor={{ true: "#006C5E" }}
          />
        </View>
      </View>
      <ColorButton color="#00A188" text="Thêm mới" textColor="#ffffff" />
    </ScrollView >
  )
}

export default AdminAddItemScreen

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