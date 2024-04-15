import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/Entypo";

export default function CashierHome() {
    const DATA = [
        {
            orderId: "#12345",
            time: "10:45 SA 16/03/2024",
            orderType: "Tự đến lấy hàng",
            customer: "Tánh",
            sdt: "0352085655",
            orderState: "Chưa thanh toán",
            state: "Chờ xác nhận",
        },
        {
            orderId: "#12346",
            time: "10:45 SA 16/03/2024",
            orderType: "Tự đến lấy hàng",
            customer: "Tánh",
            sdt: "0352085655",
            orderState: "Chưa thanh toán",
            state: "Chờ xác nhận",
        },
        {
            orderId: "#12347",
            time: "10:45 SA 16/03/2024",
            orderType: "Tự đến lấy hàng",
            customer: "Tánh",
            sdt: "0352085655",
            orderState: "Chưa thanh toán",
            state: "Chờ xác nhận",
        },
    ];
    return (
        <SafeAreaView
            style={{ flex: 1, backgroundColor: "white", paddingTop: 30 }}
        >
            <View style={styles.container}>
                <View style={styles.topApp}>
                    <View>
                        <Image
                            source={require("../../assets/account_icon.png")}
                            style={{ height: 60, width: 60 }}
                        />
                    </View>
                    <View style={styles.accountName}>
                        <Text style={{ fontSize: 18, fontWeight: 400 }}>
                            TRẦN TUỆ TÁNH
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                color: "rgba(58, 58, 58, 0.50)",
                            }}
                        >
                            Cashier
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                borderRadius: 20,
                                borderWidth: 0.1,
                                width: 60,
                                height: 60,
                                justifyContent: "center",
                                shadowColor: "#000",
                                paddingStart: 10,
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                            }}
                        >
                            <Image
                                source={require("../../assets/notification_button.png")}
                                style={{ height: 40, width: 40 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bodyApp}>
                    <View>
                        <Text style={styles.headerText}>Chờ xác nhận</Text>
                    </View>
                    <View style={{ margin: 10 }}>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.orderDetail}>
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            color: "#3A3A3A",
                                        }}
                                    >
                                        <Text style={{ fontSize: 16 }}>
                                            Mã đơn hàng: {item.orderId}
                                        </Text>
                                        <Text
                                            style={{
                                                color: "rgba(58, 58, 58, 0.50)",
                                                marginTop: 5,
                                                marginBottom: 5,
                                            }}
                                        >
                                            Thời gian: {item.time}
                                        </Text>
                                        <Text>Loại đơn: {item.orderType}</Text>
                                        <Text>Người nhận: {item.customer}</Text>
                                        <Text>SDT Người nhận: {item.sdt}</Text>
                                        <Text style={{ marginBottom: 5 }}>
                                            Trạng thái thanh toán:{" "}
                                            {item.orderState}
                                        </Text>
                                        <Text>
                                            <Text>Trạng thái: </Text>
                                            <Text style={{ color: "#FFA730" }}>
                                                {item.state}
                                            </Text>
                                        </Text>
                                    </View>
                                    <View style={{ justifyContent: "center" }}>
                                        <Icon
                                            name="chevron-small-right"
                                            size={48}
                                        />
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.orderId}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "white",
    },
    topApp: {
        flex: 1,
        flexDirection: "row",
        margin: 15,
        marginTop: 20,
        justifyContent: "space-between",
    },
    bodyApp: {
        flex: 11,
        flexDirection: "column",
        margin: 15,
    },
    accountName: {
        flexDirection: "column",
        height: 60,
        width: 250,
        justifyContent: "space-between",
    },
    headerText: {
        margin: 10,
        fontSize: 20,
    },
    orderDetail: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
});
