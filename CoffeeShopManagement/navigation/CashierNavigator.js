import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./components/TabBarIcon";

import CashierHome from "../screens/Staff/CashierHome";
import CashierBillingScreen from "../screens/Staff/CashierBillingScreen";
import CashierInformation from "../screens/Staff/CashierInformation";
import CashierHistoryScreen from "../screens/Staff/CashierHistoryScreen";
import OrderScreen from "../screens/Staff/OrderScreen";
import CashierNotification from "../screens/Staff/CashierNotification";
import HeaderBackButton from "./components/HeaderBackButton";
import SignInScreen from "../screens/Client/SignInScreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

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
                    headerTitle: "Thông báo",
                    headerLeftContainerStyle: {
                        paddingLeft: "5%",
                    },
                    headerLeft: () => <HeaderBackButton />,
                }}
            />
            <Stack.Screen
                name="CashierInformation"
                component={CashierInformation}
                options={{
                    headerTitle: "Thông tin",
                    headerLeftContainerStyle: {
                        paddingLeft: "5%",
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
                        paddingLeft: "5%",
                    },
                    headerLeft: () => <HeaderBackButton />,
                }}
            />
            <Stack.Screen
                name="SignInScreen"
                component={SignInScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

const CashierNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "#006C5E",
                tabBarInactiveTintColor: "#CBCBD4",
                tabBarStyle: styles.bottomTabBar,
                tabBarShowLabel: true,
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarLabelStyle: styles.labelStyle,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Trang chủ") {
                        iconName = "home";
                    } else if (route.name === "Đơn hàng") {
                        iconName = "reorder-four";
                    } else if (route.name === "Lịch sử") {
                        iconName = "timer";
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
                name="Trang chủ"
                component={HomeStack}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Đơn hàng"
                component={CashierBillingScreen}
            />
            <Tab.Screen
                options={{ headerShown: false }}
                name="Lịch sử"
                component={CashierHistoryScreen}
            />
        </Tab.Navigator>
    );
};

const isIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
    bottomTabBar: {
        backgroundColor: "white",
        borderTopColor: "#CBCBD4",
        borderTopWidth: 1,
        borderOpacity: 0.5,
        height: 83,
    },
    labelStyle: {
        fontSize: 12,
        marginTop: 0,
        fontFamily: "Lato-Bold",
        marginBottom: isIOS ? 0 : 15,
    },
});

export default CashierNavigator;
