import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import AppNavigator from "./navigation/AppNavigator";

export default function App() {
    const role = "cashier";
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
