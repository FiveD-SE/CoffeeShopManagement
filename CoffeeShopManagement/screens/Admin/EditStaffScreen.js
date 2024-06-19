import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    ScrollView,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Entypo";
import Icon1 from "react-native-vector-icons/Feather";
import DeleteStaffModal from "../../components/Admin/DeletaStaffModal";
import SelectBranchModal from "../../components/Admin/Modal/SelectBranchModal";
import { useNavigation } from "@react-navigation/native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import {
    auth,
    createUserWithEmailAndPassword,
    db,
    storage,
    uploadAvatarToFirebase,
    uploadImageToFirebase,
} from "../../services/firebaseService";
import { Dropdown } from "react-native-element-dropdown";
import { getDownloadURL, ref } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { deleteUser, getAuth, sendEmailVerification } from "firebase/auth";
import Toast from "react-native-toast-message";
import SelectRoleModal from "../../components/Admin/Modal/SelectRoleModal";
import DeleteButton from '../../components/Admin/Button/DeleteButton';

const TextBox = ({ text, value, setValue, keyboardType, handleValidInput }) => {

    return (
        <TextInput
            placeholder={text}
            style={styles.textBox}
            value={value}
            onChangeText={setValue}
            keyboardType={keyboardType ? keyboardType : 'default'}
            onBlur={() => {
                if (handleValidInput(value)) {
                } else {
                    switch (text) {
                        case 'Họ và tên': {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Lỗi',
                                text2: 'Vui lòng nhập đúng định dạng họ và tên!',
                                visibilityTime: 2000,
                                autoHide: true
                            });
                            break;
                        }
                        case 'Số điện thoại': {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Lỗi',
                                text2: 'Số điện thoại gồm 10 chữ số!',
                                visibilityTime: 2000,
                                autoHide: true,
                                swipeable: true,
                            });
                            break;
                        }
                        case 'Số CMND/CCCD': {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Lỗi',
                                text2: 'Số CCCD gồm 12 số!',
                                visibilityTime: 2000,
                                autoHide: true
                            });
                            break;
                        }
                        case 'Email': {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Lỗi',
                                text2: 'Vui lòng nhập đúng định dạng email!',
                                visibilityTime: 2000,
                                autoHide: true,
                                swipeable: true
                            });
                            break;
                        }
                        case 'Password': {
                            Toast.show({
                                type: 'error',
                                position: 'top',
                                text1: 'Lỗi',
                                text2: 'Mật khẩu phải gồm 6 kí tự trở lên !',
                                visibilityTime: 2000,
                                autoHide: true
                            });
                        }
                    }
                }
            }}
        />
    )
}

const TextBox2 = ({ text, iconName, marginRate, value, setValue, onPress }) => {
    return (
        <View
            style={[
                styles.textBox,
                {
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginEnd: marginRate,
                },
            ]}
        >
            <TextInput
                placeholder={text}
                value={value}
                onChangeText={setValue}
            />
            <TouchableOpacity style={{ alignSelf: "center" }} onPress={onPress}>
                <Icon name={iconName} size={28} />
            </TouchableOpacity>
        </View>
    );
};
const ButtonBox = ({ text, placeholder, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.textBox,
                {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                },
            ]}
        >
            <Text style={{ fontWeight: "600" }}>{text}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "#9c9c9c" }}>{placeholder}</Text>
                <View>
                    <Icon name="chevron-right" size={28} color={"#9c9c9c"} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default function EditStaffScreen({ route }) {



    const [cashierImage, setCashierImage] = useState(
        route.params.staffs.staffImage
    );
    const [name, setName] = useState(route.params.staffs.fullName);
    const [sdt, setSdt] = useState(route.params.staffs.phoneNumber);
    const [birthday, setBirthday] = useState(
        route.params.staffs.birthday.toDate()
    );
    const [gender, setGender] = useState(route.params.staffs.gender);
    const [cccd, setCccd] = useState(route.params.staffs.idCard);
    const [email, setEmail] = useState(route.params.staffs.email);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState(route.params.staffs.role);
    const [branch, setBranch] = useState(route.params.staffs.branch);
    const [roles, setRoles] = useState([]);
    const [branches, setBranches] = useState([]);


    const [isNameValid, setIsNameValid] = useState(true);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isGenderValid, setIsGenderValid] = useState(true);
    const [isIdCardValid, setIsIdCardValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isBirthdayValid, setIsBirthdayValid] = useState(true);

    const [isShowDateTimePicker, setIsShowDateTimePicker] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [modalSelectBranchVisible, setModalSelectBranchVisible] = useState(false);
    const [modalSelectRoleVisibile, setModalSelectRoleVisibile] = useState(false);

    const showSelectBranchModal = () => {
        setModalSelectBranchVisible(true);
    };

    const hideSelectBranchModal = () => {
        setModalSelectBranchVisible(false);
    };

    const showSelectRoleModal = () => {
        setModalSelectRoleVisibile(true);
    };

    const hideSelectRoleModal = () => {
        setModalSelectRoleVisibile(false);
    };

    const toggleDatePicker = () => {
        setIsShowDateTimePicker(!isShowDateTimePicker);
    };

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "staffRoles")),
            (snapshot) => {
                setRoles(snapshot.docs.map((doc) => doc.data()));
            }
        );
        return () => unsub();
    }, []);

    useEffect(() => {
        const unsub = onSnapshot(
            query(collection(db, "branches")),
            (snapshot) => {
                setBranches(snapshot.docs.map((doc) => doc.data()));
            }
        );
        return () => unsub();
    }, []);

    const onChange = ({ type }, selectedDate) => {
        if (type === "set") {
            const currentDate = selectedDate;
            setBirthday(currentDate);
            if (new Date().getFullYear() - currentDate.getFullYear() < 18) {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Lỗi',
                    text2: 'Tuổi phải lớn hơn 18',
                    visibilityTime: 2000,
                    autoHide: true
                });
                setIsBirthdayValid(false);
            } else {
                if (Platform.OS === 'android') {
                    toggleDatePicker();
                    setBirthday(currentDate.toDateString());
                } else {
                    setDate(currentDate);
                }
                setIsBirthdayValid(true);
            }
        } else {
            toggleDatePicker();
        }
    };

    const confirmIOSDate = () => {
        if (isBirthdayValid) {
            setBirthday(date);
            toggleDatePicker();
        } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Lỗi',
                text2: 'Vui lòng chọn ngày sinh hợp lệ',
                visibilityTime: 2000,
                autoHide: true
            });
        }
    };

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

    const isValidName = (name) => {
        if (name === '') {
            setIsNameValid(false);
            return false;
        }
        setIsNameValid(true);
        return true;
    }

    const isValidPhoneNumber = (phoneNumber) => {
        if (phoneNumber.length !== 10) {
            setIsPhoneValid(false);
            return false;
        }
        setIsPhoneValid(true);
        return true;
    }

    const isValidIdCard = (idCard) => {
        if (idCard.length !== 12) {
            setIsIdCardValid(false);
            return false;
        }
        setIsIdCardValid(true);
        return true;
    }

    const isValidEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            setIsEmailValid(false);
            return false;
        }
        setIsEmailValid(true);
        return true;
    }


    const navigation = useNavigation();
    const handleSaveInfor = async () => {
        setIsLoading(true);
        const cashierImageURL = await uploadAvatarToFirebase(
            cashierImage,
            "staff_" + route.params.staffs.staffId
        );
        await updateDoc(doc(db, "staffs", route.params.staffs.staffId), {
            fullName: name,
            phoneNumber: sdt,
            birthday: birthday,
            idCard: cccd,
            gender: gender,
            email: email,
            staffImage: cashierImageURL,
        });
        setIsLoading(false);
        navigation.goBack();
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDeleteStaff = async () => {
        Alert.alert(
            "Xác nhận xóa nhân viên",
            "Bạn có chắc chắn muốn xóa nhân viên này không?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    style: "destructive",
                    onPress: async () => {
                        console.log(
                            "route.params.staffs.staffId",
                            route.params.staffs.staffId
                        );
                        try {
                            const response = await fetch(
                                `https://cfbe.up.railway.app/users/${route.params.staffs.staffId}`,
                                {
                                    method: "DELETE",
                                }
                            );

                            if (response.ok) {
                                navigation.goBack();
                                Toast.show({
                                    type: "success",
                                    text1: "Thành công",
                                    text2: "Đã xóa nhân viên thành công",
                                });
                            } else {
                                console.log("Error deleting user:", error);
                                Toast.show({
                                    type: "error",
                                    text1: "Lỗi",
                                    text2: "Đã xảy ra lỗi khi xóa nhân viên",
                                });
                            }
                        } catch (error) {
                            console.log("Error deleting user:", error);
                            Toast.show({
                                type: "error",
                                text1: "Lỗi",
                                text2: "Đã xảy ra lỗi khi xóa nhân viên",
                            });
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.topApp}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity
                            onPress={() => handleImagePicker()}
                            style={styles.imageButton}
                        >
                            <Image
                                source={{ uri: cashierImage }}
                                style={{
                                    marginBottom: "3%",
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.informationWrapper}>
                    <Text style={styles.topText}>Thông tin cá nhân</Text>
                    <TextBox
                        text={"Họ và tên"}
                        value={name}
                        setValue={setName}
                        handleValidInput={isValidName}
                    />
                    <TextBox
                        text={"Số điện thoại"}
                        value={sdt}
                        setValue={setSdt}
                        keyboardType={"number-pad"}
                        handleValidInput={isValidPhoneNumber}
                    />
                    <View style={styles.rowContainerTextBox}>
                        <TextBox2
                            text={"Ngày sinh"}
                            iconName={"calendar"}
                            marginRate={"10%"}
                            value={formatDate(birthday)}
                            setValue={setBirthday}
                            onPress={() => toggleDatePicker()}
                        />
                        <Dropdown
                            style={[styles.dropDown]}
                            placeholder="Giới tính"
                            placeholderStyle={{ color: "rgba(0, 0, 0, 0.2)" }}
                            data={[
                                { label: "Nam", value: "Nam" },
                                { label: "Nữ", value: "Nữ" },
                                { label: "Khác", value: "Khác" },
                            ]}
                            labelField="label"
                            valueField="value"
                            value={gender}
                            onChange={(item) => {
                                setGender(item.value);
                            }}
                        />
                    </View>
                    {isShowDateTimePicker && Platform.OS === "ios" && (
                        <View>
                            <RNDateTimePicker
                                value={birthday}
                                mode="date"
                                display="spinner"
                                onChange={onChange}
                            />
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingHorizontal: "20%",
                                }}
                            >
                                <TouchableOpacity
                                    style={{
                                        marginBottom: "5%",
                                        backgroundColor: "white",
                                        padding: "5%",
                                        borderRadius: 10,
                                    }}
                                    onPress={toggleDatePicker}
                                >
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        marginBottom: "5%",
                                        backgroundColor: "#006c5e",
                                        padding: "5%",
                                        borderRadius: 10,
                                    }}
                                    onPress={confirmIOSDate}
                                >
                                    <Text style={{ color: "white" }}>
                                        Confirm
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {isShowDateTimePicker && Platform.OS === "android" && (
                        <View>
                            <RNDateTimePicker
                                value={birthday.toDate()}
                                mode="date"
                                display="spinner"
                                onChange={onChange}
                            />
                        </View>
                    )}
                    <TextBox
                        text={"Số CMND/CCCD"}
                        value={cccd}
                        setValue={setCccd}
                        keyboardType={"number-pad"}
                        handleValidInput={isValidIdCard}
                    />
                    <Text style={[styles.textBox, { color: '#cacaca' }]}>
                        {email}
                    </Text>
                </View>
                <View>
                    <Text style={styles.topText}>Thông tin công việc</Text>
                    <ButtonBox text={"Vai trò"} placeholder={role.roleName ? role.roleName : 'Vai Trò'} onPress={showSelectRoleModal} />
                    <SelectRoleModal visible={modalSelectRoleVisibile} onClose={hideSelectRoleModal} roles={roles} setRole={setRole} />
                    <ButtonBox
                        text={"Chi nhánh làm việc"}
                        placeholder={branch.branchName ? branch.branchName : 'Tên chi nhánh'}
                        onPress={showSelectBranchModal}
                    />
                    <SelectBranchModal
                        visible={modalSelectBranchVisible}
                        onClose={hideSelectBranchModal}
                        branches={branches}
                        setBranch={setBranch}
                    />
                </View>
                <View>
                    <Pressable
                        onPress={() => handleSaveInfor()}
                        style={styles.acceptButton}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#fff",
                            }}
                        >
                            Lưu
                        </Text>
                    </Pressable>
                </View>
                <View style={{ marginBottom: "10%" }}>
                    <Pressable
                        onPress={handleDeleteStaff}
                        style={styles.deleteButton}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#f73755",
                            }}
                        >
                            Xoá
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color={"black"} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    imageButton: {
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    imageText: {
        color: "#33b2a0",
    },
    informationWrapper: {
        marginBottom: "3%",
    },
    topText: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: "3%",
    },
    textBox: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
        marginBottom: "3%",
        padding: "4%",
    },
    rowContainerTextBox: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
    },
    acceptButton: {
        backgroundColor: "#006c5e",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
        borderRadius: 20,
        marginBottom: "3%",
    },
    deleteButton: {
        borderColor: "#f73755",
        borderWidth: 0.5,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
        borderRadius: 20,
        marginBottom: "3%",
    },
    topApp: {
        flexDirection: "row",
        marginBottom: "5%",
        justifyContent: "center",
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
        flex: 1,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
});
