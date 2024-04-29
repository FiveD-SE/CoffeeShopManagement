import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, Image, ScrollView } from 'react-native';

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
        { id: 1, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-01', option: 'Giao hàng', image: require('../../../assets/voucher.jpeg') },
        { id: 2, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-04-25', option: 'Tại chỗ', image: require('../../../assets/voucher.jpeg') },
        { id: 3, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-04', option: 'Mang đi', image: require('../../../assets/voucher.jpeg') },
        { id: 4, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-06-01', option: 'Giao hàng', image: require('../../../assets/voucher.jpeg') },
    ];

    const [selectedTab, setSelectedTab] = useState('Giao hàng');
    const [filteredVouchers, setFilteredVouchers] = useState(vouchers);
  
    const handleTabPress = (tab) => {
        setSelectedTab(tab);
        if (tab === 'Giao hàng') {
            setFilteredVouchers(vouchers);
        } else {
            setFilteredVouchers(vouchers.filter(item => item.option === tab));
        }
    };

    useEffect(() => {
        setFilteredVouchers(vouchers.filter(voucher => voucher.option === selectedTab));
    }, [selectedTab]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                {/* Tab buttons */}
                <Pressable
                    style={[styles.headingLabel, selectedTab === 'Giao hàng' && styles.selectedLabel]}
                    onPress={() => handleTabPress('Giao hàng')}
                >
                    <Text style={[styles.headingText, selectedTab === 'Giao hàng' && styles.selectedText]}>Giao hàng</Text>
                </Pressable>
                <Pressable
                    style={[styles.headingLabel, selectedTab === 'Tại chỗ' && styles.selectedLabel]}
                    onPress={() => handleTabPress('Tại chỗ')}
                >
                    <Text style={[styles.headingText, selectedTab === 'Tại chỗ' && styles.selectedText]}>Tại chỗ</Text>
                </Pressable>
                <Pressable
                    style={[styles.headingLabel, selectedTab === 'Mang đi' && styles.selectedLabel]}
                    onPress={() => handleTabPress('Mang đi')}
                >
                    <Text style={[styles.headingText, selectedTab === 'Mang đi' && styles.selectedText]}>Mang đi</Text>
                </Pressable>
            </View>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={[styles.sectionText, { marginTop: 20 }]}>Sắp hết hạn</Text>
                    {filteredVouchers.filter(voucher => {
                        const expiryDate = new Date(voucher.expiryDate);
                        const differenceInDays = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
                        return differenceInDays <= 5;
                    }).map(item => (
                        <VoucherItem key={item.id} item={item} />
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionText}>Sẵn sàng sử dụng</Text>
                    {filteredVouchers.map(item => (
                        <VoucherItem key={item.id} item={item} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        flexDirection: 'row',
        width: '100%',
        height: 'auto',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    headingLabel: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    selectedLabel: {
        borderBottomWidth: 2,
        borderBottomColor: '#006C5E'
    },
    labelWrapper: {
        paddingBottom: 12
    },
});
