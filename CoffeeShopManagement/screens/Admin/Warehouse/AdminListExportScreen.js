import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ViewProductCard from '../../../components/Admin/Card/ViewProductCard'
import { useNavigation } from '@react-navigation/native'

const AdminListExportScreen = ({ route }) => {
  const navigation = useNavigation();
  const { exportGoodsList } = route.params;
  const [mergedGoodsList, setMergedGoodsList] = useState([]);
  const [totalExportGoods, setTotalExportGoods] = useState(0);

  useEffect(() => {
    const mergeGoodsList = () => {
      const goodsMap = {};
      exportGoodsList.forEach(item => {
        if (goodsMap[item.goodsId]) {
          goodsMap[item.goodsId].goodsQuantity += Number(item.goodsQuantity);
        } else {
          goodsMap[item.goodsId] = { ...item, goodsQuantity: Number(item.goodsQuantity) };
        }
      });
      const mergedList = Object.values(goodsMap);
      setMergedGoodsList(mergedList);

      const total = mergedList.reduce((acc, cur) => acc + cur.goodsPrice * cur.goodsQuantity, 0);
      setTotalExportGoods(total);
    };

    mergeGoodsList();
  }, [exportGoodsList]);

  function formatVND(number) {
    return number.toLocaleString('vi-VN');
  }

  const renderExportGoodsList = () => {
    return mergedGoodsList.map((item, index) => (
      <ViewProductCard
        key={index}
        title={item.goodsName}
        unit={item.goodsUnit}
        quantity={item.goodsQuantity}
        price={item.goodsPrice}
        imageSource={item.goodsImage}
      />
    ));
  };

  const handleExportConfirm = () => {
    navigation.navigate("AdminWareHouse");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách xuất hàng hàng</Text>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderExportGoodsList()}
      </ScrollView>
      <View style={styles.costContaner}>
        <Text style={styles.costname}>Tổng cộng</Text>
        <Text style={styles.cost}>{formatVND(totalExportGoods)} VNĐ</Text>
      </View>
      <TouchableOpacity style={styles.colorButton} onPress={handleExportConfirm}>
        <Text style={styles.title}>Nhập hàng</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AdminListExportScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "3%"
  },
  bar: {
    flexDirection: "row",
    marginTop: "2%",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "3%"
  },
  goodListContainer: {
    flex: 1,
    marginTop: "2%",
  },
  costContaner: {
    marginVertical: "3%",
    marginHorizontal: "3%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  costname: {
    color: "#3a3a3a",
    fontSize: 25,
    fontWeight: "600",
  },
  cost: {
    color: "#F61A3D",
    fontSize: 25,
    fontWeight: "700",
  },
  colorButton: {
    borderRadius: 15,
    margin: "2%",
    paddingVertical: "5%",
    paddingHorizontal: "10%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00A188",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff"
  }
})