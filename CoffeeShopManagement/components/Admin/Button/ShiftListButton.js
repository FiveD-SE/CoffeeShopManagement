import React from "react";
import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const ShiftListButton = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={styles.roleButton}
            onPress={() => navigation.navigate("AddShift")}
            testID="shiftListButton"
        >
            <FontAwesome5
                name="business-time"
                size={13}
                color="#FFF"
                testID="businessTimeIcon"
            />
            <Text style={styles.text} testID="buttonText">
                Danh sách ca làm
            </Text>
        </TouchableOpacity>
    );
};

export default ShiftListButton;

const styles = StyleSheet.create({
    roleButton: {
        backgroundColor: "#006c5e",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "3%",
        marginHorizontal: "3%",
        marginTop: "1%",
    },
    text: {
        paddingStart: "2%",
        color: "#fff",
        fontFamily: "lato-bold",
        fontSize: 14,
    },
});
