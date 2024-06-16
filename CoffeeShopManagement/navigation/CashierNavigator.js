import React, { useLayoutEffect } from "react";
import { StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./components/TabBarIcon";

import CashierHome from "../screens/Staff/CashierHome";
import CashierBillingScreen from "../screens/Staff/CashierBillingScreen";
import CashierInformation from "../screens/Staff/CashierInformation";
import CashierHistoryScreen from "../screens/Staff/CashierHistoryScreen";
import OrderScreen from "../screens/Staff/OrderScreen";
import CashierNotification from "../screens/Staff/CashierNotification";
import HeaderBackButton from "./components/HeaderBackButton";
import SignInScreen from "../screens/Client/SignInScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { colors } from "../assets/colors/colors";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = ({ navigation, route }) => {
	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route);
		if (routeName === "CashierNotification") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "CashierInformation") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "OrderScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else {
			navigation.setOptions({
				tabBarStyle: {
					backgroundColor: colors.white_100,
					borderTopColor: colors.grey_20,
					borderTopWidth: 1,
					borderOpacity: 0.5,
					height: isIOS ? 100 : 80,
				},
			});
		}
	}, [navigation, route]);
	return (
		<Stack.Navigator initialRouteName="CashierHome">
			<Stack.Screen
				name="CashierHome"
				component={CashierHome}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="CashierNotification"
				component={CashierNotification}
				options={{
					headerTitle: "Thông báo",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="CashierInformation"
				component={CashierInformation}
				options={{
					headerTitle: "Thông tin",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="OrderScreen"
				component={OrderScreen}
				options={{
					headerTitle: "Chi tiết đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="SignInScreen"
				component={SignInScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

const BillingStack = ({ navigation, route }) => {
	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route);
		if (routeName === "OrderScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else {
			navigation.setOptions({
				tabBarStyle: {
					backgroundColor: colors.white_100,
					borderTopColor: colors.grey_20,
					borderTopWidth: 1,
					borderOpacity: 0.5,
					height: isIOS ? 100 : 80,
				},
			});
		}
	}, [navigation, route]);
	return (
		<Stack.Navigator initialRouteName="CashierBillingScreen">
			<Stack.Screen
				name="CashierBillingScreen"
				component={CashierBillingScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="OrderScreen"
				component={OrderScreen}
				options={{
					headerTitle: "Chi tiết đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
		</Stack.Navigator>
	);
};

const HistoryStack = () => {
	return (
		<Stack.Navigator initialRouteName="CashierHistoryScreen">
			<Stack.Screen
				name="CashierHistoryScreen"
				component={CashierHistoryScreen}
				options={{ headerShown: false }}
			/>

			<Stack.Screen
				name="OrderScreen"
				component={OrderScreen}
				options={{
					headerTitle: "Chi tiết đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
		</Stack.Navigator>
	);
};

const CashierNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarActiveTintColor: "#006C5E",
				tabBarInactiveTintColor: "#CBCBD4",
				tabBarStyle: styles.bottomTabBar,
				tabBarShowLabel: true,
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarLabelStyle: styles.labelStyle,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Trang chủ") {
						iconName = "home";
					} else if (route.name === "Đơn hàng") {
						iconName = "reorder-four";
					} else if (route.name === "Lịch sử") {
						iconName = "timer";
					}
					return <TabBarIcon focused={focused} name={iconName} color={color} />;
				},
			})}
		>
			<Tab.Screen name="Trang chủ" component={HomeStack} />
			<Tab.Screen name="Đơn hàng" component={BillingStack} />
			<Tab.Screen name="Lịch sử" component={HistoryStack} />
		</Tab.Navigator>
	);
};

const isIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
	bottomTabBar: {
		backgroundColor: "white",
		borderTopColor: "#CBCBD4",
		borderTopWidth: 1,
		borderOpacity: 0.5,
		height: 83,
	},
	labelStyle: {
		fontSize: 12,
		marginTop: 0,
		fontFamily: "lato-bold",
		marginBottom: isIOS ? 0 : 15,
	},
});

export default CashierNavigator;
