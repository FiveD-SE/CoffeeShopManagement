import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const ChooseDeliveryButton = ({ title, onPress }) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title} testID="titleText">
                {title}
            </Text>
            <Pressable
                style={styles.buttonContainer}
                onPress={onPress}
                testID="chooseButton"
            >
                <Text style={styles.buttonText} testID="buttonText">
                    Chọn
                </Text>
            </Pressable>
        </View>
    );
};

export default ChooseDeliveryButton;

const styles = StyleSheet.create({
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
    buttonContainer: {
        minHeight: 48,
        backgroundColor: colors.green_20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: "2%",
        paddingHorizontal: "6%",
        borderRadius: 30,
        elevation: 2,
    },
    buttonText: {
        marginRight: "5%",
        color: "#00A188",
        fontSize: 14,
        fontWeight: "700",
    },
});
