import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import React from "react";
import ProductCard from "../../components/Staff/ProductCard";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../services/firebaseService";

export default function OrderScreen({ route }) {
    const selectedOrder = route.params.selectedOrder;

    console.log(selectedOrder.products);

    const navigation = useNavigation();

    const handleAcceptOrder = async (order) => {
        const orderDocRef = doc(db, "orders", order.orderId);
        await updateDoc(orderDocRef, {
            orderState: "Đang làm",
        });
        navigation.goBack();
    };

    const renderAcceptButton = (order) => {
        if (order.orderState === "Chờ xác nhận") {
            return (
                <View style={styles.bottomApp}>
                    <TouchableOpacity
                        onPress={() => handleAcceptOrder(selectedOrder)}
                        style={styles.acceptButton}
                    >
                        <Text style={styles.acceptText}>
                            Nhận đơn ⋅ 59.000đ
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Image
                            source={require("../../assets/trash.png")}
                            style={{ height: 40, width: 40 }}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.bodyApp}>
                <View>
                    <Text style={styles.topText}>Sản phẩm</Text>
                    {/* <FlatList
                        data={selectedOrder.products}
                        keyExtractor={item => item.}
                        style={styles.productList}
                        renderItem={({ item }) => (
                            <ProductCard item={item} />
                        )} /> */}
                </View>
                <View>
                    <Text style={styles.topText}>Thông tin đơn hàng</Text>
                    <View style={styles.deliInforWrapper}>
                        <View style={{ flexDirection: "column" }}>
                            <Text style={styles.orderText}>
                                <Text>Người nhận: </Text>
                                <Text style={{ fontFamily: "lato-bold" }}>
                                    {selectedOrder.orderOwner}
                                </Text>
                            </Text>
                            <Text style={styles.orderText}>
                                <Text>SDT người nhận: </Text>
                                <Text style={{ fontFamily: "lato-bold" }}>
                                    {selectedOrder.orderOwnerPhone}
                                </Text>
                            </Text>
                            <Text style={styles.orderText}>
                                <Text>Trạng thái: </Text>
                                <Text style={{ fontFamily: "lato-bold" }}>
                                    {selectedOrder.orderState}
                                </Text>
                            </Text>
                            <Text style={styles.orderText}>
                                <Text>Trạng thái thanh toán: </Text>
                                <Text
                                    style={{
                                        fontFamily: "lato-bold",
                                        color:
                                            selectedOrder.orderPaymentState ===
                                            "Chưa thanh toán"
                                                ? "#f61a3d"
                                                : "#4ecb71",
                                    }}
                                >
                                    {selectedOrder.orderPaymentState}
                                </Text>
                            </Text>
                        </View>

                        <View>
                            <Image
                                style={{ width: 48, height: 48 }}
                                source={
                                    selectedOrder.orderType === "Giao hàng"
                                        ? require("../../assets/images/delivery_icon.png")
                                        : require("../../assets/images/takeaway_icon.png")
                                }
                            />
                        </View>
                    </View>
                </View>
            </View>
            {renderAcceptButton(selectedOrder)}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bodyApp: {
        padding: "5%",
    },
    topText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: "3%",
    },
    productList: {
        height: "60%",
        marginBottom: "5%",
    },
    inforText: {},
    deliInforWrapper: {
        flexDirection: "row",
        fontSize: 14,
        fontWeight: "600",
        padding: "3%",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    bottomApp: {
        backgroundColor: "rgba(255, 255, 255, 1)",
        bottom: 0,
        left: 0,
        right: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: "5%",
    },
    acceptButton: {
        backgroundColor: "#006c5e",
        width: "80%",
        height: "auto",
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
        borderRadius: 10,
    },
    acceptText: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 18,
    },
    deleteButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#CCCCCC",
        padding: 10,
    },
    orderText: {
        fontFamily: "lato-regular",
        fontSize: 14,
        marginBottom: "1%",
    },
});
