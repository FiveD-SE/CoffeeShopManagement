import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const renderItem = ({item, onPress}) => (
    <TouchableOpacity 
    onPress={() => onPress(item.id)}
    style={{padding: '5%', borderTopWidth: 1, borderColor: '#cccccc', borderWidth: 1, marginBottom: '5%', backgroundColor: '#fff', borderRadius: 10}}>
        <View>
            <Text style={{fontSize: 16, fontWeight: '600'}}>{item.id}</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5%'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{backgroundColor: '#e3ffea', alignItems: 'center', justifyContent: 'center', padding: '3%', borderRadius: 15, marginEnd: '5%', paddingStart: '5%', paddingEnd: '5%'}}>
                    <Text style={{color: '#4ecb71'}}>{item.state}</Text>
                </View>
                <Text style={{color: '#808080'}}>{item.date}</Text>
            </View>
            <Text>
                <Text>{item.price}</Text>
                <Text>VND</Text>
            </Text>
        </View>
    </TouchableOpacity>
)

export default function AdminBillingScreen() {
    const navigation = useNavigation();
    const handleDetailBilling = (id) => {
        navigation.navigate("AdminDetailBilling", { id: id });
    }
    const DATA = [
        {
            id: '123456',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123457',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123458',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123459',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123451',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123452',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123453',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123454',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
    ]
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

    useEffect(() => {
        
        const randomIndex = Math.floor(Math.random() * 3);
        setSelectedButtonIndex(randomIndex);
    }, []);

    const selectionButtons = ['Tất cả', 'Thành viên', 'Mới'];
  return (
    <View style={styles.container}>
        <View style={styles.section}>
            <TextInput style={styles.searchBox}
            placeholder='Tìm kiếm'/>
            <View style={styles.invoice}>
                <View style={styles.invoiceFirst}>
                    <View style={{width: 48, height: 48, backgroundColor: '#ddebe9', justifyContent: 'center', alignItems: 'center', borderRadius: 30}}>
                        <Image source={require('../../assets/iconamoon_invoice-bold.png')}/>
                    </View>
                </View>
                <View style={styles.invoiceSecond}>
                    <View>
                        <Text style={styles.orderNumber}>69</Text>
                        <Text style={{fontSize: 14, color: '#a6a6aa'}}>Tổng số hoá đơn</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, color: '#47a4df', fontWeight: '600'}}>20%</Text>
                        <Image source={require('../../assets/uptrend.png')}/>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: '5%'}}>
                {selectionButtons.map((buttonTitle, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={[
                            styles.selectionButton,
                            selectedButtonIndex === index && { backgroundColor: '#e6f1ef'}
                        ]}
                        onPress={() => setSelectedButtonIndex(index)}
                    >
                        <Text style={[{fontSize: 14, color: '#a6a6aa'}, selectedButtonIndex === index && {color: '#006C5E', fontWeight: '600'}]}>{buttonTitle}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList 
            style={styles.listOrderContainer}
            data={DATA}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem({ item: item, onPress: handleDetailBilling })}
            />
        </View>
    </View>
  )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginTop: "14%",
        marginBottom: "5%",
        marginHorizontal: "3%",
    },
    searchBox: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: "1%",
        paddingStart: 15,
        backgroundColor: "#fff",
        borderColor: '#e5e4e7',
        marginBottom: '5%'
    },
    invoice: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e4e7',
        width: '100%',
        padding: '5%',
        flexDirection: 'column',
        paddingStart: '8%',
        paddingEnd: '8%',
        marginBottom: '5%'
    },
    invoiceFirst: {
        marginBottom: '5%',
    },
    invoiceSecond: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
    },
    orderNumber: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
    },
    selectionButton: {
        padding: '3%',
        borderRadius: 10, 
        marginEnd: '5%'
    },
    listOrderContainer: {
        height: '60%'
    }
})