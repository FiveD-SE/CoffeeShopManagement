import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'

import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db, uploadImageToFirebase } from "../../services/firebaseService";
import { MaterialIcons } from '@expo/vector-icons'
import ColorButton from '../../components/Admin/Button/ColorButton';
import { useNavigation } from '@react-navigation/native';
import SelectBranchModal from '../../components/Admin/Modal/SelectBranchModal';
import Section from '../../components/Client/Section';
import { colors } from '../../assets/colors/colors';

const AddNewShiftScreen = () => {
    const navigation = useNavigation();
    const [shiftName, setShiftName] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [selectStartTimePickerShow, setSelectStartTimePickerShow] = useState(false);
    const [isStartTimeChange, setIsStartTimeChange] = useState(false);

    const [endTime, setEndTime] = useState(new Date());
    const [selectEndTimePickerShow, setSelectEndTimePickerShow] = useState(false);
    const [isEndTimeChange, setIsEndTimeChange] = useState(false);

    const [selectBranchModalVisible, setSelectBranchModalVisible] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState();
    const [branchList, setBranchList] = useState([]);
    const [branchAddress, setBranchAddress] = useState('');
    const [branchOpeningHours, setBranchOpeningHours] = useState('');
    const [branchClosingHours, setBranchClosingHours] = useState('');

    const convertTimestampToDate = (timestamp) => {
        const isSeconds = timestamp.seconds !== undefined;

        const ts = isSeconds ? timestamp.seconds * 1000 : timestamp;

        const date = new Date(ts);

        return date;
    };

    const showSelectBranchModal = () => {
        setSelectBranchModalVisible(true);
    };
    const hideSelectBranchModal = () => {
        setSelectBranchModalVisible(false);
    };

    useEffect(() => {
        if (selectedBranch) {
            const address = `${selectedBranch.street}, ${selectedBranch.wardName}, ${selectedBranch.districtName}, ${selectedBranch.provinceName}`;
            setBranchAddress(address);
            setBranchOpeningHours(formatTime(convertTimestampToDate(selectedBranch.openingHour)));
            setBranchClosingHours(formatTime(convertTimestampToDate(selectedBranch.closingHour)));
        }
    }, [selectedBranch])

    const showStartTimePicker = () => {
        setSelectStartTimePickerShow(true);
    };

    const onStartTimePickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectStartTimePickerShow(false);
        setStartTime(currentDate);
        setIsStartTimeChange(true);
    };

    const showEndTimePicker = () => {
        setSelectEndTimePickerShow(true);
    };

    const onEndTimePickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectEndTimePickerShow(false);
        setEndTime(currentDate);
        setIsEndTimeChange(true);
    };

    const formatTime = (date) => {
        if (date === undefined) {
            return "";
        }
        else {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        }
    };

    useEffect(() => {
        const loadBranches = async () => {
            try {
                const q = query(
                    collection(db, "branches"),
                );
                const querySnapshot = await getDocs(q);
                const loadBranches = [];
                querySnapshot.forEach((doc) => {
                    loadBranches.push(doc.data());
                });
                setBranchList(loadBranches);
            } catch (error) {
                console.log("Error loading branches:", error);
            }
        };

        loadBranches();
        const unsubscribe = navigation.addListener("focus", () => {
            loadBranches();
        });

        return unsubscribe;
    }, [navigation]);


    const handleAddShift = async () => {
        let errorMessage = null;
        if (!shiftName) {
            errorMessage = "Vui lòng nhập tên ca làm";
        }
        else if (!selectedBranch) {
            errorMessage = "Vui lòng chọn chi nhánh áp dụng";
        }
        else if (!isStartTimeChange) {
            errorMessage = "Vui lòng chọn giờ bắt đầu";
        }

        else if (!isEndTimeChange) {
            errorMessage = "Vui lòng chọn giờ kết thúc";

        }

        else {
            const openingHour = convertTimestampToDate(selectedBranch.openingHour);
            const closingHour = convertTimestampToDate(selectedBranch.closingHour);

            if (!isShiftWithinOperatingHours(startTime, endTime, openingHour, closingHour)) {
                errorMessage = 'Ca làm việc phải nằm trong khoảng giờ mở cửa và giờ đóng cửa của chi nhánh';
            }
        }

        if (errorMessage) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: errorMessage,
                text1Style: {
                    fontSize: 16,
                },
                text2Style: {
                    fontSize: 12,
                },
            });
            return;
        }

        try {
            const docRef = await addDoc(collection(db, "shifts"), {
                shiftName: shiftName,
                startTime: startTime,
                endTime: endTime,
                branchId: selectedBranch.branchId,
                dateCreated: new Date(),
            });
            const shiftId = docRef.id;

            await updateDoc(doc(collection(db, "shifts"), shiftId), {
                shiftId: shiftId,
            });

            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Ca làm việc đã được thêm mới",
            });
            navigation.goBack();
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Có lỗi xảy ra khi thêm ca làm",
            });
        }
    };

    const isShiftWithinOperatingHours = (startTime, endTime, openingHour, closingHour) => {
        const startHour = startTime.getHours() + startTime.getMinutes() / 60;
        const endHour = endTime.getHours() + endTime.getMinutes() / 60;
        const openingHourTime = openingHour.getHours() + openingHour.getMinutes() / 60;
        const closingHourTime = closingHour.getHours() + closingHour.getMinutes() / 60;

        if (openingHourTime === 0 && closingHourTime === 0) {
            return true; // Open all day
        }

        if (openingHourTime === 0) {
            // If openingHour is 00:00, it means start of day
            if (endHour <= closingHourTime) {
                return true; // Shift ends before closingHour (end of day)
            }
        } else if (closingHourTime === 0) {
            // If closingHour is 00:00, it means end of day
            if (startHour >= openingHourTime) {
                return true; // Shift starts after openingHour (start of day)
            }
        } else {
            // Normal case where both openingHour and closingHour are specified
            if (startHour >= endHour) {
                return false; // Invalid shift duration (start time cannot be equal or after end time)
            }

            if (closingHourTime < openingHourTime) {
                // Case where closingHour is earlier than openingHour (overnight operation)
                if (startHour >= openingHourTime || endHour <= closingHourTime) {
                    return true;
                }
            } else {
                // Regular operating hours within the same day
                if (startHour >= openingHourTime && endHour <= closingHourTime) {
                    return true;
                }
            }
        }

        return false;
    };



    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin ca làm việc</Text>
            <View style={styles.inputBox}>
                <TextInput
                    placeholder='Tên ca mới'
                    placeholderTextColor={'#3a3a3a'}
                    style={styles.input}
                    value={shiftName}
                    onChangeText={(text) => {
                        setShiftName(text)
                    }} />
            </View>

            <TouchableOpacity style={[styles.inputBox, { justifyContent: "space-between" }]} onPress={showSelectBranchModal}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={styles.input}>Chi nhánh áp dụng</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {selectedBranch &&
                        <Text style={styles.selectedText}>
                            {selectedBranch.branchName}
                        </Text>}
                    <MaterialIcons
                        name="keyboard-arrow-right"
                        size={30}
                        color="#CCCCCC"
                    />
                </View>
            </TouchableOpacity>
            <SelectBranchModal visible={selectBranchModalVisible} onClose={hideSelectBranchModal} branches={branchList} setBranch={setSelectedBranch} />
            <View style={styles.timeContainer}>

                <TouchableOpacity
                    style={[styles.addTime]}
                    onPress={showStartTimePicker}
                >
                    <Text
                        style={!isStartTimeChange ? styles.input : styles.selectedText}>
                        {!isStartTimeChange ? "Giờ bắt đầu" : formatTime(startTime)}
                    </Text>
                    <Feather name='clock' size={24} />
                </TouchableOpacity>
                {selectStartTimePickerShow && (
                    <DateTimePicker
                        value={endTime}
                        mode="time"
                        is24Hour={true}
                        onChange={onStartTimePickerChange}
                    />
                )}

                <TouchableOpacity
                    style={styles.addTime}
                    onPress={showEndTimePicker}>
                    <Text style={!isEndTimeChange ? styles.input : styles.selectedText}>
                        {!isEndTimeChange ? "Giờ kết thúc" : formatTime(endTime)}
                    </Text>
                    <Feather name='clock' size={24} />
                </TouchableOpacity>
                {selectEndTimePickerShow && (
                    <DateTimePicker
                        value={endTime}
                        mode="time"
                        is24Hour={true}
                        onChange={onEndTimePickerChange}
                    />
                )}
            </View>
            {selectedBranch && <View><Text style={styles.header}>Thông tin chi nhánh</Text>
                <View style={styles.branchInfoContainer}>
                    <Text style={styles.title}>
                        Giờ mở cửa: {branchOpeningHours}
                    </Text>
                    <Text style={styles.title}>
                        Giờ đóng cửa: {branchClosingHours}
                    </Text>
                    <Text style={styles.title}>
                        Địa chỉ: {branchAddress}
                    </Text>
                </View>
            </View>}
            <ColorButton
                OnPress={handleAddShift}
                color="#00A188"
                text="Thêm mới"
                textColor="#ffffff"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '3%',
        marginBottom: "6%"
    },
    acceptButton: {
        borderRadius: 10,
        backgroundColor: '#006c5e',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%'
    },
    topText: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: '3%'
    },
    addTime: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: "3%",
        paddingVertical: "4%",
    },
    inputBox: {
        marginVertical: "3%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        backgroundColor: "#ffffff",
    },
    input: {
        color: "#3a3a3a",
        fontSize: 15,
        fontWeight: "500",
        flex: 1,
        fontFamily: "lato-regular",
    },
    header: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        fontFamily: "lato-bold",
    },
    selectedText: {
        color: colors.green_100,
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "lato-regular",
    },
    branchInfoContainer: {
        backgroundColor: colors.green_10,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        borderRadius: 10,
        marginVertical: "3%",
    },
    title: {
        color: colors.black_100,
        fontSize: 16,
        fontFamily: "lato-regular",
        lineHeight: 20,
        marginVertical: "3%"
    },
    price: {
        color: colors.black_100,
        fontSize: 14,
        fontFamily: "lato-regular",
    },
})

export default AddNewShiftScreen