import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Branch({
    storeName,
    branchName,
    distance,
    image,
    onPress,
}) {
    return (
        <TouchableOpacity style={styles.root} onPress={onPress}>
            <View style={styles.image}>
                <Image source={image} style={styles.image} />
            </View>
            <View style={styles.content}>
                <View style={styles.title}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    <Text style={styles.branchName}>{branchName}</Text>
                </View>
                <Text style={styles.distance}>Cách đây {distance} km</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        width: "100%",
        padding: 15,
        alignItems: "center",
        rowGap: 15,
        columnGap: 15,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 1)",
        marginBottom: 10,
    },
    image: {
        width: 80,
        height: 80,
        flexShrink: 0,
        borderRadius: 5,
        backgroundColor: "rgba(203, 203, 212, 1)",
    },
    storeName: {
        color: "#9c9c9c",
        textAlign: "center",
        fontFamily: "Lato-Light",
        fontSize: 10,
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: 12,
        textTransform: "uppercase",
    },
    branchName: {
        color: "#3A3A3A",
        textAlign: "center",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontStyle: "normal",
        fontWeight: "600",
    },
    content: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexGrow: 1,
        flexShrink: 0,
        flexBasis: 0,
        alignSelf: "stretch",
    },
    title: {
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: 10,
        columnGap: 10,
    },
    distance: {
        color: "rgba(58, 58, 58, 0.501960813999176)",
        textAlign: "center",
        fontFamily: "Lato-Regular",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "400",
        lineHeight: 12,
    },
    button: {
        flexDirection: "row",
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
});
