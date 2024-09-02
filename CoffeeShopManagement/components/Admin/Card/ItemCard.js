import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ItemCard = ({ title, price, imageSource, onPress, enablePress }) => {
    return (
        <Pressable
            style={styles.container}
            onPress={onPress}
            disabled={!enablePress}
            testID="itemCard"
        >
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={imageSource}
                    resizeMode="cover"
                    testID="itemImage"
                />
            </View>
            <View style={styles.main}>
                <Text style={styles.title} testID="itemTitle">
                    {title}
                </Text>
                <Text style={styles.price} testID="itemPrice">
                    {price}
                </Text>
            </View>
            {enablePress && (
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={30}
                    color="rgba(58,58,58,0.5)"
                    testID="arrowIcon"
                />
            )}
        </Pressable>
    );
};

export default ItemCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "1%",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        padding: "2%",
        backgroundColor: "#FFFFFF",
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 100,
        aspectRatio: 1,
    },
    main: {
        flex: 1,
        paddingHorizontal: "5%",
    },
    title: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 16,
        lineHeight: 20,
        fontFamily: "lato-bold",
    },
    price: {
        marginTop: "5%",
        color: "rgba(58,58,58,0.5)",
        fontSize: 16,
        fontFamily: "lato-regular",
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        backgroundColor: "#00A188",
        borderRadius: 100,
    },
});
