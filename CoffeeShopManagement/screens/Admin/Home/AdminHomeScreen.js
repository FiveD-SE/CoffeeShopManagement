import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Section } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

const AdminHomeScreen = () => {
    const navigation = useNavigation();

    const goToRevenueScreen = () => {
        navigation.navigate("Revenue");
    };

    const goToNotificationScreen = () => {
        navigation.navigate("Notification");
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <TouchableOpacity
                    onPress={() => {
                        // handle onPress
                    }} style={styles.profile} >
                    <Image
                        alt="avatar"
                        source={{
                            uri: "https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/431624626_122123621720198208_7192741542130469154_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=JjnI9QfaC3UAb6tpASW&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfDP74--Z_uqCn8QEtONsVRUTRR2QZjaK68b9Tal5mB8Pg&oe=66229595",
                        }} style={styles.profileAvatar} >
                    </Image>
                    <View style={styles.profileBody}>
                        <Text style={styles.profileRole}>
                            Admin
                        </Text>
                        <Text style={styles.profileName}>
                            Truong Le Vinh Phuc
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.iconContainer} onPress={goToNotificationScreen}>
                        <Icon name="bell" size={20} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <View style={styles.peopleDataContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }} style={[styles.dataContainer, { marginLeft: "3%", marginRight: "2%" }]} >
                        <View>
                            <View style={styles.dataHeader}>
                                <Text style={styles.dataTitle}>
                                    NHÂN VIÊN
                                </Text>
                                <Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
                            </View>

                            <View style={[styles.data, { padding: "7%" }]}>
                                <View style={[styles.iconComponentContainer, {
                                    alignSelf: "flex-start",
                                    padding: "13%",
                                    backgroundColor: "#F0F5FF",
                                }]}>
                                    <MaterialIcons name="work" size={30} color="#699BF7" />
                                </View>
                                <Text style={[styles.dataNumber, { marginTop: "5%", }]}>
                                    69
                                </Text>
                                <Text style={[styles.dataName, { marginTop: "3%", }]}>
                                    Tổng nhân viên
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            // handle onPress
                        }} style={[styles.dataContainer, { marginLeft: "2%", marginRight: "3%" }]} >
                        <View>
                            <View style={styles.dataHeader}>
                                <Text style={styles.dataTitle}>
                                    KHÁCH HÀNG
                                </Text>
                                <Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
                            </View>

                            <View style={[styles.data, { padding: "7%" }]}>
                                <View style={[styles.iconComponentContainer, {
                                    alignSelf: "flex-start",
                                    padding: "13%",
                                    backgroundColor: "#EEFAF1",
                                }]}>
                                    <Ionicons name="people" size={30} color="#4ECB71" />
                                </View>
                                <Text style={[styles.dataNumber, { marginTop: "5%", }]}>
                                    333
                                </Text>
                                <Text style={[styles.dataName, { marginTop: "3%", }]}>
                                    Tổng khách hàng
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={goToRevenueScreen} style={[styles.dataContainer, { margin: "3%" }]} >
                    <View style={styles.dataHeader}>
                        <Text style={styles.dataTitle}>
                            DOANH THU
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
                    </View>

                    <View style={[styles.data, { flex: 1, justifyContent: "center", alignItems: "center", padding: "3%" }]}>
                        <View style={[styles.iconComponentContainer, {
                            padding: "6%",
                            backgroundColor: "#FFFAE6",
                        }]}>
                            <Icon name="money-bills" size={30} color="#FFC700" />
                        </View>
                        <Text style={[styles.dataNumber, { marginTop: "3%", }]}>
                            100.000.000
                        </Text>
                        <Text style={[styles.dataName, { marginTop: "1%", }]}>
                            Tổng doanh thu
                        </Text>
                    </View>

                    <View style={[styles.data, { flex: 1, justifyContent: "center", alignItems: "center", padding: "3%", marginTop: "3%" }]}>
                        <View style={[styles.iconComponentContainer, {
                            padding: "6%",
                            backgroundColor: "#FFEACC",
                        }]}>
                            <FontAwesome name="line-chart" size={30} color="#FF9800" />
                        </View>
                        <Text style={[styles.dataNumber, { marginTop: "3%", }]}>
                            33.300.000
                        </Text>
                        <Text style={[styles.dataName, { marginTop: "1%", }]}>
                            Tăng trưởng
                        </Text>
                    </View>
                </TouchableOpacity>
            </View >
        </ScrollView >
    )
}

export default AdminHomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    section: {
        marginTop: "14%",
        marginBottom: "5%",
        marginHorizontal: "3%"
    },

    profile: {
        padding: "3%",
        backgroundColor: "#fff",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    profileAvatar: {
        width: "15%",
        height: "100%",
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
    },

    profileRole: {
        fontSize: 16,
        fontWeight: "400",
        color: "#858585",
    },

    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#CCCCCC",
    },

    body: {
        flex: 1,
        flexDirection: "column",
    },

    iconComponentContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 60,
    },

    peopleDataContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },

    dataContainer: {
        flex: 1,
        padding: "3%",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        flexDirection: "column",
    },

    dataHeader: {
        flexDirection: "row",
        flexWrap: "wrap"
    },

    dataTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: "#3A3A3A",
        marginRight: "auto"
    },

    data: {
        marginTop: "2%",
        flexDirection: "column",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CCCCCC",
    },

    dataNumber: {
        fontSize: 26,
        fontWeight: "600",
        color: "#3A3A3A",
    },

    dataName: {
        fontSize: 16,
        fontWeight: "500",
        color: "#3A3A3A",
    },

})