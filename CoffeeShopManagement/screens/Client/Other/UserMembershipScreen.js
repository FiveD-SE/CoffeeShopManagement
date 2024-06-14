import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
const LOGO = require('../../../assets/splashScreenImage/Logowithbrandname.jpg');

const UserMembershipScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={LOGO} style={styles.logo} />
                <Text style={styles.title}>Chương Trình Thành Viên</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>Giới Thiệu</Text>
                <Text style={styles.sectionContent}>
                    Chào mừng bạn đến với Chương trình thành viên của chúng tôi. Khi tham gia, bạn sẽ nhận được nhiều ưu đãi và lợi ích hấp dẫn.
                </Text>
                <Text style={styles.sectionTitle}>Lợi Ích Khi Tham Gia</Text>
                <View style={styles.benefitContainer}>
                    <Text style={styles.benefitItem}>⭐ Tích điểm và đổi quà</Text>
                    <Text style={styles.benefitItem}>⭐ Giảm giá đặc biệt</Text>
                    <Text style={styles.benefitItem}>⭐ Thông tin và ưu đãi độc quyền</Text>
                </View>
                <Text style={styles.sectionTitle}>Cách Thức Tham Gia</Text>
                <Text style={styles.sectionContent}>
                    Để tham gia Chương trình thành viên, bạn chỉ cần đăng ký tài khoản và mua sắm tại cửa hàng của chúng tôi. Mỗi lần mua hàng, bạn sẽ được tích điểm vào tài khoản của mình.
                </Text>
                <Text style={styles.sectionTitle}>Cấp Độ Thành Viên</Text>
                <View style={styles.levelContainer}>
                    <View style={styles.levelItem}>
                        <Text style={styles.levelTitle}>Thành Viên Thường</Text>
                        <Text style={styles.levelContent}>- Tích điểm mỗi lần mua sắm.</Text>
                        <Text style={styles.levelContent}>- Nhận thông báo ưu đãi.</Text>
                    </View>
                    <View style={styles.levelItem}>
                        <Text style={styles.levelTitle}>Thành Viên Vàng</Text>
                        <Text style={styles.levelContent}>- Tích điểm cao hơn.</Text>
                        <Text style={styles.levelContent}>- Giảm giá 10% cho mỗi đơn hàng.</Text>
                    </View>
                    <View style={styles.levelItem}>
                        <Text style={styles.levelTitle}>Thành Viên Kim Cương</Text>
                        <Text style={styles.levelContent}>- Tích điểm cao nhất.</Text>
                        <Text style={styles.levelContent}>- Giảm giá 20% cho mỗi đơn hàng.</Text>
                        <Text style={styles.levelContent}>- Nhận quà tặng đặc biệt hàng tháng.</Text>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Liên Hệ</Text>
                <Text style={styles.sectionContent}>
                    Nếu bạn có bất kỳ câu hỏi nào về Chương trình thành viên, vui lòng liên hệ với chúng tôi qua email support@coffeeshopapp.com.
                </Text>
                <Pressable style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Tham Gia Ngay</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default UserMembershipScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FA",
    },
    header: {
        alignItems: 'center',
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
        fontFamily: 'lato-bold',
        color: '#333',
    },
    content: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'lato-bold',
        color: '#333',
        marginTop: 20,
    },
    sectionContent: {
        fontSize: 16,
        fontFamily: 'lato-regular',
        color: '#555',
        marginTop: 10,
        lineHeight: 24,
    },
    benefitContainer: {
        marginTop: 10,
    },
    benefitItem: {
        fontSize: 16,
        fontFamily: 'lato-regular',
        color: '#555',
        marginBottom: 5,
    },
    levelContainer: {
        marginTop: 10,
    },
    levelItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    levelTitle: {
        fontSize: 18,
        fontFamily: 'lato-bold',
        color: '#333',
    },
    levelContent: {
        fontSize: 16,
        fontFamily: 'lato-regular',
        color: '#555',
        marginTop: 5,
    },
    joinButton: {
        backgroundColor: '#006C5E',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    joinButtonText: {
        fontSize: 18,
        fontFamily: 'lato-bold',
        color: '#fff',
    },
});
