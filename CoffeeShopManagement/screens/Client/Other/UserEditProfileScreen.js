import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Pressable, Image, TextInput } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchToggle from "toggle-switch-react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileDetails = () => {
    const navigation = useNavigation();

    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const [firstName] = useState("Nguyễn Quốc");
    const [lastName] = useState("Thắng");
    const [gender] = useState("Nam");
    const [birthday] = useState("13/03/2004");
    const [phone] = useState("346129897");
    const [email] = useState("22521337@gm.uit.edu.vn");

    const avatar = require("../../../assets/vietnam.png");
    const flag = require("../../../assets/vietnam.png");

    const navigateToProfileDetails = () => {
        navigation.navigate("ProfileDetails");
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <Pressable onPress={{}}>
                        <Image alt="avatar" source={avatar} style={styles.profileAvatar} />
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
                            <TextInput style={styles.text}>{firstName}</TextInput>
                        </View>
                        <View style={[styles.rowLabelText, { width: "48%" }]}>
                            <TextInput style={styles.text}>{lastName}</TextInput>
                        </View>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.label}>Giới tính</Text>
                            <View style={styles.row_space_between}>
                                <TextInput style={styles.text}>{gender}</TextInput>
                                <Pressable>
                                    <FontAwesome name="angle-right" size={32} style={{ marginLeft: 15 }} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.label}>Ngày sinh</Text>
                            <View style={styles.row_space_between}>
                                <TextInput style={styles.text}>{birthday}</TextInput>
                                <Pressable>
                                    <FontAwesome name="angle-right" size={32} style={{ marginLeft: 15 }} />
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
                        <View style={[styles.rowLabelText, { width: "100%", justifyContent: "flex-start" }]}>
                            <Image style={{ height: 32, width: 32, marginRight: 10 }} source={flag} resizeMode="contain" />
                            <Text style={styles.text}>+84 </Text>
                            <TextInput style={styles.text}>{phone}</TextInput>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Email</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <TextInput style={styles.text}>{email}</TextInput>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Tài khoản liên kết</Text>
                        <SwitchToggle
                            onColor="#4ECB71"
                            offColor="gray"
                            labelStyle={styles.label}
                            size="medium"
                            value={isToggled}
                            onToggle={handleToggle}
                        />
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={styles.row_space_between}>
                            <View style={styles.iconContainer}>
                                <FontAwesome name="google" size={32} />
                            </View>
                            <Text style={styles.text}>Google</Text>
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
        backgroundColor: "#F8F7FA",
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
        fontFamily: "Lato-Regular",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 30
    },
    label: {
        color: "black",
        fontWeight: "900",
    },
});

export default ProfileDetails;