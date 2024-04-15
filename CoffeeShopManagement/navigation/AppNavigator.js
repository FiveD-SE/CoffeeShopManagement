import React, { useState, useRef } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import UserOtherScreen from "../screens/Client/Other";
import AdminOtherScreen from "../screens/Admin/AdminOtherScreen";
import CashierHome from "../screens/Staff/CashierHome";

const Tab = createBottomTabNavigator();
const UserStack = createStackNavigator();
const AdminStack = createStackNavigator();
const CashierStack = createStackNavigator();

function UserHomeScreen() {
    return <Text style={styles.text}>User Home Screen</Text>;
}

function UserOrdersScreen() {
    return <Text style={styles.text}>User Orders Screen</Text>;
}

function UserCouponsScreen() {
    return <Text style={styles.text}>User Coupons Screen</Text>;
}

function AdminHomeScreen() {
    return <Text style={styles.text}>Admin Home Screen</Text>;
}

function AdminSalesScreen() {
    return <Text style={styles.text}>Admin Sales Screen</Text>;
}

function AdminWarehouseScreen() {
    return <Text style={styles.text}>Admin Warehouse Screen</Text>;
}

function AdminBillingScreen() {
    return <Text style={styles.text}>Admin Billing Screen</Text>;
}

function CashierBillingScreen() {
    return <Text style={styles.text}>Cashier Billing Screen</Text>;
}

function CashierHistoryScreen() {
    return <Text style={styles.text}>Cashier History Screen</Text>;
}

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
            <Ionicons
                name={isPressed || focused ? name : `${name}-outline`}
                size={28}
                color={color}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            />
        </Animated.View>
    );
}

function UserTabNavigator() {
    return (
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
            <Tab.Screen name="Orders" component={UserOrdersScreen} />
            <Tab.Screen name="Coupons" component={UserCouponsScreen} />
            <Tab.Screen name="Others" component={UserOtherScreen} />
        </Tab.Navigator>
    );
}

function UserNavigator() {
    return (
        <UserStack.Navigator>
            <UserStack.Screen
                name="UserTabs"
                component={UserTabNavigator}
                options={{ headerShown: false }}
            />
        </UserStack.Navigator>
    );
}

function AdminTabNavigator() {
    return (
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
                    } else if (route.name === "Sales") {
                        iconName = "cart";
                    } else if (route.name === "Warehouse") {
                        iconName = "cube";
                    } else if (route.name === "Billing") {
                        iconName = "receipt";
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
            <Tab.Screen name="Home" component={AdminHomeScreen} />
            <Tab.Screen name="Sales" component={AdminSalesScreen} />
            <Tab.Screen name="Warehouse" component={AdminWarehouseScreen} />
            <Tab.Screen name="Billing" component={AdminBillingScreen} />
            <Tab.Screen name="Others" component={AdminOtherScreen} />
        </Tab.Navigator>
    );
}

function AdminNavigator() {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="AdminTabs"
                component={AdminTabNavigator}
                options={{ headerShown: false }}
            />
        </AdminStack.Navigator>
    );
}

function CashierTabNavigator() {
    return (
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
                    } else if (route.name === "Bill") {
                        iconName = "receipt";
                    } else if (route.name === "History") {
                        iconName = "time";
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
            <Tab.Screen name="Home" component={CashierHome} />
            <Tab.Screen name="Bill" component={CashierBillingScreen} />
            <Tab.Screen name="History" component={CashierHistoryScreen} />
        </Tab.Navigator>
    );
}

function CashierNavigator() {
    return (
        <CashierStack.Navigator>
            <CashierStack.Screen
                name="CashierTabs"
                component={CashierTabNavigator}
                options={{ headerShown: false }}
            />
        </CashierStack.Navigator>
    );
}

function AppNavigator({ role }) {
    return (
        <NavigationContainer>
            {role === "user" && <UserNavigator />}
            {role === "admin" && <AdminNavigator />}
            {role === "cashier" && <CashierNavigator />}
        </NavigationContainer>
    );
}

export default AppNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        marginTop: 250,
        fontSize: 20,
        color: "black",
    },
    bottomTabBar: {
        backgroundColor: "white",
        borderTopColor: "#CBCBD4",
        borderTopWidth: 1,
        borderOpacity: 0.5,
        height: 83,
    },
});
