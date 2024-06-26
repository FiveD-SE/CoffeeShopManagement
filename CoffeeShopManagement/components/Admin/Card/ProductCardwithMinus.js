import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import ExportGoodModal from '../Modal/ExportGoodModal';
import EditGoodInfoModal from '../Modal/EditGoodInfoModal';

const ProductCardwithMinus = ({
    title, quantity, price, imageSource, unit, onPress
}) => {
    function formatVND(number) {
        return number.toLocaleString('vi-VN');
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={imageSource} resizeMode="cover" />
            </View>
            <View style={styles.main}>
                <Text style={styles.title}>{title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={styles.label}>Số lượng:</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.label}>{quantity}</Text>
                        <Text style={styles.label}> {unit}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <View>
                        <Text style={styles.label}>Giá nhập:</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.label}>{formatVND(Number(price))} VND</Text>
                        <Text style={styles.label}>/{unit}</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={onPress}>
                <FontAwesome name="minus-circle" size={40} color="#FFA730" />
            </TouchableOpacity>
        </View>
    )
}

export default ProductCardwithMinus

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginVertical: "1%",
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.05)",
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.05)",
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height: 100,
        aspectRatio: 1,
        borderRadius: 10,
    },
    main: {
        flex: 1,
        paddingRight: "5%",
        paddingLeft: "3%"
    },
    title: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 20,
        marginBottom: "10%",
    },
    label: {
        color: "rgba(58,58,58,0.5)",
        fontSize: 16,
        fontWeight: "500",
    },
});
