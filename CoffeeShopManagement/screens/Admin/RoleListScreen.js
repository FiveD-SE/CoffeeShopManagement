import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';

export default function RoleListScreen() {
    const navigation = useNavigation();
    const handleback = () => {
        navigation.goBack();
    }
  return (
    <View style={styles.container}>
        <View style={styles.topApp}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={handleback}>
                <Icon name='chevron-left' size={32}/>
            </TouchableOpacity>
            <Text style={styles.topAppText}>Danh sách vai trò</Text>
        </View>
        <TouchableOpacity 
            style={styles.roleButton}>
            <Image source={require('../../assets/gg_list.png')}/>
            <Text style={{paddingStart: '2%', color: '#fff'}}>Danh sách vai trò</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topApp: {
        paddingTop: '10%',
        backgroundColor: '#fff',
        padding: '3%',
        borderBottomWidth: 1,
        borderColor: '#cbcbd4',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    topAppText: {
        fontSize: 16, 
        fontWeight: '600',
        paddingStart: '4%'
    },
})