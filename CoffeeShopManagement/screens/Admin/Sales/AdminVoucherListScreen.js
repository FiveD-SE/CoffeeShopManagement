import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import SearchBar from '../../../components/Client/SearchBar'
import ItemCard from '../../../components/Admin/Card/ItemCard';
import VoucherCard from '../../../components/Admin/Card/VoucherCard';
import { connect } from "react-redux";
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { db } from '../../../services/firebaseService';
import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';

const AdminVoucherListScreen = () => {
  const navigation = useNavigation();
  const [vouchers, setVouchers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('productDiscount');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortedVouchers, setSortedVouchers] = useState([]);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadVouchers();
    });

    return unsubscribe;
  }, [navigation]);

  const loadVouchers = async () => {
    try {
      const q = query(collection(db, 'vouchers'));
      const querySnapshot = await getDocs(q);
      const loadedVouchers = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const expirationDate = data.expirationDate.toDate();
        const status = expirationDate > new Date();
        loadedVouchers.push({
          ...data,
          expirationDate,
          status
        });
      });
      setVouchers(loadedVouchers);
    } catch (error) {
      console.log('Error loading vouchers:', error);
    }
  };

  useEffect(() => {
    const sortedVouchers = vouchers.filter(voucher =>
      voucher.voucherType.discountType === selectedOption
    );
    sortedVouchers.sort((a, b) => b.expirationDate - a.expirationDate);
    setSortedVouchers(sortedVouchers);
  }, [vouchers, selectedOption]);

  const renderSortedVouchers = () => {

    return sortedVouchers.map((item, index) => (
      <VoucherCard
        key={index}
        itemName={item.voucherName}
        imageSource={{ uri: item.voucherImage }}
        expiryDate={formatDate(item.expirationDate)}
        status={item.status}
        minimumPrice={item.minimumOrderPrice}
      />
    ));
  };

  const handleSearch = (query) => {
    setSearchKeyword(query);
    if (query) {
      const filteredList = sortedVouchers.filter(item =>
        item.voucherName.toLowerCase().includes(query.toLowerCase())
      );
      setSortedVouchers(filteredList);
    } else {
      const sortedVouchers = vouchers.filter(voucher =>
        voucher.voucherType.discountType === selectedOption
      );
      sortedVouchers.sort((a, b) => b.expirationDate - a.expirationDate);
      setSortedVouchers(sortedVouchers);
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.voucherTypeContainer}>
        <Pressable onPress={() => setSelectedOption('productDiscount')} style={[styles.component, selectedOption === 'productDiscount' && styles.selectedItem]}>
          <Text style={[styles.headingText, selectedOption === 'productDiscount' && styles.selectedText]}>Mã giảm giá</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedOption('shipDiscount')} style={[styles.component, selectedOption === 'shipDiscount' && styles.selectedItem]}>
          <Text style={[styles.headingText, selectedOption === 'shipDiscount' && styles.selectedText]}>Ưu đãi vận chuyển</Text>
        </Pressable>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.sreachBar}>
          <SearchBar onChangeText={handleSearch} />
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
    flex: 1,
    margin: "3%",
  },
  itemListContainer: {
    flex: 1,
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