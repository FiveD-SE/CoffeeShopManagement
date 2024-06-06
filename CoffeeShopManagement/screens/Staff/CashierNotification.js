import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
    Platform,
    SafeAreaView,
} from "react-native";
import NotificationCard from "../../components/Staff/NotificationCard";
import { colors } from "../../assets/colors";

const isIOS = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";

export default function CashierNotification() {
    const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);

    const selectionButtons = ["Tất cả", "Chưa đọc", "Đã đọc"];
    const DATA = [
        {
            title: "Tiêu đề",
            content: "Nội dung",
            orderId: "#12342",
            state: "Success",
            isRead: true,
        },
        {
            title: "Tiêu đề",
            content: "Nội dung",
            orderId: "#12344",
            state: "Failed",
            isRead: true,
        },
        {
            title: "Tiêu đề",
            content: "Nội dung Nội dung Nội dung Nội dungNội dung Nội dung ",
            orderId: "#123456",
            state: "None",
            isRead: false,
        },
        {
            title: "Tiêu đề",
            content: "Nội dung Nội dung Nội dung Nội dungNội dung Nội dung ",
            orderId: "#123456",
            state: "None",
            isRead: false,
        },
    ];

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
                    data={DATA}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => <NotificationCard item={item} />}
                />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.white_100,
    },
    filter: {
        padding: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    filterWrapper: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    filterDetail: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        paddingVertical: isIOS ? "4%" : "2%",
        paddingHorizontal: "6%",
        backgroundColor: colors.background.lightGrey_10,
        flex: 1,
        marginRight: 10,
    },
    filterDetailSelected: {
        backgroundColor: colors.background.black_100,
    },
    filterDetailText: {
        color: colors.text.black_100,
        fontFamily: "lato-bold",
        fontSize: 14,
    },
    filterDetailTextSelected: {
        color: colors.text.white_100,
        fontFamily: "lato-bold",
        fontSize: 14,
    },
    listNotification: {
        padding: "5%",
    },
    allNotificationText: {
        color: colors.text.black_100,
        fontFamily: "lato-bold",
        fontSize: 16,
    },
});
