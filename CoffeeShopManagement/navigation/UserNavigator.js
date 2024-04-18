import React, { useState, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EditProfile from "../screens/Client/EditProfile";
import Other from "../screens/Client/Other";
import UserHomeScreen from "../screens/Client/UserHomeScreen";
import UserPlaceOrderScreen from "../screens/Client/UserPlaceOrderScreen";
import { Ionicons } from "@expo/vector-icons";
import { Animated } from "react-native";
import TabBarIcon from "./components/TabBarIcon";

const UserCouponsScreen = () => {
    return <Text>User Coupons Screen</Text>;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OtherStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Other" component={Other} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
);

function UserNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "#006C5E",
                    tabBarInactiveTintColor: "#CBCBD4",
                    tabBarStyle: styles.bottomTabBar,
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Orders") {
                            iconName = "cart";
                        } else if (route.name === "Coupons") {
                            iconName = "bookmark";
                        } else if (route.name === "Others") {
                            iconName = "reorder-three";
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
                <Tab.Screen name="Home" component={UserHomeScreen} />
                <Tab.Screen name="Orders" component={UserPlaceOrderScreen} />
                <Tab.Screen name="Coupons" component={UserCouponsScreen} />
                <Tab.Screen name="Others" component={OtherStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default UserNavigator;

const styles = StyleSheet.create({
    bottomTabBar: {
        backgroundColor: "white",
        borderTopColor: "#CBCBD4",
        borderTopWidth: 1,
        borderOpacity: 0.5,
        height: 83,
    },
});
