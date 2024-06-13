import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from 'react-native'
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
  const [voucherDescription, setVoucherDescription] = useState("");

  const [minimumOrderPrice, setMinimumOrderPrice] = useState("");
  const [isMinimumOrderPriceFocused, setIsMinimumOrderPriceFocused] = useState(false);

  const [productDiscountPercentage, setProductDiscountPercentage] = useState("");
  const [isDiscountFocused, setIsDiscountFocused] = useState(false);
  const [maximumDiscount, setMaximumDiscount] = useState("");
  const [isMaximumDiscountFocused, setIsMaximumDiscountFocused] = useState(false);

  const [shipDiscountPrice, setShipDiscountPrice] = useState("");
  const [isShipDiscountPriceFocused, setIsShipDiscountPriceFocused] = useState(false);

  const [voucherExchangePrice, setVoucherExchangePrice] = useState(0);

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

  const handleSaveVoucherToFirebase = async () => {
    if (rankUser === null || voucherType === null || daySelect === null || !minimumOrderPrice) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập đầy đủ thông tin",
      });
    } else {

      if (voucherType.discountType === "productDiscount" && !productDiscountPercentage) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Vui lòng nhập % giảm giá sản phẩm",
        });
        return;
      }

      if (voucherType.discountType === "shipDiscount" && !shipDiscountPrice) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Vui lòng nhập giá khuyến mãi cho phí ship",
        });
        return;
      }

      if (voucherType.voucherType === "exchange" && voucherExchangePrice === 0) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Vui lòng nhập giá sản phẩm khi chọn loại quy đổi",
        });
        return;
      }

      Alert.alert(
        "Xác nhận thêm khuyến mãi. ",
        "Bạn sẽ không thể chỉnh sửa hoặc xóa khuyến mãi.",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Đồng ý",
            style: "destructive",
            onPress: async () => {
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

                let voucherName = null;
                let discountPrice = null;
                let downloadURL = null;
                if (voucherType.discountType === "productDiscount") {
                  const storageRef = ref(storage, "images/productDiscount");
                  downloadURL = await getDownloadURL(storageRef);
                  if (!maximumDiscount) {
                    discountPrice = {
                      discountPercentage: parseInt(productDiscountPercentage),
                      maximumDiscount: parseInt("-1")
                    };
                    voucherName = "Giảm " + formatDiscountPercentage(productDiscountPercentage);
                  }
                  else
                    discountPrice = {
                      discountPercentage: parseInt(productDiscountPercentage),
                      maximumDiscount: parseInt(maximumDiscount)
                    };
                    voucherName = "Giảm " + formatDiscountPercentage(productDiscountPercentage) + " Tối đa " + formatPrice(maximumDiscount);
                }
                else {
                  const storageRef = ref(storage, "images/shipDiscount");
                  downloadURL = await getDownloadURL(storageRef);
                  discountPrice = parseInt(shipDiscountPrice);
                  voucherName = "Giảm " + formatPrice(shipDiscountPrice);
                }
                const docRef = await addDoc(collection(db, "vouchers"), {
                  voucherName: voucherName,
                  minimumOrderPrice: parseInt(minimumOrderPrice),
                  voucherExchangePrice: voucherExchangePrice,
                  voucherDescription: voucherDescription,
                  voucherType: voucherType,
                  userRank: rankUser,
                  discountPrice: discountPrice,
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
          },
          ,
        ],
        { cancelable: false }
      );


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
      setProductDiscountPercentage(parseInt(numericValue));
    }
  };

  const formatDiscountPercentage = (value) => {
    return value !== '' ? `${value}%` : '';
  };

  const getDisplayPercentage = () => {
    return isDiscountFocused || productDiscountPercentage === ""
      ? productDiscountPercentage
      : formatDiscountPercentage(productDiscountPercentage);
  };

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(price);
  };

  //Ship discount change
  const handleShipDiscountChange = (text) => {
    const numericValue = text.replace(/\D/g, "");
    setShipDiscountPrice(numericValue);
  };

  const getShipDiscountPrice = () => {
    return isShipDiscountPriceFocused || shipDiscountPrice === ""
      ? shipDiscountPrice
      : formatPrice(shipDiscountPrice);
  };

  //Maximmum product price
  const handleMaximumProductDiscountChange = (text) => {
    const numericValue = text.replace(/\D/g, "");
    setMaximumDiscount(numericValue);
  };

  const getMaximumProductDiscountPrice = () => {
    return isMaximumDiscountFocused || maximumDiscount === ""
      ? maximumDiscount
      : formatPrice(maximumDiscount);
  };

  //Minimum Order
  const handleMinimumOrderPriceChange = (text) => {
    const numericValue = text.replace(/\D/g, "");
    setMinimumOrderPrice(numericValue);
  };

  const getMinimumOrderPrice = () => {
    return isMinimumOrderPriceFocused || minimumOrderPrice === ""
      ? minimumOrderPrice
      : formatPrice(minimumOrderPrice);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Thông tin khuyến mãi</Text>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showVoucherTypeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Loại</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {voucherType && voucherType.voucherType && (
                <Text style={styles.selectedText}>{voucherType.voucherType === "exchange" ? "Quy đổi" : "Miễn phí"}</Text>
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
      <View style={[styles.inputBox, { marginTop: "0%" }]}>
        <TextInput
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
          value={getMinimumOrderPrice() === "" ? null : getMinimumOrderPrice()}
          placeholder="Giá trị đơn hàng tối thiểu"
          onChangeText={handleMinimumOrderPriceChange}
          onBlur={() => setIsMinimumOrderPriceFocused(false)}
          onFocus={() => setIsMinimumOrderPriceFocused(true)}
        />
      </View>
      <View style={[styles.inputBox, { marginBottom: "3%" }]}>
        <TextInput
          style={[styles.input, { flex: 1, textAlignVertical: "top" }]}
          placeholder="Mô tả khuyến mãi"
          multiline={true}
          numberOfLines={4}
          onChangeText={(text) => setVoucherDescription(text)}
        />
      </View>
      <Text style={styles.header}>Chi tiết khuyến mãi</Text>
      {voucherType && voucherType.discountType === "productDiscount" && 
      <View style={styles.inputBox}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={getDisplayPercentage() === "" ? null : getDisplayPercentage()}
          onChangeText={handleDiscountChange}
          onBlur={() => setIsDiscountFocused(false)}
          onFocus={() => setIsDiscountFocused(true)}
          keyboardType="numeric"
          placeholder="Phần trăm khuyến mãi"
        />
      </View>}
      {voucherType && voucherType.discountType === "productDiscount" && <View style={styles.inputBox}>
        <TextInput
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
          value={getMaximumProductDiscountPrice() === "" ? null : getMaximumProductDiscountPrice()}
          placeholder="Số tiền giảm tối đa (không bắt buộc)"
          onChangeText={handleMaximumProductDiscountChange}
          onBlur={() => setIsMaximumDiscountFocused(false)}
          onFocus={() => setIsMaximumDiscountFocused(true)}
        />
      </View>}
      {voucherType && voucherType.discountType === "shipDiscount" && <View style={styles.inputBox}>
        <TextInput
          keyboardType="numeric"
          style={[styles.input, { flex: 1 }]}
          value={getShipDiscountPrice() === "" ? null : getShipDiscountPrice()}
          placeholder="Số tiền giảm"
          onChangeText={handleShipDiscountChange}
          onBlur={() => setIsShipDiscountPriceFocused(false)}
          onFocus={() => setIsShipDiscountPriceFocused(true)}
        />
      </View>}
      {voucherType && voucherType.voucherType === "exchange" && <View style={{ flexDirection: "row" }}>
        <View style={[styles.inputBox, { flex: 1, marginRight: "2%" }]}>
          <Text style={styles.input}>Chiết khấu</Text>
        </View>
        <View style={[styles.inputBox, { flex: 1, marginLeft: "2%" }]}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Số điểm quy đổi"
            onChangeText={(text) => setVoucherExchangePrice(parseInt(text))}
          />
        </View>
      </View>}
      <ColorButton
        style={{ marginTop: "2%" }}
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
    marginVertical: "2%"
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