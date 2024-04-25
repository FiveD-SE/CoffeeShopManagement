import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import { getRoleByUsername } from "./api";
import OnBoardingScreen from "./screens/Client/OnBoardingScreen";

export default function App() {
    const [role, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loaded] = useFonts({
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
    });

    const username = "admin";

    if (!loaded) {
        return null;
    }

    useEffect(() => {
        getRoleByUsername(username).then((data) => {
            setRoles(data);
            setLoading(false);
        });
    }, []);

    return loading ? <OnBoardingScreen /> : <AppNavigator role={role} />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
