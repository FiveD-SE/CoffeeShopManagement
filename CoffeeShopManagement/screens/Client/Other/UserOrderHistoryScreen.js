import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderHistory = ({ userData }) => {
    const navigation = useNavigation();
    const [orderHistoryData, setOrderHistoryData] = useState([]);

    useEffect(() => {
        const fetchOrdersData = async () => {
            const ordersCollection = collection(db, 'orders');
            const orderSnapshot = await getDocs(query(ordersCollection, where("userId", "==", userData.id)));
            const orderListData = orderSnapshot.docs.map(doc => doc.data());

            invoicesListData.sort((a, b) => {
                const dateA = new Date(a.orderDate.seconds * 1000);
                const dateB = new Date(b.orderDate.seconds * 1000);
                return dateB - dateA;
            });

            setOrderHistoryData(orderListData);
        }
        fetchOrdersData();
    }, [userData.id]);

    const handleGoToDetail = (orderData) => {
        navigation.navigate("DetailBilling", { orderData });
    };

    const setOrderStatus = (status) => {
        switch (status) {
            case 1:
                return "Đang giao";
            case 2:
                return "Đã hoàn thành";
            case 3:
                return "Đã hủy";
            default:
                return "";
        }
    };

    const setOrderStatusIcon = (status) => {
        switch (status) {
            case 1:
                return "shipping-fast";
            case 2:
                return "check-circle";
            case 3:
                return "times-circle";
            default:
                return "";
        }
    };

    const getStatusColors = (status) => {
        switch (status) {
            case 1:
                return { backgroundColor: '#C3E2C2', textColor: '#527853' };
            case 2:
                return { backgroundColor: '#F9E8D9', textColor: '#EE7214' };
            case 3:
                return { backgroundColor: '#FFCAC2', textColor: '#C81912' };
            default:
                return {};
        }
    };

    const formatCurrency = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const renderItem = () => (
        orderHistoryData.map(item => {
            const date = new Date(item.orderDate.seconds * 1000).toLocaleDateString("en-US");
            const { backgroundColor, textColor } = getStatusColors(item.orderState);
            return (
                <Pressable style={styles.labelItem} key={item.orderId} onPress={() => handleGoToDetail(item)}>
                    <View style={styles.row}>
                        <Text style={styles.itemId}>#{item.orderId.substring(0, 6).toUpperCase()}</Text>
                        <View style={[styles.labelStatus, { backgroundColor }]}>
                            <FontAwesome5 name={setOrderStatusIcon(item.orderState)} size={20} color={textColor} />
                            <Text style={[styles.itemStatus, { color: textColor }]}>  {setOrderStatus(item.orderState)}</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.itemDate}>{date}</Text>
                        <View style={styles.priceContainer}>
                            <Text style={styles.itemPrice}>{formatCurrency(Number(item.orderTotalPrice))}</Text>
                            <Text style={styles.currency}> VNĐ</Text>
                        </View>
                    </View>
                </Pressable>
            );
        })
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {renderItem()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    labelItem: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#B3A398",
        borderRadius: 10,
        marginBottom: 10,
        gap: 20,
    },
    row: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between"
    },
    itemId: {
        color: "#151515",
        fontFamily: "lato-bold",
        fontSize: 18,
        textAlignVertical: "bottom",
    },
    itemDate: {
        color: "#A3A3A3",
        fontFamily: "lato-bold",
        fontSize: 18,
    },
    itemPrice: {
        color: "#151515",
        fontFamily: "lato-bold",
        fontSize: 25,
        lineHeight: 25,
        textAlignVertical: "bottom",
    },
    currency: {
        color: "#A3A3A3",
        fontFamily: "lato-bold",
        fontSize: 16,
        lineHeight: 18,
        textAlignVertical: "bottom",
    },
    itemStatus: {
        fontFamily: "lato-bold",
        alignSelf: "center",
        fontSize: 16,
    },
    labelStatus: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
    },
    priceContainer: {
        flexDirection: 'row',
    },
});

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

export default connect(mapStateToProps)(OrderHistory);
