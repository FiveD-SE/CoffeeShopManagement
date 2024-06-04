import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { removeToken } from "../../services/authServices";
import store from "../../redux/store/store";
import { getUserData } from "../../api";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { saveUserData } from "../../redux/actions/userActions";
import { db, uploadImageToFirebase } from "../../services/firebaseService";
import { doc, updateDoc } from "firebase/firestore";

const CashierInformation = ({ userData, saveUserData }) => {


    const handleImagePicker = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
            const userImage = await uploadImageToFirebase(
                result.assets[0].uri,
                "user_" + userData.id
            );
            const updatedUserData = { ...userData, userImage: userImage };
            saveUserData(updatedUserData);
            const userDocRef = doc(db, "users", userData.id);
            await updateDoc(userDocRef, {
                userImage: userImage,
            });
        }
    };

    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.inforWrapper}>
                <TouchableOpacity
                    style={styles.imageWrapper}
                    onPress={() => handleImagePicker()}>
                    <Image source={{ uri: userData.userImage }} resizeMode="stretch" style={styles.userImage} />
                </TouchableOpacity>
                <View style={styles.inforTextWrapper}>
                    <Text style={styles.shopNameText}>TaiCoffeeShop</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                        <Text>
                            {userData.name}
                        </Text>
                        <Text> | </Text>
                        <Text style={{ fontWeight: "600" }}>{userData.role}</Text>
                    </Text>
                </View>
            </View>
            <View style={styles.bodyApp}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        marginBottom: "5%",
                    }}
                >
                    Lịch làm việc
                </Text>
                <View style={styles.calender}>
                    <Calendar />
                </View>
                <Text style={styles.dateText}>Ngày 8/3/2024</Text>
                <View style={styles.morningShiftWrapper}>
                    <Text style={styles.morningShiftText}>Ca sáng: 7h-15h</Text>
                </View>
                <View style={styles.afternoonShiftWrapper}>
                    <Text style={styles.afternoonShiftText}>
                        Ca sáng: 7h-15h
                    </Text>
                    <Text style={{ fontSize: 14 }}>
                        <Text style={{ textDecorationLine: "underline" }}>
                            Note:{" "}
                        </Text>
                        <Text>Đi sớm dọn quán, check vệ sinh ca trước</Text>
                    </Text>
                </View>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                            removeToken();
                            navigation.navigate("SignInScreen");
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
})

const mapDispatchToProps = {
    saveUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(CashierInformation);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#006c5e",
    },
    inforWrapper: {
        padding: "3%",
        flexDirection: "row",
    },
    inforTextWrapper: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginStart: "5%",
        padding: "1%",
    },
    shopNameText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    bodyApp: {
        backgroundColor: "#f8f7fa",
        padding: "4%",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        height: "100%",
        paddingBottom: "10%",
    },
    calender: {
        backgroundColor: "#fff",
        width: "100%",
        height: "50%",
        borderRadius: 10,
        marginBottom: "5%",
        padding: "3%",
    },
    dateText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: "5%",
    },
    morningShiftWrapper: {
        backgroundColor: "#eef3f1",
        borderRadius: 10,
        padding: "3%",
        marginBottom: "5%",
        borderWidth: 1,
        borderColor: "#dce0df",
    },
    morningShiftText: {
        fontSize: 16,
        fontWeight: "600",
    },
    afternoonShiftWrapper: {
        backgroundColor: "#eef3f1",
        borderRadius: 10,
        padding: "3%",
        marginBottom: "5%",
        borderWidth: 1,
        borderColor: "#dce0df",
    },
    afternoonShiftText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: "2%",
    },
    buttonWrapper: {
        backgroundColor: "#006d5d",
        borderRadius: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        padding: "3%",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
    },
    imageWrapper: {
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        marginRight: "5%",
    },
    userImage: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
        aspectRatio: 1,
    }
});
