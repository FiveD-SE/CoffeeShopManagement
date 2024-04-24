import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const SelectAddress = () => {
  const navigation = useNavigation();

  const [recentAddresses, setRecentAddresses] = useState([
    { id: '1', address: "FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam" },
    { id: '2', address: "FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam" },
  ]);
  const [savedAddresses, setSavedAddresses] = useState([
    { id: '3', address: "FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam" },
    { id: '4', address: "FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam" },
]);

  const renderRecentAddressItem = ({ item }) => (
    <View style={styles.addressItem}>
      <FontAwesome6 name='clock-rotate-left' size={18} style={styles.icon}/>
      <Text style={styles.addressText}>{item.address}</Text>
    </View>
  );

  const renderSavedAddressItem = ({ item }) => (
    <Pressable style={styles.addressItem} onPress={() => navigation.navigate('EditAddress')}>
      <FontAwesome5 name='map-marker-alt' size={18} style={styles.icon}/>
      <Text style={styles.addressText}>{item.address}</Text>
      <FontAwesome5 name='edit' size={18} style={styles.editIcon}/>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
          <Text style={styles.sectionHeading}>Đã đặt gần đây</Text>
          <FlatList
          data={recentAddresses}
          renderItem={renderRecentAddressItem}
          keyExtractor={item => item.id}
          />
      </View>

      <View style={styles.section}>
          <Text style={styles.sectionHeading}>Địa chỉ đã lưu</Text>
          <FlatList
          data={savedAddresses}
          renderItem={renderSavedAddressItem}
          keyExtractor={item => item.id}
          />
      </View>

      <Pressable style={styles.addButton} onPress={() => navigation.navigate('AddNewAddress')}>
          <FontAwesome5 name='plus' size={18} style={styles.icon}/>
          <Text style={styles.addText}>Thêm địa chỉ mới</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
  },
  icon: {
    marginRight: 15,
  },
  editIcon: {
    marginLeft: 'auto',
    color: '#FFA730',
  },
  addressText: {
    flex: 1,
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: '#9C9C9C',
  },
  addButton: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
  },
  addText: {
    color: '#000000',
    fontFamily: 'Lato-Regular',
    fontSize: 18,
  },
});

export default SelectAddress;
