import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import BranchSelectBar from '../../../components/Admin/BranchSelectBar';
import ProductCardwithPrice from '../../../components/Admin/Card/ProductCardwithPrice';
import { collection, doc, setDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
const AdminListImportScreen = ({ route, goodsList }) => {
  const navigation = useNavigation();
  const { importGoodsList } = route.params;
  const [mergedGoodsList, setMergedGoodsList] = useState([]);
  const [totalImportGoods, setTotalImportGoods] = useState(0);

  useEffect(() => {
    const mergeGoodsList = () => {
      const goodsMap = {};
      importGoodsList.forEach(item => {
        if (goodsMap[item.goodsId]) {
          goodsMap[item.goodsId].goodsQuantity += Number(item.goodsQuantity);
        } else {
          goodsMap[item.goodsId] = { ...item, goodsQuantity: Number(item.goodsQuantity) };
        }
      });
      const mergedList = Object.values(goodsMap);
      setMergedGoodsList(mergedList);

      const total = mergedList.reduce((acc, cur) => acc + cur.goodsPrice * cur.goodsQuantity, 0);
      setTotalImportGoods(total);
    };

    mergeGoodsList();
  }, [importGoodsList]);

  function formatVND(number) {
    return number.toLocaleString('vi-VN');
  }

  const renderImportGoodsList = () => {
    return mergedGoodsList.map((item, index) => (
      <ProductCardwithPrice
        key={index}
        name={item.goodsName}
        unit={item.goodsUnit}
        quantity={item.goodsQuantity}
        price={item.goodsPrice}
        imageSource={item.goodsImage}
      />
    ));
  };

  const handlePostImportGoods = async () => {
    try {
      await Promise.all(mergedGoodsList.map(async item => {
        const goodsQuery = query(collection(db, 'warehouse'), where('goodsId', '==', item.goodsId));
        const querySnapshot = await getDocs(goodsQuery);
        if (!querySnapshot.empty) {
          const existingDoc = querySnapshot.docs[0];
          const existingData = existingDoc.data();
          const newQuantity = existingData.goodsQuantity + item.goodsQuantity;
          await updateDoc(existingDoc.ref, {
            goodsQuantity: newQuantity
          });
        } else {
          const warehouseDocRef = doc(collection(db, 'warehouse'));
          const newWarehouseId = warehouseDocRef.id;
          await setDoc(warehouseDocRef, {
            warehouseItemId: newWarehouseId,
            goodsId: item.goodsId,
            goodsName: item.goodsName,
            goodsUnit: item.goodsUnit,
            goodsQuantity: item.goodsQuantity,
            goodsPrice: item.goodsPrice,
            goodsImage: item.goodsImage,
          });
        }
      }));

      await Promise.all(importGoodsList.map(async item => {
        const goodsQuery = query(collection(db, 'goods'), where('goodsId', '==', item.goodsId));
        const querySnapshot = await getDocs(goodsQuery);
        if (!querySnapshot.empty) {
          const existingDoc = querySnapshot.docs[0];
          const existingData = existingDoc.data();
          const newQuantity = existingData.goodsQuantity - item.goodsQuantity;
          await updateDoc(existingDoc.ref, {
            goodsQuantity: newQuantity
          });
        }
      }));

      Alert.alert("Nhập hàng thành công", "Mặt hàng đã được nhập vào kho");
      setMergedGoodsList([]);
      setTotalImportGoods(0);
      navigation.navigate("AdminWareHouse");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Nhập hàng thất bại", "Vui lòng thử lại sau");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <BranchSelectBar branchName="Chi nhánh trung tâm" />
      </View>
      <Text style={styles.name}>Danh sách nhập hàng</Text>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderImportGoodsList()}
      </ScrollView>
      <View style={styles.costContaner}>
        <Text style={styles.costname}>Tổng cộng</Text>
        <Text style={styles.cost}>{formatVND(totalImportGoods)} VNĐ</Text>
      </View>
      <TouchableOpacity style={styles.colorButton} onPress={handlePostImportGoods}>
        <Text style={styles.title}>Nhập hàng</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    goodsList: state.admin.goodsList,
  };
};

export default connect(mapStateToProps)(AdminListImportScreen);

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
  name: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "3%",
    fontFamily: "lato-bold"
  },
  goodListContainer: {
    flex: 1,
    marginTop: "2%",
  },
  costContaner: {
    marginVertical: "3%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  costname: {
    color: "#3a3a3a",
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "lato-bold"
  },
  cost: {
    color: "#F61A3D",
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "lato-bold"
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
    color: "#ffffff",
    fontFamily: "lato-bold"
  }
});
