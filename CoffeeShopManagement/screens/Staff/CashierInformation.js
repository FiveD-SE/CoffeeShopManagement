import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

export default function CashierInformation() {
    const navigation = useNavigation();
    const handleback = () => {
        navigation.goBack();
    }
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.backButton}>
            <TouchableOpacity
            onPress={handleback}>
                <View>
                    <Icon name='chevron-left' size={32}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.notificationText}>Thông tin</Text>
        </View>
        <View style={styles.cashierInfor}>
            <Image 
            source={require('../../assets/account_icon.png')}
            style={{height: 80, width: 80, tintColor: 'rgba(255, 255, 255, 1)'}}/>
            <View style={{justifyContent: 'space-between', height: 80, padding: 10, paddingStart: 20}}>
                <Text style={{fontWeight: '500', fontSize: 16, color: 'rgba(255, 255, 255, 1)'}}>TanhChanCoffeeShop</Text>
                <Text>
                    <Text style={{fontSize: 16, color: 'rgba(255, 255, 255, 1)'}}>TanhDepTrai | </Text>
                    <Text style={{fontWeight: '500',fontSize: 16, color: 'rgba(255, 255, 255, 1)'}}>Cashier</Text>
                </Text>
            </View>
        </View>
        <View style={styles.bodyApp}> 
            <View style={styles.content}>
                <View style={{padding: 15}}>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>Lịch làm việc</Text>
                    <View style={{width: 'auto', backgroundColor: 'rgba(255, 255, 255, 1)', height: 350, borderRadius: 10, marginTop: 10, borderColor: '#ebebeb', borderWidth: 1}}>

                    </View>
                </View>
                <View style={{padding: 15}}>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>Ngày 08/03/2024</Text>
                    <View style={styles.shift}>
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Ca sáng: 7h-15h</Text>
                    </View>
                    <View style={styles.shift}> 
                        <Text style={{fontSize: 16, fontWeight: '500'}}>Ca sáng: 7h-15h</Text>
                        <Text style={{fontSize: 14,}}>
                            <Text style={{textDecorationLine: 'underline'}}>Note: </Text>
                            <Text>Đi sớm dọn quán, check vệ sinh ca trước</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#006c5e',
        marginTop: 40,
    },
    backButton: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationText: {
        marginStart: 10,
        fontSize: 20,
        fontWeight:'500'
    },
    cashierInfor: {
        flex: 3,
        alignItems: 'center',
        flexDirection: 'row',
    },
    bodyApp: {
        flex: 16,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 100
    },
    content: {
        flex: 1, 
        backgroundColor: '#f8f7fa',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    shift: {
        backgroundColor: 'rgba(228, 241, 233, 0.5)',
        borderWidth: 1, 
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    }
})