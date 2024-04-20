import React from "react";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import OnBoardingScreen from "./screens/Client/OnBoardingScreen";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
    const role = "admin";

    return <AppNavigator role={role} />;
}

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
