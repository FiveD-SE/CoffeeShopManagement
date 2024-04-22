import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";
import CashierNavigator from "./CashierNavigator";
import AdminNavigator from "./AdminNavigator";
import UserNavigator from "./UserNavigator";

function AppNavigator({ role }) {
    if (role === "user") {
        return <UserNavigator />;
    } else if (role === "cashier") {
        return <CashierNavigator />;
    } else if (role === "admin") {
        return <AdminNavigator />;
    }
}

export default AppNavigator;
