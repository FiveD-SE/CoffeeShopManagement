import React, { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    Pressable,
    Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchToggle from "toggle-switch-react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProfileDetails() {
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

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7FA" }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View
                        style={[
                            styles.section,
                            {
                                paddingTop: 20,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingBottom: 50,
                            },
                        ]}
                    >
                        <View style={styles.sectionBody}>
                            <Pressable
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.profile}
                            >
                                <Image
                                    alt="avatar"
                                    source={avatar}
                                    style={styles.profileAvatar}
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.row_space_between}>
                            <Text style={styles.sectionTitle}>
                                Thông tin chung
                            </Text>
                            <Pressable onPress={() => navigation.navigate("EditProfile")}>
                                <Text
                                    style={{
                                        color: "#006C5E",
                                        fontFamily: "Lato-Bold",
                                        fontSize: 16,
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        lineHeight: 20,
                                        marginBottom: 15,
                                    }}
                                >
                                    Sửa
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.row_space_between}>
                            <View
                                style={[styles.rowLabelText, { width: "48%" }]}
                            >
                                <Text style={styles.text}>{firstName}</Text>
                            </View>
                            <View
                                style={[styles.rowLabelText, { width: "48%" }]}
                            >
                                <Text style={styles.text}>{lastName}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.rowLabelText,
                                    {
                                        width: "100%",
                                        justifyContent: "space-between",
                                    },
                                ]}
                            >
                                <Text style={styles.text}>Giới tính</Text>
                                <View style={styles.row_space_between}>
                                    <Text style={styles.text}>{gender}</Text>
                                    <Pressable>
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
                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.rowLabelText,
                                    {
                                        width: "100%",
                                        justifyContent: "space-between",
                                    },
                                ]}
                            >
                                <Text style={styles.text}>Ngày sinh</Text>
                                <View style={styles.row_space_between}>
                                    <Text style={styles.text}>{birthday}</Text>
                                    <Pressable>
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
                        <Text style={styles.sectionTitle}>Số điện thoại</Text>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.rowLabelText,
                                    { width: "100%", gap: 10 },
                                ]}
                            >
                                <Image
                                    style={{ height: 32, width: 32 }}
                                    source={flag}
                                    resizeMode="contain"
                                />
                                <Text style={styles.text}>+84</Text>
                                <Text style={styles.text}>{phone}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Email</Text>

                        <View style={styles.row}>
                            <View
                                style={[styles.rowLabelText, { width: "100%" }]}
                            >
                                <Text style={styles.text}>{email}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Tài khoản liên kết
                        </Text>

                        <View style={styles.row_space_between}>
                            <View style={styles.row_space_between}>
                                <View style={styles.iconContainer}>
                                    <FontAwesome name="google" size={32} />
                                </View>
                                <Text style={styles.text}>Google</Text>
                            </View>
                            <SwitchToggle
                                onColor="#4ECB71"
                                offColor="gray"
                                labelStyle={{
                                    color: "black",
                                    fontWeight: "900",
                                }}
                                size="medium"
                                value={isToggled}
                                onToggle={handleToggle}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
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
        fontStyle: "normal",
        fontWeight: "bold",
        lineHeight: 20,
        marginBottom: 15,
    },
    sectionBody: {
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
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
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 10,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        textAlign: 'center'
    },
    row_space_between: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconContainer: {
        marginRight: 10,
    },
    text: {
        color: "#000",
        width: "auto",
        height: "100%",
        fontFamily: "Lato-Regular",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
    },
});
