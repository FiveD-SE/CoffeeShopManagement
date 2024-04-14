import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();
const UserStack = createStackNavigator();
const AdminStack = createStackNavigator();
const CashierStack = createStackNavigator();

function UserHomeScreen() {
    return <Text>User Home Screen</Text>;
}

function UserOrdersScreen() {
    return <Text>User Orders Screen</Text>;
}

function UserCouponsScreen() {
    return <Text>User Coupons Screen</Text>;
}

function UserOthersScreen() {
    return <Text>User Others Screen</Text>;
}

function AdminHomeScreen() {
    return <Text>Admin Home Screen</Text>;
}

function SalesScreen() {
    return <Text>Sales Screen</Text>;
}

function InventoryScreen() {
    return <Text>Inventory Screen</Text>;
}

function InvoicesScreen() {
    return <Text>Invoices Screen</Text>;
}

function OthersScreen() {
    return <Text>Others Screen</Text>;
}

function CashierHomeScreen() {
    return <Text>Cashier Home Screen</Text>;
}

function OrdersScreen() {
    return <Text>Orders Screen</Text>;
}

function HistoryScreen() {
    return <Text>History Screen</Text>;
}

function UserStackScreen() {
    return (
        <UserStack.Navigator>
            <UserStack.Screen name="UserHome" component={UserHomeScreen} />
            <UserStack.Screen name="UserOrders" component={UserOrdersScreen} />
            <UserStack.Screen
                name="UserCoupons"
                component={UserCouponsScreen}
            />
            <UserStack.Screen name="UserOthers" component={UserOthersScreen} />
        </UserStack.Navigator>
    );
}

function AdminStackScreen() {
    return (
        <AdminStack.Navigator>
            <AdminStack.Screen
                name="AdminHome"
                component={AdminHomeScreen}
                // options={{
                //     tabBarIcon: ({ color, size }) => (
                //         <Icon name="home" color={color} size={size} />
                //     ),
                // }}
            />
            {/* <AdminStack.Screen
                name="Sales"
                component={SalesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="chart-bar" color={color} size={size} />
                    ),
                }}
            />
            <AdminStack.Screen
                name="Inventory"
                component={InventoryScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="box" color={color} size={size} />
                    ),
                }}
            />
            <AdminStack.Screen
                name="Invoices"
                component={InvoicesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="file-invoice" color={color} size={size} />
                    ),
                }}
            />
            <AdminStack.Screen
                name="Others"
                component={OthersScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="ellipsis-h" color={color} size={size} />
                    ),
                }}
            /> */}
        </AdminStack.Navigator>
    );
}

function CashierStackScreen() {
    return (
        <CashierStack.Navigator>
            <CashierStack.Screen
                name="CashierHome"
                component={CashierHomeScreen}
            />
            <CashierStack.Screen name="Orders" component={OrdersScreen} />
            <CashierStack.Screen name="History" component={HistoryScreen} />
        </CashierStack.Navigator>
    );
}

function AppNavigator({ userRole }) {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                {userRole === "admin" && (
                    <Tab.Screen name="Admin" component={AdminStackScreen} />
                )}
                {userRole === "cashier" && (
                    <Tab.Screen name="Cashier" component={CashierStackScreen} />
                )}
                {(userRole === "user" || !userRole) && (
                    <Tab.Screen name="User" component={UserStackScreen} />
                )}
            </Tab.Navigator>
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
});
