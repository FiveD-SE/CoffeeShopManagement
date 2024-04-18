import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

import UserOtherScreen from "../screens/Client/Other";
import SelectAddress from "../screens/Client/SelectAddress";

const Tab = createMaterialBottomTabNavigator();
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

function AdminOthersScreen() {
    return <Text style={styles.text}>Admin Others Screen</Text>;
}

function CashierHomeScreen() {
    return <Text style={styles.text}>Cashier Home Screen</Text>;
}

function CashierBillingScreen() {
    return <Text style={styles.text}>Cashier Billing Screen</Text>;
}

function CashierHistoryScreen() {
    return <Text style={styles.text}>Cashier History Screen</Text>;
}

function UserTabNavigator() {
    return (
        <Tab.Navigator
            shifting={true}
            activeColor="#006C5E"
            inactiveColor="#CBCBD4"
            barStyle={styles.bottomTabBar}
            screenOptions={({ route }) => ({
                headerShown: true,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Orders") {
                        iconName = focused ? "cart" : "cart-outline";
                    } else if (route.name === "Coupons") {
                        iconName = focused ? "bookmark" : "bookmark-outline";
                    } else if (route.name === "Others") {
                        iconName = focused
                            ? "reorder-three"
                            : "reorder-three-outline";
                    }
                    return <Ionicons name={iconName} size={28} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={UserHomeScreen} />
            <Tab.Screen name="Orders" component={UserOrdersScreen} />
            <Tab.Screen name="Coupons" component={UserCouponsScreen} />
            {/* <Tab.Screen name="Others" component={UserOtherScreen} /> */}
            <Tab.Screen name="Others" component={SelectAddress} />
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
            shifting={true}
            activeColor="#006C5E"
            inactiveColor="#CBCBD4"
            barStyle={{ backgroundColor: colors.surface }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Sales") {
                        iconName = focused ? "cart" : "cart-outline";
                    } else if (route.name === "Warehouse") {
                        iconName = focused ? "cube" : "cube-outline";
                    } else if (route.name === "Billing") {
                        iconName = focused ? "receipt" : "receipt-outline";
                    } else if (route.name === "Others") {
                        iconName = focused
                            ? "reorder-three"
                            : "reorder-three-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={AdminHomeScreen} />
            <Tab.Screen name="Sales" component={AdminSalesScreen} />
            <Tab.Screen name="Warehouse" component={AdminWarehouseScreen} />
            <Tab.Screen name="Billing" component={AdminBillingScreen} />
            <Tab.Screen name="Others" component={AdminOthersScreen} />
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
    const { colors } = useTheme();
    return (
        <Tab.Navigator
            activeColor="#006C5E"
            inactiveColor="#CBCBD4"
            barStyle={{ backgroundColor: colors.surface }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "Home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "Bill") {
                        iconName = focused ? "receipt" : "receipt-outline";
                    } else if (route.name === "History") {
                        iconName = focused ? "time" : "time-outline";
                    }

                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={CashierHomeScreen} />
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
    if (role === "user") {
        return (
            <NavigationContainer>
                <UserNavigator />
            </NavigationContainer>
        );
    } else if (role === "admin") {
        return (
            <NavigationContainer>
                <AdminNavigator />
            </NavigationContainer>
        );
    } else if (role === "cashier") {
        return (
            <NavigationContainer>
                <CashierNavigator />
            </NavigationContainer>
        );
    }
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
    },
});
