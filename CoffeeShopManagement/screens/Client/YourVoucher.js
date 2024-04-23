import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, FlatList, Image } from 'react-native';

// Reusable voucher item component
const VoucherItem = ({ item }) => (
    <Pressable style={styles.item}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemExpiry}>Hết hạn: {item.expiryDate}</Text>
        </View>
    </Pressable>
);

export default function YourVoucher() {
    const vouchers = [
        { id: 1, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-01', option: 'Giao hàng', image: require('../../assets/voucher.jpeg') },
        { id: 2, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-04-25', option: 'Tại chỗ', image: require('../../assets/voucher.jpeg') },
        { id: 3, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-04', option: 'Mang đi', image: require('../../assets/voucher.jpeg') },
        { id: 4, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-06-01', option: 'Giao hàng', image: require('../../assets/voucher.jpeg') },
    ];

    const filterVouchersByOption = (option) => {
        return vouchers.filter(voucher => voucher.option === option);
    };

    const [selectedOption, setSelectedOption] = useState('Giao hàng');
    const [filteredVouchers, setFilteredVouchers] = useState(filterVouchersByOption(selectedOption));

    useEffect(() => {
        setFilteredVouchers(filterVouchersByOption(selectedOption));
    }, [selectedOption]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>   
                <Pressable onPress={() => setSelectedOption('Giao hàng')} style={[styles.component, selectedOption === 'Giao hàng' && styles.selectedItem]}>
                    <Text style={[styles.headingText, selectedOption === 'Giao hàng' && styles.selectedText]}>Giao hàng</Text>
                </Pressable>
                <Pressable onPress={() => setSelectedOption('Tại chỗ')} style={[styles.component, selectedOption === 'Tại chỗ' && styles.selectedItem]}>
                    <Text style={[styles.headingText, selectedOption === 'Tại chỗ' && styles.selectedText]}>Tại chỗ</Text>
                </Pressable>
                <Pressable onPress={() => setSelectedOption('Mang đi')} style={[styles.component, selectedOption === 'Mang đi' && styles.selectedItem]}>
                    <Text style={[styles.headingText, selectedOption === 'Mang đi' && styles.selectedText]}>Mang đi</Text>
                </Pressable>
            </View>
            
            <View style={styles.section}>
                <Text style={styles.sectionText}>Sắp hết hạn</Text>
                <FlatList
                    data={filteredVouchers.filter(voucher => {
                        const expiryDate = new Date(voucher.expiryDate);
                        const differenceInDays = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
                        return differenceInDays <= 5;
                    })}
                    renderItem={({ item }) => <VoucherItem item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionText}>Sẵn sàng sử dụng</Text>
                <FlatList
                    data={filteredVouchers}
                    renderItem={({ item }) => <VoucherItem item={item} />}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F7FA',
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 50,
        marginBottom: 20
    },
    headingText: {
        fontFamily: 'Lato-Regular',
        color: '#000000',
        textAlign: 'center',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
    },
    component: {
        alignItems: 'center',
        paddingBottom: 5,
    },
    selectedItem: {
        borderBottomWidth: 2,
        borderBottomColor: '#006C5E',
    },
    selectedText: {
        color: '#006C5E',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 10
    },
    sectionText: {
        fontFamily: 'Lato-Regular',
        color: '#000000',
        textAlign: 'left',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10,
    },
    itemImage: {
        width: 70,
        height: 70,
        marginRight: 20,
    },
    itemDetails: {
        flexDirection: 'column',
    },
    itemName: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    itemExpiry: {
        fontFamily: 'Lato-Regular',
        fontSize: 14,
    },
});
