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
import FeatherIcon from "react-native-vector-icons/Feather";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { useNavigation } from "@react-navigation/native";

export default function UserOtherScreen() {
    const navigation = useNavigation();

    const [form, setForm] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F8F7FA" }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={[styles.section, { paddingTop: 60 }]}>
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
                                        uri: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/431624626_122123621720198208_7192741542130469154_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JjnI9QfaC3UAb6tpASW&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfDP74--Z_uqCn8QEtONsVRUTRR2QZjaK68b9Tal5mB8Pg&oe=66229595",
                                    }}
                                    style={styles.profileAvatar}
                                />

                                <View style={styles.profileBody}>
                                    <Text style={styles.profileName}>
                                        Yua Mikami
                                    </Text>

                                    <Text style={styles.profileHandle}>
                                        yua.mikami@gmail.com
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tài khoản</Text>

                        <View style={styles.sectionBody}>
                            <View style={[styles.rowWrapper, styles.rowFirst]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("EditProfile");
                                    }}
                                    style={styles.row}
                                >
                                    <FontAwesome6
                                        color="#006C5E"
                                        name="user-large"
                                        size={19}
                                        marginRight={10}
                                    />

                                    <Text style={styles.rowLabel}>Hồ sơ</Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rowWrapper}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <FontAwesome6
                                        color="#006C5E"
                                        name="map-location"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>Địa chỉ</Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.rowWrapper, styles.rowLast]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <Ionicons
                                        color="#006C5E"
                                        name="settings"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>Cài đặt</Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tương tác</Text>

                        <View style={styles.sectionBody}>
                            <View
                                style={[
                                    styles.rowWrapper,
                                    styles.rowFirst,
                                    styles.rowLast,
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <Fontisto
                                        color="#006C5E"
                                        name="history"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>
                                        Lịch sử đơn hàng
                                    </Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Trung tâm trợ giúp
                        </Text>

                        <View style={styles.sectionBody}>
                            <View style={[styles.rowWrapper, styles.rowFirst]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <MaterialCommunityIcons
                                        color="#006C5E"
                                        name="frequently-asked-questions"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>
                                        Câu hỏi thường gặp
                                    </Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.rowWrapper, styles.rowLast]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <FontAwesome6
                                        color="#006C5E"
                                        name="headset"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>
                                        Phản hồi và hỗ trợ
                                    </Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Thông tin chung</Text>

                        <View style={styles.sectionBody}>
                            <View style={[styles.rowWrapper, styles.rowFirst]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <MaterialCommunityIcons
                                        color="#006C5E"
                                        name="shield-check"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>
                                        Chính sách
                                    </Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rowWrapper}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <MaterialCommunityIcons
                                        color="#006C5E"
                                        name="file-document"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>
                                        CT Thành viên
                                    </Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.rowWrapper, styles.rowLast]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <Ionicons
                                        color="#006C5E"
                                        name="layers"
                                        size={19}
                                        marginRight={10}
                                    />
                                    <Text style={styles.rowLabel}>
                                        Giới thiệu về phiên bản ứng dụng
                                    </Text>

                                    <View style={styles.rowSpacer} />

                                    <FeatherIcon
                                        color="#bcbcbc"
                                        name="chevron-right"
                                        size={19}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionBody}>
                            <View
                                style={[
                                    styles.button,
                                    { alignItems: "center" },
                                ]}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        // handle onPress
                                    }}
                                    style={styles.row}
                                >
                                    <Text style={styles.buttonText}>
                                        Đăng xuất
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.contentFooter}>App Version 1.0.0</Text>
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
        paddingHorizontal: 16,
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
        paddingHorizontal: 16,
    },
    contentFooter: {
        marginTop: 24,
        marginBottom: 30,
        fontSize: 13,
        fontWeight: "500",
        textAlign: "center",
        color: "#a69f9f",
    },
    /** Section */
    section: {
        paddingVertical: 15,
    },
    sectionTitle: {
        margin: 8,
        marginLeft: 12,
        fontSize: 16,
        letterSpacing: 0.33,
        fontWeight: "600",
        color: "#3A3A3A",
        textTransform: "uppercase",
        fontFamily: "Lato",
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
        padding: 12,
        backgroundColor: "#fff",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    profileAvatar: {
        width: 60,
        height: 60,
        borderRadius: 5,
        marginRight: 12,
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
        height: 44,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingRight: 12,
    },
    rowWrapper: {
        paddingLeft: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#f0f0f0",
    },
    rowFirst: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    rowLabel: {
        fontSize: 16,
        letterSpacing: 0.24,
        color: "#000",
        fontFamily: "Lato",
    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    rowLast: {
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    rowLabelLogout: {
        width: "100%",
        textAlign: "center",
        fontWeight: "600",
        color: "#dc2626",
        fontFamily: "Lato",
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
});
