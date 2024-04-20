import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import SwitchToggle from 'toggle-switch-react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function EditAddress() {
    const [isToggled, setIsToggled] = useState(false);
    const [addressType, setAddressType] = useState(null);

    const handleToggle = () => {
        console.log("Toggle button pressed");
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
                    <View style={{ width: '100%', borderWidth: 0.5, marginBottom: 20 }} />
                    <View style={styles.row}>
                        <Text style={styles.rowText}>Đặt làm địa chỉ mặc định</Text>
                        <SwitchToggle
                            onColor="#4ECB71"
                            offColor="#CCCCCC"
                            labelStyle={{ color: '#3A3A3A', fontFamily: 'Lato', fontSize: 16 }}
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
                
                <TouchableOpacity style={styles.deleteButton}>
                    <FontAwesome name='trash'size={25} style={styles.icon} color='#F61A3D'/>
                    <Text style={styles.deleteButtonText}>Xóa địa chỉ</Text>
                </TouchableOpacity>

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
        paddingTop: 30,
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
        fontFamily: 'Lato',
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
        fontFamily: 'Lato',
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
    deleteButton: {
        flexDirection: 'row',
        marginTop: 15,
        paddingVertical: 15,
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: '#F61A3D',
        fontFamily: 'Lato-Bold',
        fontSize: 18,
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
    }
});
