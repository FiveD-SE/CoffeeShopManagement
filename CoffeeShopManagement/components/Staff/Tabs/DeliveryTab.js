import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import OrderCard1 from '../OrderCard1';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../services/firebaseService';

export default function DeliveryTab() {
    const [orderData, setOrderData] = useState([]);
    const handleDetailOrder = (item) => {
        navigation.navigate('OrderScreen', { selectedOrder: item })
    }
    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, 'orders'), where('orderState', '==', 'Đã hoàn thành'), where('orderType', '==', 'Giao hàng tận nơi')), (snapshot) => {
            setOrderData(snapshot.docs.map(doc => doc.data()));
        });
    }, []);
    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={orderData}
                keyExtractor={item => item.orderId}
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
                )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    }
})