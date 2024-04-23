import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";

import AddGoodButton from '../../../components/Admin/AddGoodButton'
import AddItemCard from '../../../components/Admin/AddItemCard'
import SearchBar from '../../../components/Client/SearchBar'
import ColorButton from '../../../components/Admin/ColorButton'
import ProductCardwithPlus from '../../../components/Admin/ProductCardwithPlus'
import AddNewGoodModal from '../../../components/Admin/Modal/AddNewGoodModal'

const AdminImportGoodsScreen = () => {
  const navigation = useNavigation();

  const goToListImport = () => {
    navigation.navigate("AdminListImport");
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
      <ProductCardwithPlus
        key={index}
        title={item.title}
        unit={item.unit}
        quantity={item.quantity}
        price={item.price}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddGoodButton title="Thêm mặt hàng mới" />
      <Text style={styles.title}>Các mặt hàng sẵn có</Text>
      <View style={styles.sreachBar}>
        <SearchBar />
      </View>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderproductList()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.importTitle}>Số mặt hàng nhập mới:</Text>
          <Text style={styles.importNumber}>10000</Text>
        </View>
        <ColorButton color="#00A188" text="Nhập hàng" textColor="#ffffff" OnPress={goToListImport} />
      </View>
    </SafeAreaView>
  )
}

export default AdminImportGoodsScreen

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