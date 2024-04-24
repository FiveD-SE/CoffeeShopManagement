import { View, Text, StyleSheet, SafeAreaView, Pressable, Image } from 'react-native'
import React from 'react'

export default function History() {
  const exchangedItemList = [
    {
      brandname: 'Riot.vn',
      title: "[RIOT] Giảm 30% cho người chơi nạp lần đầu",
      point: 100,
    imageSource: require("../../../assets/voucher.jpeg"),
    },
    {
      brandname: 'Riot.vn',
      title: "[RIOT] Giảm 30% cho người chơi nạp lần đầu",
      point: 100,
      imageSource: require("../../../assets/voucher.jpeg"),
    },
    {
      brandname: 'Riot.vn',
      title: "[RIOT] Giảm 30% cho người chơi nạp lần đầu",
      point: 100,
      imageSource: require("../../../assets/voucher.jpeg"),
    },
  ];

  const renderExchangedItemList = (item, index) => (
    <Pressable key={index} style={styles.item}>
      <Image source={item.imageSource} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemBrand}>{item.brandname}</Text>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      <View style={styles.column}>
        <View style={styles.itemPointContainer}>
          <Text style={styles.itemPoint}>{item.point}</Text>
        </View>
        <Text style={{
          fontFamily: 'Lato-Regular',
          fontSize: 13,
          color: '#333',
        }}>BEAN</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Lịch sử đổi thưởng</Text>
      {exchangedItemList.map((item, index) => 
        renderExchangedItemList(item, index)
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#F9F9F9',
  },
  text: {
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    lineHeight: 30
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    padding: 15,
  },
  itemImage: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    gap: 10,
  },
  itemBrand: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#A6A6AA',
    marginBottom: 5,
  },
  itemTitle: {
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    color: '#000000',
  },
  itemPointContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EDF9F0',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemPoint: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: '#4ECB71',
  },
  column: {
    flexDirection: 'column',
    justifyContent:'space-between',
    alignItems: 'center',
    gap: 10,
  }
});
