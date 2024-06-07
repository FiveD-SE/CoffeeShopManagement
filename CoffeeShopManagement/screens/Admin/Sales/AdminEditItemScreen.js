import { View, Text, ScrollView, StyleSheet, TextInput, Switch, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import SquareWithBorder from '../../../components/Admin/SquarewithBorder'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import DeleteButton from '../../../components/Admin/Button/DeleteButton';
import ServiceTypeModal from '../../../components/Admin/Modal/ServiceTypeModal';
import ItemTypeModal from '../../../components/Admin/Modal/ItemTypeModal';
import BranchSelectModal from '../../../components/Admin/Modal/BranchSelectModal';
import ItemSizeModal from '../../../components/Admin/Modal/ItemSizeModal';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
const AdminEditItemScreen = ({ route }) => {

  const navigation = useNavigation();
  const { product } = route.params;

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [productDescription, setProductDescription] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const [sugarEnable, setSugarEnable] = useState(false);
  const [iceEnable, setIceEnable] = useState(false);
  const [milkEnable, setMilkEnable] = useState(false);

  const [itemTypeModalVisible, setItemTypeModalVisible] = useState(false);
  const [itemType, setItemType] = useState("");
  const [itemSizeModalVisible, setItemSizeModalVisible] = useState(false);
  const [size, setSize] = useState(null);

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (product) {
      setProductName(product.productName);
      setProductPrice(product.productPrice.toString());
      setProductDescription(product.productDescription);
      setItemType(product.productType);
      setSize(product.size);
      setSugarEnable(product.productOptions.sugarEnable);
      setIceEnable(product.productOptions.iceEnable);
      setMilkEnable(product.productOptions.milkEnable);
      setSelectedImage(product.productImage)
    }
  }, [product]);

  //Item Size
  const showItemSizeModal = () => {
    setItemSizeModalVisible(true);
  };

  const hideItemSizeModal = () => {
    setItemSizeModalVisible(false);
  };

  const handleSelectSize = (size) => {
    setSize(size);
    setHasChanges(true);
  };

  //Item Type
  const showItemTypeModal = () => {
    setItemTypeModalVisible(true);
  };

  const hideItemTypeModal = () => {
    setItemTypeModalVisible(false);
  };

  const handleSelectItemType = (itemType) => {
    setItemType(itemType);
    setHasChanges(true);
  };

  //Image Selection Handler
  const handleImageSelected = (uri) => {
    setSelectedImage(uri);
    setHasChanges(true);
  };

  const handleSaveProductToFirebase = async () => {
    if (hasChanges) {
      try {

        await updateDoc(doc(db, 'products', product.productId), {
          productName,
          productPrice: parseInt(productPrice),
          productDescription,
          productOptions: {
            sugarEnable,
            iceEnable,
            milkEnable,
          },
          productType: itemType,
          size,
          productImage: selectedImage,
        });

        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Thông tin sản phẩm đã được cập nhật',
        });


        navigation.goBack();
      } catch (error) {

        console.log('Error updating product:', error);
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Có lỗi xảy ra khi cập nhật thông tin sản phẩm',
        });
      }
    }
    else {
      Toast.show({
        type: 'info',
        text1: 'Thông báo',
        text2: 'Bạn chưa thay đổi thông tin của sản phẩmm',
      });
    }
  };

  const handleDeleteProduct = async () => {
    Alert.alert(
      "Xác nhận xóa sản phẩm",
      "Bạn có chắc chắn muốn xóa sản phẩm này không?",
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
              await deleteDoc(
                doc(db, "products", product.productId)
              );
              Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Đã xóa sản phẩm",
              });
              navigation.goBack();
            } catch (error) {
              console.log("Error deleting address:", error);
              Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Đã xảy ra lỗi khi xóa sản phẩm",
              });
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const formatPrice = (price) => {
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    return formatter.format(price);
  };

  const handlePriceChange = (text) => {
    const numericValue = text.replace(/\D/g, "");
    setProductPrice(numericValue);
    setHasChanges(true);
  };

  const getDisplayPrice = () => {
    return isFocused || productPrice === ""
      ? productPrice
      : formatPrice(productPrice);
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
            value={productName}
            placeholder="Tên sản phẩm"
            onChangeText={(text) => {
              setProductName(text)
              setHasChanges(true);
            }}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            keyboardType="phone-pad"
            style={[styles.input, { flex: 1 }]}
            value={getDisplayPrice() === "" ? null : getDisplayPrice()}
            placeholder="Giá tiền sản phẩm"
            onChangeText={handlePriceChange}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={[styles.input, { flex: 1, textAlignVertical: "top" }]}
            value={productDescription}
            placeholder="Mô tả sản phẩm"
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => {
              setProductDescription(text)
              setHasChanges(true);
            }}
          />
        </View>

        <View>
          <TouchableOpacity
            style={[styles.inputBox, { justifyContent: "space-between" }]}
            onPress={showItemTypeModal}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Loại sản phẩm</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {itemType && <Text style={styles.selectedText}> {itemType}</Text>}
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#CCCCCC"
              />
            </View>
            <ItemTypeModal
              visible={itemTypeModalVisible}
              onClose={hideItemTypeModal}
              setItemType={handleSelectItemType}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={[styles.inputBox, { justifyContent: "space-between" }]}
            onPress={showItemSizeModal}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.input}>Kích cỡ</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {size && size.smallEnabled && (
                <Text style={styles.selectedText}>Nhỏ</Text>
              )}
              {size &&
                size.smallEnabled &&
                (size.mediumEnabled || size.largeEnabled) && (
                  <Text style={styles.selectedText}>, </Text>
                )}
              {size && size.mediumEnabled && (
                <Text style={styles.selectedText}>Trung bình</Text>
              )}
              {size && size.mediumEnabled && size.largeEnabled && (
                <Text style={styles.selectedText}>, </Text>
              )}
              {size && size.largeEnabled && (
                <Text style={styles.selectedText}>Lớn</Text>
              )}
              <MaterialIcons
                name="keyboard-arrow-right"
                size={30}
                color="#CCCCCC"
              />
            </View>
          </TouchableOpacity>
          <ItemSizeModal
            visible={itemSizeModalVisible}
            onClose={hideItemSizeModal}
            setSize={handleSelectSize}
          />
        </View>

        <Text style={styles.header}>Tùy chọn</Text>
        <View style={styles.toggleContainer}>
          <View
            style={[
              styles.inputBox,
              { flex: 1, marginRight: "1%", opacity: sugarEnable ? 1 : 0.5 },
            ]}
          >
            <Text
              style={[
                styles.input,
                { fontWeight: sugarEnable ? "500" : "400" },
              ]}
            >
              Đường
            </Text>
          </View>
          <Switch
            value={sugarEnable}
            onValueChange={(value) => {
              setSugarEnable(value);
              setHasChanges(true);
            }}
            trackColor={{ true: "#006C5E" }}
          />
        </View>

        <View style={styles.toggleContainer}>
          <View
            style={[
              styles.inputBox,
              { flex: 1, marginRight: "1%", opacity: iceEnable ? 1 : 0.5 },
            ]}
          >
            <Text
              style={[styles.input, { fontWeight: iceEnable ? "500" : "400" }]}
            >
              Đá
            </Text>
          </View>
          <Switch
            value={iceEnable}
            onValueChange={(value) => {
              setIceEnable(value);
              setHasChanges(true);
            }}
            trackColor={{ true: "#006C5E" }}
          />
        </View>

        <View style={styles.toggleContainer}>
          <View
            style={[
              styles.inputBox,
              { flex: 1, marginRight: "1%", opacity: milkEnable ? 1 : 0.5 },
            ]}
          >
            <Text
              style={[styles.input, { fontWeight: milkEnable ? "500" : "400" }]}
            >
              Sữa
            </Text>
          </View>
          <Switch
            value={milkEnable}
            onValueChange={(value) => {
              setMilkEnable(value);
              setHasChanges(true);
            }}
            trackColor={{ true: "#006C5E" }}
          />
        </View>
      </View>
      <DeleteButton OnPress={handleDeleteProduct}/>
      <ColorButton
        OnPress={handleSaveProductToFirebase}
        color="#00A188"
        text="Hoàn thành"
        textColor="#ffffff"
      />
    </ScrollView>
  );
};

export default AdminEditItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "4%",
    marginHorizontal: "3%",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    marginVertical: "3%",
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
    backgroundColor: "#ffffff",
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
    marginVertical: "4%",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedText: {
    color: "#00A188",
    fontSize: 14,
    fontWeight: "500",
  },
});
