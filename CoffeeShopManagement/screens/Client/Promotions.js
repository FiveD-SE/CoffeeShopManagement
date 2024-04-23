import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Pressable, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'

const VoucherItem = ({ item }) => (
  <Pressable style={styles.item}>
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemExpiry}>Hết hạn: {item.expiryDate}</Text>
      </View>
  </Pressable>
);

export default function Promotions() {
  const coupon = require('../../assets/coupon.png');
  const crown = require('../../assets/crown.png');
  const bean = require('../../assets/bean.png');
  const gift = require('../../assets/gift.png');
  const rights = require('../../assets/rights.png');

  const [beanTotal, setbeanTotal] = useState('0')

  const vouchers = [
    { id: 1, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-01', option: 'Giao hàng', image: require('../../assets/voucher.jpeg') },
    { id: 2, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-04-25', option: 'Tại chỗ', image: require('../../assets/voucher.jpeg') },
    { id: 3, name: 'Combo Cơm Nhà 89K + Freeship', expiryDate: '2024-05-04', option: 'Mang đi', image: require('../../assets/voucher.jpeg') },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.heading}>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={[styles.textColumn, { fontSize: 20, fontWeight: '600' }]}>Ưu đãi</Text>
              <Text style={[styles.textColumn, { fontSize: 30, fontWeight: '700' }]}>Mới</Text>
              <Text style={[styles.textColumn, { fontSize: 15, fontWeight: '600' }]}>{beanTotal} bean</Text>
            </View>
            <TouchableOpacity style={styles.voucher}>
              <Image style={{ height: 20, width: 20, marginRight: 6}} source={coupon} resizeMode='contain' />
              <Text style={{
                fontFamily: 'Lato-Regular',
                color: '#006C5E',
                fontStyle: 'normal',
                fontSize: 13,
                fontWeight: '600',
                textAlign: 'center'
              }}>Voucher của tôi</Text>
            </TouchableOpacity>
          </View>

          <Image style={styles.barcode} />

          <Text style={styles.headingText}>Còn 100 BEAN nữa bạn sẻ thăng hạng.{"\n"}Đổi quà không ảnh hưởng tới việc thăng hạng của bạn{"\n"}Chưa tích điểm</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.component}>
              <Image style={{ height: 20, width: 20 }} source={crown} resizeMode='contain' />
              <Text style={styles.componentText}>Hạng thành viên</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.component}>
              <Image style={{ height: 20, width: 20 }} source={gift} resizeMode='contain' />
              <Text style={styles.componentText}>Đổi Bean</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.row, {marginTop: 20}]}>
            <TouchableOpacity style={styles.component}>
              <Image style={{ height: 20, width: 20 }} source={bean} resizeMode='contain' />
              <Text style={styles.componentText}>Lịch sử BEAN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.component}>
              <Image style={{ height: 20, width: 20 }} source={rights} resizeMode='contain' />
              <Text style={styles.componentText}>Quyền lợi của bạn</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.rowLabel}>
              <Text style={styles.rowLabelText}>Voucher của bạn</Text>
              <TouchableOpacity style={styles.viewMore}>
                <Text style={styles.viewMoreText}>Xem tất cả</Text>
              </TouchableOpacity>
          </View>

          <FlatList
              data={vouchers}
              renderItem={({ item }) => <VoucherItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.rowLabel}>
              <Text style={styles.rowLabelText}>Đổi voucher</Text>
              <TouchableOpacity style={styles.viewMore}>
                <Text style={styles.viewMoreText}>Xem tất cả</Text>
              </TouchableOpacity>
          </View>

          {/* Product component */}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    width: '100%',
    height: 330,
    backgroundColor: '#006C5E',
    paddingTop: 40,
    paddingHorizontal: 15,
    gap: 10
  },  
  row: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    gap: 20
  },    
  column: {
    flexDirection: 'column',
    justifyContent:'space-between'
  },  
  textColumn: {
    fontFamily: 'Lato-Regular',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15
  },  
  voucher: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 150,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  barcode: {
    height: 80,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  headingText: {
    fontFamily: 'Lato-Regular',
    color: '#FFFFFF',
    textAlign: 'flex-start',
    fontSize: 10,
    fontWeight: '500',
    marginLeft: 10
  },
  body: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  component: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    borderRadius: 5
  },
  componentIcon: {
    height: 20,
    width: 20
  },
  componentText: {
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
   section: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  rowLabel: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  rowLabelText: {
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#000000',
  },
  viewMore: {
    width: 90,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#FAEBDE',
    borderRadius: 10,
    marginTop: 20,
  },
  viewMoreText: {
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: '700',
    color: '#FFA730'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
},
itemImage: {
    width: 70,
    height: 70,
    marginRight: 20,
},
itemDetails: {
    flexDirection: 'column',
},
itemName: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 25,
},
itemExpiry: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
},
});