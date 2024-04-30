import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Entypo'
import SelectBranchModal from '../../components/Admin/Modal/SelectBranchModal'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const TextBox = ({ text, value, setValue }) => {
    return (
        <TextInput
            placeholder={text}
            style={styles.textBox}
            value={value}
            onChangeText={setValue} />
    )
}
const TextBox2 = ({ text, iconName, marginRate, value, setValue }) => {
    return (
        <View style={[styles.textBox, { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginEnd: marginRate }]}>
            <TextInput
                placeholder={text}
                value={value}
                onChangeText={setValue}
            />
            <TouchableOpacity>
                <Icon name={iconName} size={28} />
            </TouchableOpacity>
        </View>
    )
}

const ButtonBox = ({ text, placeholder, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.textBox, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
            <Text style={{ fontWeight: '600' }}>{text}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#9c9c9c' }}>{placeholder}</Text>
                <View>
                    <Icon name='chevron-right' size={28} color={'#9c9c9c'} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default function AddStaffScreen({ route }) {
    console.log(route.params.onAddNewStaff);
    onAddNewStaff = route.params.onAddNewStaff;
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [idCard, setIdCard] = useState('');
    const [email, setEmail] = useState('');
    const [modalSelectBranchVisible, setModalSelectBranchVisible] = useState(false);

    const handleConfirm = () => {
        const newStaff = {
            // Tạo dữ liệu cho nhân viên mới
            id: Math.random().toString(36).substr(2, 9),
            name: name,
            SDT: phoneNumber,
            birth: birthday,
            sex: gender,
            cccd: idCard,
            email: email,
            role: 'Nhân viên',
        };
        onAddNewStaff(newStaff);
        navigation.goBack(); // Gọi hàm callback để thêm nhân viên mới vào DATA của ManageStaff
    };

    const showSelectBranchModal = () => {
        setModalSelectBranchVisible(true);
    };

    const hideSelectBranchModal = () => {
        setModalSelectBranchVisible(false);
    };
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity
                    style={styles.imageButton}>
                    <Image
                        source={require('../../assets/account_image.png')}
                        style={{ marginBottom: '3%' }} />
                    <Text style={styles.imageText}>Thêm ảnh đại diện</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.informationWrapper}>
                <Text style={styles.topText}>Thông tin cá nhân</Text>
                <TextBox text={'Họ và tên'} value={name} setValue={setName} />
                <TextBox text={'Số điện thoại'} value={phoneNumber} setValue={setPhoneNumber} />
                <View style={styles.rowContainerTextBox}>
                    <TextBox2 text={'Ngày sinh'} iconName={'calendar'} marginRate={'5%'} value={birthday} setValue={setBirthday} />
                    <TextBox2 text={'Giới tính'} iconName={'chevron-right'} value={gender} setValue={setGender} />
                </View>
                <TextBox text={'Số CMND/CCCD'} value={idCard} setValue={setIdCard} />
                <TextBox text={'Email'} value={email} setValue={setEmail} />
            </View>
            <View>
                <Text style={styles.topText}>Thông tin công việc</Text>
                <ButtonBox text={'Vai trò'} placeholder={'Tên vai trò'} />
                <ButtonBox text={'Chi nhánh làm việc'} placeholder={'Tên chi nhánh'} onPress={showSelectBranchModal} />
                <SelectBranchModal visible={modalSelectBranchVisible} onClose={hideSelectBranchModal} />
            </View>
            <View>
                <Pressable
                    onPress={handleConfirm}
                    style={styles.acceptButton}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Xác nhận</Text>
                </Pressable>
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
    }
})