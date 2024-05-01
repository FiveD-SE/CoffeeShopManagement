import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { removeToken } from '../../services/authServices';

export default function CashierInformation() {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inforWrapper}>
                <Icon name='account-circle' size={60} color={'#fff'} />
                <View style={styles.inforTextWrapper}>
                    <Text style={styles.shopNameText}>TaiCoffeeShop</Text>
                    <Text style={{ color: '#fff', fontSize: 14 }}>
                        <Text>Thang Ngu Gau Gau</Text>
                        <Text> | </Text>
                        <Text style={{ fontWeight: '600' }}>Cashier</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.bodyApp}>
                <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: '5%' }}>Lịch làm việc</Text>
                <View style={styles.calender}>
                    <Calendar />
                </View>
                <Text style={styles.dateText}>Ngày 8/3/2024</Text>
                <View style={styles.morningShiftWrapper}>
                    <Text style={styles.morningShiftText}>Ca sáng: 7h-15h</Text>
                </View>
                <View style={styles.afternoonShiftWrapper}>
                    <Text style={styles.afternoonShiftText}>Ca sáng: 7h-15h</Text>
                    <Text style={{ fontSize: 14 }}>
                        <Text style={{ textDecorationLine: 'underline' }}>Note: </Text>
                        <Text>Đi sớm dọn quán, check vệ sinh ca trước</Text>
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            removeToken();
                            navigation.navigate("SignInScreen");
                        }}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#006c5e',
    },
    inforWrapper: {
        padding: '3%',
        flexDirection: 'row'
    },
    inforTextWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginStart: '5%',
        padding: '1%'
    },
    shopNameText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600'
    },
    bodyApp: {
        backgroundColor: '#f8f7fa',
        padding: '4%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: '100%',
        paddingBottom: '10%'
    },
    calender: {
        backgroundColor: '#fff',
        width: '100%',
        height: '50%',
        borderRadius: 10,
        marginBottom: '5%',
        padding: '3%'
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '5%'
    },
    morningShiftWrapper: {
        backgroundColor: '#eef3f1',
        borderRadius: 10,
        padding: '3%',
        marginBottom: '5%',
        borderWidth: 1,
        borderColor: '#dce0df'
    },
    morningShiftText: {
        fontSize: 16,
        fontWeight: '600'
    },
    afternoonShiftWrapper: {
        backgroundColor: '#eef3f1',
        borderRadius: 10,
        padding: '3%',
        marginBottom: '5%',
        borderWidth: 1,
        borderColor: '#dce0df',
    },
    afternoonShiftText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '2%'
    },
    buttonWrapper: {
        backgroundColor: '#006d5d',
        borderRadius: 10
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: '3%'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff'
    }
})