import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

import { MaterialIcons } from "@expo/vector-icons";

const PaymentMethodButton = ({ title, imageSource, isChecked, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[
                styles.container,
                {
                    backgroundColor: isChecked
                        ? "rgba(0, 108, 94, 0.05)"
                        : "#FFFFFF",
                },
            ]}
        >
            <View
                style={{ flex: 1, flexDirection: "row", alignItems: "center" }}
            >
                <Image
                    source={imageSource}
                    style={{ maxWidth: 30, maxHeight: 30 }}
                />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View>
                <MaterialIcons
                    name={
                        isChecked
                            ? "radio-button-checked"
                            : "radio-button-unchecked"
                    }
                    size={24}
                    color={isChecked ? "#006C5E" : "#3a3a3a"}
                />
            </View>
        </Pressable>
    );
};

export default PaymentMethodButton;

const styles = StyleSheet.create({
    container: {
        minHeight: 48,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.1)",
        borderRadius: 10,
        padding: "4%",
        alignItems: "center",
        marginVertical: "1%",
    },
    title: {
        color: "#3a3a3a",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: "5%",
    },
    checkbox: {
        borderColor: "#3a3a3a",
        borderRadius: 100,
    },
});
