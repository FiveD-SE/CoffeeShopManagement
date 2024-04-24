import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

const OrderHistory = ({ navigation }) => {
    const orderHistory = [
        { orderId: '#12345', status: true , total: '100.000' },
        { orderId: '#67890', status: false, total: '50.000' },
        { orderId: '#13579', status: NaN, total: '80.000' },
    ];

    const getStatusView = (status) => {
      let statusText, statusColor, textColor;
  
      if (status === true) {
          statusText = 'Đã giao hàng';
          statusColor = '#EDFAF1';
          textColor = '#4ECB71';
      } else if (status === false) {
          statusText = 'Đang giao hàng';
          statusColor = '#FFF6E5'; 
          textColor = '#FFA500';
      } else {
          statusText = 'Đã hủy';
          statusColor = '#FEE8EC';   
          textColor = '#F61A3D';
      }
  
      return (
          <View style={[styles.borderStatus, { backgroundColor: statusColor }]}>
              <Text style={[styles.textStatus, {color: textColor}]}>{statusText}</Text>
          </View>
      );
  };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate('OrderDetail', { orderId: item.orderId })}
        >
            <View style={styles.orderInfo}>
                <Text style={styles.orderId}>Mã đơn hàng: {item.orderId}</Text>
                <Text style={styles.orderStatus}>Trạng thái: {getStatusView(item.status)}</Text>
                <Text style={styles.orderTotal}>Tổng tiền: {item.total}đ</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={orderHistory}
                renderItem={renderItem}
                keyExtractor={(item) => item.orderId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        marginBottom: 10,
        borderColor: '#CBCBD4'
    },
    orderInfo: {
        flex: 1,
        gap: 10,
    },
    orderId: {
      color: '#000',
      fontFamily: 'Lato',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    orderStatus: {
      fontSize: 14,
      color: '#333',
    },
    orderTotal: {
      color: '#000',
      fontFamily: 'Lato',
      fontSize: 16,
      fontStyle: 'normal',
      fontWeight: '500',
    },
    borderStatus: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 10,
    },
    textStatus: {
      textAlign: 'center',
      fontFamily: 'Lato',
      fontSize: 10,
      fontStyle: 'normal',
      fontWeight: '400',
    }
});

export default OrderHistory;
