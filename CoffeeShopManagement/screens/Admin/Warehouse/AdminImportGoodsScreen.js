import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from "@react-navigation/native";

import AddGoodButton from '../../../components/Admin/Button/AddGoodButton';
import SearchBar from '../../../components/Client/SearchBar';
import ProductCardwithPlus from '../../../components/Admin/Card/ProductCardwithPlus';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
import AddGoodModal from '../../../components/Admin/Modal/AddGoodModal';
import EditGoodInfoModal from '../../../components/Admin/Modal/EditGoodInfoModal';
import { goodsListSave, goodsListRenderSave } from '../../../redux/actions/adminActions';
import { connect } from 'react-redux';

const AdminImportGoodsScreen = ({ goodsListSave, goodsListRender, goodsListRenderSave }) => {
  const navigation = useNavigation();
  const [goodsList, setGoodsList] = useState([]);
  const [filteredGoodsList, setFilteredGoodsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGoods, setSelectedGoods] = useState({});
  const [importGoodsList, setImportGoodsList] = useState([]);
  const [totalImportGoods, setTotalImportGoods] = useState(0);

  const goToListImport = () => {
    navigation.navigate("AdminListImport", {
      importGoodsList: importGoodsList 
    });
  };

  const [addNewModalVisible, setAddNewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const showAddNewModal = (goods) => {
    goodsListRender.map(item => {
      if (item.goodsId === goods.goodsId) {
        setSelectedGoods(item);
      }
    })
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

  useEffect(() => {
    const fetchGoods = async () => {
      const goodsCollection = collection(db, 'goods');
      const goodsSnapshot = await getDocs(goodsCollection);
      const goodsListData = goodsSnapshot.docs.map(doc => doc.data());
      setGoodsList(goodsListData);
      setFilteredGoodsList(goodsListData);
      goodsListRenderSave(goodsListData)
    };

    fetchGoods();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredList = goodsList.filter(item => 
        item.goodsName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGoodsList(filteredList);
    } else {
      setFilteredGoodsList(goodsList);
    }
  };

  const handleAddImportGoods = (importGoods) => {
    if (!importGoodsList.length) {
      setImportGoodsList([importGoods]);
    } else {
      setImportGoodsList([...importGoodsList, importGoods]);
    }
    const updatedGoodsList = filteredGoodsList.map(item => {
      if (item.goodsId === importGoods.goodsId) {
        return {
          ...item,
          goodsQuantity: item.goodsQuantity - importGoods.goodsQuantity
        };
      }
      return item;
    });
    setFilteredGoodsList(updatedGoodsList);
    goodsListSave(importGoodsList);
    setTotalImportGoods(Number(totalImportGoods) + Number(importGoods.goodsQuantity));
  }

  function formatVND(number) {
    return number.toLocaleString('vi-VN');
  }

  const renderGoodsList = () => {
    return filteredGoodsList.map((item, index) => (
      <ProductCardwithPlus
        key={index}
        imageSource={{ uri: item.goodsImage }}
        name={item.goodsName}
        unit={item.goodsUnit}
        quantity={item.goodsQuantity}
        price={formatVND(Number(item.goodsPrice))}
        onPressEdit={() => showEditGoodInfoModal(item)}
        onPressAddNew={() => showAddNewModal(item)}
      />
    ));
  };

  return (
    <View style={styles.container}>
      <AddGoodButton title="Thêm mặt hàng mới" />
      <Text style={styles.name}>Các mặt hàng sẵn có</Text>
      <View style={styles.searchBar}>
        <SearchBar onChangeText={handleSearch} />
      </View>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderGoodsList()}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.importName}>Số mặt hàng nhập mới:</Text>
          <Text style={styles.importNumber}>{totalImportGoods}</Text>
        </View>
        <TouchableOpacity style={styles.colorButton} onPress={goToListImport}>
          <Text style={styles.nameText}>Nhập hàng</Text>
        </TouchableOpacity>
      </View>
      <AddGoodModal visible={addNewModalVisible} onClose={hideAddNewModal} selectedGoods={selectedGoods} onAdd={handleAddImportGoods} />
      <EditGoodInfoModal visible={editModalVisible} onClose={hideEditGoodInfoModal} selectedGoods={selectedGoods} />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    goodsListRender: state.admin.goodsListRender,
  };
}

const mapDispatchToProps = {
  goodsListSave,
  goodsListRenderSave
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminImportGoodsScreen);

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
  searchBar: {
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
});
