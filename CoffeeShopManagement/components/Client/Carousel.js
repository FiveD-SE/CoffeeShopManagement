import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    View,
    Dimensions,
    Animated,
} from "react-native";

const Carousel = () => {
    const flatlistRef = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;
    const screenWidth =
        Dimensions.get("window").width - 0.1 * Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);

    const carouselData = [
        {
            id: "01",
            image: require("../../assets/promotions/1.png"),
        },
        {
            id: "02",
            image: require("../../assets/promotions/2.png"),
        },
        {
            id: "03",
            image: require("../../assets/promotions/3.png"),
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.itemContainer, { width: screenWidth }]}>
                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="stretch"
                />
            </View>
        );
    };

    useEffect(() => {
        let interval = setInterval(() => {
            const nextIndex = (activeIndex + 1) % carouselData.length;
            flatlistRef.current.scrollToIndex({
                index: nextIndex,
                animated: true,
            });
            setActiveIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);
    }, [activeIndex, carouselData.length]);

    useEffect(() => {
        const listener = scrollX.addListener(({ value }) => {
            const index = Math.round(value / screenWidth);
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        });

        return () => {
            scrollX.removeListener(listener);
        };
    }, [scrollX, activeIndex]);

    return (
        <View style={styles.carouselContainer}>
            <FlatList
                data={carouselData}
                ref={flatlistRef}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                getItemLayout={(data, index) => ({
                    length: screenWidth,
                    offset: screenWidth * index,
                    index,
                })}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />
        </View>
    );
};

export default Carousel;

const styles = StyleSheet.create({
    carouselContainer: {
        borderRadius: 10,
        overflow: "hidden",
    },
    itemContainer: {
        aspectRatio: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});
