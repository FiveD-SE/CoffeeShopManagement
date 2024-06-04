import { View, Text, Modal, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryIcon from '../../Client/Button/CategoryIcon';
import ModalHeader from '../../Client/Header/ModalHeader'
import CategoryItemList from '../../Client/List/CategoryItemList';
import { colors } from '../../../assets/colors/colors';
const COFFEE_ICON = require("../../../assets/images/coffee.png");
const JUICE_ICON = require("../../../assets/images/juice.png");
const MILKTEA_ICON = require("../../../assets/images/milktea.png");
const ICE_BLENDED_ICON = require("../../../assets/images/ice-blended.png");

const categoriesData = [
    { type: "Cà phê", iconSource: COFFEE_ICON },
    { type: "Trà sữa", iconSource: MILKTEA_ICON },
    { type: "Nước trái cây", iconSource: JUICE_ICON },
    { type: "Đá xay", iconSource: ICE_BLENDED_ICON },
];
const ItemTypeModal = ({ visible, onClose, setItemType }) => {

    const handleSelectItemType = (itemType) => {
        setItemType(itemType);
        onClose();
    };

    const renderCategoryItemList = () => {
        return (
            <View style={styles.container}>
                {categoriesData.map((category, index) => (
                    <CategoryIcon
                        key={index}
                        iconSource={category.iconSource}
                        size={64}
                        OnPress={() => handleSelectItemType(category.type)}
                        name={category.type}
                    />
                ))}
            </View>
        );
    };

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
                        {renderCategoryItemList()}
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
        height: "25%",
    },
    container: {
        flexDirection: "row",
        borderColor: colors.grey_50,
        backgroundColor: colors.grey_20,
        justifyContent: "space-between",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    imageContainer: {
        marginTop: "5%",
        flexDirection: "row",
        justifyContent: "center"
    },
    main: {

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
        paddingVertical: "1%"
    },
    columnWrapper: {
        justifyContent: "space-between",
        paddingVertical: "2%"
    },
});