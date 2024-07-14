import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const CategoryIcon = ({ iconSource, size, name, onPress }) => {
    return (
        <View style={styles.container} testID="categoryIcon">
            <TouchableOpacity
                onPress={onPress}
                style={[styles.iconButton, { width: size, height: size }]}
                testID="iconButton"
            >
                <Image
                    source={iconSource}
                    style={styles.icon}
                    testID="iconImage"
                />
            </TouchableOpacity>
            <Text style={styles.title} testID="iconTitle">
                {name}
            </Text>
        </View>
    );
};

export default CategoryIcon;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    iconButton: {
        padding: "16%",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.grey_50,
        backgroundColor: colors.white_100,
        shadowColor: colors.grey_100,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 10,
    },
    icon: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    title: {
        color: colors.black_100,
        fontSize: 12,
        fontFamily: "lato-bold",
        marginTop: "8%",
    },
});
