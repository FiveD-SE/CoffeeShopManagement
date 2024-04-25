import { View, Text, SafeAreaView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import OrderCard1 from '../../components/Staff/OrderCard1'
import { useNavigation } from '@react-navigation/native'

export default function CashierBillingScreen() {
    const navigation = useNavigation();
    const handleDetailOrder = () => {
        navigation.navigate('OrderScreen')
    }
    const DATA = [
        {
            orderId: '#12345',
            time: '10:45 SA 16/03/2024',
            orderType: 'Tự đến lấy hàng',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Đang làm'
        },
        {
            orderId: '#12346',
            time: '10:45 SA 16/03/2024',
            orderType: 'Tự đến lấy hàng',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Chờ xác nhận'
        },
        {
            orderId: '#12347',
            time: '10:45 SA 16/03/2024',
            orderType: 'Tự đến lấy hàng',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Đã xong'
        },
        {
            orderId: '#12348',
            time: '10:45 SA 16/03/2024',
            orderType: 'Tự đến lấy hàng',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Đã hoàn thành'
        },
    ]
  return (
    <View style={styles.container}>
        <View style={styles.searchBoxWrapper}>
            <TextInput 
            placeholder='Tra cứu mã đơn hàng'
            style={styles.searchBox}/>
        </View>
        <FlatList
            showsVerticalScrollIndicator={false}
            data={DATA}
            keyExtractor={item => item.orderId} 
            renderItem={({item}) => (
            <OrderCard1 item={item} handleDetailOrder={handleDetailOrder}/>
        )}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
    searchBoxWrapper: {
        marginTop: '15%',
        marginBottom: '5%',
        justifyContent: 'center',
    },
    searchBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ebebeb',
        borderWidth: 1,
        padding: '3%'
    },
})