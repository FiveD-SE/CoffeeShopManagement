import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import OrderCard2 from '../../components/Staff/OrderCard2';

export default function CashierHistoryScreen() {
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
            orderType: 'Giao hàng tận nơi',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Chờ xác nhận'
        },
        {
            orderId: '#12348',
            time: '10:45 SA 16/03/2024',
            orderType: 'Giao hàng tận nơi',
            customer: 'Tánh',
            sdt: '0352085655',
            orderState: 'Chưa thanh toán',
            state: 'Chờ xác nhận'
        },
    ]
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

    const [filteredData, setFilteredData] = useState(DATA);

    const handleFilter = (index) => {
        console.log(index);
        console.log(selectionButtons[index]);
        setSelectedButtonIndex(index);

        if (index === 0) {
            // Hiển thị tất cả đơn hàng
            setFilteredData(DATA);
        } else {
            // Lọc đơn hàng theo loại đơn hàng
            const filtered = DATA.filter(item => item.orderType === selectionButtons[index]);
            setFilteredData(filtered);
        }
    };
    const selectionButtons = ['Tất cả', 'Giao hàng tận nơi', 'Tự đến lấy hàng'];

    return (
        <View style={styles.container}>
            <View style={styles.topApp}>
                <TextInput
                    placeholder='Tra cứu mã đơn hàng'
                    style={styles.searchBox} />
                <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
                    {selectionButtons.map((buttonTitle, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.selectionButton,
                                selectedButtonIndex === index && { borderBottomWidth: 1, borderColor: '#ffc069' }
                            ]}
                            onPress={() => handleFilter(index)}
                        >
                            <Text style={[{ fontSize: 14 }, selectedButtonIndex === index && { color: '#ffc069' }]}>{buttonTitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <View>
                <View style={{ margin: '4%', height: '84%' }}>
                    <FlatList
                        data={filteredData}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <OrderCard2 item={item} />
                        )}
                        keyExtractor={item => item.orderId} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topApp: {
        paddingTop: '15%',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(58, 58, 58, 0.1)',
        backgroundColor: '#fff'
    },
    searchBox: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        padding: '3%',
        margin: '5%',
    },
    selectionButton: {
        flex: 1,
        justifyContent: 'center',
        height: 40,
        alignItems: 'center'
    },
})