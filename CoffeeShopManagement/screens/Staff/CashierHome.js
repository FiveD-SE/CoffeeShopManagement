import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderCard1 from "../../components/Staff/OrderCard1";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { connect } from "react-redux";

const CashierHome = ({ userData }) => {
    console.log(userData);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            query(
                collection(db, "orders"),
                where("orderState", "==", "Chờ xác nhận")
            ),
            (snapshot) => {
                setOrderData(snapshot.docs.map((doc) => doc.data()));
            }
        );
    }, []);

    useEffect(() => {
        console.log(orderData);
        console.log(userData);
    }, [orderData]);

    const navigation = useNavigation();
    const handleNotification = () => {
        navigation.navigate("CashierNotification");
    };
    const handleDetailOrder = (item) => {
        console.log(item);

        navigation.navigate("OrderScreen", {
            selectedOrder: item,
        });
    };
    const handleCashierInfor = () => {
        navigation.navigate("CashierInformation");
    };

    const renderListOrder = () => {
        if (orderData.length === 0) {
            return (
                <View style={{ justifyContent: "center", flex: 1 }}>
                    <Text
                        style={{
                            fontFamily: "lato-regular",
                            justifyContent: "center",
                            alignSelf: "center",
                            fontSize: 16,
                        }}
                    >
                        Không có đơn hàng nào
                    </Text>
                </View>
            );
        } else {
            return (
                <FlatList
                    data={orderData}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.orderId}
                    renderItem={({ item }) => (
                        <OrderCard1
                            orderId={item.orderId}
                            orderTime={item.orderTime.toDate().toDateString()}
                            orderType={item.orderType}
                            orderOwner={item.orderOwner}
                            orderOwnerPhone={item.orderOwnerPhone}
                            orderState={item.orderState}
                            orderPaymentState={item.orderPaymentState}
                            handleDetailOrder={() => handleDetailOrder(item)}
                        />
                    )}
                />
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.cashierInforWrapper}>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={handleCashierInfor}
                        style={styles.imageWrapper}
                    >
                        <Image
                            source={{ uri: userData.userImage }}
                            style={styles.userImage}
                        />
                    </TouchableOpacity>
                    <View style={styles.inforTextWrapper}>
                        <Text style={styles.nameText}>{userData.name}</Text>
                        <Text style={styles.emailText}>{userData.email}</Text>
                        <Text style={styles.roleText}>{userData.role}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleNotification}
                    style={styles.notiButton}
                >
                    <Icon name="bell" size={20} />
                </TouchableOpacity>
            </View>
            <Text style={styles.listOrderText}>Chờ xác nhận</Text>
            {renderListOrder()}
        </View>
    );
};

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

export default connect(mapStateToProps)(CashierHome);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: "5%",
        marginTop: "10%",
    },
    cashierInforWrapper: {
        backgroundColor: "#fff",
        padding: "3%",
        flexDirection: "row",
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "5%",
    },
    inforTextWrapper: {
        justifyContent: "space-between",
        marginStart: "5%",
    },
    nameText: {
        fontSize: 16,
        fontFamily: "lato-bold",
    },
    emailText: {
        fontFamily: "lato-regular",
        fontSize: 14,
    },
    roleText: {
        fontSize: 14,
        fontStyle: "italic",
    },
    notiButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: "5%",
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "#CCCCCC",
    },
    listOrderText: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: "5%",
    },
    imageWrapper: {
        width: 64,
        height: 64,
        justifyContent: "center",
        alignItems: "center",
        marginRight: "5%",
    },
    userImage: {
        width: "80%",
        height: "80%",
        borderRadius: 100,
        aspectRatio: 1,
    },
});
