
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from "expo-font";
import AuthNavigator from "./navigation/AuthNavigator"

import { getRoleByUsername } from "./api";
import OnBoardingScreen from "./screens/Client/OnBoardingScreen";
import AuthNavigator from "./navigation/AuthNavigator";
import SignInScreen from "./screens/Client/SignInScreen";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store/store";

export default function App() {
    const [loading, setLoading] = useState(true);

    const [loaded] = useFonts({
        "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
        "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
        "Lato-Light": require("./assets/fonts/Lato-Light.ttf"),
    });

    const isLogin = store.getState().userData?.role;

    return (
        <Provider store={store}>
            <NavigationContainer>
                {!isLogin ? <AuthNavigator /> : <AppNavigator role={isLogin} />}
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
