import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Text, Image } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import OrderCard from "../../../components/Admin/Card/OrderCard";

const EMPTY_ORDER = require("../../../assets/images/empty_order.png");

const ClientDetailHomeScreen = ({ route }) => {
    const { selectedUser } = route.params;
    const [userOrdersData, setUserOrdersData] = useState([]);

    useEffect(() => {
        const fetchUserOrders = async () => {
            const userOrdersCollection = collection(db, 'orders');
            const userOrdersQuery = query(userOrdersCollection, where('userId', '==', selectedUser?.userId));
            const userOrdersSnapshot = await getDocs(userOrdersQuery);
            let userOrdersListData = userOrdersSnapshot.docs.map(doc => doc.data());
            setUserOrdersData(userOrdersListData);
        }
        fetchUserOrders();
    }, []);

    const renderOrdersList = () => (
        userOrdersData.map((order, index) => (
            <OrderCard
                key={index}
                orderId={order.orderId}
                status={order.orderState}
                total={order.orderTotalPrice}
                date={order.orderDate}
            />
        ))
    )

    return (
        <View style={styles.container}>
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
            {userOrdersData.length > 0 ? (
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Lịch sử giao dịch</Text>
                        {renderOrdersList()}
                    </View>
                </ScrollView>
            ) : (
                <View style={styles.emptyOrderContainer}>
                    <Image source={EMPTY_ORDER} style={styles.emptyOrder} />
                </View>
            )}
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
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginHorizontal: 10,
        marginVertical: 10,
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
    emptyOrder: {
        width: 100,
        height: 100,
    },
    emptyOrderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ClientDetailHomeScreen;
