import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import SwitchToggle from 'toggle-switch-react-native';

export default function AddNewAddress() {
    const [isToggled, setIsToggled] = useState(false);
    const [addressType, setAddressType] = useState(null);

    const handleToggle = () => {
        setIsToggled(isToggled => !isToggled);
    };

    const handleAddressType = (type) => {
        setAddressType(type);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Địa chỉ</Text>
                    <TextInput style={styles.input} placeholder="Địa chỉ" />
                    <TextInput style={styles.input} placeholder="Chi nhánh" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Cài đặt</Text>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Loại địa chỉ:</Text>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[styles.kind, addressType === 'home' ? { backgroundColor: '#FFA730' } : null]}
                                onPress={() => handleAddressType('home')}
                            >
                                <Text style={[styles.kindText, addressType === 'home' ? { color: '#FFF' } : null]}>
                                    Nhà riêng
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.kind, addressType === 'office' ? { backgroundColor: '#FFA730' } : null]}
                                onPress={() => handleAddressType('office')}
                            >
                                <Text style={[styles.kindText, addressType === 'office' ? { color: '#FFF' } : null]}>
                                    Văn phòng
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#3A3A3A' }} />
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Đặt làm địa chỉ mặc định</Text>
                        <SwitchToggle
                            onColor="#4ECB71"
                            offColor="#CCCCCC"
                            labelStyle={{ color: '#3A3A3A', fontFamily: 'Lato-Regular', fontSize: 16 }}
                            size="medium"
                            value={isToggled}
                            onToggle={handleToggle}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Liên hệ</Text>
                    <TextInput style={styles.input} placeholder="Họ và tên" />
                    <TextInput style={styles.input} placeholder="Số điện thoại" />
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Hoàn thành</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#3A3A3A',
        fontFamily: 'Lato-Bold',
    },
    rowText: {
        fontSize: 16,
        color: '#3A3A3A',
        fontFamily: 'Lato-Regular',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        gap: 10,
    },
    kind: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#CCCCCC',
    },
    kindText: {
        color: '#3A3A3A',
        fontFamily: 'Lato-Regular',
    },
    input: {
        height: 50,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        marginBottom: 10,
    },
    button: {
        marginTop: 30,
        backgroundColor: '#FFA730',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'Lato-Bold',
        fontSize: 18,
    },
});
