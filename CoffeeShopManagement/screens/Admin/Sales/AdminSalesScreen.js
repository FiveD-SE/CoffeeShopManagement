import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const AdminSalesScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.sectionContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Danh sách sản phẩm</Text>
                    <TouchableOpacity style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>Xem thêm</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={12} color="#00A188" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Danh sách voucher</Text>
                    <TouchableOpacity style={styles.subtitleContainer}>
                        <Text style={styles.subtitle}>Xem thêm</Text>
                        <MaterialIcons name="keyboard-arrow-right" size={12} color="#00A188" />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default AdminSalesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: "5%",
        paddingTop: "9%"
    },
    sectionContainer: {
        marginTop: "5%",
        backgroundColor: "#ffffff",
        paddingHorizontal: "2%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor:"#D8D8D8"
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
    },
    subtitleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    subtitle: {
        color: "#00A188",
        fontSize: 14,
        fontWeight: "700",
    },
})