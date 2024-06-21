import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert
} from "react-native";
import SquareWithBorder from "../../components/Admin/SquarewithBorder";
import ColorButton from "../../components/Admin/Button/ColorButton";
import { getDistricts, getProvinces, getWards } from "../../services/ghnService";
import { collection, addDoc, updateDoc, doc, getDocs, deleteDoc } from "firebase/firestore";
import { db, uploadImageToFirebase } from "../../services/firebaseService";
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialIcons } from "@expo/vector-icons";
import DeleteButton from "../../components/Admin/Button/DeleteButton";
import { colors } from "../../assets/colors/colors";

const AdminEditBranchScreen = ({ navigation, route }) => {
    const { branch } = route.params;
    const [hasChanges, setHasChanges] = useState(false);
    const convertTimestampToDate = (timestamp) => {
        const isSeconds = timestamp.seconds !== undefined;

        const ts = isSeconds ? timestamp.seconds * 1000 : timestamp;

        const date = new Date(ts);

        return date;
    };

    const [branchName, setBranchName] = useState(branch.branchName);
    const [branchPhoneNumber, setBranchPhoneNumber] = useState(branch.branchPhoneNumber);
    const [branchEmail, setBranchEmail] = useState(branch.branchEmail);
    const [street, setStreet] = useState(branch.street);

    const [provinceList, setProvinceList] = useState([]);
    const [provinceName, setProvinceName] = useState(branch.provinceName);
    const [provinceId, setProvinceId] = useState(branch.provinceId);

    const [districtList, setDistrictList] = useState([]);
    const [districtName, setDistrictName] = useState(branch.districtName);
    const [districtId, setDistrictId] = useState(branch.districtId);

    const [wardList, setWardList] = useState([]);
    const [wardName, setWardName] = useState(branch.wardName);
    const [wardId, setWardId] = useState(branch.wardId);

    const [selectedImage, setSelectedImage] = useState(branch.branchImage);
    const [openingHour, setOpeningHour] = useState(convertTimestampToDate(branch.openingHour));
    const [selectOpenHourPickerShow, setSelectOpenHourPickerShow] = useState(false);
    const [isOpeningHourChange, setIsOpeningHourChange] = useState(false);
    const [closingHour, setClosingHour] = useState(convertTimestampToDate(branch.closingHour));
    const [selectCloseHourPickerShow, setSelectCloseHourPickerShow] = useState(false);
    const [isClosingHourChange, setIsClosingHourChange] = useState(false);

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
        setHasChanges(true);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleEditBranch = async () => {
        if (!hasChanges) {
            Toast.show({
                type: 'info',
                text1: 'Thông báo',
                text2: 'Bạn chưa thay đổi thông tin của chi nhánh',
            });
            return;
        }
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

        else if (!validateEmail(branchEmail)) {
            errorMessage = "Vui lòng nhập email đúng định dạng";
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

        let imageDownloadUrl = null;
        if (selectedImage) {
            const imagename = `branchName_${branchName}_${new Date().getTime()}.jpg`;
            imageDownloadUrl = await uploadImageToFirebase(
                selectedImage,
                imagename
            );
        }

        const selectedIds = {
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
            branchImage: imageDownloadUrl,
        };
        try {
            await updateDoc(doc(db, "branches", branch.branchId), selectedIds);
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Đã chỉnh sửa chi nhánh",
                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-bold",
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-bold",
                    color: colors.black_100,
                },
            });
            navigation.goBack();
        } catch (error) {
            console.log("Lỗi khi lưu chi nhánh:", error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Đã xảy ra lỗi khi lưu chi nhánh",
                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-bold",
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-bold",
                    color: colors.black_100,
                },
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
        setHasChanges(true);
    };

    const showClosingHourPicker = () => {
        setSelectCloseHourPickerShow(true);
    };

    const onClosingHourPickerChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setSelectCloseHourPickerShow(false);
        setClosingHour(currentDate);
        setIsClosingHourChange(true);
        setHasChanges(true);
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

    const handleDeleteBranch = async () => {
        try {
            const branchQuerySnapshot = await getDocs(collection(db, "branches"));
            const numBranches = branchQuerySnapshot.size;

            if (numBranches <= 1) {
                Toast.show({
                    type: "error",
                    text1: "Thông báo",
                    text2: "Bạn không thể xóa chi nhánh duy nhất.",
                });
                return;
            }

            Alert.alert(
                "Xác nhận xóa chi nhánh",
                "Bạn có chắc chắn muốn xóa chi nhánh này không?",
                [
                    {
                        text: "Hủy",
                        style: "cancel",
                    },
                    {
                        text: "Đồng ý",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                await deleteDoc(
                                    doc(db, "branches", branch.branchId)
                                );
                                Toast.show({
                                    type: "success",
                                    text1: "Thành công",
                                    text2: "Đã xóa chi nhánh",
                                });
                                navigation.goBack();
                            } catch (error) {
                                console.log("Error deleting branch:", error);
                                Toast.show({
                                    type: "error",
                                    text1: "Lỗi",
                                    text2: "Đã xảy ra lỗi khi xóa chi nhánh",
                                });
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.log("Error fetching branches:", error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Đã xảy ra lỗi khi kiểm tra số lượng chi nhánh",
            });
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
                        onChangeText={(text) => {
                            setHasChanges(true);
                            setBranchName(text)
                        }}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        value={branchPhoneNumber}
                        onChangeText={(text) => {
                            setBranchPhoneNumber(text)
                            setHasChanges(true);
                        }}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Email"
                        value={branchEmail}
                        onChangeText={(text) => {
                            setHasChanges(true);
                            setBranchEmail(text)
                        }}
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
                        setHasChanges(true);
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
                        setHasChanges(true);
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
                        setHasChanges(true);
                        setWardId(item.value);
                        setWardName(item.label);
                    }} />
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        value={street}
                        placeholder="Số nhà, Đường, Tòa nhà"
                        onChangeText={(text) => {
                            setHasChanges(true);
                            setStreet(text)
                        }}
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
                        <Text style={styles.selectedText}>{formatTime(openingHour)}</Text>
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
                        <Text style={styles.selectedText}>{formatTime(closingHour)}</Text>
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
            <DeleteButton OnPress={handleDeleteBranch} />
            <ColorButton
                OnPress={handleEditBranch}
                color="#00A188"
                text="Hoàn thành"
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
        fontFamily: "lato-regular"
    },
    header: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        marginVertical: "3%",
        fontFamily: "lato-bold"
    },
    locationContainer: {
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        fontFamily: "lato-bold"
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
        fontFamily: "lato-regular"
    },
    selectedText: {
        color: "#00A188",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "lato-regular"
    },
});

export default AdminEditBranchScreen;