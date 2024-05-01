import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Pressable,
    Image,
    TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchToggle from "toggle-switch-react-native";
import { useNavigation } from "@react-navigation/native";
import SelectGenderModal from "../../components/Admin/Modal/SelectGenderModal";
import SelectDateModal from "../../components/Admin/Modal/SelectDateModal";
import { getUserData, updateUserData } from "../../api";
import store from "../../redux/store/store";

const EditProfileDetails = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState("");

    const [isToggled, setIsToggled] = useState(false);
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedDateOption, setSelectedDateOption] = useState("");

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                setPhoneNumber(store.getState().auth.phoneNumber);
                console.log("Phone number:", phoneNumber);
            } catch (error) {
                console.error("Error fetching phone number:", error);
            }
        };

        fetchPhoneNumber();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserData(phoneNumber);
                console.log("User data:", userData);
                if (userData) {
                    setUserData(userData);
                } else {
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        if (phoneNumber) {
            fetchUserData();
        }
    }, [phoneNumber]);

    const avatar = require("../../assets/vietnam.png");
    const flag = require("../../assets/vietnam.png");

    const navigateToProfileDetails = async () => {
        try {
            const success = await updateUserData(phoneNumber, userData);
            if (success) {
                navigation.navigate("AdminProfileDetail", { userData });
            } else {
                console.error("Cập nhật dữ liệu người dùng không thành công");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật dữ liệu người dùng:", error);
        }
    };

    const showSelectGenderModal = () => {
        setModalGenderVisible(true);
    };

    const hideSelectGenderModal = () => {
        setModalGenderVisible(false);
    };

    const handleSelectGender = (option) => {
        setSelectedGender(option);
        hideSelectGenderModal();
    };

    const showSelectDateModal = () => {
        setModalSelectDateVisible(true);
    };

    const hideSelectDateModal = () => {
        setModalSelectDateVisible(false);
    };

    const handleSelectDateOption = (option) => {
        setSelectedDateOption(option);
    };

    const [modalGenderVisible, setModalGenderVisible] = useState(false);
    const [modalSelectDateVisible, setModalSelectDateVisible] = useState(false);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={{ paddingVertical: 10, alignItems: "center" }}>
                    <Pressable onPress={navigateToProfileDetails}>
                        <Image
                            alt="avatar"
                            source={avatar}
                            style={styles.profileAvatar}
                        />
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Thông tin chung</Text>
                        <Pressable onPress={navigateToProfileDetails}>
                            <Text style={styles.editButton}>Lưu</Text>
                        </Pressable>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "48%" }]}>
                            <TextInput
                                style={styles.text}
                                onChangeText={(text) => {
                                    console.log(text);
                                    setUserData({
                                        ...userData,
                                        lastName: text,
                                    });
                                }}
                            >
                                {userData?.lastName}
                            </TextInput>
                        </View>
                        <View style={[styles.rowLabelText, { width: "48%" }]}>
                            <TextInput
                                style={styles.text}
                                onChangeText={(text) =>
                                    setUserData({
                                        ...userData,
                                        firstName: text,
                                    })
                                }
                            >
                                {userData?.firstName}
                            </TextInput>
                        </View>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.label}>Giới tính</Text>
                            <View style={styles.row_space_between}>
                                <Text
                                    style={styles.text}
                                    onChangeText={(text) => {
                                        setUserData({
                                            ...userData,
                                            gender: text,
                                        });
                                    }}
                                >
                                    {selectedGender || userData?.gender}
                                </Text>

                                <Pressable onPress={showSelectGenderModal}>
                                    <FontAwesome
                                        name="angle-right"
                                        size={32}
                                        style={{ marginLeft: 15 }}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.label}>Ngày sinh</Text>
                            <View style={styles.row_space_between}>
                                <Text
                                    style={styles.text}
                                    onChangeText={(text) =>
                                        setUserData({
                                            ...userData,
                                            dateOfBirth: Date.parse(text),
                                        })
                                    }
                                >
                                    {selectedDateOption.replace(/\//g, "-") ||
                                        userData?.dateOfBirth
                                            ?.split("T")[0]
                                            .replace(/\//g, "-")}
                                </Text>
                                <Pressable onPress={showSelectDateModal}>
                                    <FontAwesome
                                        name="angle-right"
                                        size={32}
                                        style={{ marginLeft: 15 }}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Số điện thoại</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View
                            style={[
                                styles.rowLabelText,
                                { width: "100%", justifyContent: "flex-start" },
                            ]}
                        >
                            <Image
                                style={{
                                    height: 32,
                                    width: 32,
                                    marginRight: 10,
                                }}
                                source={flag}
                                resizeMode="contain"
                            />
                            <Text style={styles.text}>+84 </Text>
                            <TextInput
                                style={styles.text}
                                onChangeText={(text) =>
                                    setUserData({
                                        ...userData,
                                        phoneNumber: text,
                                    })
                                }
                            >
                                {userData?.phoneNumber}
                            </TextInput>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Email</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <TextInput
                                style={styles.text}
                                onChangeText={(text) =>
                                    setUserData({ ...userData, email: text })
                                }
                            >
                                {userData?.email}
                            </TextInput>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>
                            Tài khoản liên kết
                        </Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View
                            style={[
                                styles.rowLabelText,
                                {
                                    width: "100%",
                                    justifyContent: "space-between",
                                },
                            ]}
                        >
                            <View style={styles.row_space_between}>
                                <View style={styles.iconContainer}>
                                    <FontAwesome name="google" size={32} />
                                </View>
                                <Text style={styles.text}>Google</Text>
                            </View>
                            <SwitchToggle
                                onColor="#4ECB71"
                                offColor="gray"
                                labelStyle={styles.label}
                                size="medium"
                                value={isToggled}
                                onToggle={handleToggle}
                            />
                        </View>
                    </View>
                </View>

                {/* Modal */}
                <SelectGenderModal
                    visible={modalGenderVisible}
                    onClose={hideSelectGenderModal}
                    onSelectGender={handleSelectGender}
                />
                <SelectDateModal
                    visible={modalSelectDateVisible}
                    onClose={hideSelectDateModal}
                    onSelectOption={handleSelectDateOption}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
    },
    section: {
        paddingVertical: 10,
    },
    sectionTitle: {
        color: "#000",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    editButton: {
        color: "#006C5E",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 20,
        marginBottom: 15,
    },
    profileAvatar: {
        width: 150,
        height: 150,
        borderRadius: 5,
    },
    rowLabelText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        marginBottom: 10,
    },
    row_space_between: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconContainer: {
        marginRight: 10,
    },
    text: {
        color: "#000",
        fontFamily: "Lato-Regular",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 30,
    },
    label: {
        color: "black",
        fontWeight: "900",
    },
});

export default EditProfileDetails;
