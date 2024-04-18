import { View, Text, SafeAreaView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'

export default function CashierBillingScreen() {
    const DATA = [
        {
            orderId: '#12345',
            time: '10:45 SA 16/03/2024',
            orderType: 'Tự đến lấy hàng',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Chờ xác nhận'
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
            state: 'Chờ xác nhận'
        },
        {
            orderId: '#12348',
            time: '10:45 SA 16/03/2024',
            orderType: 'Tự đến lấy hàng',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Chờ xác nhận'
        },
    ]
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.searchBoxWrapper}>
            <TextInput 
            placeholder='Tra cứu mã đơn hàng'
            style={styles.searchBox}/>
        </View>
        <View style={styles.listOrderWrapper}>
        <FlatList
                        data = {DATA}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.orderDetail}>
                                <View style={{flexDirection:'column', color: '#3A3A3A'}}>
                                    <Text style={{fontSize: 16}}>Mã đơn hàng: {item.orderId}</Text>
                                    <Text style={{color: 'rgba(58, 58, 58, 0.50)', marginTop:5, marginBottom: 5}}>Thời gian: {item.time}</Text>
                                    <Text>Loại đơn: {item.orderType}</Text>
                                    <Text>Người nhận: {item.customer}</Text>
                                    <Text>SDT Người nhận: {item.sdt}</Text>
                                    <Text style={{marginBottom: 5}}>Trạng thái thanh toán: {item.orderState}</Text>
                                    <Text>
                                        <Text>Trạng thái: </Text>
                                        <Text style={{color: '#FFA730'}}>{item.state}</Text>
                                    </Text>
                                </View>
                                <View style={{justifyContent: 'center'}}>
                                    <Icon name="chevron-small-right" size={48}/>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.orderId}/>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    searchBoxWrapper: {
        flex: 1,
        marginTop: 40,
        padding: 15,
        justifyContent: 'center',
    },
    searchBox: {
        borderRadius: 5,
        borderWidth: 0.1,
        height: 40,
        paddingStart: 15,
    },
    listOrderWrapper: {
        flex: 12,
        padding: 15,
    },
    orderDetail: {
        borderWidth: 0.5,
        borderRadius: 20,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    }
})