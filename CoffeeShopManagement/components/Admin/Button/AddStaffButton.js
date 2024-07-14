import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const AddStaffButton = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}
                testID="addStaffButton"
            >
                <View style={styles.titleContainer}>
                    <MaterialIcons
                        testID="addIcon"
                        name="add-box"
                        size={30}
                        color={colors.green_100}
                    />
                    <Text style={styles.title}>Thêm nhân viên vào ca</Text>
                </View>
                <MaterialIcons
                    testID="arrowIcon"
                    name="keyboard-arrow-right"
                    size={36}
                    color="#3a3a3a"
                />
            </TouchableOpacity>
        </View>
    );
};

export default AddStaffButton;

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
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: "10%",
        fontFamily: "lato-bold",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
