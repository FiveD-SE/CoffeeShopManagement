import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import OptionModal from '../Modal/OptionModal';
const VoucherCard = ({ itemName, imageSource, status, expiryDate }) => {

    const statusColor = status ? "#00A188" : "#F61A3D";
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const showOptionModal = () => {
        setOptionModalVisible(true);
    };

    const hideOptionModal = () => {
        setOptionModalVisible(false);
    };
    return (
        <View>
            <View style={styles.container} onLongPress={showOptionModal}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={imageSource} />
                </View>
                <View style={styles.main}>
                    <Text style={styles.title}>{itemName}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.label}>Trạng thái:</Text>
                        <Text style={[styles.status, { color: statusColor }]}>{status ? "Hoạt động" : "Không hoạt động"}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={styles.label}>Hết hạn:</Text>
                        <Text style={styles.label}>{expiryDate}</Text>
                    </View>
                </View>
            </View>
            <OptionModal visible={optionModalVisible} onClose={hideOptionModal} />
        </View>
    )
}

export default VoucherCard

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginVertical: "1%",
        paddingVertical: "2%",
        paddingHorizontal: "3%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.05)",
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.05)",
        borderRadius: 10,
    },
    image: {
        width: "100%",
        height: 100,
        aspectRatio: 1,
    },
    main: {
        flex: 1,
        padding: "2%",
    },
    title: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
        marginBottom: "10%",
    },
    label: {
        color: "#3a3a3a",
        fontSize: 13,
        fontWeight: "500",
        marginBottom: "1%",
        marginRight: "2%"
    },
    status: {
        fontSize: 13,
        fontWeight: "500",
        marginBottom: "1%"
    },
})