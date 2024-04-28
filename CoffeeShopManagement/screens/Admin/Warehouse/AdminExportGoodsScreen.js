import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

import SearchBar from '../../../components/Client/SearchBar'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import ProductCardwithMinus from '../../../components/Admin/Card/ProductCardwithMinus';
import BranchSelectBar from '../../../components/Admin/BranchSelectBar'
const AdminExportGoodsScreen = () => {
  const navigation = useNavigation();

  const goToListExport = () => {
    navigation.navigate("AdminListExport");
  };
  const productList = [
    {
      title: "Tên hàng hóa",
      unit: "Bịch",
      price: "100.000",
      quantity: "100",
    },
    {
      title: "Tên hàng hóa1",
      unit: "Bịch",
      price: "100.000",
      quantity: "100",
    },
    {
      title: "Tên hàng hóa2",
      unit: "Bịch",
      price: "100.000",
      quantity: "100",
    },
    {
      title: "Tên hàng hóa3",
      unit: "Bịch",
      price: "100.000",
      quantity: "100",
    },
    {
      title: "Tên hàng hóa4",
      unit: "Bịch",
      price: "100.000",
      quantity: "100",
    },
    {
      title: "Tên hàng hóa5",
      unit: "Bịch",
      price: "100.000",
      quantity: "100",
    },
  ];

  const renderproductList = () => {
    return productList.map((item, index) => (
      <ProductCardwithMinus
        key={index}
        title={item.title}
        unit={item.unit}
        quantity={item.quantity}
        price={item.price}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <BranchSelectBar branchName="ThanhTai1" />
      </View>
      <Text style={styles.title}>Các mặt hàng sẵn có</Text>
      <View style={styles.sreachBar}>
        <SearchBar />
      </View>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderproductList()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.importTitle}>Số mặt hàng xuất kho:</Text>
          <Text style={styles.importNumber}>10000</Text>
        </View>
        <ColorButton color="#00A188" text="Xuất hàng" textColor="#ffffff" OnPress={goToListExport} />
      </View>
    </View>
  )
}

export default AdminExportGoodsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "3%"
  },
  title: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "3%"
  },
  bar: {
    flexDirection: "row",
    marginTop: "2%",
  },
  sreachBar: {
    flexDirection: "row",
    marginTop: "3%",
  },
  goodListContainer: {
    flex: 1,
    marginTop: "2%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  importTitle: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "700",
    marginRight: "2%",
  },

  importNumber:
  {
    color: "#00A188",
    fontSize: 16,
    fontWeight: "700",
  }
})