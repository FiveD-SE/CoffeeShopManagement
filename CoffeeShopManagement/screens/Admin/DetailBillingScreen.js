import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React from 'react';

export default function DetailBillingScreen({ route }) {
  const { orderData } = route.params;

  const totalPrice = orderData.orderTotalPrice + orderData.deliveryFee - orderData.orderTotalDiscount;

  const formatCurrency = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionContainer}>
          {orderData.products.map((item, index) => (
            <View key={index} style={styles.item}>
              <View style={styles.itemDetails}>
                <Image source={{ uri: item.productImage }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>x{item.quantity} {item.productName}</Text>
                  <Text style={styles.productSize}>{item.size}</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>{formatCurrency(item.totalPrice)} VND</Text>
            </View>
          ))}
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/person_icon.png')} />
            <Text style={styles.sectionText}>Thông tin khách hàng</Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.infoItem}>
              <Text style={styles.titleText}>Người nhận:  </Text>
              <Text style={styles.contentText}>{orderData.deliveryAddress.name}</Text>
            </Text>
            <View style={styles.infoItem}>
              <Text style={styles.titleText}>Số điện thoại:  </Text>
              <Text style={styles.contentText}>{orderData.deliveryAddress.phoneNumber}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.titleText}>Địa chỉ:  </Text>
              <Text style={styles.contentText} numberOfLines={3}>
                {orderData.deliveryAddress.street}, {orderData.deliveryAddress.wardName}, {orderData.deliveryAddress.districtName}, {orderData.deliveryAddress.provinceName}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/delivery_icon.png')} />
            <Text style={styles.sectionText}>Thông tin đơn hàng</Text>
          </View>
          <View style={styles.infoWrapper}>
            {orderData.deliveryFee !== 0 ? (
              <>
                <View style={styles.infoItem}>
                  <Text style={styles.titleText}>Người giao:  </Text>
                  <Text style={styles.contentText}>Nguyễn Quốc Thắng</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.titleText}>Số điện thoại:  </Text>
                  <Text style={styles.contentText}>0123456789</Text>
                </View>
              </>
            ) : null}
            <View style={styles.infoItem}>
              <Text style={styles.titleText}>Mã gửi hàng:  </Text>
              <Text style={styles.contentText}>#####</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.titleText}>Mã phiếu gửi:  </Text>
              <Text style={styles.contentText}>#####</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/person_icon.png')} />
            <Text style={styles.sectionText}>Chi tiết thanh toán</Text>
          </View>
          <View style={styles.infoWrapper}>
            <View style={styles.totalItem}>
              <Text style={styles.titleText}>Tổng tiền hàng:  </Text>
              <Text style={styles.contentText}>{formatCurrency(orderData.orderTotalPrice)} VND</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.titleText}>Tổng tiền phí vận chuyển:  </Text>
              <Text style={styles.contentText}>{formatCurrency(orderData.deliveryFee)} VND</Text>
            </View>
            <View style={styles.totalItem}>
              <Text style={styles.titleText}>Giảm giá phí vận chuyển:  </Text>
              <Text style={styles.contentText}>{formatCurrency(orderData.orderTotalDiscount)} VND</Text>
            </View>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text style={styles.totalAmount}>Tổng tiền:</Text>
          <Text style={styles.totalAmount}>{formatCurrency(totalPrice)} VND</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flex: 1,
    padding: '5%',
  },
  sectionContainer: {
    marginBottom: '5%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2%',
    marginTop: '2%',
  },
  itemDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  productInfo: {
    justifyContent: 'space-between',
    marginStart: '5%',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'lato-bold',
    color: '#151515',
  },
  productSize: {
    color: '#808080',
    fontSize: 16,
    fontFamily: 'lato-bold',
  },
  itemPrice: {
    fontSize: 20,
    fontFamily: 'lato-bold',
    color: '#151515',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoWrapper: {
    padding: '3%',
  },
  infoItem: {
    paddingBottom: '1%',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'lato-bold',
    color: '#151515',
  },
  contentText: {
    fontSize: 18,
    fontFamily: 'lato-regular',
    color: '#A3A3A3',
    width: '80%',
    height: '100%',
  },
  sectionText: {
    fontSize: 18,
    fontFamily: 'lato-bold',
    color: '#151515',
    marginStart: '3%',
  },
  totalItem: {
    paddingBottom: '1%',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '10%',
  },
  totalAmount: {
    fontSize: 25,
    fontFamily: 'lato-bold',
    color: '#151515',
  },
});
