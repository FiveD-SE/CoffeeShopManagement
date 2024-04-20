import React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./components/TabBarIcon";

import AdminHomeScreen from "../screens/Admin/AdminHomeScreen";
import AdminNotification from "../screens/Admin/AdminNotification";
import AdminRevenueScreen from "../screens/Admin/AdminRevenueScreen";

import AdminOtherScreen from "../screens/Admin/AdminOtherScreen";

const AdminSalesScreen = () => {
    return <Text>Admin Sales Screen</Text>;
};

const UserCouponsScreen = () => {
    return <Text>User Coupons Screen</Text>;
};

const AdminWarehouseScreen = () => {
    return <Text>Admin Warehouse Screen</Text>;
};

const AdminBillingScreen = () => {
    return <Text>Admin Billing Screen</Text>;
};

const EditProfile = () => {
    return <Text>Edit Profile</Text>;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const OtherStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Other" component={AdminOtherScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
);

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="AdminHome"
            component={AdminHomeScreen}
            options={{ headerShown: false }} />
        <Stack.Screen
            name="Notification"
            component={AdminNotification}
            options={{ headerShown: false }} />
        <Stack.Screen
            name="Revenue"
            component={AdminRevenueScreen}
            options={{
                headerTitle: "Doanh thu",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
    </Stack.Navigator>
);

function AdminNavigator() {
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
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Sales" component={AdminSalesScreen} />
                <Tab.Screen name="Warehouse" component={AdminWarehouseScreen} />
                <Tab.Screen name="Billing" component={AdminBillingScreen} />
                <Tab.Screen name="Others" component={OtherStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AdminNavigator;

const styles = StyleSheet.create({
    bottomTabBar: {
        backgroundColor: "white",
        borderTopColor: "#CBCBD4",
        borderTopWidth: 1,
        borderOpacity: 0.5,
        height: 83,
    },
});
