import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function AddNewShiftButton({ onPress }) {
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}
                testID="shiftIcon"
            >
                <View style={styles.titleContainer}>
                    <FontAwesome5
                        name="business-time"
                        size={24}
                        color="#00A188"
                    />
                    <Text style={styles.title}>Thêm ca làm việc mới</Text>
                </View>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={36}
                    color="#3a3a3a"
                />
            </TouchableOpacity>
        </View>
    );
}

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
        fontWeight: "600",
        marginLeft: "10%",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
