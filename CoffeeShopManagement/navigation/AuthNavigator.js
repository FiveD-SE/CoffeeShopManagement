import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Client/SignInScreen";
import SendOTP from "../screens/Client/SendOTP";
import HeaderBackButton from "../navigation/components/HeaderBackButton";
import EnterOTP from "../screens/Client/EnterOTP";
import ResetPassword from "../screens/Client/ResetPassword";
import SuccessScreen from "../screens/Client/SuccessScreen";
import SignUpScreen from "../screens/Client/SignUpScreen";
import OnBoardingScreen from "../screens/Client/OnBoardingScreen";

const Stack = createNativeStackNavigator();

const OnboardingNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Onboarding">
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
        </Stack.Navigator>
    );
};

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="SignIn">
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
    );
};

const MainNavigator = () => {
    const [completedOnboarding, setCompletedOnboarding] = useState(false);

    useEffect(() => {
        const checkOnboardingStatus = async () => {
            try {
                // Kiểm tra trạng thái hoàn thành của OnBoarding từ lưu trữ local (ví dụ: AsyncStorage)
                const onboardingStatus = await AsyncStorage.getItem("onboardingStatus");
                if (onboardingStatus === "completed") {
                    setCompletedOnboarding(true);
                }
            } catch (error) {
                console.error("Error retrieving onboarding status:", error);
            }
        };

        checkOnboardingStatus();
    }, []);

    return completedOnboarding ? <AuthNavigator /> : <OnboardingNavigator />;
};

export default MainNavigator;
