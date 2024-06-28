import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Pressable,
} from "react-native";
import { colors } from "../../assets/colors/colors";

export default function DetailBillingScreen({ route }) {
    const { orderData } = route.params;
    const totalPrice =
        orderData.orderTotalPrice +
        orderData.deliveryFee -
        orderData.orderTotalDiscount;

    const formatCurrency = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const orderDate = new Date(orderData.orderDate.seconds * 1000);
    const formattedOrderDate = orderDate.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Image
                    source={{ uri: orderData.deliveryBranch.branchImage }}
                    style={styles.branchImage}
                />
                <Text style={styles.title}>Chi tiết đơn hàng</Text>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Sản phẩm</Text>
                {orderData.products.map((item, index) => (
                    <View key={index} style={styles.item}>
                        <View style={styles.itemDetails}>
                            <Image
                                source={{ uri: item.productImage }}
                                style={styles.productImage}
                            />
                            <View style={styles.productInfo}>
                                <Text style={styles.productName}>
                                    x{item.quantity} {item.productName}
                                </Text>
                                <Text style={styles.productSize}>
                                    Size: {item.size}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.itemPrice}>
                            {formatCurrency(item.totalPrice)} VND
                        </Text>
                    </View>
                ))}
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Thông tin khách hàng</Text>
                <View style={styles.infoWrapper}>
                    <View style={styles.infoItem}>
                        <Text style={styles.titleText}>Người nhận: </Text>
                        <Text style={styles.contentText}>
                            {orderData.deliveryAddress.name}
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.titleText}>Số điện thoại:</Text>
                        <Text style={styles.contentText}>
                            {orderData.deliveryAddress.phoneNumber}
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.titleText}>Địa chỉ: </Text>
                        <Text style={styles.contentText}>
                            {orderData.deliveryAddress.street},{" "}
                            {orderData.deliveryAddress.wardName},{" "}
                            {orderData.deliveryAddress.districtName},{" "}
                            {orderData.deliveryAddress.provinceName}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>Thông tin đơn hàng</Text>
                <View style={styles.infoWrapper}>
                    <View style={styles.totalItem}>
                        <Text style={styles.titleText}>Ngày đặt hàng:</Text>
                        <Text style={styles.contentText}>
                            {formattedOrderDate}
                        </Text>
                    </View>
                    <View style={styles.totalItem}>
                        <Text style={styles.titleText}>Tổng tiền hàng:</Text>
                        <Text style={styles.contentText}>
                            {formatCurrency(orderData.orderTotalPrice)} VND
                        </Text>
                    </View>
                    <View style={styles.totalItem}>
                        <Text style={styles.titleText}>Phí vận chuyển:</Text>
                        <Text style={styles.contentText}>
                            {formatCurrency(orderData.deliveryFee)} VND
                        </Text>
                    </View>
                    <View style={styles.totalItem}>
                        <Text style={styles.titleText}>Giảm giá: </Text>
                        <Text style={styles.contentText}>
                            {formatCurrency(orderData.orderTotalDiscount)} VND
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.totalContainer}>
                <Text style={styles.totalAmountTitle}>Tổng cộng:</Text>
                <Text style={styles.totalAmount}>
                    {formatCurrency(totalPrice)} VND
                </Text>
            </View>
        </ScrollView>
    );
}

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
    branchImage: {
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
    sectionContainer: {
        marginVertical: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
    },
    sectionText: {
        fontSize: 18,
        fontFamily: "lato-bold",
        color: "#333",
        marginBottom: 10,
    },
    itemDetails: {
        flexDirection: "row",
        alignItems: "center",
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
        justifyContent: "center",
    },
    productName: {
        fontSize: 16,
        fontFamily: "lato-bold",
        color: "#333",
    },
    productSize: {
        fontSize: 14,
        fontFamily: "lato-regular",
        color: "#666",
    },
    itemPrice: {
        fontSize: 16,
        fontFamily: "lato-bold",
        color: "#333",
    },
    infoWrapper: {
        padding: 10,
    },
    infoItem: {
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    titleText: {
        fontSize: 16,
        fontFamily: "lato-bold",
        color: "#333",
    },
    contentText: {
        fontSize: 16,
        fontFamily: "lato-regular",
        color: "#666",
        flexShrink: 1,
    },
    totalItem: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        marginTop: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
    },
    totalAmountTitle: {
        fontSize: 20,
        fontFamily: "lato-bold",
        color: "#333",
    },
    totalAmount: {
        fontSize: 20,
        fontFamily: "lato-bold",
        color: "#333",
    },
});
