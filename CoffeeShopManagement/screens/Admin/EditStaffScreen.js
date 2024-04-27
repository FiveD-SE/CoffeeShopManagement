import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Feather'
import DeleteStaffModal from '../../components/Admin/DeletaStaffModal'

const TextBox = ({ text }) => {
    return (
        <TextInput
            placeholder={text}
            style={styles.textBox} />
    )
}
const TextBox2 = ({ text, iconName, marginRate }) => {
    return (
        <View style={[styles.textBox, { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginEnd: marginRate }]}>
            <TextInput
                placeholder={text}
            />
            <TouchableOpacity>
                <Icon name={iconName} size={28} />
            </TouchableOpacity>
        </View>
    )
}

const TextBox3 = ({ text, placeholder }) => {
    return (
        <View style={[styles.textBox, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{ fontWeight: '600' }}>{text}</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                    placeholder={placeholder}
                />
                <TouchableOpacity>
                    <Icon name='chevron-right' size={28} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function EditStaffScreen() {
    const [modalVisible, setModalVisible] = useState(false);

    const showDeleteStaffModal = () => {
        setModalVisible(true);
    };

    const hideDeleteStaffModal = () => {
        setModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.topApp}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.imageButton}>
                        <Image
                            source={require('../../assets/account_image.png')}
                            style={{ marginBottom: '3%' }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={showDeleteStaffModal}
                        style={styles.deleteButton}>
                        <Icon1 name='trash' size={32} color={'#f73755'} />
                    </TouchableOpacity>
                    <DeleteStaffModal visible={modalVisible} onClose={hideDeleteStaffModal} />
                </View>
            </View>
            <View style={styles.informationWrapper}>
                <Text style={styles.topText}>Thông tin cá nhân</Text>
                <TextBox text={'Họ và tên'} />
                <TextBox text={'Số điện thoại'} />
                <View style={styles.rowContainerTextBox}>
                    <TextBox2 text={'Ngày sinh'} iconName={'calendar'} marginRate={'5%'} />
                    <TextBox2 text={'Giới tính'} iconName={'chevron-right'} />
                </View>
                <TextBox text={'Số CMND/CCCD'} />
                <TextBox text={'Email'} />
            </View>
            <View>
                <Text style={styles.topText}>Thông tin công việc</Text>
                <TextBox3 text={'Vai trò'} placeholder={'Tên vai trò'} />
                <TextBox3 text={'Chi nhánh làm việc'} placeholder={'Tên chi nhánh'} />
            </View>
            <View>
                <Pressable style={styles.acceptButton}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Lưu</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
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
    informationWrapper: {
        marginBottom: '3%'
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
    },
    rowContainerTextBox: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    acceptButton: {
        backgroundColor: '#006c5e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        borderRadius: 20
    },
    deleteButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        padding: '3%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#f73755',
        paddingVertical: '20%'
    },
    topApp: {
        flexDirection: 'row',
        marginBottom: '5%',
        justifyContent: 'space-between'
    }
})