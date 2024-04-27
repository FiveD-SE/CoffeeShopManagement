import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'

const OrderCard2 = ({item, handleDetailOrder}) => {
    
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
            <Text>
                <Text>Trạng thái: </Text>
                <Text style={{color: '#FFA730'}}>{item.state}</Text>
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

export default OrderCard2