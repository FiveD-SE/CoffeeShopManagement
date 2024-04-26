import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import ProductCard from '../../components/Staff/ProductCard';

export default function OrderScreen() {
    
    const DATA = [
        {
            id: '1234',
            name: 'Oolong Tứ Quý Kim Quất Trân Châu',
            price: '59.000',
            topping: 'Size S, Ít đường, Trân châu trắng',
            amount: '1'
        },
        {
            id: '1235',
            name: 'Oolong Tứ Quý Kim Quất Trân Châu',
            price: '59.000',
            topping: 'Size S, Ít đường, Trân châu trắng',
            amount: '1'
        },
        {
            id: '1236',
            name: 'Oolong Tứ Quý Kim Quất Trân Châu',
            price: '59.000',
            topping: 'Size S, Ít đường, Trân châu trắng',
            amount: '1'
        },
    ]
      
  return (
    <View style={styles.container}>
        <View style={styles.bodyApp}>
            <View>
                <Text style={styles.topText}>Sản phẩm</Text>
                <FlatList 
                    data={DATA}
                    keyExtractor={item => item.id}
                    style={styles.productList}
                    renderItem={({item}) => (
                        <ProductCard item={item}/>
                    )}/>
            </View>
            <View>
                <Text style={styles.topText}>Thông tin đơn hàng</Text>
                <View style={styles.deliInforWrapper}>
                    <Text>Người nhận: Trần Tuệ Tánh</Text>
                    <Text>SDT người nhận: 0352085655</Text>
                    <Text>Loại đơn: Tự đến lấy hàng</Text>
                    <Text>Trạng thái: Đã đến lấy hàng lúc 10:45</Text>
                    <Text>Trạng thái: Đã thanh toán</Text>
                </View>
            </View>
        </View>
        <View style={styles.bottomApp}>
            <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptText}>Nhận đơn ⋅ 59.000đ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
                <Image 
                source={require('../../assets/trash.png')} 
                style={{height: 40, width: 40}}/>
            </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyApp: {
        padding: '5%'
    },
    topText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
    },
    productList: {
        height: '60%',
        marginBottom: '5%'
    },
    inforText: {

    },
    deliInforWrapper: {
        flexDirection: 'column',
        fontSize: 14,
        fontWeight: '600',
        padding: '3%',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    bottomApp: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '5%'
    },
    acceptButton: {
        backgroundColor: '#006c5e', 
        width: '80%',
        height: 'auto',
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '5%', 
        borderRadius: 10 
    },
    acceptText: {
        color: 'rgba(255, 255, 255, 1)', 
        fontSize: 18
    },
    deleteButton: {
        borderRadius: 20, 
        borderWidth: 1, 
        borderColor: "#CCCCCC",
        padding: 10, 
    },
})