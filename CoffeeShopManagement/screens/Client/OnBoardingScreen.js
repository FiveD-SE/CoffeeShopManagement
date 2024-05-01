import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    useWindowDimensions,
    Animated,
    TouchableOpacity,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const splashData = [
    {
        id: "1",
        title: "Năng Lượng Cho Mỗi Bước Chân",
        description:
            "Cà phê là tất cả những gì bạn cần để bắt đầu một ngày mới",
        image: require("../../assets/splashScreenImage/coffee-cup.png"),
    },
    {
        id: "2",
        title: "Uống Gì Hôm Nay?",
        description:
            "Dạo qua menu đa dạng với hàng chục loại thức uống để lựa chọn",
        image: require("../../assets/splashScreenImage/drink.png"),
    },
    {
        id: "3",
        title: "Ưu Đãi Hấp Dẫn",
        description:
            "Khám phá những ưu đãi đặc biệt cho thức uống yêu thích của bạn",
        image: require("../../assets/splashScreenImage/voucher.png"),
    },
    {
        id: "4",
        title: "Giao Hàng Nhanh Chóng",
        description: "Đặt hàng ngay để nhận giao hàng trong thời gian sớm nhất",
        image: require("../../assets/splashScreenImage/packaging.png"),
    },
];

const OnBoardingScreen = () => {
    const navigation = useNavigation();

    const goToSignIn = () => {
        navigation.navigate("SignInScreen");
    };

    const renderItems = ({ item }) => {
        return (
            <View style={[styles.container, { width }]}>
                <Image
                    source={item.image}
                    style={[styles.image, { width, resizeMode: "contain" }]}
                ></Image>
                <View style={{ flex: 0.3, justifyContent: "flex-end" }}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                </View>
            </View>
        );
    };

    const [showBackButton, setShowBackButton] = useState(true);
    const [showNextButton, setShowNextButton] = useState(true);
    const [showSkipButton, setShowSkipButton] = useState(true);
    const screenIndexRef = useRef(0);
    const { width } = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatlistRef = useRef(null);
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index);
    }).current;

    useEffect(() => {
        if (currentIndex == 0) {
            setShowSkipButton(true);
            setShowBackButton(false);
        } else {
            setShowSkipButton(false);
            setShowBackButton(true);
        }
    }, [currentIndex]);

    const scrollTo = () => {
        if (currentIndex < splashData.length - 1) {
            flatlistRef.current.scrollToIndex({ index: currentIndex + 1 });
            screenIndexRef.current = currentIndex + 1;
        } else {
            navigation.navigate("SignInScreen");
        }
    };

    const scrollBack = () => {
        if (currentIndex > 0) {
            flatlistRef.current.scrollToIndex({ index: currentIndex - 1 });
            screenIndexRef.current = currentIndex - 1;
        }
    };

    return (
        <View style={styles.container}>
            <Image
                style={{
                    flex: 0.2,
                    justifyContent: "center",
                    resizeMode: "contain",
                }}
                source={require("../../assets/splashScreenImage/AppLogo.png")}
            />
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={splashData}
                    renderItem={renderItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    ref={flatlistRef}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        {
                            useNativeDriver: false,
                        }
                    )}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                />
            </View>
            <View style={styles.paginator}>
                {splashData.map((_, i) => {
                    const inputRange = [
                        (i - 1) * width,
                        i * width,
                        (i + 1) * width,
                    ];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 20, 10],
                        extrapolate: "clamp",
                    });

                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View
                            style={[styles.dot, { width: dotWidth, opacity }]}
                            key={i.toString()}
                        />
                    );
                })}
            </View>
            <View style={styles.bottomContainer}>
                {showBackButton && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={scrollBack}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 500 }}>
                            {" "}
                            Quay lại
                        </Text>
                    </TouchableOpacity>
                )}

                {showSkipButton && (
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={goToSignIn}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 500 }}>
                            {" "}
                            Bỏ qua{" "}
                        </Text>
                    </TouchableOpacity>
                )}

                {showNextButton && (
                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={scrollTo}
                    >
                        <Ionicons
                            name="arrow-forward-outline"
                            size={28}
                            color="#ffffff"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "10%",
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },

    flatlistContainer: {
        flex: 1.5,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },

    image: {
        flex: 0.5,
        justifyContent: "center",
    },

    title: {
        fontWeight: "800",
        fontSize: 24,
        marginBottom: "3%",
        color: "#3A3A3A",
        textAlign: "center",
    },

    description: {
        fontWeight: "500",
        color: "#3A3A3A",
        textAlign: "center",
        paddingHorizontal: "13%",
    },

    paginatorContainer: {
        flex: 1,
    },

    paginator: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: "#B8A99A",
        marginHorizontal: 8,
    },

    bottomContainer: {
        backgroundColor: "#ffffff",
        flexDirection: "row",
        padding: "4%",
        alignItems: "center",
        justifyContent: "center",
    },
    nextButton: {
        padding: "2%",
        backgroundColor: "#887150",
        borderRadius: 50,
    },

    backButton: {
        flex: 1,
    },
});
