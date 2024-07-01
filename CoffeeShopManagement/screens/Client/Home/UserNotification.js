import React, { useState, useEffect } from "react";
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
    where,
    onSnapshot,
} from "firebase/firestore";
import NotificationCard from "../../../components/Staff/NotificationCard";
import { db } from "../../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";

import { connect } from "react-redux";

function UserNotification({ userData }) {
    const navigation = useNavigation();
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const selectionButtons = ["Tất cả", "Chưa đọc", "Đã đọc"];

    const fetchNotifications = async () => {
        setRefreshing(true);
        try {
            const notificationCollection = collection(db, "user_notifications");
            const notificationQuery = query(
                notificationCollection,
                where("userId", "==", userData.id)
            );
            const notificationSnapshot = await getDocs(notificationQuery);
            const notificationListData = notificationSnapshot.docs.map(
                (doc) => ({
                    ...doc.data(),
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

    const getFilteredNotifications = () => {
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
    };

    const renderNotificationKinds = () =>
        selectionButtons.map((buttonTitle, index) => (
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
        ));

    const handleOnPressNotification = async (item) => {
        try {
            const notificationRef = doc(
                db,
                "user_notifications",
                item.notificationId
            );

            await updateDoc(notificationRef, { notificationStatus: true });

            const invoicesCollection = collection(db, "orders");
            const invoiceQuery = query(invoicesCollection);

            if (item.notificationType === 2) {
                const unsubscribe = onSnapshot(
                    invoiceQuery,
                    (querySnapshot) => {
                        const docs = querySnapshot.docs;
                        docs.forEach((doc) => {
                            if (doc.id === item.orderId) {
                                navigation.navigate("DetailBilling", {
                                    orderData: doc.data(),
                                });
                            }
                        });
                    }
                );

                return unsubscribe;
            }
        } catch (error) {
            console.error("Error updating notification status: ", error);
        }
    };

    const renderNotificationList = () =>
        getFilteredNotifications().map((notification, index) => (
            <NotificationCard
                key={index}
                item={notification}
                onPress={() => handleOnPressNotification(notification)}
            />
        ));

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.filter}>
                <View style={styles.filterWrapper}>
                    {renderNotificationKinds()}
                </View>
            </View>
            <View style={styles.listNotification}>
                <Text style={styles.allNotificationText}>Tất cả thông báo</Text>
                <ScrollView
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

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserNotification);

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
    },
    listNotification: {
        height: "100%",
        padding: "5%",
    },
    allNotificationText: {
        color: "black",
        fontFamily: "lato-bold",
        fontSize: 16,
    },
});
