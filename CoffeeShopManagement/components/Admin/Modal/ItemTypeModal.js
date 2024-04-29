import { View, Text, Modal, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryIcon from '../../Client/Button/CategoryIcon';
import ModalHeader from '../../Client/Header/ModalHeader'
const GOOGLE_ICON = require("../../../assets/google.png");
const FRUITS_ICON = require("../../../assets/fruits.png");
const MILKTEA_ICON = require("../../../assets/milktea.png");
const ItemTypeModal = ({ visible, onClose }) => {
    const categoriesData = [
        { type: "Category 1", iconSource: GOOGLE_ICON },
        { type: "Category 2", iconSource: GOOGLE_ICON },
        { type: "Category 1", iconSource: GOOGLE_ICON },
        { type: "Category 2", iconSource: GOOGLE_ICON },
        { type: "Category 2", iconSource: FRUITS_ICON },
        { type: "Category 2", iconSource: FRUITS_ICON },
        { type: "Category 2", iconSource: FRUITS_ICON },
        { type: "Category 2", iconSource: MILKTEA_ICON },
    ];

    const renderCategoryItemList = ({ item }) => (
        <CategoryIcon iconSource={item.iconSource} />
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title="Chọn loại sản phẩm" onClose={onClose} />
                    <View style={styles.main}>
                        <FlatList
                            data={categoriesData}
                            renderItem={renderCategoryItemList}
                            numColumns={4}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.listContent}
                            columnWrapperStyle={styles.columnWrapper}
                        />
                    </View>
                </View>
            </View>
        </Modal >
    )
}

export default ItemTypeModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#F8F7FA",
        borderRadius: 20,
        width: "90%",
        height: "28%",
    },
    imageContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center"
    },
    main: {
        paddingHorizontal: "3%",
        marginTop: "2%",
    },
    header: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "600",
        marginVertical: "4%"
    },
    title: {
        marginTop: "3%",
        color: "#3a3a3a",
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center"
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: "1%",
        padding: "5%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ECECEC"
    },
    listContent: {
        paddingHorizontal: "5%",
        paddingVertical:"2%"
      },
      columnWrapper: {
        justifyContent: "space-between",
      },
});