import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const PromotionCard = ({
    promotionName,
    promotionContent,
    dateCreated,
    imageSource,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: imageSource }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.main}>
                <Text style={styles.name}>{promotionName}</Text>
                <Text style={styles.description}>{promotionContent}</Text>
                <Text style={styles.date}>Ngày tạo: {dateCreated}</Text>
            </View>
        </View>
    );
};

export default PromotionCard;

const styles = StyleSheet.create({
    appContainer: {
        padding: 10,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
    },
    container: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        marginVertical: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "rgba(58,58,58,0.05)",
    },
    imageContainer: {
        width: "100%",
        aspectRatio: 3 / 1, // 3:1 aspect ratio
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    main: {
        width: "100%",
        padding: 10,
    },
    name: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 20,
        marginBottom: 5,
        fontFamily: "lato-bold",
    },
    description: {
        color: "rgba(58,58,58,0.5)",
        fontSize: 16,
        marginBottom: 5,
        fontFamily: "lato-regular",
    },
    date: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "500",
        fontFamily: "lato-bold",
        fontStyle: "italic",
    },
});
