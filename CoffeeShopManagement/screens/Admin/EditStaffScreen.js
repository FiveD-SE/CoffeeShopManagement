import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Feather'
import DeleteStaffModal from '../../components/Admin/DeletaStaffModal'
import SelectBranchModal from '../../components/Admin/Modal/SelectBranchModal'
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

export default function EditStaffScreen({ route }) {
    console.log(route.params);
    const { setValue } = route.params.setValue;

    const [name, setName] = useState(route.params.staffItem.name);
    const [sdt, setSdt] = useState(route.params.staffItem.SDT);
    const [birth, setBirth] = useState(route.params.staffItem.birth);
    const [sex, setSex] = useState(route.params.staffItem.sex);
    const [cccd, setCccd] = useState(route.params.staffItem.cccd);
    const [email, setEmail] = useState(route.params.staffItem.email);

    const [modalVisible, setModalVisible] = useState(false);

    const [modalSelectBranchVisible, setModalSelectBranchVisible] = useState(false);
    const showSelectBranchModal = () => {
        setModalSelectBranchVisible(true);
    };

    const hideSelectBranchModal = () => {
        setModalSelectBranchVisible(false);
    };

    const showDeleteStaffModal = () => {
        setModalVisible(true);
    };

    const hideDeleteStaffModal = () => {
        setModalVisible(false);
    };

    const navigation = useNavigation();
    const goBack = () => {
        const updatedData = {
            id: route.params.staffItem.id,
            name: name,
            SDT: sdt,
            birth: birth,
            role: route.params.staffItem.role,
            sex: sex,
            cccd: cccd,
            email: email,
        };

        navigation.goBack();
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
                <TextBox text={'Họ và tên'} value={name} setValue={setName} />
                <TextBox text={'Số điện thoại'} value={sdt} setValue={setSdt} />
                <View style={styles.rowContainerTextBox}>
                    <TextBox2 text={'Ngày sinh'} iconName={'calendar'} marginRate={'5%'} value={birth} setValue={setBirth} />
                    <TextBox2 text={'Giới tính'} iconName={'chevron-right'} value={sex} setValue={setSex} />
                </View>
                <TextBox text={'Số CMND/CCCD'} value={cccd} setValue={setCccd} />
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
                    onPress={goBack}
                    style={styles.acceptButton}>
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