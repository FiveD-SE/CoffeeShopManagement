import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../../components/Client/SearchBar";
import ColorButton from '../../../components/Admin/Button/ColorButton';
import { ScrollView } from 'react-native-gesture-handler';
import ProductCard from '../../../components/Admin/Card/ProductCard';
import { db } from '../../../services/firebaseService';
import { collection, getDocs } from 'firebase/firestore';


const AdminWareHouseScreen = () => {
    const navigation = useNavigation();
    const [goodsList, setGoodsList] = useState([]);

    const goToImportGoodsScreen = () => {
        navigation.navigate("AdminImportGoods");
    };

    const goToExportGoodsScreen = () => {
        navigation.navigate("AdminExportGoods");
    };

    useEffect(() => {
        const fetchGoods = async () => {
            const goodsCollection = collection(db, 'goods');
            const goodsSnapshot = await getDocs(goodsCollection);
            const goodsListData = goodsSnapshot.docs.map(doc => doc.data());
            setGoodsList(goodsListData);
        };

        fetchGoods();
    }, []);

    const rendergoodsList = () => {
        return goodsList.map((item, index) => (
            <ProductCard
                key={index}
                imageSource={{uri: item.goodsImage }}
                name={item.goodsName}
                unit={item.goodsUnit}
                quantity={item.goodsQuantity}
                price={item.goodsPrice}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.branchSelectContainer}>
                <TouchableOpacity style={styles.subnameContainer}>
                    <FontAwesome5 name="map-marker-alt" size={20} color="#00A188" />
                    <Text style={[styles.normalText, { marginLeft: "3%" }]}>Chi nhánh trung tâm</Text>
                </TouchableOpacity>
                <View style={styles.subnameContainer}>
                    <Text style={styles.greenText}>5</Text>
                    <Text style={styles.normalText}>Mặt hàng - Số lượng trong kho:</Text>
                    <Text style={styles.greenText}>100</Text>
                </View>
            </View>

            <View style={styles.sreachBar}>
                <SearchBar />
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="filter" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
                <ColorButton color="#FFA730" text="Nhập kho" textColor="#ffffff" OnPress={goToImportGoodsScreen} />
                <ColorButton color="#00A188" text="Xuất kho" textColor="#ffffff" OnPress={goToExportGoodsScreen} />
            </View>

            <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
                {rendergoodsList()}
            </ScrollView>
        </View>
    )
}

export default AdminWareHouseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "3%",
        paddingTop: "10%"
    },

    sreachBar: {
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
})