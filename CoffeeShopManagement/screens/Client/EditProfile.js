import React, { useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SwitchToggle from "toggle-switch-react-native";

export default function EditProfile() {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const [firstName, onChangeFirstName] = React.useState("");
    const [lastName, onChangeLastName] = React.useState("");
    const [gender, onChangeGender] = React.useState("");
    const [birthday, onChangeBirthday] = React.useState("");
    const [phone, onChangePhone] = React.useState("346129897");
    const [email, onChangeEmail] = React.useState("22521337@gm.uit.edu.vn");
    const [day, getDay] = React.useState("01/01/2024");

    const avatar = "";
    const flag = require("../../assets/vietnam.png");
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7FA" }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View
                        style={[
                            styles.section,
                            {
                                paddingTop: 60,
                                alignItems: "center",
                                justifyContent: "center",
                                paddingBottom: 50,
                            },
                        ]}
                    >
                        <View style={styles.sectionBody}>
                            <TouchableOpacity
                                onPress={() => {
                                    // handle onPress
                                }}
                                style={styles.profile}
                            >
                                <Image
                                    alt="avatar"
                                    source={{
                                        uri: avatar,
                                    }}
                                    style={styles.profileAvatar}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.row_space_between}>
                            <Text style={styles.sectionTitle}>
                                Thông tin chung
                            </Text>
                            <TouchableOpacity>
                                <Text
                                    style={{
                                        color: "#006C5E",
                                        fontFamily: "Lato",
                                        fontSize: 16,
                                        fontStyle: "normal",
                                        fontWeight: "bold",
                                        lineHeight: 20,
                                        marginBottom: 15,
                                    }}
                                >
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[styles.rowLabelText, { width: "48%" }]}
                            >
                                <TextInput
                                    style={styles.text}
                                    onChangeText={onChangeFirstName}
                                    value={firstName}
                                    placeholder="Họ"
                                    keyboardType="text"
                                />
                            </View>
                            <View
                                style={[styles.rowLabelText, { width: "48%" }]}
                            >
                                <TextInput
                                    style={styles.text}
                                    onChangeText={onChangeLastName}
                                    value={lastName}
                                    placeholder="Tên"
                                    keyboardType="text"
                                />
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
                                    <TextInput
                                        style={styles.text}
                                        onChangeText={onChangeGender}
                                        value={gender}
                                        placeholder="Khác"
                                        keyboardType="text"
                                    />
                                    <TouchableOpacity>
                                        <FontAwesome
                                            name="angle-right"
                                            size={32}
                                            style={{ marginLeft: 15 }}
                                        />
                                    </TouchableOpacity>
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
                                    <TextInput
                                        style={styles.text}
                                        onChangeText={onChangeBirthday}
                                        value={birthday}
                                        placeholder={day}
                                        keyboardType="text"
                                    />
                                    <TouchableOpacity>
                                        <FontAwesome
                                            name="angle-right"
                                            size={32}
                                            style={{ marginLeft: 15 }}
                                        />
                                    </TouchableOpacity>
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
                                <TextInput
                                    style={styles.text}
                                    onChangeText={onChangePhone}
                                    value={phone}
                                    placeholder=""
                                    keyboardType="text"
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Email</Text>

                        <View style={styles.row}>
                            <View
                                style={[styles.rowLabelText, { width: "100%" }]}
                            >
                                <TextInput
                                    style={styles.text}
                                    onChangeText={onChangeEmail}
                                    value={email}
                                    placeholder="Email"
                                    keyboardType="text"
                                />
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
    /** Header */
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    headerAction: {
        width: 40,
        height: 40,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: "600",
        color: "#000",
    },
    /** Content */
    content: {
        paddingHorizontal: 20,
    },
    /** Section */
    section: {
        paddingVertical: 10,
    },
    sectionTitle: {
        color: "#000",
        fontFamily: "Lato",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "bold", // Use 'bold' for fontWeight: 600 in React Native
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
    /** Profile */
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
    profileBody: {
        marginRight: "auto",
    },
    profileName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#292929",
        fontFamily: "Lato",
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "400",
        color: "#858585",
        fontFamily: "Lato",
    },
    /** Row */
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
    },
    row_space_between: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    /** button */
    button: {
        height: 50,
        width: "100%",
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#006C5E",
        borderWidth: 1,
        borderRadius: 10,
    },

    buttonText: {
        width: "100%",
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
        textAlign: "center",
        fontFamily: "Lato",
        fontStyle: "normal",
    },

    iconContainer: {
        marginRight: 10,
    },

    text: {
        color: "#000",
        width: "auto",
        height: "100%",
        fontFamily: "Lato",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "400",
    },
});
