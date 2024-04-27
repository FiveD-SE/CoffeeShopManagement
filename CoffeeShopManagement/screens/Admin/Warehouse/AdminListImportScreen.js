import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import BranchSelectBar from '../../../components/Admin/BranchSelectBar'
import ColorButton from '../../../components/Admin/Button/ColorButton'
import ProductCardwithPrice from '../../../components/Admin/Card/ProductCardwithPrice'

const AdminListImportScreen = () => {
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
      <ProductCardwithPrice
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
      <View style={styles.bar}>
        <BranchSelectBar branchName="ThanhTai1" />
      </View>
      <Text style={styles.title}>Danh sách nhập hàng</Text>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderproductList()}
      </ScrollView>
      <View style={styles.costContaner}>
        <Text style={styles.costTitle}>Tổng cộng</Text>
        <Text style={styles.cost}>118.000 VNĐ</Text>
      </View>
      <ColorButton color="#00A188" text="Xác nhận" textColor="#ffffff" />
    </SafeAreaView>
  )
}

export default AdminListImportScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "3%"
  },
  bar: {
    flexDirection: "row",
    marginTop: "2%",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "3%"
  },
  goodListContainer: {
    flex: 1,
    marginTop: "2%",
  },
  costContaner: {
    marginVertical: "3%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  costTitle: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "600",
  },
  cost: {
    color: "#F61A3D",
    fontSize: 18,
    fontWeight: "700",
  }
})