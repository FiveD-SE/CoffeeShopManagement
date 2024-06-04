import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'

const OrderCard1 = ({
    orderId,
    orderTime,
    orderType,
    orderOwner,
    orderOwnerPhone,
    orderState,
    orderPaymentState,
    handleDetailOrder
}) => {
    const getColorForState = (state) => {
        switch (state) {
            case 'Đã hoàn thành':
                return '#4ecb71';
            case 'Chờ xác nhận':
                return '#FFA730';
            case 'Đang làm':
                return '#f61a3d';
            default:
                return '#FFA730'; // Màu mặc định
        }
    };

    return (
        <TouchableOpacity
            onPress={handleDetailOrder}
            style={styles.orderDetail}>
            <View style={{ flexDirection: 'column', color: '#3A3A3A' }}>
                <Text style={styles.orderId}>Mã đơn hàng: FiveD-{orderId.substring(0, 5)}</Text>
                <Text style={styles.orderTime}>Thời gian: {orderTime}</Text>
                <Text style={styles.orderText}>
                    <Text>Khách hàng: </Text>
                    <Text style={{ fontFamily: 'lato-bold' }}>{orderOwner}</Text>
                </Text>
                <Text style={styles.orderText}>
                    <Text>Trạng thái thanh toán: </Text>
                    <Text style={{ fontFamily: 'lato-bold' }}>{orderPaymentState}</Text>
                </Text>
                <Text style={styles.orderText}>
                    <Text>Trạng thái: </Text>
                    <Text style={{ color: getColorForState(orderState), fontFamily: 'lato-bold' }}>{orderState}</Text>
                </Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
                <Image style={{ width: 48, height: 48 }} source={orderType === 'Giao hàng tận nơi' ? require('../../assets/images/delivery_icon.png') : require('../../assets/images/takeaway_icon.png')} />
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
    orderId: {
        fontSize: 16,
        fontFamily: 'lato-bold'
    },
    orderTime: {
        color: 'rgba(58, 58, 58, 0.50)',
        marginTop: '1%',
        marginBottom: '1%',
        fontFamily: 'lato-light'
    },
    orderText: {
        fontFamily: 'lato-regular',
        fontSize: 14,
        marginBottom: '1%'
    },
    orderDetailText: {
        fontFamily: 'lato-regular',
        fontSize: 14,
        marginBottom: '1%',
        fontWeight: '600'
    }
})

export default OrderCard1