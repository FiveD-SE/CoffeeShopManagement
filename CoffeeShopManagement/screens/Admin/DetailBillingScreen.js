import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

export default function DetailBillingScreen() {
  const navigation = useNavigation();
    const handleback = () => {
        navigation.goBack();
    }
  const DATA = [
    {
      id: '12345',
      amount: 2,
      name: 'Oolong Tứ Quý Kim Quất Trân Châu',
      size: 'Vừa',
      price: '118.000',
    },
    {
      id: '12346',
      amount: 2,
      name: 'Oolong Tứ Quý Kim Quất Trân Châu',
      size: 'Vừa',
      price: '118.000',
    },
    {
      id: '12347',
      amount: 2,
      name: 'Oolong Tứ Quý Kim Quất Trân Châu',
      size: 'Vừa',
      price: '118.000',
    },
    {
      id: '12348',
      amount: 2,
      name: 'Oolong Tứ Quý Kim Quất Trân Châu',
      size: 'Vừa',
      price: '118.000',
    },
    {
      id: '12349',
      amount: 2,
      name: 'Oolong Tứ Quý Kim Quất Trân Châu',
      size: 'Vừa',
      price: '118.000',
    },
    {
      id: '12341',
      amount: 2,
      name: 'Oolong Tứ Quý Kim Quất Trân Châu',
      size: 'Vừa',
      price: '118.000',
    },
  ]
  return (
    <View style={styles.container}>
      <View style={styles.topApp}>
        <TouchableOpacity
        onPress={handleback}>
            <Icon name='chevron-left' size={32}/>
        </TouchableOpacity>
        <Text style={styles.orderText}>Đơn hàng: #####</Text>
      </View>
      <ScrollView 
      style={styles.section}
      showsVerticalScrollIndicator={false}
      >
        <View style={{marginBottom: '5%'}}>
          {DATA.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                  <Image source={require('../../assets/system-uicons_write.png')} style={{width: 32, height: 32}}/>
                </TouchableOpacity>
                <View style={{justifyContent: 'space-between', marginStart: '5%'}}>
                  <Text style={{fontSize: 12, fontWeight: '600'}}>x{item.amount} {item.name}</Text>
                  <Text style={{color: '#808080', fontSize: 10}}>{item.size}</Text>
                </View>
              </View>
              <Text style={{fontWeight: '600'}}>{item.price}đ</Text>
            </View>
          ))}
        </View>
        <View style={{marginBottom: '5%'}}>
          <View style={styles.topInforText}>
            <Image source={require('../../assets/person_icon.png')} />
            <Text style={{marginStart: '3%', fontWeight: '600', fontSize: 16}}>Thông tin khách hàng</Text>
          </View>
          <View style={styles.inforWrapper}>
            <Text style={{paddingBottom: '1%'}}>
              <Text style={{fontWeight: '600'}}>Người giao: </Text>
              <Text style={{fontWeight: '200'}}>Nguyễn Quốc Thắng</Text>
            </Text>
            <Text style={{paddingBottom: '1%'}}>
              <Text style={{fontWeight: '600'}}>Số điện thoại: </Text>
              <Text style={{fontWeight: '200'}}>0123456789</Text>
            </Text>
            <Text>
              <Text style={{fontWeight: '600'}}>Địa chỉ: </Text>
              <Text style={{fontWeight: '200'}}>Kí túc xá khu B, ...</Text>
            </Text>
          </View>
        </View>
        <View style={{marginBottom: '5%'}}>
          <View style={styles.topDeliText}>
            <Image source={require('../../assets/delivery_icon.png')} />
            <Text style={{marginStart: '3%', fontWeight: '600', fontSize: 16}}>Thông tin đơn hàng</Text>
          </View>
          <View style={styles.deliWrapper}>
            <Text style={{paddingBottom: '1%'}}>
              <Text style={{fontWeight: '600'}}>Người giao: </Text>
              <Text style={{fontWeight: '200'}}>Nguyễn Quốc Thắng</Text>
            </Text>
            <Text style={{paddingBottom: '1%'}}>
              <Text style={{fontWeight: '600'}}>Số điện thoại: </Text>
              <Text style={{fontWeight: '200'}}>0123456789</Text>
            </Text>
            <Text style={{paddingBottom: '1%'}}>
              <Text style={{fontWeight: '600'}}>Mã gửi hàng: </Text>
              <Text style={{fontWeight: '200'}}>#####</Text>
            </Text>
            <Text>
              <Text style={{fontWeight: '600'}}>Mã phiếu gửi: </Text>
              <Text style={{fontWeight: '200'}}>#####</Text>
            </Text>
          </View>
        </View>
        <View>
          <Text style={{fontSize: 16, fontWeight: '600'}}>BrandName Voucher</Text>
        </View>
        <View style={{marginBottom: '5%'}}>
          <View style={styles.topTotalText}>
            <Image source={require('../../assets/person_icon.png')} />
            <Text style={{marginStart: '3%', fontWeight: '600', fontSize: 16}}>Chi tiết thanh toán</Text>
          </View>
          <View style={styles.totalWrapper}>
            <View style={{paddingBottom: '1%', justifyContent: 'space-between', width: '100%', flexDirection: 'row'}}>
              <Text style={{fontWeight: '600'}}>Tổng tiền hàng: </Text>
              <Text style={{fontWeight: '200'}}>236.000đ</Text>
            </View>
            <View style={{paddingBottom: '1%', justifyContent: 'space-between', width: '100%', flexDirection: 'row'}}>
              <Text style={{fontWeight: '600'}}>Tổng tiền phí vận chuyển: </Text>
              <Text style={{fontWeight: '200'}}>30.000đ</Text>
            </View>
            <View style={{paddingBottom: '1%', justifyContent: 'space-between', width: '100%', flexDirection: 'row'}}>
              <Text style={{fontWeight: '600'}}>Giảm giá phí vận chuyển: </Text>
              <Text style={{fontWeight: '200'}}>-30.000đ</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10%'}}>
          <Text style={{fontSize: 16, fontWeight: '600'}}>Tổng tiền:</Text>
          <Text style={{fontSize: 18, fontWeight: '600'}}>236.000đ</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    topApp: {
        marginTop: '10%',
        backgroundColor: '#fff',
        padding: '3%',
        borderBottomWidth: 1,
        borderColor: '#cbcbd4',
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderText: {
        fontSize: 16, 
        fontWeight: '600',
        paddingStart: '25%'
    },
    section: {
        flex: 1,
        padding: '5%',
    },
    item:
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: '2%',
      marginTop: '2%'
    },
    topInforText: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    inforWrapper: {
      backgroundColor: '#f1f7f3',
      padding: '3%',
      borderRadius: 10,
    },
    topDeliText: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    deliWrapper: {
      backgroundColor: '#f1f7f3',
      padding: '3%',
      borderRadius: 10,
    },
    topTotalText: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    totalWrapper: {
      backgroundColor: '#f1f7f3',
      padding: '3%',
      borderRadius: 10,
    }
})