import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Client/SignInScreen";
import SendOTP from "../screens/Client/SendOTP";
import HeaderBackButton from "../navigation/components/HeaderBackButton";
import EnterOTP from "../screens/Client/EnterOTP";
import ResetPassword from "../screens/Client/ResetPassword";
import SuccessScreen from "../screens/Client/SuccessScreen";
import SignUpScreen from "../screens/Client/SignUpScreen";
import OnBoardingScreen from "../screens/Client/OnBoardingScreen";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn">
                <Stack.Screen
                    name="Onboarding"
                    component={OnBoardingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SendOTP"
                    component={SendOTP}
                    options={{
                        headerTitle: "",
                        headerLeft: () => <HeaderBackButton />,
                    }}
                />
                <Stack.Screen
                    name="EnterOTP"
                    component={EnterOTP}
                    options={{
                        headerTitle: "",
                        headerLeft: () => <HeaderBackButton />,
                    }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{
                        headerTitle: "",
                        headerLeft: () => <HeaderBackButton />,
                    }}
                />
                <Stack.Screen
                    name="SuccessScreen"
                    component={SuccessScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;
