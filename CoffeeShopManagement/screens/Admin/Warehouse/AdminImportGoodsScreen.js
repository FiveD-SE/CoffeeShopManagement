import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import { useNavigation } from "@react-navigation/native";

import AddGoodButton from '../../../components/Admin/Button/AddGoodButton'
import SearchBar from '../../../components/Client/SearchBar'
import ProductCardwithPlus from '../../../components/Admin/Card/ProductCardwithPlus'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
import AddGoodModal from '../../../components/Admin/Modal/AddGoodModal';
import EditGoodInfoModal from '../../../components/Admin/Modal/EditGoodInfoModal';

const AdminImportGoodsScreen = () => {
  const navigation = useNavigation();
  const [goodsList, setGoodsList] = useState([]);
  const [selectedGoods, setSelectedGoods] = useState({});
  const [selectedGoodsList, setSelectedGoodsList] = useState([]);
  const [totalImportedGoods, setTotalImportedGoods] = useState(0);

  const goToListImport = () => {
    navigation.navigate("AdminListImport");
  };

  const [addNewModalVisible, setAddNewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const showAddNewModal = (item) => {
    setSelectedGoods(item);
    setAddNewModalVisible(true);
  };

  const hideAddNewModal = () => {
    setAddNewModalVisible(false);
  };

  const showEditGoodInfoModal = (item) => {
    setSelectedGoods(item);
    setEditModalVisible(true);
  };

  const hideEditGoodInfoModal = () => {
    setEditModalVisible(false);
  };

  const handleAddGoods = (newGoods) => {
    const updatedGoodsList = [...selectedGoodsList, newGoods];
    setSelectedGoodsList(updatedGoodsList);
    const label = updatedGoodsList.reduce((total, item) => total + (Number(item.goodsQuantity) || 0), 0);
    setTotalImportedGoods(label);
  };

  useEffect(() => {
    const fetchGoods = async () => {
        const goodsCollection = collection(db, 'goods');
        const goodsSnapshot = await getDocs(goodsCollection);
        const goodsListData = goodsSnapshot.docs.map(doc => doc.data());
        console.log(goodsListData)
        setGoodsList(goodsListData);
      };
      
      fetchGoods();
  }, [editModalVisible, addNewModalVisible]);

  const rendergoodsList = () => {
    return goodsList.map((item, index) => (
      <ProductCardwithPlus
        key={index}
        imageSource={{ uri: item.goodsImage }}
        name={item.goodsName}
        unit={item.goodsUnit}
        quantity={item.goodsQuantity}
        price={item.goodsPrice}
        onPressEdit={() => showEditGoodInfoModal(item)}
        onPressAddNew={() => showAddNewModal(item)}
      />
    ));
  };
  
  return (
    <View style={styles.container}>
      <AddGoodButton title="Thêm mặt hàng mới" />
      <Text style={styles.name}>Các mặt hàng sẵn có</Text>
      <View style={styles.sreachBar}>
        <SearchBar />
      </View>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {rendergoodsList()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.importName}>Số mặt hàng nhập mới:</Text>
          <Text style={styles.importNumber}>{totalImportedGoods.toString()}</Text>
        </View>
        <TouchableOpacity style={styles.colorButton}  onPress={goToListImport}>
            <Text style={styles.nameText}>Nhập hàng</Text>
        </TouchableOpacity>
      </View>
      <AddGoodModal visible={addNewModalVisible} onClose={hideAddNewModal} selectedGoods={selectedGoods} onAdd={handleAddGoods}/>
      <EditGoodInfoModal visible={editModalVisible} onClose={hideEditGoodInfoModal} selectedGoods={selectedGoods} />
    </View>
  )
}

export default AdminImportGoodsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "3%"
  },
  name: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "3%"
  },
  sreachBar: {
    flexDirection: "row",
    marginTop: "3%",
  },
  goodListContainer: {
    flex: 1,
    marginTop: "2%",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingHorizontal: "2%",
    paddingVertical: "2%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  importName: {
    color: "#3a3a3a",
    fontSize: 20,
    fontWeight: "700",
    marginRight: "2%",
  },
  importNumber: {
    color: "#00A188",
    fontSize: 25,
    fontWeight: "700",
  }, 
  colorButton: {
    borderRadius: 15,
    backgroundColor: "#00A188",
    paddingVertical: "4%",
    paddingHorizontal: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#ffffff"
  }
})