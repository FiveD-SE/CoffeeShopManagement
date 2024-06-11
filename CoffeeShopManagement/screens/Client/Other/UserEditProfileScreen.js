import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Pressable,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
    db,
    auth,
    uploadImageToFirebase,
} from "../../../services/firebaseService";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { saveUserData } from "../../../redux/actions/userActions";
import SwitchToggle from "toggle-switch-react-native";
import * as ImagePicker from "expo-image-picker";
import { isLoading } from "expo-font";

const EditProfileDetails = ({ userData, saveUserData }) => {
    const navigation = useNavigation();

    const [userImage, setUserImage] = useState(userData?.userImage || "");
    const [isToggled, setIsToggled] = useState(false);
    const [name, setName] = useState(userData?.name || "");
    const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const avatar = require("../../../assets/vietnam.png");
    const flag = require("../../../assets/vietnam.png");
    //

    // UserEditProfileScreen.js

    const navigateToProfileDetails = async () => {
        try {
            const user = auth.currentUser;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            const downloadURL = await uploadImageToFirebase(
                userImage,
                "user_" + userData.id
            );

            if (docSnap.exists()) {
                // Update Firestore
                await updateDoc(docRef, {
                    fullName: name, // Use the state values
                    phoneNumber: phoneNumber,
                    userImage: downloadURL,
                });

                // Update Redux with ONLY the changed fields
                saveUserData({
                    ...userData,
                    name: name,
                    phoneNumber: phoneNumber,
                    userImage: downloadURL,
                });

                navigation.navigate("ProfileDetails");

                console.log("Cập nhật dữ liệu người dùng thành công");
            }
        } catch (error) {
            console.error(
                "Lỗi khi lấy hoặc cập nhật dữ liệu người dùng:",
                error
            );
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
            setUserImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={{ paddingVertical: 10, alignItems: "center" }}>
                    <View
                        style={[
                            {
                                paddingTop: 60,
                                paddingBottom: 50,
                                alignContent: "center",
                                alignItems: "center", // Add alignItems: 'center'
                            },
                        ]}
                    >
                        <TouchableOpacity onPress={() => handleImagePicker()}>
                            <Image
                                alt="avatar"
                                source={{ uri: userImage }}
                                style={styles.profileAvatar}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Thông tin chung</Text>
                        <TouchableOpacity onPress={navigateToProfileDetails}>
                            <Text style={styles.editButton}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <TextInput
                                style={styles.text}
                                onChangeText={setName} // Cập nhật state name
                                value={name} // Hiển thị giá trị hiện tại của state name
                            />
                        </View>
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
                                onChangeText={setPhoneNumber} // Cập nhật state phoneNumber
                                value={phoneNumber} // Hiển thị giá trị hiện tại của state phoneNumber
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Email</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.text}>{userData?.email}</Text>
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
            </ScrollView>
            {isLoading}
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
        fontFamily: "lato-bold",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    editButton: {
        color: "#006C5E",
        fontFamily: "lato-bold",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 20,
        marginBottom: 15,
    },
    profile: {
        backgroundColor: "#fff",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
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
        fontFamily: "lato-regular",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 30,
    },
    label: {
        color: "black",
        fontWeight: "900",
    },
});
const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData, // Get user data from the 'user' state
    };
};

const mapDispatchToProps = {
    saveUserData, // Save user data
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDetails);
