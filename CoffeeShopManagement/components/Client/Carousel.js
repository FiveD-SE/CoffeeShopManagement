import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, View, Dimensions } from "react-native";

const Carousel = () => {
    const flatlistRef = useRef();
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);

    const carouselData = [
        {
            id: "01",
            image: require("../../assets/promotion1.jpg"),
        },
        {
            id: "02",
            image: require("../../assets/promotion2.jpg"),
        },
        {
            id: "03",
            image: require("../../assets/promotion3.jpg"),
        },
    ];

    const renderItem = ({ item }) => {
        return (
            <View
                style={{
                    width: screenWidth,
                    height: 150,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={item.image}
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
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
});
