import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    Image,
    StyleSheet,
    View,
    Dimensions,
    Animated,
} from "react-native";
import { db } from "../../services/firebaseService";
import { collection, onSnapshot } from "firebase/firestore"; // Import Firestore functions

const Carousel = () => {
    const flatlistRef = useRef();
    const scrollX = useRef(new Animated.Value(0)).current;
    const screenWidth =
        Dimensions.get("window").width - 0.1 * Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselData, setCarouselData] = useState([]);

    // Fetch promotions from Firestore
    useEffect(() => {
        const promotionsRef = collection(db, "promotions");
        const unsubscribe = onSnapshot(promotionsRef, (snapshot) => {
            const promotions = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(promotions);
            setCarouselData(promotions);
        });

        return unsubscribe;
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.itemContainer, { width: screenWidth }]}>
                <Image
                    source={{ uri: item.imageUrl }}
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
