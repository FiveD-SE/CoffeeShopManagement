import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

const NotificationCard = ({ item, onPress }) => {
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
                <Text style={styles.title}>{item.notificationTitle}</Text>
                <Text style={styles.content} numberOfLines={1}>
                    {item.notificationContent}
                </Text>
            </View>
            {item.notificationStatus ? <></> : <Ionicons name="ellipse" color="#FFC567" />}
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
    },
    content: {
        fontSize: 14,
        color: colors.text.grey_100,
    },
});

export default NotificationCard;
