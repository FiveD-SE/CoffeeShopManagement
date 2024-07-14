import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddNewVoucherButton = () => {
    const navigation = useNavigation();

    const goToAddVoucherScreen = () => {
        navigation.navigate("AdminAddVoucher");
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={goToAddVoucherScreen}
                testID="addVoucherButton"
            >
                <View style={styles.titleContainer}>
                    <Entypo name="ticket" size={30} color="#F61A3D" />
                    <Text style={styles.title}>Thêm khuyến mãi mới</Text>
                </View>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={36}
                    color="#3a3a3a"
                />
            </TouchableOpacity>
        </View>
    );
};

export default AddNewVoucherButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 20,
        padding: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 17,
        color: "#3a3a3a",
        fontWeight: "600",
        marginLeft: "10%",
        fontFamily: "lato-bold",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
