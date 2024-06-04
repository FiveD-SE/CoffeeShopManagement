import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Gold() {
  return (
    <View style={styles.container}>
        <View style={styles.section}>
            <MaterialCommunityIcons name='sale' size={30} color={'#006C5E'} style={styles.icon}/>
            <Text style={styles.text}>1 voucher giảm giá 15% cho{"\n"}mọi loại nước</Text>
        </View>
        <View style={styles.section}>
            <MaterialCommunityIcons name='coffee' size={30} color={'#006C5E'} style={styles.icon}/>
            <Text style={styles.text}>Mở khóa tính năng đỗi thưởng{"\n"}bằng BEAN</Text>
        </View>
        <View style={styles.section}>
            <MaterialCommunityIcons name='cake' size={30} color={'#006C5E'} style={styles.icon}/>
            <Text style={styles.text}>Ưu đãi sinh nhật{"\n"}nhận một bánh sinh nhật</Text>
        </View>
        <View style={styles.section}>
            <MaterialCommunityIcons name='gift' size={30} color={'#006C5E'} style={styles.icon}/>
            <Text style={styles.text}>Sưu tập đặc biệt{"\n"}nhận một quà tặng từ bộ sưu tập</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    text: {
        fontFamily: 'lato-regular',
        fontSize: 16,
        color: '#000',
        lineHeight: 22
    },
    icon: {
        marginRight: 20
    }
})