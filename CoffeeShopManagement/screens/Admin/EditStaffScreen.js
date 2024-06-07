import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Entypo'
import Icon1 from 'react-native-vector-icons/Feather'
import DeleteStaffModal from '../../components/Admin/DeletaStaffModal'
import SelectBranchModal from '../../components/Admin/Modal/SelectBranchModal'
import { useNavigation } from '@react-navigation/native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, createUserWithEmailAndPassword, db, storage, uploadImageToFirebase } from '../../services/firebaseService'
import RNPickerSelect from 'react-native-picker-select'
import { getDownloadURL, ref } from 'firebase/storage'
import * as ImagePicker from "expo-image-picker";
import { sendEmailVerification } from 'firebase/auth'

const TextBox = ({ text, value, setValue }) => {
    return (
        <TextInput
            placeholder={text}
            style={styles.textBox}
            value={value}
            onChangeText={setValue} />
    )
}

const TextBox2 = ({ text, iconName, marginRate, value, setValue, onPress }) => {
    return (
        <View style={[styles.textBox, { flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginEnd: marginRate }]}>
            <TextInput
                placeholder={text}
                value={value}
                onChangeText={setValue}
            />
            <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={onPress}>
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

    console.log(route.params.cashiers)

    const [cashierImage, setCashierImage] = useState(route.params.cashiers.cashierImage);
    const [name, setName] = useState(route.params.cashiers.fullName);
    const [sdt, setSdt] = useState(route.params.cashiers.phoneNumber);
    const [birthday, setBirthday] = useState(route.params.cashiers.birthday);
    const [gender, setGender] = useState(route.params.cashiers.gender);
    const [cccd, setCccd] = useState(route.params.cashiers.idCard);
    const [email, setEmail] = useState(route.params.cashiers.email);
    const [date, setDate] = useState(new Date());

    const [isShowDateTimePicker, setIsShowDateTimePicker] = useState(false);

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

    const toggleDatePicker = () => {
        setIsShowDateTimePicker(!isShowDateTimePicker);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
            setBirthday(currentDate);

            if (Platform.OS === 'android') {
                toggleDatePicker();
                setBirthday(currentDate.toDateString());
            }
        } else {
            toggleDatePicker();
        }
    }

    const confirmIOSDate = () => {
        setBirthday(date.toDateString());
        toggleDatePicker();
    }

    const handleImagePicker = async () => {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setCashierImage(result.assets[0].uri);
        }
    };

    const navigation = useNavigation();
    const handleSaveInfor = async () => {
        await updateDoc(doc(db, "cashier", route.params.cashiers.cashierId), {
            fullName: name,
            phoneNumber: sdt,
            birthday: birthday,
            idCard: cccd,
            gender: gender,
            email: email,
        });
        navigation.goBack();
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.topApp}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.imageButton}>
                        <Image
                            source={{ uri: cashierImage }}
                            style={{ marginBottom: '3%', width: 80, height: 80, borderRadius: 50 }} />
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
                    <TextBox2 text={'Ngày sinh'} iconName={'calendar'} marginRate={'10%'} value={birthday.toDate().toDateString()} setValue={setBirthday} onPress={() => toggleDatePicker()} />
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', backgroundColor: '#fff',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#ebebeb',
                        marginBottom: '3%',
                    }}>
                        <RNPickerSelect
                            value={gender}
                            placeholder={{ label: 'Giới tính', value: null }}
                            style={pickerSelectStyles}
                            onValueChange={(value) => setGender(value)}
                            items={[
                                { label: 'Nam', value: 'Nam' },
                                { label: 'Nữ', value: 'Nữ' },
                            ]} />
                    </View>
                </View>
                {isShowDateTimePicker && Platform.OS === 'ios' &&
                    <View>
                        <RNDateTimePicker

                            value={birthday.toDate()}
                            mode='date'
                            display='spinner'
                            onChange={onChange} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '20%' }}>
                            <TouchableOpacity
                                style={{ marginBottom: '5%', backgroundColor: 'white', padding: '5%', borderRadius: 10 }}
                                onPress={toggleDatePicker}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginBottom: '5%', backgroundColor: '#006c5e', padding: '5%', borderRadius: 10 }}
                                onPress={confirmIOSDate}>
                                <Text style={{ color: 'white' }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>}
                {isShowDateTimePicker && Platform.OS === 'android' &&
                    <View>
                        <RNDateTimePicker
                            value={birthday.toDate()}
                            mode='date'
                            display='spinner'
                            onChange={onChange} />
                    </View>}
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
                    onPress={() => handleSaveInfor()}
                    style={styles.acceptButton}>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Lưu</Text>
                </Pressable>
            </View>
        </ScrollView>
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        justifyContent: 'center',
        paddingVertical: "6%",
        color: 'black',
        width: 120,
    },
    inputAndroid: {
        color: 'black',
        width: 145,
    },
});