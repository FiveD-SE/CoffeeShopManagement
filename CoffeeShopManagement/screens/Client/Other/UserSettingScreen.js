import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Pressable,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.primaryText}>Bảo mật</Text>
                    <Pressable
                        style={styles.itemContainer}
                        onPress={() => {
                            navigation.navigate("ChangePassword");
                        }}
                    >
                        <FontAwesome
                            name="lock"
                            size={24}
                            style={styles.icon}
                        />
                        <Text style={styles.itemText}>Thay đổi mật khẩu</Text>
                    </Pressable>
                </View>

                <View style={styles.section}>
                    <Text style={styles.primaryText}>Cài đặt tài khoản</Text>
                    <Pressable style={styles.itemContainer}>
                        <FontAwesome
                            name="trash"
                            size={24}
                            style={[styles.icon, { color: "#F61A3D" }]}
                        />
                        <Text style={[styles.itemText, { color: "#F61A3D" }]}>
                            Xóa tài khoản
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "#F8F7FA",
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    section: {
        marginBottom: 10,
    },
    primaryText: {
        color: "#000",
        fontFamily: "Lato-Bold",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
        marginLeft: 5,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20,
        elevation: 3,
    },
    icon: {
        marginRight: 15,
        color: "#3A3A3A",
    },
    itemText: {
        fontSize: 16,
        color: "#3A3A3A",
        fontFamily: "Lato-Regular",
    },
});

export default Setting;
