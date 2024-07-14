import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import React from "react";

const ViewProductCard = ({ title, quantity, price, imageSource, unit }) => {
    function formatVND(number) {
        return number.toLocaleString("vi-VN");
    }

    return (
        <SafeAreaView style={styles.container} testID="viewProductCard">
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: imageSource }}
                    resizeMode="cover"
                    testID="productImage"
                />
            </View>
            <View style={styles.main}>
                <Text style={styles.title} testID="productTitle">
                    {title}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text style={styles.label}>Số lượng: </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.label} testID="productQuantity">
                            {quantity}
                        </Text>
                        <Text style={styles.label} testID="productUnit">
                            {" "}
                            {unit}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <View>
                        <Text style={styles.label}>Giá nhập: </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.label} testID="productPrice">
                            {formatVND(Number(price))} VND
                        </Text>
                        <Text style={styles.label}>/{unit}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ViewProductCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginVertical: "1%",
        padding: "2%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.05)",
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.05)",
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
        paddingRight: "5%",
        paddingLeft: "3%",
    },
    title: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 20,
        marginBottom: "10%",
    },
    label: {
        color: "rgba(58,58,58,0.5)",
        fontSize: 16,
        lineHeight: 18,
        fontWeight: "500",
    },
});
