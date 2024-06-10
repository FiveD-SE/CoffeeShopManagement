import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SquareWithBorder from "../../components/Admin/SquarewithBorder";
import ColorButton from "../../components/Admin/Button/ColorButton";
import { getDistricts, getProvinces, getWards } from "../../services/ghnService"
import { collection, addDoc, updateDoc, doc, query, where, getDocs } from "firebase/firestore";
import { db, uploadImageToFirebase } from "../../services/firebaseService";
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";

const AdminBranchEditScreen = ({ navigation, route }) => {
    const [branchName, setBranchName] = useState("");
    const [branchPhoneNumber, setBranchPhoneNumber] = useState("");
    const [branchEmail, setBranchEmail] = useState("");

    const [street, setStreet] = useState("");

    const [provinceList, setProvinceList] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [provinceId, setProvinceId] = useState("");

    const [districtList, setDistrictList] = useState([]);
    const [districtName, setDistrictName] = useState("");
    const [districtId, setDistrictId] = useState("");

    const [wardList, setWardList] = useState([]);
    const [wardName, setWardName] = useState("");
    const [wardId, setWardId] = useState("");

    const [selectedImage, setSelectedImage] = useState(null);

    const [openingHour, setOpeningHour] = useState(new Date());
    const [selectOpenHourPickerShow, setSelectOpenHourPickerShow] = useState(false);
    const [isOpeningHourChange, setIsOpeningHourChange] = useState(false);

    const [closingHour, setClosingHour] = useState(new Date());
    const [selectCloseHourPickerShow, setSelectCloseHourPickerShow] = useState(false);
    const [isClosingHourChange, setIsClosingHourChange] = useState(false);
    // Fetch Provinces
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getProvinces();
                const sortedProvinces = response.data
                    .map((province) => ({
                        label: province.ProvinceName,
                        value: province.ProvinceID,
                    }))
                    .sort((a, b) => a.label.localeCompare(b.label));
                setProvinceList(sortedProvinces);
            } catch (error) {
                console.log("Error fetching provinces:", error);
            }
        };
        fetchData();
    }, []);

    // Fetch Districts
    useEffect(() => {
        if (provinceId) {
            const fetchDistricts = async () => {
                try {
                    const response = await getDistricts({ province_id: provinceId });
                    const sortedDistricts = response.data
                        .map((district) => ({
                            label: district.DistrictName,
                            value: district.DistrictID,
                        }))
                        .sort((a, b) => a.label.localeCompare(b.label));
                    setDistrictList(sortedDistricts);
                } catch (error) {
                    console.log("Error fetching districts:", error);
                }
            };
            fetchDistricts();
        } else {
            setDistrictList([]);
            setDistrictId("");
            setDistrictName("");
            setWardList([]);
            setWardId("");
            setWardName("");
        }
    }, [provinceId]);

    // Fetch Wards
    useEffect(() => {
        if (districtId) {
            const fetchWards = async () => {
                try {
                    const response = await getWards({ district_id: districtId });
                    const sortedWards = response.data
                        .map((ward) => ({
                            label: ward.WardName,
                            value: ward.WardCode,
                        }))
                        .sort((a, b) => a.label.localeCompare(b.label));
                    setWardList(sortedWards);
                } catch (error) {
                    console.log("Error fetching wards:", error);
                }
            };
            fetchWards();
        } else {
            setWardList([]);
            setWardId("");
            setWardName("");
        }
    }, [districtId]);

    const handleImageSelected = (uri) => {
        setSelectedImage(uri);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleSaveBranchToFireBase = async () => {
        let errorMessage = "";

        if (branchName === "" ||
            branchPhoneNumber === "" ||
            branchEmail === "" ||
            !provinceId ||
            !districtId ||
            !wardId ||
            !street
            ) {
            errorMessage = "Vui lòng nhập đầy đủ thông tin";
        }

        else if (!validatePhoneNumber(branchPhoneNumber)) {
            errorMessage = "Vui lòng nhập số điện thoại đúng định dạng";
        }

        else if (!isOpeningHourChange) {
            errorMessage = "Vui lòng chọn giờ bắt đầu";
        }

        else if (!isClosingHourChange) {
            errorMessage = "Vui lòng chọn giờ kết thúc";
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
            let imageDownloadUrl = null;
            if (selectedImage) {
                const imagename = `branchName_${branchName}_${new Date().getTime()}.jpg`;
                imageDownloadUrl = await uploadImageToFirebase(
                    selectedImage,
                    imagename
                );
            }

            const docRef = await addDoc(collection(db, "branches"), {
                branchName: branchName,
                branchPhoneNumber: branchPhoneNumber,
                branchEmail: branchEmail,

                provinceId: provinceId,
                districtId: districtId,
                wardId: wardId,
                provinceName: provinceName,
                districtName: districtName,
                wardName: wardName,
                street: street,

                openingHour: openingHour,
                closingHour: closingHour,
                imageDownloadUrl: imageDownloadUrl,
                dateCreated: new Date(),
            });
            const branchId = docRef.id;

            await updateDoc(doc(collection(db, "branches"), branchId), {
                branchId: branchId,
            });

            navigation.goBack();

            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Chi nhánh đã được thêm mới",
            });
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Có lỗi xảy ra khi thêm chi nhánh",
            });
        }
    };

    const showOpeningHourPicker = () => {
        setSelectOpenHourPickerShow(true);
    };

    const onOpeningHourPickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectOpenHourPickerShow(false);
        setOpeningHour(currentDate);
        setIsOpeningHourChange(true);
    };

    const showClosingHourPicker = () => {
        setSelectCloseHourPickerShow(true);
    };

    const onClosingHourPickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectCloseHourPickerShow(false);
        setClosingHour(currentDate);
        setIsClosingHourChange(true);
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

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
                <SquareWithBorder
                    text="Ảnh chi nhánh"
                    onImageSelected={handleImageSelected}
                    selectedImage={selectedImage}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.header}>Thông tin chung</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Tên chi nhánh"
                        value={branchName}
                        onChangeText={(text) => setBranchName(text)}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        value={branchPhoneNumber}
                        onChangeText={(text) => setBranchPhoneNumber(text)}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Email"
                        value={branchEmail}
                        onChangeText={(text) => setBranchEmail(text)}
                    />
                </View>
                <Text style={styles.header}>Thông tin địa chỉ</Text>
                <Dropdown
                    style={[styles.dropDown]}
                    placeholder='Tỉnh/Thành Phố'
                    placeholderStyle={{ color: "#3a3a3a" }}
                    data={provinceList}
                    labelField="label"
                    valueField="value"
                    value={provinceId}
                    onChange={item => {
                        setProvinceName(item.label);
                        setProvinceId(item.value);
                        setDistrictId("");
                        setDistrictName("");
                        setWardId("");
                        setWardName("");
                    }} />

                <Dropdown
                    style={[styles.dropDown]}
                    placeholder='Quận/Huyện'
                    placeholderStyle={{ color: "#3a3a3a" }}
                    data={districtList}
                    labelField="label"
                    valueField="value"
                    value={districtId}
                    onChange={item => {
                        setDistrictName(item.label);
                        setDistrictId(item.value);
                        setWardId("");
                        setWardName("");
                    }} />

                <Dropdown
                    style={[styles.dropDown]}
                    placeholder='Xã/Phường/Thị Trấn'
                    placeholderStyle={{ color: "#3a3a3a" }}
                    data={wardList}
                    labelField="label"
                    valueField="value"
                    value={wardId}
                    onChange={item => {
                        setWardId(item.value);
                        setWardName(item.label);
                    }} />
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Số nhà, Đường, Tòa nhà"
                        onChangeText={(text) => { setStreet(text) }}
                    />
                </View>
                <Text style={styles.header}>Thông tin thời gian</Text>
                <TouchableOpacity
                    style={[styles.inputBox, { justifyContent: "space-between" }]}
                    onPress={showOpeningHourPicker}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.input}>Giờ mở cửa</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {isOpeningHourChange && (
                            <Text style={styles.selectedText}>{formatTime(openingHour)}</Text>
                        )}
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={30}
                            color="#CCCCCC"
                        />
                    </View>
                </TouchableOpacity>
                {selectOpenHourPickerShow && (
                    <DateTimePicker
                        onChange={onOpeningHourPickerChange}
                        value={openingHour}
                        mode="time"
                        is24Hour={true}
                    />
                )}
                <TouchableOpacity
                    style={[styles.inputBox, { justifyContent: "space-between" }]}
                    onPress={showClosingHourPicker}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.input}>Giờ đóng cửa</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {isClosingHourChange && (
                            <Text style={styles.selectedText}>{formatTime(closingHour)}</Text>
                        )}
                        <MaterialIcons
                            name="keyboard-arrow-right"
                            size={30}
                            color="#CCCCCC"
                        />
                    </View>
                </TouchableOpacity>
                {selectCloseHourPickerShow && (
                    <DateTimePicker
                        value={closingHour}
                        mode="time"
                        is24Hour={true}
                        onChange={onClosingHourPickerChange}
                    />
                )}
            </View>
            <ColorButton
                OnPress={handleSaveBranchToFireBase}
                color="#00A188"
                text="Thêm mới"
                textColor="#ffffff"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "4%",
        marginHorizontal: "4%",

    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    content: {
        padding: 16,
    },
    inputContainer: {
        flex: 1,
        flexDirection: "column",
        marginVertical: "2%",
    },
    inputBox: {
        marginVertical: "2%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ECECEC",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        backgroundColor: "#ffffff",
    },
    input: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
    },
    header: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        marginVertical: "3%",
    },
    locationContainer: {
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
    labelInButton: {
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        height: 50,
    },
    avt: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    locationButton: {
        flex: 1,
    },
    buttonText: {
        marginRight: 8,
    },
    operatingHoursContainer: {
        marginBottom: 16,
        height: 50,
    },
    operatingHoursButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        height: 50,
    },
    operatingHoursText: {
        marginRight: 8,
        flex: 1,
        textAlign: "right",
    },
    dropDown: {
        marginVertical: "2%",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ECECEC",
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        backgroundColor: "#ffffff",
    },
    selectedText: {
        color: "#00A188",
        fontSize: 14,
        fontWeight: "500",
    },
});

export default AdminBranchEditScreen;