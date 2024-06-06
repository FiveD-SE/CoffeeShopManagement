import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
const ProductCardwithPrice = ({
    name, quantity, price, imageSource, unit
}) => {
    function formatVND(number) {
        return number.toLocaleString('vi-VN');
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: imageSource }} resizeMode="cover" />
            </View>
            <View style={styles.main}>
                <Text style={styles.name}>{name}</Text>
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
        </SafeAreaView>
    )
}

export default ProductCardwithPrice

const styles = StyleSheet.create({
    container: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginVertical: "1%",
        padding: "2%",
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
        width: 80,
        height: 80,
        borderRadius: 10,
        aspectRatio: 1,
    },
    main: {
        flex: 1,
        paddingHorizontal:"5%",
    },
    name: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 20,
        marginBottom: "5%",
    },
    label: {
        color: "rgba(58,58,58,0.5)",
        fontSize: 16,
        fontWeight: "500",
    },
    price: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
    }
});
