import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import UserVoucherCard from '../../../components/Client/Card/UserVoucherCard';

export default function YourVoucher() {
    const vouchers = [
        { title: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-01', option: 'Giao hàng', image: require('../../../assets/voucher.jpeg') },
        { title: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-04-25', option: 'Tại chỗ', image: require('../../../assets/voucher.jpeg') },
        { title: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-04', option: 'Mang đi', image: require('../../../assets/voucher.jpeg') },
        { title: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-06-01', option: 'Giao hàng', image: require('../../../assets/voucher.jpeg') },
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
                    }).map((item, index) => (
                        <UserVoucherCard key={index} title={item.title} expiryDate={item.expiryDate} imageSource={item.image} />
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionText}>Sẵn sàng sử dụng</Text>
                    {filteredVouchers.map((item, index) => (
                        <UserVoucherCard key={index} title={item.title} expiryDate={item.expiryDate} imageSource={item.image} />
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
        fontFamily: 'lato-regular',
        color: '#000000',
        textAlign: 'center',
        fontSize: 15,
        fontStyle: 'normal',
        fontWeight: '700',
        lineHeight: 22,
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 10
    },
    sectionText: {
        fontFamily: 'lato-regular',
        color: '#000000',
        textAlign: 'left',
        fontSize: 18,
        fontStyle: 'normal',
        fontWeight: '700',
        marginBottom: 20,
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
});
