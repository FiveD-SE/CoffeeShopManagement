import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchBar from '../../../components/Client/SearchBar'
import ItemCard from '../../../components/Admin/Card/ItemCard';
import VoucherCard from '../../../components/Admin/Card/VoucherCard';
const PRODUCT_IMAGE_SOURCE = require("../../../assets/starbucks.jpeg");

const AdminVoucherListScreen = ({navigation }) => {
  
  const VoucherList = [
    { id: 1, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-01', option: 'Mã giảm giá', status: true, image: require('../../../assets/voucher.jpeg') },
    { id: 3, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-01-01', option: 'Ưu đãi vận chuyển', status: false, image: require('../../../assets/voucher.jpeg') },
    { id: 3, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-06-02', option: 'Ưu đãi vận chuyển', status: false, image: require('../../../assets/voucher.jpeg') },
    { id: 4, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-06-01', option: 'Mã giảm giá', status: true, image: require('../../../assets/voucher.jpeg') },
    { id: 5, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-04', option: 'Ưu đãi vận chuyển', status: false, image: require('../../../assets/voucher.jpeg') },
    { id: 6, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-06-01', option: 'Ưu đãi vận chuyển', status: true, image: require('../../../assets/voucher.jpeg') },
    { id: 7, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-04', option: 'Mã giảm giá', status: false, image: require('../../../assets/voucher.jpeg') },
    { id: 8, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-06-01', option: 'Ưu đãi vận chuyển', status: true, image: require('../../../assets/voucher.jpeg') },
  ];

  const [selectedOption, setSelectedOption] = useState('Mã giảm giá');

  const renderSortedVouchers = () => {
    const sortedVouchers = VoucherList.filter(voucher => 
      voucher.option === selectedOption
    );
  
    sortedVouchers.sort((a, b) => new Date(b.expiryDate) - new Date(a.expiryDate));
    
    return sortedVouchers.map((item, index) => (
      <VoucherCard
        key={index}
        itemName={item.name}
        imageSource={item.image}
        expiryDate={item.expiryDate}
        status={item.status}
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.voucherTypeContainer}>
        <Pressable onPress={() => setSelectedOption('Mã giảm giá')} style={[styles.component, selectedOption === 'Mã giảm giá' && styles.selectedItem]}>
          <Text style={[styles.headingText, selectedOption === 'Mã giảm giá' && styles.selectedText]}>Mã giảm giá</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedOption('Ưu đãi vận chuyển')} style={[styles.component, selectedOption === 'Ưu đãi vận chuyển' && styles.selectedItem]}>
          <Text style={[styles.headingText, selectedOption === 'Ưu đãi vận chuyển' && styles.selectedText]}>Ưu đãi vận chuyển</Text>
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.sreachBar}>
          <SearchBar />
        </View>
        <ScrollView style={styles.itemListContainer} showsVerticalScrollIndicator={false}>
          {renderSortedVouchers()}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AdminVoucherListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex:1,
    margin: "3%",
  },
  itemListContainer: {
    flex:1,
    marginTop: "2%",
  },
  sreachBar: {
    flexDirection: "row",
  },
  voucherTypeContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "500",
  },
  headingText: {
    fontFamily: 'Lato-Regular',
    color: '#3a3a3a',
    textAlign: 'center',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  component: {
    flex: 1,
    alignItems: 'center',
    padding: "2%",
  },
  selectedItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#006C5E',
  },
  selectedText: {
    color: '#006C5E',

  },
})