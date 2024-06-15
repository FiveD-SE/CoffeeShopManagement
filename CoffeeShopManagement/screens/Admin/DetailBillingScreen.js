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
          {orderData.products.map((item, index) => {
            let itemStyle = styles.itemIndex;
            if (orderData.products.length === 1) {
              itemStyle = styles.item;
            } else if (index === orderData.products.length - 1) {
              itemStyle = styles.itemIndexEnd;
            } else {
              itemStyle = styles.itemIndexStart;
            }

            return (
              <View key={index} style={itemStyle}>
                <View style={styles.itemDetails}>
                  <Image source={{ uri: item.productImage }} style={styles.productImage} />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>x{item.quantity} {item.productName}</Text>
                    <Text style={styles.productSize}>{item.size}</Text>
                  </View>
                </View>
                <Text style={styles.itemPrice}>{formatCurrency(item.totalPrice)} VND</Text>
              </View>
            );
          })}
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
    backgroundColor: '#F8F7FA',
  },
  section: {
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '2%',
  },
  sectionContainer: {
    marginBottom: '5%',
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
  itemIndexStart: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: '#A3A3A3A3',
  },
  itemIndex: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderColor: '#A3A3A3A3',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  itemIndexEnd: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#A3A3A3A3',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '3%',
    backgroundColor: '#FFFFFF',
    borderColor: '#A3A3A3A3',
    borderWidth: 1,
    borderRadius: 20,
  }
});
