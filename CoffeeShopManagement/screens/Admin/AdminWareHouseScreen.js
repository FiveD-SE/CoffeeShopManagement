import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import SearchBar from "../../components/Client/SearchBar";
import ColorButton from '../../components/Admin/ColorButton';
import { ScrollView } from 'react-native-gesture-handler';
import ProductCard from '../../components/Admin/ProductCard';

const AdminWareHouseScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.branchSelectContainer}>
                <TouchableOpacity style={styles.subtitleContainer}>
                    <FontAwesome5 name="map-marker-alt" size={20} color="#00A188" />
                    <Text style={[styles.normalText, { marginLeft: "3%" }]}>Chi nhánh trung tâm</Text>
                </TouchableOpacity>
                <View style={styles.subtitleContainer}>
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
                <ColorButton color="#FFA730" text="Nhập kho" textColor="#ffffff" />
                <ColorButton color="#00A188" text="Xuất kho" textColor="#ffffff" />
            </View>

            <ScrollView style={styles.goodListContainer} showsVerticalScrollIndicator={false}>
                <ProductCard
                    imageSource={require("../../assets/vietnam.png")}
                    title="Tên hàng hóa"
                    unit="Bịch"
                    price="100.000"
                    quantity="100" />
                <ProductCard
                    imageSource={require("../../assets/vietnam.png")}
                    title="Tên hàng hóa1"
                    unit="Bịch"
                    price="100.000"
                    quantity="100" />
                <ProductCard
                    imageSource={require("../../assets/vietnam.png")}
                    title="Tên hàng hóa2"
                    unit="Bịch"
                    price="100.000"
                    quantity="100" />
                <ProductCard
                    imageSource={require("../../assets/vietnam.png")}
                    title="Tên hàng hóa3"
                    unit="Bịch"
                    price="100.000"
                    quantity="100" />
                <ProductCard
                    imageSource={require("../../assets/vietnam.png")}
                    title="Tên hàng hóa4"
                    unit="Bịch"
                    price="100.000"
                    quantity="100" />
                <ProductCard
                    imageSource={require("../../assets/vietnam.png")}
                    title="Tên hàng hóa5"
                    unit="Bịch"
                    price="100.000"
                    quantity="100" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default AdminWareHouseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
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

    subtitleContainer: {
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