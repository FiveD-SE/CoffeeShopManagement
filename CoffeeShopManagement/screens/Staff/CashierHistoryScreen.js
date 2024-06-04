import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import OrderCard1 from '../../components/Staff/OrderCard1'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../services/firebaseService'
import HistoryTabs from '../../components/Staff/HistoryTabs'

export default function CashierHistoryScreen() {
    const [orderData, setOrderData] = useState([]);
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [filteredData, setFilteredData] = useState([]);

    const navigation = useNavigation();
    const handleDetailOrder = (item) => {
        navigation.navigate('OrderScreen', { selectedOrder: item })
    }
    useFocusEffect(useCallback(() => {
        const unsub = onSnapshot(query(collection(db, 'orders'), where('orderState', '==', 'Đã hoàn thành')), (snapshot) => {
            setOrderData(snapshot.docs.map(doc => doc.data()));
            setFilteredData(snapshot.docs.map(doc => doc.data()));
        });
    }, []));

    return (
        <View style={styles.container}>
            <View style={styles.topApp}>
                <TextInput
                    placeholder='Tra cứu mã đơn hàng'
                    style={styles.searchBox} />
            </View>
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <HistoryTabs />
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
})