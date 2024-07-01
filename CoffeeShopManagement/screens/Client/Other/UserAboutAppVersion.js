import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
const LOGO = require("../../../assets/splashScreenImage/Logowithbrandname.jpg");

const AboutVersionScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={LOGO} style={styles.logo} />
                <Text style={styles.title}>Giới Thiệu Ứng Dụng</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.versionText}>Phiên bản 1.0.0</Text>
                <Text style={styles.sectionTitle}>
                    Chào Mừng Bạn Đến Với Ứng Dụng Của Chúng Tôi
                </Text>
                <Text style={styles.sectionContent}>
                    Chúng tôi rất vui mừng giới thiệu phiên bản đầu tiên của ứng
                    dụng quản lý quán cà phê. Ứng dụng này được thiết kế nhằm
                    giúp bạn quản lý quán cà phê một cách dễ dàng và hiệu quả.
                </Text>
                <Text style={styles.sectionTitle}>Các Tính Năng Chính:</Text>
                <Text style={styles.sectionContent}>
                    - Giao diện thân thiện với người dùng để quản lý đơn hàng và
                    kho hàng.
                    {"\n"}- Cập nhật và thông báo theo thời gian thực.
                    {"\n"}- Báo cáo và phân tích doanh thu chi tiết.
                    {"\n"}- Quản lý nhân viên và lịch làm việc dễ dàng.
                </Text>
                <Text style={styles.sectionTitle}>Kế Hoạch Tương Lai:</Text>
                <Text style={styles.sectionContent}>
                    Vì đây là phiên bản đầu tiên, chúng tôi cam kết sẽ không
                    ngừng cải tiến. Chúng tôi đang làm việc để thêm nhiều tính
                    năng và cải thiện trải nghiệm của bạn. Phản hồi của bạn rất
                    quan trọng đối với chúng tôi, và chúng tôi khuyến khích bạn
                    chia sẻ ý kiến và đề xuất của mình.
                </Text>
                <Text style={styles.sectionTitle}>Liên Hệ Với Chúng Tôi:</Text>
                <Text style={styles.sectionContent}>
                    Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ
                    với chúng tôi qua email fived666@gmail.com
                </Text>
                <Text style={styles.thankYou}>
                    Cảm ơn bạn đã sử dụng ứng dụng của chúng tôi!
                </Text>
            </View>
        </ScrollView>
    );
};

export default AboutVersionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FA",
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
        color: "#151515",
    },
    content: {
        paddingHorizontal: 20,
    },
    versionText: {
        fontSize: 18,
        fontFamily: "lato-bold",
        color: "#151515",
        textAlign: "center",
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        lineHeight: 30,
        fontFamily: "lato-bold",
        color: "#151515",
        marginTop: 20,
    },
    sectionContent: {
        fontSize: 16,
        fontFamily: "lato-regular",
        color: "#151515",
        marginTop: 10,
        lineHeight: 24,
    },
    thankYou: {
        fontSize: 16,
        fontFamily: "lato-regular",
        color: "#151515",
        marginTop: 30,
        marginBottom: 20,
        textAlign: "center",
    },
});
