import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

const NotificationCard = ({ item, onPress }) => {
    const date = new Date(item.notificationCreatedDate.seconds * 1000);
    const formattedDate = date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                {
                    backgroundColor: item.notificationStatus
                        ? colors.background.white_100
                        : colors.background.lightGrey_10,
                },
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                    {item.notificationTitle}
                </Text>
                <Text style={styles.content} numberOfLines={2}>
                    {item.notificationContent}
                </Text>

                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            {item.notificationStatus ? (
                <></>
            ) : (
                <Ionicons name="ellipse" color="#FFC567" style={styles.icon} />
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.background.black_20,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        paddingHorizontal: "2%",
        paddingVertical: "2%",
        marginVertical: "2%",
    },
    textContainer: {
        width: "85%",
        flexDirection: "column",
        marginLeft: "2%",
    },
    title: {
        fontSize: 18,
        fontFamily: "lato-bold",
        color: colors.text.black_100,
    },
    content: {
        fontSize: 16,
        color: colors.text.grey_100,
    },
    date: {
        fontSize: 14,
        color: colors.text.grey_100,
        marginTop: 5,
    },
    icon: {
        alignSelf: "center",
        justifyContent: "right",
    },
});

export default NotificationCard;
