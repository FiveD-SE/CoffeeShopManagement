import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    FlatList,
    Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const LOGO = require("../../../assets/splashScreenImage/Logowithbrandname.jpg");

const membershipBenefits = [
    {
        icon: "account-check-outline",
        title: "Đăng Ký và Tích Điểm",
        description:
            "Đăng ký tài khoản và bắt đầu tích điểm ngay lập tức với mỗi giao dịch.",
    },
    {
        icon: "sale",
        title: "Ưu Đãi Đặc Biệt",
        description:
            "Nhận ưu đãi đặc biệt và giảm giá cho thành viên trong các sự kiện đặc biệt.",
    },
    {
        icon: "gift-outline",
        title: "Quà Tặng Độc Quyền",
        description:
            "Thành viên sẽ có cơ hội nhận quà tặng độc quyền trong các dịp đặc biệt.",
    },
];

const BenefitItem = ({ item }) => {
    const scaleValue = new Animated.Value(1);

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[
                styles.benefitItemContainer,
                { transform: [{ scale: scaleValue }] },
            ]}
        >
            <Pressable
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                style={styles.benefitItem}
            >
                <MaterialCommunityIcons
                    name={item.icon}
                    size={28}
                    color={colors.green_100}
                />
                <View style={styles.benefitTextContainer}>
                    <Text style={styles.benefitTitle}>{item.title}</Text>
                    <Text style={styles.benefitDescription}>
                        {item.description}
                    </Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

const UserMembershipScreen = () => {
    return (
        <FlatList
            data={membershipBenefits}
            ListHeaderComponent={
                <View style={styles.header}>
                    <Image source={LOGO} style={styles.logo} />
                    <Text style={styles.title}>Chương Trình Thành Viên</Text>
                </View>
            }
            renderItem={({ item }) => <BenefitItem item={item} />}
            keyExtractor={(item) => item.title}
            ListFooterComponent={
                <Pressable style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Tham Gia Ngay</Text>
                </Pressable>
            }
            contentContainerStyle={styles.container}
        />
    );
};

export default UserMembershipScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#F8F7FA",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    header: {
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontFamily: "lato-bold",
        color: "#333",
        marginBottom: 20,
    },
    benefitItemContainer: {
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    benefitItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
    },
    benefitTextContainer: {
        marginLeft: 20,
        flex: 1,
    },
    benefitTitle: {
        fontSize: 18,
        fontFamily: "lato-bold",
        color: "#333",
    },
    benefitDescription: {
        fontSize: 16,
        fontFamily: "lato-regular",
        color: "#555",
    },
    joinButton: {
        backgroundColor: "#006C5E",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    joinButtonText: {
        fontSize: 18,
        fontFamily: "lato-bold",
        color: "#fff",
    },
});
