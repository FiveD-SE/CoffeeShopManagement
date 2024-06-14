import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectTermOptionsModal from '../../../components/Admin/Modal/SelectTermOptionsModal';
import SelectBranchModal from '../../../components/Admin/Modal/SelectBranchModal';
import SelectDateModal from '../../../components/Admin/Modal/SelectDateModal';
import Checkbox from 'expo-checkbox'
import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker'
import Toast from 'react-native-toast-message';

const StaffCard = ({ name, phoneNumber, image, role, cashierId, isChecked, onChecked }) => {

    return (
        <View style={styles.item}>
            <View style={styles.row}>
                <Image source={{ uri: image }} style={styles.avatar} />
                <View style={styles.column}>
                    <Text style={styles.textPrimary}>{name}</Text>
                    <Text style={styles.textSecondary}>{phoneNumber}</Text>
                    <View style={styles.positionLabel}>
                        <Text style={[styles.textPrimary, { color: '#4ECB71' }]}>{role}</Text>
                    </View>
                </View>
                <Checkbox style={styles.checkbox} value={isChecked} onValueChange={onChecked} color={'#006c5e'} />
            </View>
        </View>
    )
}

export default function AdminAddPayrollScreen() {

    const navigation = useNavigation();

    const [selectedTermOption, setSelectedTermOption] = useState('');
    const [selectedDateEndOption, setSelectedDateEndOption] = useState('');
    const [selectedDateStartOption, setSelectedDateStartOption] = useState('');
    const [modalSelectTermOptionVisible, setModalSelectTermOptionVisible] = useState(false);
    const [modalSelectBranchVisible, setModalSelectBranchVisible] = useState(false);
    const [modalSelectDateVisible, setModalSelectDateVisible] = useState(false);
    const [selectedDateType, setSelectedDateType] = useState('start');
    const [isShowDateTimePickerStart, setIsShowDateTimePickerStart] = useState(false);
    const [isShowDateTimePickerEnd, setIsShowDateTimePickerEnd] = useState(false);
    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [isChecked, setChecked] = useState(false);
    const [cashiers, setCashiers] = useState([]);
    const [checkList, setCheckList] = useState([]);

    const handleSelectTermOption = (option) => {
        setSelectedTermOption(option);
    };

    const handleSelectDateEndOption = (option) => {
        setSelectedDateEndOption(option);
    };

    const handleSelectDateStartOption = (option) => {
        setSelectedDateStartOption(option);
    };

    const showSelectTermOptionsModal = () => {
        setModalSelectTermOptionVisible(true);
    };

    const hideSelectTermOptionsModal = () => {
        setModalSelectTermOptionVisible(false);
    };

    const showSelectBranchModal = () => {
        setModalSelectBranchVisible(true);
    };

    const hideSelectBranchModal = () => {
        setModalSelectBranchVisible(false);
    };

    const showSelectDateModal = (dateType) => {
        setSelectedDateType(dateType);
        setModalSelectDateVisible(true);
    };

    const hideSelectDateModal = () => {
        setModalSelectDateVisible(false);
    };

    const handleChecked = () => {
        const newChecked = !isChecked;
        setChecked(newChecked);
        setCheckList(checkList.map(() => newChecked));
    };

    const handleItemChecked = (index) => {
        const updatedSelectedItems = [...checkList];
        updatedSelectedItems[index] = !updatedSelectedItems[index];
        setChecked(updatedSelectedItems.every((item) => item));
        setCheckList(updatedSelectedItems);
    };

    const toggleDatePickerStart = () => {
        setIsShowDateTimePickerStart(!isShowDateTimePickerStart);
    }

    const toggleDatePickerEnd = () => {
        setIsShowDateTimePickerEnd(!isShowDateTimePickerEnd);
    }

    const onChangeStart = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (new Date().getFullYear() - currentDate.getFullYear() < 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Lỗi',
                    text2: 'Chọn ngày hợp lệ',
                    visibilityTime: 2000,
                    autoHide: true
                });
            } else {
                if (Platform.OS === 'android') {
                    toggleDatePickerStart();
                    setStartDate(currentDate);
                }
            }
        } else {
            toggleDatePickerStart();
        }
    }

    const onChangeEnd = ({ type }, selectedDate) => {
        if (type === 'set') {
            const currentDate = selectedDate;
            setDate(currentDate);
            if (new Date().getFullYear() - currentDate.getFullYear() < 0) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Lỗi',
                    text2: 'Chọn ngày hợp lệ',
                    visibilityTime: 2000,
                    autoHide: true
                });
            } else {
                if (Platform.OS === 'android') {
                    toggleDatePickerEnd();
                    setEndDate(currentDate);
                }
            }
        } else {
            toggleDatePickerEnd();
        }
    }

    const confirmIOSDateStart = () => {
        setStartDate(date);
        toggleDatePickerStart();
    }

    const confirmIOSDateEnd = () => {
        setEndDate(date);
        toggleDatePickerEnd();
    }

    const handleComfirm = async () => {
        const newPayrollRef = doc(collection(db, "payroll"));
        const payrollId = newPayrollRef.id;

        const payroll = {
            payrollId: payrollId,
            startDate: startDate,
            endDate: endDate,
            cashier: cashiers.filter((item, index) => checkList[index] === true)

        };

        await setDoc(newPayrollRef, payroll);

        navigation.goBack();
    }

    useFocusEffect(useCallback(
        () => {
            const unsub = onSnapshot(
                query(collection(db, "cashier")),
                (snapshot) => {
                    setCashiers(snapshot.docs.map((doc) => doc.data()));
                    setCheckList(Array(snapshot.docs.length).fill(false))
                }
            );
            return () => unsub();
        }, []));

    useEffect(() => {
        console.log(checkList)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Chi nhánh</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>Tên các chi nhánh</Text>
                            <Pressable style={styles.button} onPress={showSelectBranchModal}>
                                <Icon name="chevron-small-right" size={30} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSecondary}>
                        <Text style={styles.sectionText}>Thông tin bản lương</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Kỳ hạn trả lương</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>{selectedTermOption || 'Chọn kỳ hạn'}</Text>
                            <Pressable style={styles.button} onPress={showSelectTermOptionsModal}>
                                <Icon name="chevron-small-right" size={30} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.label}>
                        <Text style={styles.labelText}>Kỳ làm việc từ</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>{startDate.toDateString()}</Text>
                            <Pressable style={[styles.button, { marginLeft: 10 }]} onPress={() => toggleDatePickerStart()}>
                                <Icon name="calendar" size={20} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>

                    {isShowDateTimePickerStart && Platform.OS === 'ios' &&
                        <View>
                            <RNDateTimePicker
                                value={date}
                                mode='date'
                                display='spinner'
                                onChange={onChangeStart} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '20%' }}>
                                <TouchableOpacity
                                    style={{ marginBottom: '5%', backgroundColor: 'white', padding: '5%', borderRadius: 10 }}
                                    onPress={toggleDatePickerStart}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginBottom: '5%', backgroundColor: '#006c5e', padding: '5%', borderRadius: 10 }}
                                    onPress={confirmIOSDateStart}>
                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                    {isShowDateTimePickerStart && Platform.OS === 'android' &&
                        <View>
                            <RNDateTimePicker
                                value={date}
                                mode='date'
                                display='spinner'
                                onChange={onChangeStart}
                            />
                        </View>}

                    <View style={styles.label}>
                        <Text style={styles.labelText}>Kỳ làm việc đến</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>{endDate.toDateString()}</Text>
                            <Pressable style={[styles.button, { marginLeft: 10 }]} onPress={() => toggleDatePickerEnd()}>
                                <Icon name="calendar" size={20} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>
                    {isShowDateTimePickerEnd && Platform.OS === 'ios' &&
                        <View>
                            <RNDateTimePicker
                                value={date}
                                mode='date'
                                display='spinner'
                                onChange={onChangeEnd} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '20%' }}>
                                <TouchableOpacity
                                    style={{ marginBottom: '5%', backgroundColor: 'white', padding: '5%', borderRadius: 10 }}
                                    onPress={toggleDatePickerEnd}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ marginBottom: '5%', backgroundColor: '#006c5e', padding: '5%', borderRadius: 10 }}
                                    onPress={confirmIOSDateEnd}>
                                    <Text style={{ color: 'white' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}
                    {isShowDateTimePickerEnd && Platform.OS === 'android' &&
                        <View>
                            <RNDateTimePicker
                                value={date}
                                mode='date'
                                display='spinner'
                                onChange={onChangeEnd}
                            />
                        </View>}
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSecondary}>
                        <Text style={styles.sectionText}>Nhân viên được trả lương</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>Chọn tất cả</Text>
                            <Checkbox style={[styles.checkbox, { marginLeft: 10 }]} value={isChecked} onValueChange={handleChecked} color={'#006c5e'} />
                        </View>
                    </View>
                    <View style={styles.label}>
                        <TextInput style={styles.searchText} placeholder='Tìm kiếm' />
                        <Ionicons name='search' size={20} />
                    </View>
                </View>

                <View style={styles.section}>
                    {cashiers.map((item, index) => (
                        <StaffCard cashierId={item.cashierId} name={item.fullName} phoneNumber={item.phoneNumber} image={item.cashierImage} role={'Cashier'} key={index} isChecked={checkList[index]} onChecked={() => handleItemChecked(index)} />
                    ))}
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => handleComfirm()}>
                        <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Xác nhận</Text>
                    </TouchableOpacity>
                </View>

                {/* Modal */}
                <SelectTermOptionsModal visible={modalSelectTermOptionVisible} onClose={hideSelectTermOptionsModal} onSelectOption={handleSelectTermOption} />
                <SelectBranchModal visible={modalSelectBranchVisible} onClose={hideSelectBranchModal} />
                <SelectDateModal
                    visible={modalSelectDateVisible}
                    onClose={hideSelectDateModal}
                    onSelectOption={selectedDateType === 'start' ? handleSelectDateStartOption : handleSelectDateEndOption} // Chọn hàm xử lý tùy thuộc vào loại ngày
                />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: "100%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#EBEBEB',
        paddingHorizontal: 15,
    },
    labelText: {
        fontFamily: 'lato-bold',
        fontSize: 16,
        color: '#000000'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelSecondary: {
        flexDirection: 'row',
        width: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 10,
        paddingHorizontal: 10,
    },
    searchText: {
        fontFamily: 'lato-regular',
        fontSize: 16,
        color: '#000000'
    },
    item: {
        flexDirection: 'row',
        height: 'auto',
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    column: {
        flex: 1,
        gap: 5,
        marginLeft: 10,
    },
    textPrimary: {
        fontFamily: 'lato-bold',
        fontSize: 16,
        color: '#000000',
    },
    textSecondary: {
        fontFamily: 'lato-regular',
        fontSize: 16,
        color: '#9C9C9C',
        lineHeight: 20
    },
    positionLabel: {
        backgroundColor: '#EDFAF1',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 5,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionText: {
        fontFamily: 'lato-bold',
        fontSize: 18,
        color: '#000000',
        lineHeight: 20
    },
    acceptButton: {
        backgroundColor: '#006c5e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        borderRadius: 20
    },
});
