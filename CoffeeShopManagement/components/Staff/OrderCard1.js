import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'

const OrderCard1 = ({item, handleDetailOrder}) => {
    const getColorForState = (state) => {
        switch(state) {
            case 'Đã xong':
                return '#4ecb71';
            case 'Chờ xác nhận':
                return '#FFA730';
            case 'Đang làm':
                return '#f61a3d';
            default:
                return '#4ecb71'; // Màu mặc định
        }
    };
    
  return (
    <TouchableOpacity 
        onPress={handleDetailOrder}
        style={styles.orderDetail}>
        <View style={{flexDirection:'column', color: '#3A3A3A'}}>
            <Text style={{fontSize: 16}}>Mã đơn hàng: {item.orderId}</Text>
            <Text style={{color: 'rgba(58, 58, 58, 0.50)', marginTop:'1%', marginBottom: '1%'}}>Thời gian: {item.time}</Text>
            <Text>Loại đơn: {item.orderType}</Text>
            <Text>Người nhận: {item.customer}</Text>
            <Text>SDT Người nhận: {item.sdt}</Text>
            <Text style={{marginBottom: '1%'}}>Trạng thái thanh toán: {item.orderState}</Text>
            <Text>
                <Text>Trạng thái: </Text>
                <Text style={{color: getColorForState(item.state), fontWeight: '600'}}>{item.state}</Text>
            </Text>
        </View>
            <View style={{justifyContent: 'center'}}>
                <Icon name="chevron-small-right" size={48}/>
            </View>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    orderDetail: {
        
        borderRadius: 20,
        padding: '4%',
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        marginBottom: '5%'
    },
})

export default OrderCard1