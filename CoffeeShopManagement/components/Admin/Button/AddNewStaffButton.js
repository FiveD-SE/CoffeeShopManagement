import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "../../../assets/colors/colors";

const AddNewStaffButton = ({ onPress }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.container}
                onPress={onPress}
                testID="addStaffButton"
            >
                <View style={styles.titleContainer}>
                    <FontAwesome6
                        name="people-group"
                        size={30}
                        color={colors.green_100}
                    />
                    <Text style={styles.title}>Thêm nhân viên mới</Text>
                </View>
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#3a3a3a"
                />
            </TouchableOpacity>
        </View>
    );
};

export default AddNewStaffButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "#3a3a3a",
        fontSize: 16,
        marginLeft: "10%",
        fontFamily: "lato-bold",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
