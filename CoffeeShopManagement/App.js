import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import OnBoardingScreen from "./screens/Client/OnBoardingScreen";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import AuthNavigator from "./navigation/AuthNavigator"

export default function App() {
    const [loaded] = useFonts({
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
    });
    const role = "admin";

    if (!loaded) {
        return null;
    }

    return <AppNavigator role={role} />;
    // return <NavigationContainer>
    //     <AuthNavigator />
    // </NavigationContainer>
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
