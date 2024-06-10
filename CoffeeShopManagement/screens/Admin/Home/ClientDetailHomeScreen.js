import React from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";

const ClientDetailHomeScreen = ({ route }) => {
    const { selectedUser } = route.params;

    const DATA = [
        {
            id: 'FIVED-0001',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: 'FIVED-0002',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: 'FIVED-0003',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
    ]

    const renderOrdersList = () => (
        DATA.map((item) => (
            <View style={styles.labelItem}>
                <View style={styles.row}>
                    <Text style={styles.itemId}>{item.id}</Text>
                    <Text style={styles.itemDate}>{item.date}</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.labelStatus}>
                        <Text style={styles.itemStatus}>{item.state}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.itemPrice}>{item.price}</Text>
                        <Text style={styles.currency}> VNĐ</Text>
                    </View>
                </View>
            </View>
        ))
    )

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.profile}>
                    <Image
                        alt="avatar"
                        source={{ uri: selectedUser?.userImage }}
                        style={styles.profileAvatar}
                    />

                    <View style={styles.profileBody}>
                        <Text style={styles.profileName}>
                            {selectedUser?.fullName}
                        </Text>

                        <Text style={styles.profileHandle}>
                            {selectedUser?.email}
                        </Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Lịch sử giao dịch</Text>
                    {renderOrdersList()}
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
        fontFamily: "lato-bold",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    profile: {
        marginTop: 15,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
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
        fontFamily: "lato-bold",
    },
    profileHandle: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: "400",
        color: "#858585",
        fontFamily: "lato-regular",
    },
    labelItem: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        marginBottom: 10,
        gap: 20,
    },
    row: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between"
    },
    itemStatus: {
        color: "#4ECB71",
        fontFamily: "lato-bold",
        alignSelf: "center",
        fontSize: 16,
    },
    labelStatus: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "#E3FFEA",
    },
    itemId: {
        color: "#000000",
        fontFamily: "lato-bold",
        fontSize: 20,
        lineHeight: 22,
    },
    itemDate: {
        color: "#CBCBD4",
        fontFamily: "lato-regular",
        fontSize: 16,
        lineHeight: 20,
    },
    itemPrice: {
        color: "#000000",
        fontFamily: "lato-bold",
        fontSize: 25,
        lineHeight: 25,
        textAlignVertical: "bottom",
    },
    currency: {
        color: "#CBCBD4",
        fontFamily: "lato-bold",
        fontSize: 16,
        lineHeight: 18,
        textAlignVertical: "bottom",
    },
});

export default ClientDetailHomeScreen;
