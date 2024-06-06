import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import SearchBar from '../../../components/Client/SearchBar'
import ProductCardwithMinus from '../../../components/Admin/Card/ProductCardwithMinus';
import BranchSelectBar from '../../../components/Admin/BranchSelectBar'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
import ExportGoodModal from '../../../components/Admin/Modal/ExportGoodModal';
const AdminExportGoodsScreen = () => {
  const navigation = useNavigation();
  const [GoodsList, setGoodsList] = useState([]);
  const [selectedGoods, setSelectedGoods] = useState({});
  const [exportGoodsList, setExportGoodsList] = useState([]);
  const [totalExportGoods, setTotalExportGoods] = useState(0);

  const goToListExport = () => {
    navigation.navigate("AdminListExport", { exportGoodsList: exportGoodsList });
  };

  const [modalVisible, setModalVisible] = useState(false);

  const showExportGoodModal = (item) => {
    setSelectedGoods(item);
    setModalVisible(true);
  };

  const hideExportGoodModal = () => {
    setModalVisible(false);
  };
  
  useEffect(() => {
    const fetchGoods = async () => {
        const goodsCollection = collection(db, 'warehouse');
        const goodsSnapshot = await getDocs(goodsCollection);
        const goodsListData = goodsSnapshot.docs.map(doc => doc.data());
        setGoodsList(goodsListData);
    };

    fetchGoods();
  }, [modalVisible]);

  const renderGoodsList = () => {
    return GoodsList.map((item, index) => (
      <ProductCardwithMinus
        key={index}
        imageSource={{uri: item.goodsImage }}
        title={item.goodsName}
        unit={item.goodsUnit}
        quantity={item.goodsQuantity}
        price={item.goodsPrice}
        onPress={() => showExportGoodModal(item)}
      />
    ));
  };

  const handleExportGoods = (exportGoods) => {
    if (!exportGoodsList) {
      setExportGoodsList([exportGoods]);
    } else {
      setExportGoodsList([...exportGoodsList, exportGoods]);
    }
    setTotalExportGoods(Number(totalExportGoods) + Number(exportGoods?.goodsQuantity));
  }

  function formatVND(number) {
    return number.toLocaleString('vi-VN');
  }
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <BranchSelectBar branchName="ThanhTai1" />
      </View>
      <Text style={styles.title}>Các mặt hàng sẵn có</Text>
      <View style={styles.sreachBar}>
        <SearchBar />
      </View>
      <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
        {renderGoodsList()}
      </ScrollView>
      <ExportGoodModal visible={modalVisible} onClose={hideExportGoodModal} selectedGoods={selectedGoods} onMinus={handleExportGoods}/>
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.importName}>Số mặt hàng xuất kho:</Text>
          <Text style={styles.importNumber}>{formatVND(Number(totalExportGoods))}</Text>
        </View>
        <TouchableOpacity style={styles.colorButton}  onPress={goToListExport}>
            <Text style={styles.titleText}>Xuất hàng</Text>
        </TouchableOpacity>      
      </View>
    </View>
  )
}

export default AdminExportGoodsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "3%",
    paddingTop: "3%"
  },
  title: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginTop: "3%"
  },
  bar: {
    flexDirection: "row",
    marginTop: "2%",
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
  titleText: {
      fontSize: 16,
      fontWeight: "700",
      color: "#ffffff"
  }
})