import { Ionicons } from "@expo/vector-icons";
import { Animated, Dimensions } from "react-native";
import { useState, useRef } from "react";

function TabBarIcon({ focused, name, color }) {
    const [isPressed, setIsPressed] = useState(false);
    const iconAnimation = useRef(new Animated.Value(focused ? 1 : 0)).current;

    const handlePressIn = () => {
        setIsPressed(true);
        Animated.timing(iconAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.timing(iconAnimation, {
            toValue: focused ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const iconStyle = {
        opacity: iconAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 1],
        }),
    };

    const deviceHeight = Dimensions.get("window").height;
    return (
        <Animated.View style={iconStyle}>
            <Ionicons
                name={isPressed || focused ? name : `${name}-outline`}
                size={28}
                color={color}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={{
                    marginTop: deviceHeight * 0.01,
                }}
            />
        </Animated.View>
    );
}

export default TabBarIcon;
