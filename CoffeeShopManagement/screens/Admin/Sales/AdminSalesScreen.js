import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import AddNewItemButton from '../../../components/Admin/Button/AddNewItemButton';
import AddNewVoucherButton from '../../../components/Admin/Button/AddNewVoucherButton';
import Section from '../../../components/Client/Section';
import ItemCard from '../../../components/Admin/Card/ItemCard';
import VoucherCard from '../../../components/Admin/Card/VoucherCard';
import { useNavigation } from '@react-navigation/native';

const PRODUCT_IMAGE_SOURCE = require("../../../assets/starbucks.jpeg");

const AdminSalesScreen = () => {
    const navigation = useNavigation();

    const goToItemListScreen = () => {
        navigation.navigate("AdminItemList");
    };

    const goToVoucherListScreen = () => {
        navigation.navigate("AdminVoucherList");
    };

    const ItemCardList = [
        {
            title: "Smoothie Xoài Nhiệt Đới Granola",
            price: 65000,
            imageSource: PRODUCT_IMAGE_SOURCE,
        },
        {
            title: "Smoothie Phúc Bồn Tử Granola",
            price: 65000,
            imageSource: PRODUCT_IMAGE_SOURCE,
        },
        {
            title: "Oolong Tứ Quý Vải",
            price: 65000,
            imageSource: PRODUCT_IMAGE_SOURCE,
        },
    ];

    const VoucherList = [
        { id: 1, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-01', option: 'Mã giảm giá', status: true, image: require('../../../assets/voucher.jpeg') },
        { id: 2, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-04-25', option: 'Ưu đãi vận chuyển', ststatusate: true, image: require('../../../assets/voucher.jpeg') },
        { id: 3, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-04', option: 'Ưu đãi vận chuyển', status: false, image: require('../../../assets/voucher.jpeg') },
    ];

    const renderItemList = () => {
        return ItemCardList.map((item, index) => (
            <ItemCard
                key={index}
                title={item.title}
                price={item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
                imageSource={item.imageSource}
            />
        ));
    };

    const renderVoucherList = () => {
        return VoucherList.map((item, index) => (
            <VoucherCard
                key={index}
                itemName={item.name}
                imageSource={item.image}
                expiryDate={item.expiryDate}
                status={item.status}
            />
        ));
    };
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionContainer}>
                <Section
                    title="Danh sách sản phẩm"
                    showSubtitle={true}
                    subtitle="Xem tất cả"
                    onPressSubtitle={goToItemListScreen}
                >
                    <View style={{ marginTop: "3%" }}>
                        {renderItemList()}
                    </View>
                </Section>
            </View>
            <AddNewItemButton />
            <View style={styles.sectionContainer}>
                <Section
                    title="Danh sách khuyến mãi"
                    showSubtitle={true}
                    subtitle="Xem tất cả"
                    onPressSubtitle={goToVoucherListScreen}
                >
                    <View style={{ marginTop: "3%" }}>
                        {renderVoucherList()}
                    </View>
                </Section>
            </View>
            <AddNewVoucherButton />
        </ScrollView>
    )
}

export default AdminSalesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "3%",
        marginTop: "7%",
        marginBottom: "3%"
    },
    sectionContainer: {
        marginVertical: "4%",
        backgroundColor: "#ffffff",
        padding: "3%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#D8D8D8"
    },

})