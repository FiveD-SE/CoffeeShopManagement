import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import DeliveredOrderItem from "../../../components/Client/Card/DeliveredOrderItem";
import { useNavigation } from "@react-navigation/native";

const UserOrderScreen = () => {
    const navigation = useNavigation();
    const deliveredOrderList = [
        { orderId: "#12345", status: "Đang giao", total: 100000 },
        { orderId: "#67890", status: "Đang giao", total: 200000 },
        { orderId: "#24680", status: "Đã giao", total: 150000 },
        { orderId: "#13579", status: "Đã giao", total: 220000 },
        { orderId: "#98765", status: "Đã huỷ", total: 180000 },
        { orderId: "#11223", status: "Đã giao", total: 130000 },
        { orderId: "#33445", status: "Đã giao", total: 250000 },
        { orderId: "#55667", status: "Đã giao", total: 170000 },
        { orderId: "#77889", status: "Đã giao", total: 190000 },
        { orderId: "#99001", status: "Đã giao", total: 210000 },
    ];

    const handleOpenOrderDetail = () => {
        navigation.navigate("UserOrderInformationScreen");
    };
    const renderDeliveredOrderList = ({ item }) => (
        <DeliveredOrderItem
            orderId={item.orderId}
            status={item.status}
            total={item.total}
            onPress={handleOpenOrderDetail}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={deliveredOrderList}
                renderItem={renderDeliveredOrderList}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: "5%",
    },
    orderContainer: {
        backgroundColor: "#FFFFFF",
        padding: "5%",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    orderDetails: {
        flex: 1,
    },
    orderId: {
        flexDirection: "row",
        alignItems: "center",
    },
    orderIdText: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
    },
    orderIdValue: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
        marginLeft: "2%",
    },
    orderStatus: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
    },
    orderStatusText: {
        color: "#3a3a3a",
        fontSize: 12,
        fontWeight: "600",
    },
    statusIndicator: {
        backgroundColor: "rgba(255, 167, 48, 0.10)",
        paddingVertical: "1%",
        paddingHorizontal: "4%",
        marginLeft: "2%",
        borderRadius: 30,
    },
    statusText: {
        color: "#FFA730",
        fontSize: 12,
        fontWeight: "500",
    },
    orderTotal: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: "5%",
    },
    orderTotalText: {
        color: "#3a3a3a",
        fontSize: 12,
        fontWeight: "600",
    },
    orderTotalValue: {
        color: "#3a3a3a",
        fontSize: 12,
        fontWeight: "400",
        marginLeft: "5%",
    },
});

export default UserOrderScreen;
