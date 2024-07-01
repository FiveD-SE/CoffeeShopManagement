import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    SafeAreaView,
    RefreshControl,
} from "react-native";
import {
    collection,
    query,
    getDocs,
    doc,
    updateDoc,
    onSnapshot,
    where,
    orderBy,
} from "firebase/firestore";
import NotificationCard from "../../../components/Staff/NotificationCard";
import { db } from "../../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";

function AdminNotification() {
    const navigation = useNavigation();
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const selectionButtons = ["Tất cả", "Chưa đọc", "Đã đọc"];

    const fetchNotifications = async () => {
        setRefreshing(true);
        try {
            const notificationCollection = collection(db, "admin_notifications");
            const notificationQuery = query(
                notificationCollection,
                orderBy("notificationCreatedDate", "desc")
            );
            const notificationSnapshot = await getDocs(notificationQuery);
            const notificationListData = notificationSnapshot.docs.map(
                (doc) => ({
                    ...doc.data(),
                    id: doc.id,
                })
            );
            setNotifications(notificationListData);
        } catch (error) {
            console.error("Error fetching notifications: ", error);
        }
        setRefreshing(false);
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const getFilteredNotifications = useCallback(() => {
        let filteredNotifications;
        switch (selectedButtonIndex) {
            case 1:
                filteredNotifications = notifications.filter(
                    (notification) => !notification.notificationStatus
                );
                break;
            case 2:
                filteredNotifications = notifications.filter(
                    (notification) => notification.notificationStatus
                );
                break;
            default:
                filteredNotifications = notifications;
        }
        return filteredNotifications.sort((a, b) => b.createdAt - a.createdAt);
    }, [selectedButtonIndex, notifications]);

    const handleOnPressNotification = async (item) => {
        try {
            const notificationRef = doc(
                db,
                "admin_notifications",
                item.notificationId
            );
            await updateDoc(notificationRef, { notificationStatus: true });

            if (item.notificationType === 2) {
                const ordersCollection = collection(db, "orders");
                const orderQuery = query(
                    ordersCollection,
                    where("orderId", "==", item.orderId)
                );

                const unsubscribe = onSnapshot(orderQuery, (querySnapshot) => {
                    const orderData = querySnapshot.docs.map((doc) =>
                        doc.data()
                    );
                    if (orderData.length) {
                        navigation.navigate("DetailBillingScreen", {
                            orderData: orderData[0],
                        });
                    }
                });

                return () => unsubscribe();
            }
        } catch (error) {
            console.error("Error updating notification status: ", error);
        }
    };

    const renderNotificationList = useCallback(
        () =>
            getFilteredNotifications().map((notification, index) => (
                <NotificationCard
                    key={index}
                    item={notification}
                    onPress={() => handleOnPressNotification(notification)}
                />
            )),
        [getFilteredNotifications]
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filter}>
                <View style={styles.filterWrapper}>
                    {selectionButtons.map((buttonTitle, index) => (
                        <Pressable
                            key={index}
                            style={[
                                styles.filterDetail,
                                selectedButtonIndex === index &&
                                    styles.filterDetailSelected,
                            ]}
                            onPress={() => setSelectedButtonIndex(index)}
                        >
                            <Text
                                style={[
                                    styles.filterDetailText,
                                    selectedButtonIndex === index &&
                                        styles.filterDetailTextSelected,
                                ]}
                            >
                                {buttonTitle}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View style={styles.listNotification}>
                <Text style={styles.allNotificationText}>Tất cả thông báo</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={fetchNotifications}
                        />
                    }
                >
                    {renderNotificationList()}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

export default AdminNotification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FA",
    },
    filter: {
        padding: "5%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    filterWrapper: {
        flexDirection: "row",
        width: "100%",
        gap: 10,
    },
    filterDetail: {
        flex: 1,
        paddingVertical: "2%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: "#FFFFFF",
    },
    filterDetailSelected: {
        backgroundColor: "#006C5E",
    },
    filterDetailText: {
        color: "#9D9D9D",
        fontFamily: "lato-regular",
        fontSize: 16,
    },
    filterDetailTextSelected: {
        color: "white",
        fontFamily: "lato-bold",
        fontSize: 16,
    },
    listNotification: {
        height: "91%",
        padding: "5%",
    },
    allNotificationText: {
        color: "black",
        fontFamily: "lato-bold",
        fontSize: 16,
    },
});
