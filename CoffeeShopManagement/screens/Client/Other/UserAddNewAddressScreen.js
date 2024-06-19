import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    Pressable,
    TextInput,
} from "react-native";
import SwitchToggle from "toggle-switch-react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ColorButton from "../../../components/Admin/Button/ColorButton";
import { connect } from "react-redux";
import {
    getDistricts,
    getProvinces,
    getWards,
} from "../../../services/ghnService";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import Toast from "react-native-toast-message";
import { Dropdown } from "react-native-element-dropdown";
import { colors } from "../../../assets/colors/colors";
import { updateAddressStatus } from "../../../redux/actions/userActions";

const UserAddNewAddressScreen = ({ userData, updateAddressStatus }) => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [street, setStreet] = useState("");
    const [isDefault, setIsDefault] = useState(false);
    const [isFirstAddress, setIsFirstAddress] = useState(false);

    const [provinceList, setProvinceList] = useState([]);
    const [provinceName, setProvinceName] = useState("");
    const [provinceId, setProvinceId] = useState("");

    const [districtList, setDistrictList] = useState([]);
    const [districtName, setDistrictName] = useState("");
    const [districtId, setDistrictId] = useState("");

    const [wardList, setWardList] = useState([]);
    const [wardName, setWardName] = useState("");
    const [wardId, setWardId] = useState("");

    const handleToggle = () => {
        if (isFirstAddress) {
            Toast.show({
                type: "info",
                text1: "Thông báo",
                text2: "Địa chỉ đầu tiên được đặt là địa chỉ mặc định",
                text1Style: {
                    fontSize: 16,
                },
                text2Style: {
                    fontSize: 12,
                },
            });
        } else {
            setIsDefault(!isDefault);
        }
    };

    useEffect(() => {
        const checkDefaultAddress = async () => {
            try {
                const q = query(
                    collection(db, "addresses"),
                    where("userId", "==", userData.id)
                );
                const querySnapshot = await getDocs(q);
                const existingAddresses = querySnapshot.docs.map((doc) =>
                    doc.data()
                );
                const hasExistingAddress = existingAddresses.length > 0;
                const isFirstAddress = !hasExistingAddress;

                setIsFirstAddress(isFirstAddress);
                if (isFirstAddress) {
                    setIsDefault(true);
                }
            } catch (error) {
                console.log("Lỗi khi kiểm tra địa chỉ:", error);
            }
        };

        checkDefaultAddress();
    }, [userData.id]);

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
                    const response = await getDistricts({
                        province_id: provinceId,
                    });
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
                    const response = await getWards({
                        district_id: districtId,
                    });
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

    const handleSaveNewAddress = async () => {
        let errorMessage = "";

        if (
            !name ||
            !phoneNumber ||
            !provinceId ||
            !districtId ||
            !wardId ||
            !street
        ) {
            errorMessage = "Vui lòng nhập đầy đủ thông tin";
        } else if (!validatePhoneNumber(phoneNumber)) {
            errorMessage = "Vui lòng nhập số điện thoại đúng định dạng";
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
            if (isDefault) {
                const q = query(
                    collection(db, "addresses"),
                    where("userId", "==", userData.id)
                );
                const querySnapshot = await getDocs(q);
                const promises = querySnapshot.docs.map(async (doc) => {
                    await updateDoc(doc.ref, { isDefault: false });
                });
                await Promise.all(promises);
            }

            const docRef = await addDoc(collection(db, "addresses"), {
                name: name,
                phoneNumber: phoneNumber,
                provinceId: provinceId,
                districtId: districtId,
                wardId: wardId,
                provinceName: provinceName,
                districtName: districtName,
                wardName: wardName,
                street: street,
                userId: userData.id,
                isDefault: isDefault,
            });

            const addressId = docRef.id;

            await updateDoc(doc(collection(db, "addresses"), addressId), {
                addressId: addressId,
            });
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Đã lưu địa chỉ",
                text1Style: {
                    fontSize: 16,
                },
                text2Style: {
                    fontSize: 12,
                },
            });
            updateAddressStatus(true);
            navigation.goBack();
        } catch (error) {
            console.log("Lỗi khi lưu địa chỉ:", error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Đã xảy ra lỗi khi lưu địa chỉ",
                text1Style: {
                    fontSize: 16,
                },
                text2Style: {
                    fontSize: 12,
                },
            });
        }
    };

    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Liên hệ</Text>

                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.labelInput}
                            placeholder="Họ và tên"
                            onChangeText={(text) => {
                                setName(text);
                            }}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <TextInput
                            keyboardType="phone-pad"
                            style={styles.labelInput}
                            placeholder="Số điện thoại"
                            onChangeText={(text) => {
                                setPhoneNumber(text);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Địa chỉ</Text>
                    <Dropdown
                        style={[styles.dropDown]}
                        placeholder="Tỉnh/Thành Phố"
                        placeholderStyle={{ color: "#3a3a3a" }}
                        data={provinceList}
                        labelField="label"
                        valueField="value"
                        value={provinceId}
                        onChange={(item) => {
                            setProvinceName(item.label);
                            setProvinceId(item.value);
                            setDistrictId("");
                            setDistrictName("");
                            setWardId("");
                            setWardName("");
                        }}
                    />

                    <Dropdown
                        style={[styles.dropDown]}
                        placeholder="Quận/Huyện"
                        placeholderStyle={{ color: "#3a3a3a" }}
                        data={districtList}
                        labelField="label"
                        valueField="value"
                        value={districtId}
                        onChange={(item) => {
                            setDistrictName(item.label);
                            setDistrictId(item.value);
                            setWardId("");
                            setWardName("");
                        }}
                    />

                    <Dropdown
                        style={[styles.dropDown]}
                        placeholder="Xã/Phường/Thị Trấn"
                        placeholderStyle={{ color: "#3a3a3a" }}
                        data={wardList}
                        labelField="label"
                        valueField="value"
                        value={wardId}
                        onChange={(item) => {
                            setWardId(item.value);
                            setWardName(item.label);
                        }}
                    />
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.labelInput}
                            placeholder="Số nhà, Đường, Tòa nhà"
                            onChangeText={(text) => {
                                setStreet(text);
                            }}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Cài đặt</Text>
                    <View style={styles.label}>
                        <View
                            style={{
                                flexDirection: "row",
                                paddingVertical: "3%",
                            }}
                        >
                            <Text style={styles.labelInput}>
                                {" "}
                                Đặt làm địa chỉ mặc định{" "}
                            </Text>
                            <SwitchToggle
                                offColor="#CCCCCC"
                                labelStyle={styles.toggleLabel}
                                size="medium"
                                value={isDefault}
                                isOn={isDefault}
                                onColor={colors.green_100}
                                onToggle={handleToggle}
                            />
                        </View>
                    </View>
                </View>
                <ColorButton
                    color="#00A188"
                    text="Thêm mới"
                    textColor="#ffffff"
                    OnPress={handleSaveNewAddress}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

const mapDispatchToProps = {
    updateAddressStatus,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAddNewAddressScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: "4%",
        paddingTop: "3%",
    },
    section: {
        marginBottom: "3%",
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#3A3A3A",
    },
    labelInput: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
        flex: 1,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
    },

    toggleLabel: {
        color: "#3A3A3A",
        fontSize: 15,
    },
    label: {
        width: "100%",
        backgroundColor: "#FFF",
        borderColor: "#ECECECZ",
        borderRadius: 10,
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        marginVertical: "2%",
    },

    inputBox: {
        marginVertical: "2%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
        paddingHorizontal: "3%",
        paddingVertical: "3%",
        backgroundColor: "#ffffff",
    },
    dropDown: {
        marginVertical: "2%",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
        paddingHorizontal: "3%",
        paddingVertical: "2%",
        backgroundColor: "#ffffff",
    },
});
