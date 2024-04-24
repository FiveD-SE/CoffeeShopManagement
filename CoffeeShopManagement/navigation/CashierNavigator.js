import { StyleSheet } from "react-native";
import React, { useState, useRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Animated } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import CashierHome from "../screens/Staff/CashierHome";
import CashierBillingScreen from "../screens/Staff/CashierBillingScreen";
import CashierInformation from "../screens/Staff/CashierInformation";
import CashierHistoryScreen from "../screens/Staff/CashierHistoryScreen";
import OrderScreen from "../screens/Staff/OrderScreen";
import CashierNotification from "../screens/Staff/CashierNotification";
import HeaderBackButton from "./components/HeaderBackButton";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();
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

    return (
        <Animated.View style={iconStyle}>
            <FontAwesome5
                name={isPressed || focused ? name : `${name}`}
                size={28}
                color={color}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            />
        </Animated.View>
    );
}
const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="CashierHome">
            <Stack.Screen
                name="CashierHome"
                component={CashierHome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CashierNotification"
                component={CashierNotification}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="CashierInformation"
                component={CashierInformation}
                options={{
                    headerTitle: "Thông tin",
                    headerLeftContainerStyle: {
                        padding: "5%",
                    },
                    headerLeft: () => <HeaderBackButton />,
                }}
            />
            <Stack.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={{
                    headerTitle: "Chi tiết đơn hàng",
                    headerLeftContainerStyle: {
                        padding: "5%",
                    },
                    headerLeft: () => <HeaderBackButton />,
                }}
            />
        </Stack.Navigator>
    );
};

const CashierNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "#006C5E",
                    tabBarInactiveTintColor: "#CBCBD4",
                    tabBarStyle: styles.bottomTabBar,
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Bill") {
                            iconName = "bars";
                        } else if (route.name === "History") {
                            iconName = "history";
                        }
                        return (
                            <TabBarIcon
                                focused={focused}
                                name={iconName}
                                color={color}
                            />
                        );
                    },
                })}
            >
                <Tab.Screen
                    options={{ headerShown: false }}
                    name="Home"
                    component={HomeStack}
                />
                <Tab.Screen
                    options={{ headerShown: false }}
                    name="Bill"
                    component={CashierBillingScreen}
                />
                <Tab.Screen
                    options={{ headerShown: false }}
                    name="History"
                    component={CashierHistoryScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    bottomTabBar: {
        backgroundColor: "white",
        borderTopColor: "#CBCBD4",
        borderTopWidth: 1,
        borderOpacity: 0.5,
        height: 83,
    },
});

export default CashierNavigator;
