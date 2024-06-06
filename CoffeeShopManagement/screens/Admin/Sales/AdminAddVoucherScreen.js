import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SquareWithBorder from '../../../components/Admin/SquarewithBorder'
import CustomChooseButton from '../../../components/Admin/Button/CustomChooseButton'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import VoucherTypeModal from '../../../components/Admin/Modal/VoucherTypeModal';
import RankUserModal from '../../../components/Admin/Modal/RankUserModal';
import DaySelectModal from '../../../components/Admin/Modal/DaySelectModal';
import Toast from 'react-native-toast-message';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, uploadImageToFirebase } from '../../../services/firebaseService';

const AdminAddVoucherScreen = () => {
  const [voucherName, setVoucherName] = useState("");
  const [voucherPrice, setVoucherPrice] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [voucherDescription, setVoucherDescription] = useState("");

  const [rankUserModalVisible, setRankUserModalVisible] = useState(false);
  const [rankUser, setRankUser] = useState(null);

  const [voucherTypeModalVisible, setVoucherTypeModalVisible] = useState(false);
  const [voucherType, setVoucherType] = useState(null);

  const [daySelectModalVisible, setDaySelectModalVisible] = useState(false);
  const [daySelect, setDaySelect] = useState(null);

  //User rank
  const showRankUserModal = () => {
    setRankUserModalVisible(true);
  };

  const hideRankUserModal = () => {
    setRankUserModalVisible(false);
  };

  const handleSelectRankUser = (rankUser) => {
    setRankUser(rankUser);
  }

  //Voucher type
  const showVoucherTypeModal = () => {
    setVoucherTypeModalVisible(true);
  };

  const hideVoucherTypeModal = () => {
    setVoucherTypeModalVisible(false);
  };

  const handleSelectVoucherType = (voucherType) => {
    setVoucherType(voucherType);
  }

  //Day select
  const showDaySelectModal = () => {
    setDaySelectModalVisible(true);
  };

  const hideDaySelectModal = () => {
    setDaySelectModalVisible(false);
  };

  const handleSaveVoucherToFirebase = async () => {
    if (voucherName === "" || voucherPrice === "" || voucherDescription === "" || rankUser === null || voucherType === null) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập đầy đủ thông tin",
      });
    } else {
      try {
        const docRef = await addDoc(collection(db, "vouchers"), {
          voucherName: voucherName,
          voucherPrice: parseInt(voucherPrice),
          voucherDescription: voucherDescription,
          voucherType: voucherType,
          userRank: rankUser,
          voucherImage: "",
          expirationDate: new Date(),
          dateCreated: new Date()
        });
        const voucherId = docRef.id;

        await updateDoc(doc(collection(db, "vouchers"), voucherId), {
          voucherId: voucherId,
        });

        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Khuyến mãi đã được thêm mới",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Có lỗi xảy ra khi thêm khuyến mãi",
        });
      }
    }
  };

  useEffect(() => {
    console.log(voucherType);
  })

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(price);
  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/\D/g, '');
    setVoucherPrice(numericValue);
  };

  const getDisplayPrice = () => {
    return isFocused || voucherPrice === "" ? voucherPrice : formatPrice(voucherPrice);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
              <Text style={styles.input}>Loại</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {voucherType && voucherType.voucherType && (
                <Text style={styles.selectedText}>{voucherType.type === "exchange" ? "Quy đổi" : "Miễn phí"}</Text>
              )}
              {voucherType && (voucherType.voucherType && voucherType.discountType) && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {voucherType && voucherType.discountType && (
                <Text style={styles.selectedText}>{voucherType.discountType === "productDiscount" ? "Mã giảm giá" : "Ưu đãi vận chuyển"}</Text>
              )}
              <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
            </View>
          </TouchableOpacity>
          <VoucherTypeModal
            setVoucherType={handleSelectVoucherType}
            visible={voucherTypeModalVisible}
            onClose={hideVoucherTypeModal} />
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showRankUserModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Đối tượng</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {rankUser && rankUser.bronzeUsers && (
                <Text style={styles.selectedText}>Đồng</Text>
              )}
              {rankUser && (rankUser.bronzeUsers && (rankUser.silverUsers || rankUser.goldUsers || rankUser.diamondUsers)) && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {rankUser && rankUser.silverUsers && (
                <Text style={styles.selectedText}>Bạc</Text>
              )}
              {rankUser && (rankUser.silverUsers && (rankUser.goldUsers || rankUser.diamondUsers)) && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {rankUser && rankUser.goldUsers && (
                <Text style={styles.selectedText}>Vàng</Text>
              )}
              {rankUser && (rankUser.goldUsers && rankUser.diamondUsers) && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {rankUser && rankUser.diamondUsers && (
                <Text style={styles.selectedText}>Kim cương</Text>
              )}

              <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
            </View>
          </TouchableOpacity>
          <RankUserModal
            setRankUser={handleSelectRankUser}
            visible={rankUserModalVisible}
            onClose={hideRankUserModal} />
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "2%" }]}>
            <Text style={styles.input}>Chiết khấu</Text>
          </View>
          <View style={[styles.inputBox, { flex: 1, marginLeft: "2%" }]}>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
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
      <ColorButton
        OnPress={handleSaveVoucherToFirebase}
        color="#00A188"
        text="Thêm mới"
        textColor="#ffffff" />
    </ScrollView >
  )
}

export default AdminAddVoucherScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  selectedText: {
    color: "#00A188",
    fontSize: 14,
    fontWeight: "500",
  }
})