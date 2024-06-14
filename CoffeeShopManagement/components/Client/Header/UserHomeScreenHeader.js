import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    Platform,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";

import React from "react";
import { colors } from "../../../assets/colors/colors";

const COFFEE_BEAN_ICONS = require("../../../assets/coffee-bean.png");

const UserHomeScreenHeader = ({
    username,
    totalPoint,
    onPressBean,
    onPressNotify,
    unreadNotificationCount,
}) => {
    return (
        <View style={styles.header}>
            <View>
                <Image
                    source={require("../../../assets/fived.png")}
                    style={[styles.imageContainer, { marginRight: "5%" }]}
                />
            </View>
            <View style={styles.headerLeft}>
                <View>
                    <Text style={styles.welcomeText}>Xin chào,</Text>
                    <Text style={styles.usernameText} numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>
            <View style={styles.headerRight}>
                <Pressable
                    style={[styles.iconContainer, { paddingHorizontal: "10%" }]}
                    onPress={onPressBean}
                >
                    <Image source={COFFEE_BEAN_ICONS} style={styles.icon} />
                    <Text style={styles.iconText}>{totalPoint}</Text>
                </Pressable>
                <Pressable style={styles.iconContainer} onPress={onPressNotify}>
                    {unreadNotificationCount > 0 && <Text style={styles.notificationCount}>{unreadNotificationCount}</Text>}
                    <Icon name="bell" size={20} />
                </Pressable>
            </View>
        </View>
    );
};

export default UserHomeScreenHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginTop: Platform.select({
            android: "10%",
        }),
    },
    headerLeft: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    headerRight: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    imageContainer: {
        width: 48,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginRight: "10%",
        borderRadius: 30,
    },
    userImage: {
        width: "100%",
        height: "100%",
    },
    welcomeText: {
        color: colors.black_100,
        fontSize: 14,
        fontFamily: "lato-regular",
    },
    usernameText: {
        color: colors.black_100,
        fontSize: 16,
        fontFamily: "lato-bold",
        marginRight: "2%",
    },
    iconContainer: {
        minWidth: 50,
        minHeight: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "2%",
        padding: "6%",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: colors.grey_50,
        backgroundColor: colors.white_100,
        shadowColor: colors.grey_100,
        elevation: 4,
    },
    icon: {
        marginRight: "5%",
    },
    iconText: {
        color: colors.black_100,
        fontSize: 16,
        fontFamily: "lato-regular",
        marginLeft: "10%",
    },
    notificationCount: {
        position: 'absolute',
        right: 0,
        top: -4,
        backgroundColor: '#C80036',
        color: 'white',
        borderRadius: 10,
        width: 20,
        height: 20,
        textAlign: 'center',
        fontSize: 12,
        lineHeight: 19,
        fontWeight: 'bold',
    },
});
