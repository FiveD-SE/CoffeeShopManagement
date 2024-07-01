import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"; // Import các thành phần cần thiết từ react-native
import Icon from "react-native-vector-icons/Entypo";
import { colors } from "../../assets/colors/colors";

const StaffCard = ({
    cashierName,
    cashierPhone,
    cashierImage,
    role,
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
                    <Text
                        style={styles.role}
                    >
                        {role}
                    </Text>
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
    role: {
        color: colors.green_100,
        fontSize: 14,
        fontWeight: "500",
        marginTop: "2%",
        fontFamily: "lato-regular"
    },
});

export default StaffCard;
