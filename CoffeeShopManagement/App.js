import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import OnBoardingScreen from "./screens/Client/OnBoardingScreen";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import AuthNavigator from "./navigation/AuthNavigator";
import connectDB from "./services/database";

export default function App() {
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/connect-db")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.message);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error connecting to database:", error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/role")
            .then((response) => response.json())
            .then((data) => {
                setRole(data.role);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    const [loaded] = useFonts({
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
    });

    if (!loaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <NavigationContainer>
                {role ? <AppNavigator /> : <AuthNavigator />}
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
