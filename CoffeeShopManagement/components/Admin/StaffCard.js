import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"; // Import các thành phần cần thiết từ react-native
import Icon from "react-native-vector-icons/Entypo";

const StaffCard = ({
    cashierName,
    cashierPhone,
    cashierImage,
    onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.staffItem}>
            <View style={{ flexDirection: "row" }}>
                <Image
                    style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "#cbcbd4",
                        borderRadius: 10,
                    }}
                    source={{ uri: cashierImage }}
                />
                <View
                    style={{
                        marginStart: "5%",
                        justifyContent: "space-between",

                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {cashierName}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#808080" }}>
                        {cashierPhone}
                    </Text>
                    <View
                        style={{
                            backgroundColor: "#edfaf1",
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: "5%",
                            width: 100,
                            height: 30
                        }}
                    >
                        <Text
                            style={{ color: "#5bcf7c", fontSize: 14 }}
                        >
                            Nhân viên
                        </Text>
                    </View>
                </View>
            </View>
            <Icon name="chevron-right" size={32} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    staffItem: {
        backgroundColor: "#fff",
        padding: "5%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: "3%",
    },
});

export default StaffCard;
