import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper';
import AddGoodModal from '../Modal/AddGoodModal';
import EditGoodInfoModal from '../Modal/EditGoodInfoModal';

const ProductCardwithPlus = ({
   name, quantity, price, imageSource, unit, onPressEdit, onPressAddNew
}) => {
    return (
        <View>
            <TouchableOpacity style={styles.container} onPress={onPressEdit}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={imageSource} resizeMode="cover" />
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
                            <Text style={styles.label}>{price} VND</Text>
                            <Text style={styles.label}>/{unit}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={onPressAddNew}>
                        <AntDesign name="pluscircle" size={36} color="#FFA730" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ProductCardwithPlus

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
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 100,
        aspectRatio: 1,
    },
    main: {
        flex: 1,
        paddingRight: "5%",
        paddingLeft: "3%"
    },
    name: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
        marginBottom: "10%",
        fontFamily:"lato-bold"
    },
    label: {
        color: "rgba(58,58,58,0.5)",
        fontSize: 13,
        fontWeight: "500",
        fontFamily:"lato-regular"
    },
    IconButton: {

    }
});
