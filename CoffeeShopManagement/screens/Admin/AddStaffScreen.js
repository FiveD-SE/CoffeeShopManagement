import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'

export default function AddStaffScreen() {
  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <TouchableOpacity 
                style={styles.imageButton}>
                <Image 
                    source={require('../../assets/account_image.png')}
                    style={{marginBottom: '3%'}} />
                <Text style={styles.imageText}>Thêm ảnh đại diện</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
            <Text style={styles.topText}>Thông tin cá nhân</Text>
            <TextInput
                placeholder='Họ và tên'
                
                style={styles.textBox}/>
            <TextInput
                placeholder='Số điện thoại'
                
                style={styles.textBox}/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: '3%'
    },
    imageButton: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    imageText: {
        color: '#33b2a0'
    },
    content: {
        
    },
    topText: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: '3%'
    },
    textBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ebebeb',
        marginBottom: '3%',
        padding: '2%'
    }
})