import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddNewItemButton = () => {
    const navigation = useNavigation();

    const goToAddItemScreen = () => {
        navigation.navigate("AdminAddItem");
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={goToAddItemScreen}
                testID="addIcon"
            >
                <View style={styles.titleContainer}>
                    <MaterialIcons name="add-box" size={30} color="#FFA730" />
                    <Text style={styles.title}>Thêm sản phẩm mới</Text>
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

export default AddNewItemButton;

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
