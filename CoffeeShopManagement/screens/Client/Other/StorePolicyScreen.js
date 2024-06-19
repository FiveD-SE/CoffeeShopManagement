import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const StorePolicyScreen = () => {
    const policies = [
        {
            title: "Chính sách giao hàng",
            content: [
                "- Miễn phí giao hàng cho đơn hàng từ 200.000đ trở lên.",
                "- Phí giao hàng cho đơn hàng dưới 200.000đ là 15.000đ.",
                "- Thời gian giao hàng dự kiến là từ 20 đến 40 phút, tuỳ thuộc vào khoảng cách và điều kiện giao thông.",
                "- Giao hàng trong phạm vi 10 km từ cửa hàng.",
            ],
        },
        {
            title: "Chính sách đổi trả",
            content: [
                "- Khách hàng được đổi trả sản phẩm trong vòng 5 ngày kể từ ngày nhận hàng.",
                "- Sản phẩm đổi trả phải còn nguyên tem, nhãn mác, chưa qua sử dụng và trong tình trạng ban đầu.",
                "- Khách hàng cần xuất trình hoá đơn mua hàng khi đổi trả sản phẩm.",
                "- Phí đổi trả do khách hàng tự chịu, trừ khi sản phẩm bị lỗi từ phía cửa hàng.",
            ],
        },
        {
            title: "Chính sách bảo mật",
            content: [
                "- Cửa hàng cam kết bảo mật tuyệt đối thông tin cá nhân của khách hàng.",
                "- Thông tin cá nhân của khách hàng sẽ được sử dụng để phục vụ cho việc giao hàng, thanh toán và chăm sóc khách hàng.",
                "- Cửa hàng sẽ không chia sẻ thông tin cá nhân của khách hàng cho bên thứ ba, trừ khi có yêu cầu từ cơ quan pháp luật.",
                "- Khách hàng có quyền yêu cầu chỉnh sửa hoặc xoá bỏ thông tin cá nhân của mình.",
            ],
        },
        {
            title: "Chính sách khuyến mãi",
            content: [
                "- Các chương trình khuyến mãi sẽ được thông báo trên website và các kênh truyền thông của cửa hàng.",
                "- Khuyến mãi không được quy đổi thành tiền mặt và không áp dụng đồng thời với các chương trình khuyến mãi khác.",
                "- Cửa hàng có quyền thay đổi hoặc huỷ bỏ chương trình khuyến mãi mà không cần thông báo trước.",
            ],
        },
        {
            title: "Chính sách thanh toán",
            content: [
                "- Chúng tôi chấp nhận thanh toán bằng tiền mặt, thẻ tín dụng, thẻ ghi nợ và các phương thức thanh toán điện tử.",
                "- Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ có thể yêu cầu xác minh thông tin từ phía ngân hàng.",
                "- Đối với các đơn hàng lớn, chúng tôi có thể yêu cầu đặt cọc trước.",
            ],
        },
    ];

    const renderPolicySection = (policy) => {
        return (
            <View style={styles.section} key={policy.title}>
                <Text style={styles.sectionTitle}>{policy.title}</Text>
                {policy.content.map((item, index) => (
                    <Text style={styles.sectionContent} key={index}>
                        {item}
                    </Text>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Chính sách cửa hàng</Text>
                {policies.map(renderPolicySection)}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f7fa",
        padding: 20,
    },
    content: {
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 16,
    },
});

export default StorePolicyScreen;
