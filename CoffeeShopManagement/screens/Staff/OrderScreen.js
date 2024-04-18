import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

export default function OrderScreen() {
    const navigation = useNavigation();
    const handleback = () => {
        navigation.goBack();
    }
    const DATA = [
        {
            name: 'Oolong Tứ Quý Kim Quất Trân Châu',
            price: '59.000',
            topping: 'Size S, Ít đường, Trân châu trắng',
            amount: '1'
        },
        {
            name: 'Oolong Tứ Quý Kim Quất Trân Châu',
            price: '59.000',
            topping: 'Size S, Ít đường, Trân châu trắng',
            amount: '1'
        },
        {
            name: 'Oolong Tứ Quý Kim Quất Trân Châu',
            price: '59.000',
            topping: 'Size S, Ít đường, Trân châu trắng',
            amount: '1'
        },
    ]
    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 10, marginTop: 10, height: 120, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{justifyContent: 'space-between', height: 120, padding: 10, width: 230}}>
                <Text style={{fontSize: 16}}>{item.name}</Text>
                <Text style={{fontSize: 14, color: 'rgba(58, 58, 58, 0.5)'}}>{item.price}</Text>
                <Text style={{fontSize: 14, color: 'rgba(58, 58, 58, 0.5)'}}>{item.topping}</Text>
            </View>
            <View style={{justifyContent: 'center', paddingEnd: 20}}>
                <Text style={{fontSize: 16}}>
                    <Text>SL: </Text>
                    <Text>{item.amount}</Text>
                </Text>
            </View>
        </View>
      );
      
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topApp}>
            <TouchableOpacity
            onPress={handleback}>
                <View>
                    <Icon name='chevron-left' size={32}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.detailOrderText}>Chi tiết đơn hàng</Text>
        </View>
        <View style={styles.bodyApp}>
            <View>
                <Text style={{fontSize: 18, fontWeight: '500'}}>Sản phẩm</Text>
                <FlatList 
                data={DATA}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                style={{height: 340}}
                />
            </View>   
            
            <View style={{marginTop: 10,flexDirection: 'column'}}>
                <Text style={{fontSize: 18, fontWeight: '500'}}>Thông tin đơn hàng</Text>
                <View style={{padding: 10, backgroundColor: 'rgba(255, 255, 255, 1)', borderRadius: 10, height: 160, justifyContent: 'space-between', marginTop: 10}}>
                    <Text style={{fontSize: 16}}>Người nhận: Anh Tánh</Text>
                    <Text style={{fontSize: 16}}>SDT người nhận: 0352085655</Text>
                    <Text style={{fontSize: 16}}>Loại đơn: Tự đến lấy hàng</Text>
                    <Text style={{fontSize: 16}}>Trạng thái: Đã nhận đơn lúc 10:45</Text>
                    <Text style={{fontSize: 16}}>Trạng thái thanh toán: Chưa thanh toán</Text>
                </View>
            </View>
        </View>
        <View style={styles.bottomApp}>
            <TouchableOpacity style={{backgroundColor: 'rgba(255, 167, 48, 1)', width: 300, justifyContent: 'center', alignItems: 'center', padding: 15, borderRadius: 10 }}>
                <Text style={{color: 'rgba(255, 255, 255, 1)', fontSize: 18}}>Nhận đơn ⋅ 59.000đ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{borderRadius: 5, borderWidth: 0.1, padding: 10, }}>
                <Image 
                source={require('../../assets/trash.png')} 
                style={{height: 40, width: 40}}/>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center'
    },
    topApp: {
        flex: 1, 
        borderBottomWidth: 1,
        paddingTop: 30,
        alignItems:'center',
        flexDirection:'row'
    },
    bodyApp: {
        flex: 10,
        paddingTop: 20,
        backgroundColor: '#f8f7fa',
        paddingStart: 15,
        paddingEnd: 15,
        paddingBottom: 15,
    },
    detailOrderText: {
        marginStart: 10,
        fontSize: 20,
        fontWeight:'500'
    },
    bottomApp: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingStart: 15, 
        paddingEnd: 15
    }
})