import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import SearchBar from "../../../components/Client/SearchBar";
import ColorButton from '../../../components/Admin/Button/ColorButton';
import ProductCard from '../../../components/Admin/Card/ProductCard';
import { db } from '../../../services/firebaseService';
import { collection, getDocs } from 'firebase/firestore';

const AdminWareHouseScreen = () => {
    const navigation = useNavigation();
    const [goodsList, setGoodsList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGoodsList, setFilteredGoodsList] = useState([]);
    const [goodsCount, setGoodsCount] = useState(0);
    const [totalGoods, setTotalGoods] = useState(0);
    const [isSortedAscending, setIsSortedAscending] = useState(true);

    const goToImportGoodsScreen = () => {
        navigation.navigate("AdminImportGoods");
    };

    const goToExportGoodsScreen = () => {
        navigation.navigate("AdminExportGoods");
    };

    const fetchGoods = async () => {
        const goodsCollection = collection(db, 'warehouse');
        const goodsSnapshot = await getDocs(goodsCollection);
        const goodsListData = goodsSnapshot.docs.map(doc => doc.data());
        setGoodsList(goodsListData);
        setFilteredGoodsList(goodsListData);
        setGoodsCount(goodsListData.length);
        const totalGoods = goodsListData.reduce((acc, item) => acc + item.goodsQuantity, 0);
        setTotalGoods(totalGoods);
    };

    useFocusEffect(
        useCallback(() => {
            fetchGoods();
        }, [])
    );

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

    const renderGoodsList = () => {
        return filteredGoodsList.map((item, index) => (
            <ProductCard
                key={index}
                imageSource={{ uri: item.goodsImage }}
                name={item.goodsName}
                unit={item.goodsUnit}
                quantity={item.goodsQuantity}
                price={item.goodsPrice}
            />
        ));
    };
    const handleFilter = () => {
        const sortedList = [...filteredGoodsList].sort((a, b) => {
            if (isSortedAscending) {
                return a.goodsQuantity - b.goodsQuantity;
            } else {
                return b.goodsQuantity - a.goodsQuantity;
            }
        });
    
        setFilteredGoodsList(sortedList);
        setIsSortedAscending(!isSortedAscending);
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.branchSelectContainer}>
                <TouchableOpacity style={styles.subnameContainer}>
                    <FontAwesome5 name="map-marker-alt" size={20} color="#00A188" />
                    <Text style={[styles.normalText, { marginLeft: "3%" }]}> Chi nhánh trung tâm</Text>
                </TouchableOpacity>
                <View style={styles.subnameContainer}>
                    <Text style={styles.greenText}>{goodsCount}</Text>
                    <Text style={styles.normalText}>Mặt hàng - Số lượng trong kho:</Text>
                    <Text style={styles.greenText}>{totalGoods}</Text>
                </View>
            </View>

            <View style={styles.searchBar}>
                <SearchBar onChangeText={handleSearch} />
                <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
                    <MaterialCommunityIcons name={isSortedAscending ? "filter-variant-minus" : "filter-variant-plus"} size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <ColorButton color="#FFA730" text="Nhập kho" textColor="#ffffff" OnPress={goToImportGoodsScreen} />
                <ColorButton color="#00A188" text="Xuất kho" textColor="#ffffff" OnPress={goToExportGoodsScreen} />
            </View>

            <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
                {renderGoodsList()}
            </ScrollView>
        </View>
    );
};

export default AdminWareHouseScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "3%",
        paddingTop: "10%"
    },

    searchBar: {
        justifyContent: "space-between",
        flexDirection: "row",
        marginVertical: "3%",
    },

    filterButton: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 15,
        padding: "3%",
        marginLeft: "2%",
        borderColor: "#CCCCCC",
        backgroundColor: "#ffffff"
    },

    branchSelectContainer: {
        marginVertical: "3%",
        padding: "3%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: "#ffffff"
    },

    subnameContainer: {
        flexDirection: "row",
        alignItems: "center"
    },

    greenText: {
        color: "#00A188",
        fontSize: 12,
        fontWeight: "700",
    },

    normalText: {
        margin: "2%",
        color: "#3A3A3A",
        fontSize: 12,
        fontWeight: "700",
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    goodListContainer: {
        flex: 1,
    }
});
