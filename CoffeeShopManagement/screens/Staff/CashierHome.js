import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderCard1 from "../../components/Staff/OrderCard1";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function CashierHome() {

    const navigation = useNavigation();
    const handleNotification = () => {
        navigation.navigate('CashierNotification')
    }
    const handleDetailOrder = () => {
        navigation.navigate('OrderScreen')
    }
    const handleCashierInfor = () => {
        navigation.navigate('CashierInformation')
    }
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
        <View style={styles.container}>
            <View style={styles.cashierInforWrapper}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        onPress={handleCashierInfor}>
                        <Image 
                            source={require('../../assets/account_icon.png')}
                            style={{height: 60, width: 60}} />
                    </TouchableOpacity>
                    <View style={styles.inforTextWrapper}>
                        <Text style={styles.nameText}>TRẦN TUỆ TÁNH</Text>
                        <Text style={styles.roleText}>Cashier</Text>
                    </View>
                </View>
                <TouchableOpacity 
                    onPress={handleNotification}
                    style={styles.notiButton}>
                    <Icon name="bell" size={20} />
                </TouchableOpacity>
            </View>
            <Text style={styles.listOrderText}>Chờ xác nhận</Text>
            <FlatList
                data={DATA}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.orderId}
                renderItem={({item}) => (
                    <OrderCard1 item={item} handleDetailOrder={handleDetailOrder}/>
                )}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%',
        marginTop: '10%'
    },
    cashierInforWrapper: {
        backgroundColor: '#fff',
        padding: '3%',
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5%'
    },
    inforTextWrapper: {
        justifyContent: 'space-between',
        marginStart: '5%'
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600'
    },
    roleText: {
        color: '#9c9c9c',
        fontSize: 14
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
        fontWeight: '600',
        marginBottom: '5%',
    }
});
