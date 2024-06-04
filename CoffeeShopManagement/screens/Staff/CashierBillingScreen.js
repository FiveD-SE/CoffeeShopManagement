import { View, Text, SafeAreaView, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import OrderCard1 from '../../components/Staff/OrderCard1'
import { useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../services/firebaseService'

export default function CashierBillingScreen() {
    const [orderData, setOrderData] = useState([]);
    const navigation = useNavigation();
    const handleDetailOrder = (item) => {
        navigation.navigate('OrderScreen', { selectedOrder: item })
    }
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, 'orders'), where('orderState', 'in', ['Đang làm', 'Chờ nhận hàng'])), (snapshot) => {
            setOrderData(snapshot.docs.map(doc => doc.data()));
        });
    }, []);

    const renderListOrder = () => {

        if (orderData.length === 0) {
            return (
                <View style={{ justifyContent: 'center', flex: 1 }}>
                    <Text style={{ fontFamily: 'lato-regular', justifyContent: 'center', alignSelf: 'center', fontSize: 16 }}>Không có đơn hàng nào</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={orderData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.orderId}
                    renderItem={({ item }) => (
                        <OrderCard1
                            orderId={item.orderId}
                            orderTime={item.orderTime.toDate().toDateString()}
                            orderType={item.orderType}
                            orderOwner={item.orderOwner}
                            orderOwnerPhone={item.orderOwnerPhone}
                            orderState={item.orderState}
                            orderPaymentState={item.orderPaymentState}
                            handleDetailOrder={() =>
                                handleDetailOrder(item)
                            }
                        />
                    )}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBoxWrapper}>
                <TextInput
                    placeholder='Tra cứu mã đơn hàng'
                    style={styles.searchBox} />
            </View>
            {renderListOrder()}
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