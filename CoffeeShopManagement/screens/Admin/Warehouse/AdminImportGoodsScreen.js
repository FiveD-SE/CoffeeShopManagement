import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

import AddItemCard from '../../../components/Admin/AddItemCard'
import SearchBar from '../../../components/Client/SearchBar'
import ColorButton from '../../../components/Admin/ColorButton'
import ProductCardwithPlus from '../../../components/Admin/ProductCardwithPlus'

const AdminImportGoodsScreen = () => {


  return (
    <SafeAreaView style={styles.container}>
      <AddItemCard title="Thêm mặt hàng mới" type="item" />
      <Text style={styles.title}>Các mặt hàng sẵn có</Text>
      <View style={styles.sreachBar}>
        <SearchBar />
      </View>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        <ProductCardwithPlus
          title="Tên hàng hóa"
          unit="Bịch"
          price="100.000"
          quantity="100" />
        <ProductCardwithPlus
          title="Tên hàng hóa1"
          unit="Bịch"
          price="100.000"
          quantity="100" />
        <ProductCardwithPlus
          title="Tên hàng hóa2"
          unit="Bịch"
          price="100.000"
          quantity="100" />
        <ProductCardwithPlus
          title="Tên hàng hóa3"
          unit="Bịch"
          price="100.000"
          quantity="100" />
        <ProductCardwithPlus
          title="Tên hàng hóa4"
          unit="Bịch"
          price="100.000"
          quantity="100" />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.importTitle}>Số mặt hàng nhập mới:</Text>
          <Text style={styles.importNumber}>10000</Text>
        </View>
        <ColorButton color="#00A188" text="Nhập hàng" textColor="#ffffff" />
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