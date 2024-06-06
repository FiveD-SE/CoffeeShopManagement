import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import React from "react";
import { colors } from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

const isIOS = Platform.OS === "ios";

const NotificationCard = ({ item }) => {
    const onPress = () => {};

    switch (item.state) {
        case "Success":
            icon = require("../../assets/account_icon.png");
            background = "rgba(114, 255, 148, 0.3)";
            break;
        case "Failed":
            icon = require("../../assets/account_icon.png");
            background = "#f8e0e3";
            break;
        default:
            icon = require("../../assets/account_icon.png");
            background = "#d6d6d6";
            break;
    }
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                {
                    backgroundColor: item.isRead
                        ? colors.background.white_100
                        : colors.background.lightGrey_10,
                },
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.content} numberOfLines={1}>
                    {item.content}
                </Text>
            </View>
            {item.isRead ? <></> : <Ionicons name="ellipse" color="#FFC567" />}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: colors.background.black_20,
        alignItems: "center",
        borderRadius: 10,
        marginVertical: "2%",
        padding: isIOS ? "4%" : "2%",
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
        marginRight: "10%",
        marginLeft: "2%",
    },
    title: {
        fontSize: 16,
        fontFamily: "lato-bold",
        color: colors.text.black_100,
        marginBottom: isIOS ? "4%" : "2%",
    },
    content: {
        fontSize: 14,
        color: colors.text.grey_100,
    },
});

export default NotificationCard;
