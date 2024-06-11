import React, { useState, useEffect, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    Platform,
    SafeAreaView,
} from "react-native";
import { connect } from "react-redux";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import NotificationCard from "../../../components/Staff/NotificationCard";
import { db } from "../../../services/firebaseService";

function AdminNotification({ userData }) {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const selectionButtons = ["Tất cả", "Chưa đọc", "Đã đọc"];

    const fetchNotifications = useCallback(() => {
        if (userData?.id) {
            const notificationsQuery = query(
                collection(db, "notifications"),
                orderBy("notificationCreatedDate", "desc")
            );

            const unsubscribe = onSnapshot(
                notificationsQuery,
                (querySnapshot) => {
                    const notificationsData = [];
                    querySnapshot.forEach((doc) => {
                        const notificationDoc = doc.data();
                        notificationsData.push({
                            id: doc.id,
                            title: notificationDoc.notificationTitle,
                            content: notificationDoc.notificationContent,
                            state: notificationDoc.notificationStatus,
                            type: notificationDoc.notificationType,
                            products: notificationDoc.productOrders,
                            time: notificationDoc.notificationCreatedDate,
                        });
                    });
                    setNotifications(notificationsData);
                }
            );
            return () => unsubscribe();
        }
    }, [userData?.id]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const getFilteredNotifications = () => {
        switch (selectedButtonIndex) {
            case 1:
                return notifications.filter(
                    (notification) => !notification.state
                );
            case 2:
                return notifications.filter(
                    (notification) => notification.state
                );
            default:
                return notifications;
        }
    };

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
                <FlatList
                    data={getFilteredNotifications()}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <NotificationCard
                            item={item}
                            onStatusChange={fetchNotifications}
                        />
                    )}
                />
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

export default connect(mapStateToProps)(AdminNotification);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    filter: {
        padding: "5%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    filterWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
    },
    filterDetail: {
        paddingVertical: "2%",
        paddingHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingHorizontal: "6%",
        backgroundColor: '#FFFFFF',
        borderColor: '#000000',
        borderWidth: 1,
    },
    filterDetailSelected: {
        borderColor: '#006C5E',
        backgroundColor: '#006C5E'
    },
    filterDetailText: {
        color: 'black',
        fontFamily: "lato-regular",
        fontSize: 16,
    },
    filterDetailTextSelected: {
        color: 'white',
        fontFamily: "lato-bold",
        fontSize: 16,
    },
    listNotification: {
        height: "100%",
        padding: "5%",
    },
    allNotificationText: {
        color: 'black',
        fontFamily: "lato-bold",
        fontSize: 16,
    },
});