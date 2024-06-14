import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons, Entypo, FontAwesome6 } from '@expo/vector-icons';

const UserQuestions = () => {
    const [visibleCategory, setVisibleCategory] = useState(null);
    const [visibleQuestion, setVisibleQuestion] = useState({});

    const DiscountQuestionData = [
        { id: 1, question: "Làm thế nào để sử dụng mã giảm giá?", answer: "Để sử dụng mã giảm giá, bạn cần nhập mã khi thanh toán. Hãy chắc chắn rằng mã giảm giá còn hiệu lực và áp dụng được cho sản phẩm bạn muốn mua." },
        { id: 2, question: "Mã giảm giá có thể sử dụng như thế nào?", answer: "Mã giảm giá có thể được áp dụng trong quá trình thanh toán. Bạn sẽ thấy một ô để nhập mã giảm giá tại bước thanh toán." },
        { id: 3, question: "Mã giảm giá có thể sử dụng bao lâu?", answer: "Mã giảm giá thường có hạn sử dụng cụ thể. Hãy kiểm tra ngày hết hạn của mã giảm giá trong điều kiện và điều khoản của mã." },
        { id: 4, question: "Mã giảm giá có thể sử dụng cho tất cả sản phẩm?", answer: "Một số mã giảm giá chỉ áp dụng cho một số sản phẩm hoặc danh mục cụ thể. Hãy đọc kỹ điều kiện và điều khoản của mã giảm giá." },
    ];

    const PaymentQuestionData = [
        { id: 1, question: "Thanh toán bằng thẻ ngân hàng", answer: "Để thanh toán bằng thẻ ngân hàng, bạn cần nhập thông tin thẻ như số thẻ, ngày hết hạn và mã CVV. Sau đó, xác nhận giao dịch để hoàn tất thanh toán." },
        { id: 2, question: "Thanh toán bằng ví điện tử", answer: "Chọn ví điện tử làm phương thức thanh toán và đăng nhập vào tài khoản ví điện tử của bạn để xác nhận thanh toán." },
        { id: 3, question: "Thanh toán khi nhận hàng", answer: "Chọn phương thức thanh toán khi nhận hàng, bạn sẽ trả tiền cho nhân viên giao hàng khi đơn hàng được giao tới." },
        { id: 4, question: "Thanh toán bằng mã QR", answer: "Chọn thanh toán bằng mã QR, sau đó quét mã QR bằng ứng dụng ngân hàng hoặc ví điện tử của bạn để thanh toán." },
    ];

    const OrderQuestionData = [
        { id: 1, question: "Làm thế nào để xem đơn hàng đã đặt?", answer: "Để xem đơn hàng đã đặt, bạn hãy đăng nhập vào tài khoản của mình và truy cập vào mục 'Đơn hàng của tôi'." },
        { id: 2, question: "Làm thế nào để hủy đơn hàng?", answer: "Để hủy đơn hàng, bạn vào 'Đơn hàng của tôi', chọn đơn hàng muốn hủy và nhấn nút 'Hủy đơn hàng'. Lưu ý điều kiện hủy hàng của cửa hàng." },
        { id: 3, question: "Làm thế nào để theo dõi đơn hàng?", answer: "Bạn có thể theo dõi đơn hàng trong mục 'Đơn hàng của tôi'. Ở đó sẽ có thông tin về trạng thái và vị trí hiện tại của đơn hàng." },
        { id: 4, question: "Làm thế nào để đổi địa chỉ giao hàng?", answer: "Nếu đơn hàng chưa được vận chuyển, bạn có thể vào 'Đơn hàng của tôi', chọn đơn hàng và chỉnh sửa địa chỉ giao hàng." },
    ];

    const GeneralQuestionData = [
        { id: 1, question: "Làm thế nào để đăng ký tài khoản?", answer: "Để đăng ký tài khoản, bạn nhấp vào nút 'Đăng ký' và điền thông tin cá nhân như email, mật khẩu, và số điện thoại." },
        { id: 2, question: "Làm thế nào để đăng nhập tài khoản?", answer: "Bạn nhấp vào nút 'Đăng nhập', sau đó nhập email và mật khẩu đã đăng ký để truy cập vào tài khoản của mình." },
        { id: 3, question: "Làm thế nào để đổi mật khẩu?", answer: "Để đổi mật khẩu, vào mục 'Cài đặt tài khoản', chọn 'Đổi mật khẩu', nhập mật khẩu cũ và mật khẩu mới rồi xác nhận." },
        { id: 4, question: "Làm thế nào để đăng xuất tài khoản?", answer: "Nhấp vào biểu tượng tài khoản của bạn ở góc phải màn hình và chọn 'Đăng xuất'." },
    ];

    const handleCategoryPress = (category) => {
        setVisibleCategory(visibleCategory === category ? null : category);
        setVisibleQuestion({});
    };

    const handleQuestionPress = (questionId) => {
        setVisibleQuestion({
            ...visibleQuestion,
            [questionId]: !visibleQuestion[questionId]
        });
    };

    const renderQuestions = (questions) => (
        questions.map((item) => (
            <View key={item.id} style={styles.item}>
                <Pressable style={styles.questionContainer} onPress={() => handleQuestionPress(item.id)}>
                    <Text style={styles.questionText}>{item.question}</Text>
                    {visibleQuestion[item.id] && (
                        <Text style={styles.answerText}>{item.answer}</Text>
                    )}
                </Pressable>
            </View>
        ))
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.row}>
                <Pressable style={styles.optionContainer} onPress={() => handleCategoryPress('discount')}>
                    <MaterialIcons name="discount" size={24} color="#151515" />
                    <Text style={styles.optionText}>Khuyến Mãi và Ưu Đãi</Text>
                </Pressable>
                <Pressable style={styles.optionContainer} onPress={() => handleCategoryPress('payment')}>
                    <Entypo name="wallet" size={24} color="#151515" />
                    <Text style={styles.optionText}>Thanh Toán</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable style={styles.optionContainer} onPress={() => handleCategoryPress('order')}>
                    <MaterialIcons name="local-shipping" size={24} color="#151515" />
                    <Text style={styles.optionText}>Đơn Hàng & Vận Chuyển</Text>
                </Pressable>
                <Pressable style={styles.optionContainer} onPress={() => handleCategoryPress('general')}>
                    <FontAwesome6 name="clipboard-question" size={24} color="black" />
                    <Text style={styles.optionText}>Thông Tin Chung</Text>
                </Pressable>
            </View>

            {visibleCategory === 'discount' && renderQuestions(DiscountQuestionData)}
            {visibleCategory === 'payment' && renderQuestions(PaymentQuestionData)}
            {visibleCategory === 'order' && renderQuestions(OrderQuestionData)}
            {visibleCategory === 'general' && renderQuestions(GeneralQuestionData)}
        </ScrollView>
    );
};

export default UserQuestions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FA",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: "5%",
        marginVertical: 10,
        gap: 10,
    },
    optionContainer: {
        flex: 1,
        height: 100,
        flexDirection: "row",
        paddingHorizontal: "5%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.01,
        shadowRadius: 5,
        gap: 15,
        elevation: 5,
    },
    optionText: {
        width: "75%",
        color: "#151515",
        fontSize: 16,
        fontFamily: "lato-bold",
        textAlign: "left",
    },
    questionContainer: {
        padding: 15,
        marginHorizontal: '5%',
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    questionText: {
        color: '#000',
        fontSize: 16,
        fontFamily: 'lato-bold',
    },
    answerText: {
        color: '#151515',
        fontSize: 16,
        lineHeight: 22,
        fontFamily: 'lato-regular',
        marginTop: 10,
    },
    item: {
        marginTop: 10,
    },
});
