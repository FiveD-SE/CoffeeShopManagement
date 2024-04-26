import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const ProductCard = ({ item }) => (
    <View style={styles.productCard}>
        <View style={styles.productDetailText}>
            <Text style={{fontSize: 16}}>{item.name}</Text>
            <Text style={{fontSize: 14, color: 'rgba(58, 58, 58, 0.5)'}}>{item.price}</Text>
            <Text style={{fontSize: 14, color: 'rgba(58, 58, 58, 0.5)'}}>{item.topping}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
            <Text style={{fontSize: 16}}>
                <Text>SL: </Text>
                <Text>{item.amount}</Text>
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    productCard: {
        backgroundColor: 'rgba(255, 255, 255, 1)', 
        borderRadius: 10,  
        flexDirection: 'row', 
        justifyContent: 'space-between',
        padding: '2%',
        marginBottom: '5%',
        width: '100%'
    },
    productDetailText: {
        justifyContent: 'space-between', 
        padding: 10, 
        width: 230
    }
})

export default ProductCard;