import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import SettingSalaryModal from '../Admin/SettingSalaryModal';
export default function RoleCard({ roleName, salary, staffRoleId }) {
    const [modalVisible, setModalVisible] = useState(false);

    const showSettingSalaryModal = () => {
        setModalVisible(true);
    };

    const formatSalary = (salary) => {
        const formattedSalary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary);
        return formattedSalary;
    };

    const hideSettingSalaryModal = () => {
        setModalVisible(false);
    };
    return (
        <View>
            <TouchableOpacity
                onPress={showSettingSalaryModal}
                style={styles.cardWrapper}>
                <View>
                    <Text style={styles.roleName}>{roleName}</Text>
                    <Text style={styles.salary}>Lương: {formatSalary(salary)} / giờ</Text>

                </View>
                <View>
                    <Icon name='chevron-right' size={28} color={'#a6a6aa'} />
                </View>
                <SettingSalaryModal visible={modalVisible} onClose={hideSettingSalaryModal} roleName={roleName} staffRoleId={staffRoleId} salary={salary} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
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
})
