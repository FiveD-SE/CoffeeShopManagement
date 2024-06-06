import React, { useState } from "react";
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

export default function AddNewAddress() {
    const navigation = useNavigation();

    const [isToggled, setIsToggled] = useState(false);
    const [addressType, setAddressType] = useState(null);

    const handleToggle = () => {
        setIsToggled((isToggled) => !isToggled);
    };

    const handleAddressType = (type) => {
        setAddressType(type);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Địa chỉ</Text>
                    <View style={styles.label}>
                        <View style={styles.rowLabelText}>
                            <TextInput
                                style={styles.input}
                                placeholder="Địa chỉ"
                            />
                            <Pressable
                                onPress={() =>
                                    navigation.navigate("SelectBranch")
                                }
                            >
                                <FontAwesome
                                    name="angle-right"
                                    size={30}
                                    style={styles.navIcon}
                                />
                            </Pressable>
                        </View>
                        <TextInput
                            style={styles.labelInput}
                            placeholder="Chi nhánh"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Cài đặt</Text>
                    <View style={styles.label}>
                        <View style={styles.row}>
                            <Text style={styles.rowText}>Loại địa chỉ:</Text>
                            <View style={styles.kindContainer}>
                                <Pressable
                                    style={[
                                        styles.kind,
                                        addressType === "home"
                                            ? styles.selectedKind
                                            : null,
                                    ]}
                                    onPress={() => handleAddressType("home")}
                                >
                                    <Text
                                        style={[
                                            styles.kindText,
                                            addressType === "home"
                                                ? styles.selectedKindText
                                                : null,
                                        ]}
                                    >
                                        Nhà riêng
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[
                                        styles.kind,
                                        addressType === "office"
                                            ? styles.selectedKind
                                            : null,
                                    ]}
                                    onPress={() => handleAddressType("office")}
                                >
                                    <Text
                                        style={[
                                            styles.kindText,
                                            addressType === "office"
                                                ? styles.selectedKindText
                                                : null,
                                        ]}
                                    >
                                        Văn phòng
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.row}>
                            <Text style={styles.rowText}>
                                Đặt làm địa chỉ mặc định
                            </Text>
                            <SwitchToggle
                                onColor="#4ECB71"
                                offColor="#CCCCCC"
                                labelStyle={styles.toggleLabel}
                                size="medium"
                                value={isToggled}
                                onToggle={handleToggle}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Liên hệ</Text>
                    <View style={styles.label}>
                        <TextInput
                            style={styles.labelInput}
                            placeholder="Họ và tên"
                        />
                        <TextInput
                            style={styles.labelInput}
                            placeholder="Số điện thoại"
                        />
                    </View>
                </View>

                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Hoàn thành</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#3A3A3A",
        fontFamily: "Lato-Bold",
    },
    rowText: {
        fontSize: 16,
        color: "#000",
        lineHeight: 18,
        fontFamily: "Lato-Regular",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    kindContainer: {
        flexDirection: "row",
        gap: 10,
    },
    kind: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        backgroundColor: "#FFFFFF",
    },
    selectedKind: {
        backgroundColor: "#FFA730",
    },
    kindText: {
        color: "#3A3A3A",
        fontFamily: "Lato-Regular",
    },
    selectedKindText: {
        color: "#FFF",
    },
    labelInput: {
        height: 50,
        paddingHorizontal: 15,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 10,
    },
    input: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
    },
    button: {
        marginVertical: 20,
        backgroundColor: "#FFA730",
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontFamily: "Lato-Bold",
        fontSize: 18,
    },
    divider: {
        width: "100%",
        borderWidth: 0.5,
        marginVertical: 5,
        borderColor: "#CCCCCC",
    },
    toggleLabel: {
        color: "#3A3A3A",
        fontFamily: "Lato-Regular",
        fontSize: 15,
    },
    label: {
        width: "100%",
        backgroundColor: "#FFF",
        borderColor: "#CCCCCC",
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        gap: 15,
    },
    rowLabelText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#CCCCCC",
        borderRadius: 10,
    },
    navIcon: {
        color: "#CCCCCC",
        marginRight: 15,
    },
});
