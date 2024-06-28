import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    Dimensions,
    Animated,
} from "react-native";
import { colors } from "../../../assets/colors/colors";

const cardHeight = 150;
const imageWidth = 150;

const RecentlyViewedItem = ({ id, name, price, imageSource, onPress }) => {
    const scaleValue = new Animated.Value(1);

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[styles.container, { transform: [{ scale: scaleValue }] }]}
        >
            <Pressable
                onPress={onPress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
            >
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: imageSource }}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.main}>
                    <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {name}
                    </Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{price}</Text>
                    </View>
                </View>
            </Pressable>
        </Animated.View>
    );
};

export default RecentlyViewedItem;

const styles = StyleSheet.create({
    container: {
        width: 150,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.grey_50,
        backgroundColor: colors.white_100,
    },
    imageContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: "hidden",
        height: cardHeight,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    main: {
        flex: 1,
        flexDirection: "column",
        padding: "6%",
        justifyContent: "space-between",
    },
    title: {
        width: "100%",
        color: colors.black_100,
        fontSize: 16,
        fontFamily: "lato-bold",
        lineHeight: 24,
    },
    priceContainer: {
        backgroundColor: colors.green_20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10%",
        paddingVertical: "3%",
        borderRadius: 20,
    },
    price: {
        color: colors.green_100,
        fontSize: 14,
        fontFamily: "lato-regular",
    },
});
