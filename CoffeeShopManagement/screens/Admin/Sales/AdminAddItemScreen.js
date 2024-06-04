import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SquareWithBorder from '../../../components/Admin/SquarewithBorder'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import ServiceTypeModal from '../../../components/Admin/Modal/ServiceTypeModal';
import ItemTypeModal from '../../../components/Admin/Modal/ItemTypeModal';
import BranchSelectModal from '../../../components/Admin/Modal/BranchSelectModal';
import ItemSizeModal from '../../../components/Admin/Modal/ItemSizeModal';
import Toast from "react-native-toast-message";
import { colors } from '../../../assets/colors/colors';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db, uploadImageToFirebase } from '../../../services/firebaseService';

const AdminAddItemScreen = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [sugarEnable, setSugarEnable] = useState(false);
  const [iceEnable, setIceEnable] = useState(false);
  const [milkEnable, setMilkEnable] = useState(false);

  const [serviceTypeVisible, setServiceTypeVisible] = useState(null);
  const [serviceType, setServiceType] = useState(null);
  const [branchSelectModalVisible, setBranchSelectModalVisible] = useState(null);
  const [branchSelect, setBranchSelect] = useState([]);
  const [itemTypeModalVisible, setItemTypeModalVisible] = useState(false);
  const [itemType, setItemType] = useState("");
  const [itemSizeModalVisible, setItemSizeModalVisible] = useState(false);
  const [size, setSize] = useState(null);

  //Service Type
  const showServiceTypeModal = () => {
    setServiceTypeVisible(true);

  };
  const hideServiceTypeModal = () => {
    setServiceTypeVisible(false);
  };

  const handleSelectServiceType = (serviceType) => {
    setServiceType(serviceType);
  }

  //Branch Select
  const showBranchSelectModal = () => {
    setBranchSelectModalVisible(true);
  };

  const hideBranchSelectModal = () => {
    setBranchSelectModalVisible(false);
  };

  //Item Size
  const showItemSizeModal = () => {
    setItemSizeModalVisible(true);
  };

  const hideItemSizeModal = () => {
    setItemSizeModalVisible(false);
  };

  const handleSelectSize = (size) => {
    setSize(size);
  }

  //Item Type
  const showItemTypeModal = () => {
    setItemTypeModalVisible(true);
  };

  const hideItemTypeModal = () => {
    setItemTypeModalVisible(false);
  };

  const handleSelectItemType = (itemType) => {
    setItemType(itemType);
  }

  //Image Selection Handler
  const handleImageSelected = (uri) => {
    setSelectedImage(uri);
  };

  const handleSaveProductToFirebase = async () => {
    if (productName === "" || productPrice === "" || productDescription === "" || serviceType === null || size === null || itemType === "") {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Vui lòng nhập đầy đủ thông tin",
      });
    } else {
      try {
        let imageDownloadUrl = null;
        if (selectedImage) {
          const imagename = `productImage_${productName}_${new Date().getTime()}.jpg`;
          imageDownloadUrl = await uploadImageToFirebase(selectedImage, imagename);
        }

        const docRef = await addDoc(collection(db, "products"), {
          productName: productName,
          productPrice: productPrice,
          productDescription: productDescription,
          productOptions: {
            sugarEnable: sugarEnable,
            iceEnable: iceEnable,
            milkEnable: milkEnable,
          },
          serviceType: serviceType,
          branchSelectIds: [1, 2, 3],
          itemType: itemType,
          size: size,
          productImage: imageDownloadUrl,
        });
        const productId = docRef.id;

        await updateDoc(doc(collection(db, "products"), productId), {
          productId: productId,
        });

        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Sản phẩm đã được thêm mới",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Có lỗi xảy ra khi thêm sản phẩm",
        });
      }
    }
  };


  const formatPrice = (price) => {

    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
    return formatter.format(price);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <SquareWithBorder
          text="Ảnh sản phẩm"
          onImageSelected={handleImageSelected}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.header}>Thông tin sản phẩm</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Tên sản phẩm"
            onChangeText={(text) => setProductName(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            keyboardType="phone-pad"
            style={[styles.input, { flex: 1 }]}
            value={formatPrice(productPrice)}
            placeholder="Giá tiền sản phẩm"
            onChangeText={(text) => setProductPrice(Number(text.replace(/\D/g, '')))}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={[styles.input, { flex: 1, textAlignVertical: "top" }]}
            placeholder="Mô tả sản phẩm"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setProductDescription(text)}
          />
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showItemTypeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Loại sản phẩm</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {itemType && (
                <Text style={styles.selectedText}> {itemType}</Text>)}
              <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
            </View>
            <ItemTypeModal
              visible={itemTypeModalVisible}
              onClose={hideItemTypeModal}
              setItemType={handleSelectItemType} />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showItemSizeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Kích cỡ</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {size && size.smallEnabled && (
                <Text style={styles.selectedText}>Nhỏ</Text>
              )}
              {size && (size.smallEnabled && (size.mediumEnabled || size.largeEnabled)) && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {size && size.mediumEnabled && (
                <Text style={styles.selectedText}>Trung bình</Text>
              )}
              {size && (size.mediumEnabled && size.largeEnabled) && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {size && size.largeEnabled && (
                <Text style={styles.selectedText}>Lớn</Text>
              )}
              <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
            </View>
          </TouchableOpacity>
          <ItemSizeModal
            visible={itemSizeModalVisible}
            onClose={hideItemSizeModal}
            setSize={handleSelectSize} />
        </View>

        <Text style={styles.header}>Phục vụ</Text>
        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showServiceTypeModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Loại hình phục vụ</Text>

            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {serviceType && serviceType.deliveryEnabled && (
                <Text style={styles.selectedText}>Giao hàng</Text>
              )}
              {serviceType && (serviceType.deliveryEnabled && serviceType.pickupEnabled) && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {serviceType && serviceType.pickupEnabled && (
                <Text style={styles.selectedText}>Tự lấy</Text>
              )}
              <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
            </View>
          </TouchableOpacity>
          <ServiceTypeModal
            visible={serviceTypeVisible}
            onClose={hideServiceTypeModal}
            setServiceType={handleSelectServiceType} />
        </View>

        <View>
          <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showBranchSelectModal}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Chi nhánh</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={30} color="#CCCCCC" />
          </TouchableOpacity>
          <BranchSelectModal
            visible={branchSelectModalVisible}
            onClose={hideBranchSelectModal} />
        </View>

        <Text style={styles.header}>Tùy chọn</Text>
        <View style={styles.toggleContainer}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "1%", opacity: sugarEnable ? 1 : 0.5 }]}>
            <Text style={[styles.input, { fontWeight: sugarEnable ? "500" : "400" }]}>Đường</Text>
          </View>
          <Switch
            value={sugarEnable}
            onValueChange={(value) => {
              setSugarEnable(value)
            }}
            trackColor={{ true: "#006C5E" }}
          />
        </View>

        <View style={styles.toggleContainer}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "1%", opacity: iceEnable ? 1 : 0.5 }]}>
            <Text style={[styles.input, { fontWeight: iceEnable ? "500" : "400" }]}>Đá</Text>
          </View>
          <Switch
            value={iceEnable}
            onValueChange={(value) => {
              setIceEnable(value);
            }}
            trackColor={{ true: "#006C5E" }}
          />
        </View>

        <View style={styles.toggleContainer}>
          <View style={[styles.inputBox, { flex: 1, marginRight: "1%", opacity: milkEnable ? 1 : 0.5 }]}>
            <Text style={[styles.input, { fontWeight: milkEnable ? "500" : "400" }]}>Sữa</Text>
          </View>
          <Switch
            value={milkEnable}
            onValueChange={(value) => {
              setMilkEnable(value);
            }}
            trackColor={{ true: "#006C5E" }}
          />
        </View>
      </View>
      <ColorButton
        OnPress={handleSaveProductToFirebase}
        color="#00A188"
        text="Thêm mới"
        textColor="#ffffff" />
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
    fontWeight: "500",
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