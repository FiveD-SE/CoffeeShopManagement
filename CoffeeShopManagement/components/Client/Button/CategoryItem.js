import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";

const CategoryItem = ({
    index,
    backgroundColor,
    icon,
    title,
    onPress,
    isSelected,
}) => {
    const handlePress = () => {
        onPress(index);
    };

    return (
        <TouchableOpacity
            style={[
                styles.categoryItemContainer,
                {
                    backgroundColor: `rgba(${backgroundColor}, 0.1)`,
                    borderColor: isSelected
                        ? `rgba(${backgroundColor}, 1)`
                        : "transparent",
                },
            ]}
            onPress={handlePress}
            testID="categoryItemButton"
        >
            <View>
                {icon ? (
                    <Image
                        source={icon}
                        style={styles.icon}
                        testID="iconImage"
                    />
                ) : (
                    <Icon name="ellipsis" size={24} testID="defaultIcon" />
                )}
            </View>
            <Text style={styles.categoryItemText} testID="categoryItemText">
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CategoryItem;

const styles = StyleSheet.create({
    categoryItemContainer: {
        flex: 1,
        marginRight: "2%",
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        borderRadius: 10,
        borderWidth: 2,
    },
    categoryItemText: {
        width: "100%",
        textAlign: "center",
        color: "#3a3a3a",
        fontSize: 14,
        fontWeight: "600",
        marginTop: "5%",
    },
    icon: {
        width: 24,
        height: 24,
    },
});
