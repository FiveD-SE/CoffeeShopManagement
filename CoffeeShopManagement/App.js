import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";

import AuthNavigator from "./navigation/AuthNavigator";
import SignInScreen from "./screens/Client/SignInScreen";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store/store";
import { saveToken, getToken, removeToken } from "./services/authServices";

export default function App() {
    const [role, setRole] = useState("");

    const [loaded] = useFonts({
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
    });
    useEffect(() => {
        const getRole = async () => {
            const token = await getToken();
            if (token) {
                setRole(token);
            }
        };
        getRole();
    }, []);
    if (loaded) {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    {role ? <AppNavigator role={role} /> : <AuthNavigator />}
                </NavigationContainer>
            </Provider>
        );
    }
}
