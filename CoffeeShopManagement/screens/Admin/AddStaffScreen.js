import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Platform, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Entypo'
import SelectBranchModal from '../../components/Admin/Modal/SelectBranchModal'
import { Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, createUserWithEmailAndPassword, db, uploadAvatarToFirebase, uploadImageToFirebase } from '../../services/firebaseService'
import RNPickerSelect from 'react-native-picker-select'
import { getDownloadURL, ref } from 'firebase/storage'
import * as ImagePicker from "expo-image-picker";
import { sendEmailVerification } from 'firebase/auth'
import { Dropdown } from "react-native-element-dropdown";
import Toast from 'react-native-toast-message'

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

export default function AddStaffScreen() {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [date, setDate] = useState(new Date());
    const [gender, setGender] = useState('');
    const [idCard, setIdCard] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cashierImage, setCashierImage] = useState("https://firebasestorage.googleapis.com/v0/b/fived-project-cf.appspot.com/o/avatars%2Fdefault.png?alt=media&token=0fffed45-23f0-4456-a939-cc3f437a7c2f");
    const [modalSelectBranchVisible, setModalSelectBranchVisible] = useState(false);
    const [isShowDateTimePicker, setIsShowDateTimePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const chooseDateSnapPoints = useMemo(() => ["60%"], []);
    const chooseDateBottomSheetRef = useRef(null);

    const handleConfirm = async () => {

        setIsLoading(true);
        if (name === '' || phoneNumber === '' || birthday === '' || gender === '' || idCard === '' || email === '' || password === '') {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: 'Vui lòng nhập đầy đủ thông tin',
                visibilityTime: 2000,
                autoHide: true
            });
        } else {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            const userImage = await uploadAvatarToFirebase(
                cashierImage,
                "cashier_" + user.uid
            );
            setCashierImage(userImage);

            await setDoc(doc(collection(db, "cashier"), user.uid), {
                fullName: name,
                phoneNumber: phoneNumber,
                birthday: new Date(birthday),
                password: password,
                idCard: idCard,
                email: email,
                gender: gender,
                cashierImage: userImage,
            });

            await setDoc(doc(collection(db, "users"), user.uid), {
                createdAt: new Date(),
                credit: 0,
                email: email,
                fullName: name,
                password: password,
                role: 'cashier',
                userId: user.uid,
                userImage: cashierImage,
            });

            const userId = user.uid;
            await updateDoc(doc(db, "cashier", userId), {
                cashierId: userId,
            });

            const newNotificationRef = doc(collection(db, "notifications"));
            const notificationId = newNotificationRef.id;

            const notification = {
                notificationId,
                notificationContent: "Tạo tài khoản thành công!",
                notificationTitle: "Chào mừng bạn đến với Enigma",
                notificationCreatedDate: new Date(),
                notificationStatus: false,
                notificationType: 1,
                productOrder: [],
                userId: user.uid,
            };

            await setDoc(newNotificationRef, notification);
            await sendEmailVerification(user);
            navigation.goBack();
        }
        setIsLoading(false);
    }
    // Gọi hàm callback để thêm nhân viên mới vào DATA của ManageStaff

    const showSelectBranchModal = () => {
        setModalSelectBranchVisible(true);
    };

    const hideSelectBranchModal = () => {
        setModalSelectBranchVisible(false);
    };

    const toggleDatePicker = () => {
        setIsShowDateTimePicker(!isShowDateTimePicker);
    }

    const onChange = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);

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

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.imageContainer}>
                    <TouchableOpacity
                        style={styles.imageButton}
                        onPress={() => handleImagePicker()}>
                        <Image
                            source={{ uri: cashierImage }}
                            style={{ marginBottom: '3%', width: 100, height: 100, borderRadius: 50 }} />
                        <Text style={styles.imageText}>Thêm ảnh đại diện</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.informationWrapper}>
                    <Text style={styles.topText}>Thông tin cá nhân</Text>
                    <TextBox text={'Họ và tên'} value={name} setValue={setName} />
                    <TextBox text={'Số điện thoại'} value={phoneNumber} setValue={setPhoneNumber} />
                    <View style={styles.rowContainerTextBox}>
                        <TextBox2 text={'Ngày sinh'} iconName={'calendar'} marginRate={'10%'} value={birthday} setValue={setBirthday} onPress={() => toggleDatePicker()} />
                        <Dropdown
                            style={[styles.dropDown]}
                            placeholder='Giới tính'
                            placeholderStyle={{ color: "rgba(0, 0, 0, 0.2)" }}
                            data={[{ label: "Nam", value: 'Nam' }, { label: "Nữ", value: 'Nữ' }, { label: "Khác", value: 'Khác' }]}
                            labelField="label"
                            valueField="value"
                            value={gender}
                            onChange={item => {
                                setGender(item.value);
                            }} />
                    </View>
                    {isShowDateTimePicker && Platform.OS === 'ios' &&
                        <View>
                            <RNDateTimePicker
                                value={date}
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
                                value={date}
                                mode='date'
                                display='spinner'
                                onChange={onChange} />
                        </View>}
                    <TextBox text={'Số CMND/CCCD'} value={idCard} setValue={setIdCard} />
                    <TextBox text={'Email'} value={email} setValue={setEmail} />
                    <TextBox text={'Password'} value={password} setValue={setPassword} />
                </View>
                <View>
                    <Text style={styles.topText}>Thông tin công việc</Text>
                    <ButtonBox text={'Vai trò'} placeholder={'Tên vai trò'} />
                    <ButtonBox text={'Chi nhánh làm việc'} placeholder={'Tên chi nhánh'} onPress={showSelectBranchModal} />
                    <SelectBranchModal visible={modalSelectBranchVisible} onClose={hideSelectBranchModal} />
                </View>
                <View style={{ marginBottom: '10%' }}>
                    {<Pressable
                        onPress={handleConfirm}
                        style={styles.acceptButton}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Xác nhận</Text>
                    </Pressable>}
                </View>
            </ScrollView>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={'black'} />
                </View>
            )}
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
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
        marginBottom: '3%',
        padding: '4%'
    },
    rowContainerTextBox: {
        flexDirection: 'row',
        width: '100%',
    },
    acceptButton: {
        backgroundColor: '#006c5e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        borderRadius: 20
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dropDown: {
        marginBottom: "3%",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        backgroundColor: "#ffffff",
        flex: 1
    },
})
