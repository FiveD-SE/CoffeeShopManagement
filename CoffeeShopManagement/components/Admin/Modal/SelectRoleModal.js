import { View, Text, Modal, StyleSheet, TextInput, Pressable, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ModalHeader from '../../Client/Header/ModalHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
import Icon from 'react-native-vector-icons/Entypo'

const SelectRoleModal = ({ visible, onClose, roles, setRole }) => {

    const formatSalary = (salary) => {
        const formattedSalary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary);
        return formattedSalary;
    };

    const handleChooseRole = (role) => {
        setRole(role);
        onClose();
    }

    const renderRoleItem = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => handleChooseRole(item)}
                style={styles.cardWrapper}>
                <View>
                    <Text style={styles.roleName}>{item.roleName}</Text>
                    <Text style={styles.salary}>Lương: {formatSalary(item.salary)} / giờ</Text>

                </View>
                <View>
                    <Icon name='chevron-right' size={28} color={'#a6a6aa'} />
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title="Chọn vai trò" onClose={onClose} />
                    <View style={styles.main}>
                        <FlatList
                            data={roles}
                            renderItem={renderRoleItem}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.branchList}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SelectRoleModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        height: "30%",
    },
    main: {
        height: "100%",
        paddingHorizontal: "5%",
        marginBottom: "10%",
        backgroundColor: "#F8F7FA",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    label: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: "100%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        borderWidth: 2,
        borderColor: '#EBEBEB',
        paddingHorizontal: 15,
    },
    searchText: {
        flex: 1,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#000000',
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#FFF',
        elevation: 2,
        height: 100
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
        backgroundColor: '#CBCBD4',
        marginRight: 16,
    },
    vertical: {
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    nameBranchText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: '#000000',
    },
    addressBranchText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#9C9C9C',
    },
    distanceBranchText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#9C9C9C',
        marginTop: 5,
    },
    branchList: {
        marginTop: '6%',
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    cardWrapper: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cccccc',
        marginBottom: "5%",
        padding: '3%',
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    roleName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: '1%'
    },
    salary: {
        fontSize: 16,
        color: '#9c9c9c'
    }
});
