import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import ColorButton from '../../../components/Admin/Button/ColorButton'
import VoucherTypeModal from '../../../components/Admin/Modal/VoucherTypeModal';
import RankUserModal from '../../../components/Admin/Modal/RankUserModal';
import ExpirationDaySelectModal from '../../../components/Admin/Modal/ExpirationDaySelectModal';
import Toast from 'react-native-toast-message';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, storage, uploadImageToFirebase } from '../../../services/firebaseService';
import { useNavigation } from '@react-navigation/native';
import { getDownloadURL, ref } from 'firebase/storage';

const AdminAddVoucherScreen = () => {
  const navigation = useNavigation();
  const [voucherName, setVoucherName] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [isDiscountFocused, setIsDiscountFocused] = useState(false);
  const [voucherExchangePrice, setVoucherExchangePrice] = useState(0);
  const [isPriceAble, setIsPriceAble] = useState(false);
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

  const handleDaySelect = (selectedDay) => {
    setDaySelect(selectedDay);
  };

  useEffect(() => {
    if (voucherType && voucherType.voucherType === "exchange") {
      setIsPriceAble(true);
    } else {
      setIsPriceAble(false);
    }
  }, [voucherType])

  const handleSaveVoucherToFirebase = async () => {
    if (voucherName === "" || voucherDescription === "" || rankUser === null || voucherType === null || daySelect === null || discountPercentage === 0) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập đầy đủ thông tin",
      });
    } else {
      if (voucherType.voucherType === "exchange" && voucherExchangePrice === 0) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Vui lòng nhập giá sản phẩm khi chọn loại quy đổi",
        });
      }
      else {
        try {
          let expirationDate = new Date();

          switch (daySelect.circle) {
            case "Day":
              expirationDate.setDate(expirationDate.getDate() + parseInt(daySelect.amount));
              break;
            case "Week":
              expirationDate.setDate(expirationDate.getDate() + parseInt(daySelect.amount) * 7);
              break;
            case "Month":
              expirationDate.setMonth(expirationDate.getMonth() + parseInt(daySelect.amount));
              break;
            case "Year":
              expirationDate.setFullYear(expirationDate.getFullYear() + parseInt(daySelect.amount));
              break;
            default:
              break;
          }

          let downloadURL = null;
          if (voucherType.discountType === "productDiscount") {
            const storageRef = ref(storage, "images/productDiscount");
            downloadURL = await getDownloadURL(storageRef);
          }
          else {
            const storageRef = ref(storage, "images/shipDiscount");
            downloadURL = await getDownloadURL(storageRef);
          }
          const docRef = await addDoc(collection(db, "vouchers"), {
            voucherName: voucherName,
            discountPercentage: discountPercentage,
            voucherExchangePrice: voucherExchangePrice,
            voucherDescription: voucherDescription,
            voucherType: voucherType,
            userRank: rankUser,
            voucherImage: downloadURL,
            expirationDate: expirationDate,
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
          navigation.goBack();
        } catch (error) {
          console.log(error);
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Có lỗi xảy ra khi thêm khuyến mãi",
          });
        }
      }
    }
  };

  const handleDiscountChange = (text) => {
    const numericValue = text.replace(/\D/g, '');
    if (numericValue !== '' && parseInt(numericValue) > 100) {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Giá trị nhập phải nhỏ hơn hoặc bằng 100%',
      });
    } else {
      setDiscountPercentage(parseInt(numericValue));
    }
  };

  const formatDiscountPercentage = (value) => {
    return value !== '' ? `${value}%` : '';
  };

  const getDisplayPercentage = () => {
    return isDiscountFocused || discountPercentage === ""
      ? discountPercentage
      : formatDiscountPercentage(discountPercentage);
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

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={getDisplayPercentage() === "" ? null : getDisplayPercentage()}
            onChangeText={handleDiscountChange}
            onBlur={() => setIsDiscountFocused(false)}
            onFocus={() => setIsDiscountFocused(true)}
            keyboardType="numeric"
            placeholder="Phần trăm khuyến mãi"
          />
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
              keyboardType="numeric"
              editable={isPriceAble}
              placeholder="Số điểm quy đổi"
              onChangeText={(text) => setVoucherExchangePrice(parseInt(text))}
            />
          </View>
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showDaySelectModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Thời hạn sử dụng</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {daySelect && (
                <Text style={styles.selectedText}>{daySelect.amount} {daySelect.circle === "Day" ? "Ngày" : daySelect.circle === "Week" ? "Tuần" : daySelect.circle === "Month" ? "Tháng" : "Năm"}</Text>
              )}
              <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
            </View>
          </TouchableOpacity>
          <ExpirationDaySelectModal
            visible={daySelectModalVisible}
            onClose={hideDaySelectModal}
            setSelectDay={handleDaySelect} />
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