import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import Icon1 from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import StaffCard from '../../components/Admin/StaffCard';

export default function ManageStaffScreen() {
    const DATA = [
        {
            id: '123456',
            name: 'Tánh Trần',
            SDT: '0352085655',
            role: 'Nhân viên',
        },
        {
            id: '123457',
            name: 'Tánh Trần',
            SDT: '0352085656',
            role: 'Nhân viên',
        },
        {
            id: '123458',
            name: 'Tánh Trần',
            SDT: '0352085657',
            role: 'Nhân viên',
        },
        {
            id: '123459',
            name: 'Tánh Trần',
            SDT: '0352085658',
            role: 'Nhân viên',
        },
    ]
    const navigation = useNavigation();
    const handleback = () => {
        navigation.goBack();
    }
    const goToRoleList = () => {
        navigation.navigate('RoleList')
    }
  return (
    <View style={styles.container}>
      <View style={styles.topApp}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
                onPress={handleback}>
                <Icon name='chevron-left' size={32}/>
            </TouchableOpacity>
            <Text style={styles.topAppText}>Nhân viên</Text>
        </View>
        <TouchableOpacity
            onPress={goToRoleList} 
            style={styles.roleButton}>
            <Image source={require('../../assets/gg_list.png')}/>
            <Text style={{paddingStart: '2%', color: '#fff'}}>Danh sách vai trò</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={{fontWeight: '600', fontSize: 16, marginBottom: '3%'}}>Danh sách nhân viên</Text>
        <View style={styles.searchBox}>
            <TextInput
                placeholder='Tìm kiếm theo tên nhân viên, số điện thoại'
                placeholderTextColor={'#9c9c9c'}/>
            <TouchableOpacity>
                <Icon1 name='search' size={24}/>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.listStaff}>
            <StaffCard DATA={DATA}/>
            <TouchableOpacity style={styles.addStaffButton}>
                <Ionicons name='add' size={24}/>
                <Text style={{fontSize: 14, fontWeight: '600', marginStart: '3%'}}>Thêm nhân viên</Text>
            </TouchableOpacity>
        </ScrollView>
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
    roleButton: {
        backgroundColor: '#006c5e',
        borderRadius: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3%'
    },
    content: {
        padding: '5%',
    },
    searchBox: {
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: "1%",
        paddingStart: '3%',
        backgroundColor: "#fff",
        borderColor: '#e5e4e7',
        marginBottom: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingEnd: '3%',
        alignItems: 'center',
        marginBottom: '3%'
    },
    listStaff: {

    },
    staffItem: {
        backgroundColor: '#fff',
        padding: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: '3%'
    },
    addStaffButton: {
        backgroundColor: '#fff',
        padding: '3%',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})