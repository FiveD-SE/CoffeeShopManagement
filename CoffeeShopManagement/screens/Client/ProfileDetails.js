import React, { useState } from "react";
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

const ProfileDetails = ({ userData }) => {
    const navigtion = useNavigation();
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const flag = require("../../assets/vietnam.png");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7FA" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <View
                        style={[
                            styles.row_space_between,
                            { paddingTop: 60, paddingBottom: 50 },
                        ]}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                // handle onPress
                            }}
                            style={styles.profile}
                        >
                            <Image
                                alt="avatar"
                                source={{
                                    uri: userData.avatar,
                                }}
                                style={styles.profileAvatar}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Thông tin chung</Text>
                        <TouchableOpacity
                            onPress={() => {
                                navigtion.navigate("EditProfile");
                            }}
                        >
                            <Text style={styles.editText}>Sửa</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.rowLabelText, { width: "48%" }]}>
                            <Text style={styles.text}>Nguyen Quoc</Text>
                        </View>
                        <View style={[styles.rowLabelText, { width: "48%" }]}>
                            <Text style={styles.text}>Thang</Text>
                        </View>
                    </View>

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
                            <Text style={styles.text}>346129897</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Giới tính</Text>
                    <View style={styles.row}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.text}>Nam</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ngày sinh</Text>
                    <View style={styles.row}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.text}>01/01/2024</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Email</Text>
                    <View style={styles.row}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.text}>
                                22521337@gm.uit.edu.vn
                            </Text>
                        </View>
                    </View>
                </View>

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
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="medium"
                        value={isToggled}
                        onToggle={handleToggle}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    section: {
        paddingVertical: 10,
    },
    sectionTitle: {
        color: "#000",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 20,
        marginBottom: 15,
    },
    row_space_between: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 10,
        paddingLeft: 10,
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    editText: {
        color: "#006C5E",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    iconContainer: {
        marginRight: 10,
    },
    text: {
        color: "#000",
        fontFamily: "Lato-Regular",
        fontSize: 16,
        fontWeight: "400",
    },
});

const mapStateToProps = (state) => {
    return {
        userData: state.auth.userData,
    };
};

export default connect(mapStateToProps)(ProfileDetails);
