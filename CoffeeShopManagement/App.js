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
import { initializeFavorites } from "./services/favoritesService";
import { getProductsList } from "./api";
import { getProductList } from "./redux/actions/userActions";
import { IsOpenProvider } from "./utils/IsOpenContext";
export default function App() {
	const [role, setRole] = useState("");
	const [loaded] = useFonts({
		"lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
		"lato-regular": require("./assets/fonts/Lato-Regular.ttf"),
		"lato-light": require("./assets/fonts/Lato-Light.ttf"),
	});

	useEffect(() => {
		const getRole = async () => {
			try {
				const tokenString = await getToken();
				if (tokenString) {
					let token;
					try {
						token = JSON.parse(tokenString);
						setRole(token.role);
					} catch (error) {
						console.error("Failed to parse token as JSON:", error);
						await removeToken();
					}
				}
			} catch (error) {
				console.error("Failed to retrieve token:", error);
			}
		};
		getRole();
	}, []);

	if (loaded) {
		return (
			<Provider store={store}>
				<NavigationContainer>
					<IsOpenProvider>
						{role ? <AppNavigator role={role} /> : <AuthNavigator />}
					</IsOpenProvider>
				</NavigationContainer>
			</Provider>
		);
	}
}
