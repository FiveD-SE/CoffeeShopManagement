import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'

const NotificationCard = ({item}) => {
    let icon;
    let background;
    switch (item.state) {
        case 'Success':
            icon = require('../../assets/successful_icon.png');
            background = 'rgba(114, 255, 148, 0.3)'
            break;
        case 'Failed':
            icon = require('../../assets/error_icon.png');
            background = '#f8e0e3'
            break;
        default:
            icon = null;
            background = '#d6d6d6';
            break;
    }
  return (
    <TouchableOpacity style={styles.container}>
        <View style={{width: 60, height: 60, backgroundColor: background, justifyContent: 'center', alignItems: 'center', zIndex: 10, borderRadius: 10}}>
            {icon ? (
                <Image source={icon} style={styles.image} />
            ) : (
                <View style={styles.placeholder} />
            )}
        </View>
        <View style={{flexDirection: 'column', height: 60, paddingStart: 10}}>
            <Text style={{fontSize: 18, fontWeight: '500', color: 'rgba(58, 58, 58, 1)'}}>{item.title}</Text>
            <Text style={{fontSize: 14, color: 'rgba(166, 166, 170, 1)'}}>{item.content}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        backgroundColor: 'rgba(166, 166, 170, 0.1)', 
        height: 80, 
        alignItems: 'center', 
        paddingStart: 10, 
        borderRadius: 20, 
        marginTop: 10
    },
    image: {
        width: 32,
        height: 32,
    },
    placeholder: {
        width: 32,
        height: 32,
    }
})

export default NotificationCard;