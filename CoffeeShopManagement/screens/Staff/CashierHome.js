import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderCard1 from "../../components/Staff/OrderCard1";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function CashierHome() {

    const navigation = useNavigation();
    const handleNotification = () => {
        navigation.navigate('CashierNotification')
    }
    const handleDetailOrder = (orderId) => {

        console.log(orderId);
        const selectedProduct = DATA[0].product.filter(product => product.orderId === orderId);

        navigation.navigate('OrderScreen', { selectedProduct: selectedProduct })
    }
    const handleCashierInfor = () => {
        navigation.navigate('CashierInformation')
    }
    const DATA = [
        {
            order: [
                {
                    orderId: '#12345',
                    time: '10:45 SA 16/03/2024',
                    orderType: 'Tự đến lấy hàng',
                    customer: 'Tánh',
                    sdt: '0352085655',
                    orderState: 'Chưa thanh toán',
                    state: 'Đang làm'
                },
                {
                    orderId: '#12346',
                    time: '10:45 SA 16/03/2024',
                    orderType: 'Tự đến lấy hàng',
                    customer: 'Tánh',
                    sdt: '0352085655',
                    orderState: 'Chưa thanh toán',
                    state: 'Chờ xác nhận'
                },
                {
                    orderId: '#12347',
                    time: '10:45 SA 16/03/2024',
                    orderType: 'Tự đến lấy hàng',
                    customer: 'Tánh',
                    sdt: '0352085655',
                    orderState: 'Chưa thanh toán',
                    state: 'Đã xong'
                },
                {
                    orderId: '#12348',
                    time: '10:45 SA 16/03/2024',
                    orderType: 'Tự đến lấy hàng',
                    customer: 'Tánh',
                    sdt: '0352085655',
                    orderState: 'Chưa thanh toán',
                    state: 'Đã hoàn thành'
                },
            ],
            product: [
                {
                    orderId: '#12348',
                    id: '1234',
                    name: 'Oolong Tứ Quý Kim Quất Trân Châu',
                    price: '59.000',
                    topping: 'Size S, Ít đường, Trân châu trắng',
                    amount: '1'
                },
                {
                    orderId: '#12345',
                    id: '1235',
                    name: 'Oolong Tứ Quý Kim Quất Trân Châu',
                    price: '59.000',
                    topping: 'Size S, Ít đường, Trân châu trắng',
                    amount: '1'
                },
                {
                    orderId: '#12345',
                    id: '1236',
                    name: 'Oolong Tứ Quý Kim Quất Trân Châu',
                    price: '59.000',
                    topping: 'Size S, Ít đường, Trân châu trắng',
                    amount: '1'
                },
            ]
        }
    ];
    return (
        <View style={styles.container}>
            <View style={styles.cashierInforWrapper}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={handleCashierInfor}>
                        <Image
                            source={require('../../assets/account_icon.png')}
                            style={{ height: 60, width: 60 }} />
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
                data={DATA[0].order}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.orderId}
                renderItem={({ item }) => (
                    <OrderCard1 item={item} handleDetailOrder={() => handleDetailOrder(item.orderId)} />
                )} />
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
