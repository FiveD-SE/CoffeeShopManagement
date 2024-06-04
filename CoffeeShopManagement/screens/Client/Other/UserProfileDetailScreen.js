import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchToggle from "toggle-switch-react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const ProfileDetails = ({ userData }) => {
    const navigation = useNavigation();
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const flag = require("../../../assets/vietnam.png");

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
                        <Image
                            alt="avatar"
                            source={{
                                uri: userData?.userImage,
                            }}
                            style={styles.profileAvatar}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Thông tin chung</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("EditProfile");
                            }}
                        >
                            <Text style={styles.editButton}>Sửa</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.text}>{userData.name}</Text>
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
                            <Text style={styles.text}>
                                {userData.phoneNumber}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Email</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.text}>{userData.email}</Text>
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
        userData: state.auth.userData,
    };
};

export default connect(mapStateToProps)(ProfileDetails);
