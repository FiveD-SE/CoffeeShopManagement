import React, { useRef } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    Animated,
    PanResponder,
} from "react-native";

const InteractiveCard = () => {
    const cardRef = useRef(null);
    const panRef = useRef(new Animated.ValueXY()).current;
    const scaleRef = useRef(new Animated.Value(1)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                Animated.spring(scaleRef, {
                    toValue: 1.1,
                    useNativeDriver: false,
                }).start();
            },
            onPanResponderMove: Animated.event(
                [null, { dx: panRef.x, dy: panRef.y }],
                {
                    useNativeDriver: false,
                }
            ),
            onPanResponderRelease: () => {
                Animated.parallel([
                    Animated.spring(panRef, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }),
                    Animated.spring(scaleRef, {
                        toValue: 1,
                        useNativeDriver: false,
                    }),
                ]).start();
            },
            onPanResponderTerminate: () => {
                Animated.parallel([
                    Animated.spring(panRef, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }),
                    Animated.spring(scaleRef, {
                        toValue: 1,
                        useNativeDriver: false,
                    }),
                ]).start();
            },
        })
    ).current;

    const getCardStyle = () => {
        const { x, y } = panRef;
        const rotateX = y.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ["-20deg", "0deg", "20deg"],
        });
        const rotateY = x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ["-20deg", "0deg", "20deg"],
        });
        return {
            ...styles.card,
            transform: [
                { perspective: 1500 },
                { rotateX },
                { rotateY },
                { scale: scaleRef },
            ],
        };
    };

    const getShadowStyle = () => {
        const { x, y } = panRef;
        const shadowOffsetX = x.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [20, 0, -20],
        });
        const shadowOffsetY = y.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: [-20, 0, 20],
        });
        return {
            ...styles.shadow,
            transform: [
                { translateX: shadowOffsetX },
                { translateY: shadowOffsetY },
            ],
        };
    };

    return (
        <View style={styles.container}>
            <Animated.View
                ref={cardRef}
                style={getCardStyle()}
                {...panResponder.panHandlers}
            >
                <Image
                    source={
                        require("../../../assets/images/membercard.png") || {
                            uri: "https://yourimageurl.com",
                        }
                    }
                    style={styles.image}
                />
            </Animated.View>
            <Animated.View style={getShadowStyle()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "100%",
        aspectRatio: 2,
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        aspectRatio: 2,
    },
    shadow: {
        position: "absolute",
        width: "100%",
        aspectRatio: 2,
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        zIndex: -1,
        transform: [{ translateX: 0 }, { translateY: 0 }],
    },
});

export default InteractiveCard;
