import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ColorButton from '../../../components/Admin/ColorButton'
import ViewProductCard from '../../../components/Admin/ViewProductCard'

const AdminListExportScreen = () => {
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
      <ViewProductCard
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
      <Text style={styles.title}>Danh sách xuất hàng hàng</Text>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderproductList()}
      </ScrollView>
      <ColorButton color="#00A188" text="Xác nhận" textColor="#ffffff"/>
    </SafeAreaView>
  )
}

export default AdminListExportScreen

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
})