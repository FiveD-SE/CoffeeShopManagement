import React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserHomeScreen from "../screens/Client/Home/UserHomeScreen";
import UserExchangeVoucherScreen from "../screens/Client/Home/UserExchangeVoucherScreen";
import UserVoucherDetailsScreen from "../screens/Client/Home/UserVoucherDetailsScreen";
import UserSearchScreen from "../screens/Client/Home/UserSearchScreen";
import UserBestSellerScreen from "../screens/Client/Home/UserBestSellerScreen";
import UserFavoriteItemScreen from "../screens/Client/Home/UserFavoriteItemScreen";
import UserPlaceOrderScreen from "../screens/Client/UserPlaceOrderScreen";

import EditProfile from "../screens/Client/EditProfile";
import Other from "../screens/Client/Other";

import TabBarIcon from "./components/TabBarIcon";
import HeaderBackButton from "./components/HeaderBackButton";
import OrderHistory from "../screens/Client/OrderHistory";
import Setting from "../screens/Client/Setting";
import SelectAdress from "../screens/Client/SelectAddress";
import FeedbackAndHelp from "../screens/Client/FeedbackAndHelp";
import ChangePassword from "../screens/Client/ChangePassword";
import SignInScreen from "../screens/Client/SignInScreen";

const UserCouponsScreen = () => {
    return <Text>User Coupons Screen</Text>;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="UserHomeScreen"
            component={UserHomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ExchangeVoucher"
            component={UserExchangeVoucherScreen}
            options={{
                headerTitle: "Đổi thưởng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="VoucherDetails"
            component={UserVoucherDetailsScreen}
            options={{
                headerTitle: "Chi tiết quy đổi",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="FavoriteItem"
            component={UserFavoriteItemScreen}
            options={{
                headerTitle: "Sản phẩm yêu thích",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="SearchScreen"
            component={UserSearchScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="BestSeller"
            component={UserBestSellerScreen}
            options={{
                headerTitle: "Sản phẩm bán chạy",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
    </Stack.Navigator>
);

const OtherStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Other"
            component={Other}
            options={{ headerShown: false }}
        />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen
            name="Settings"
            component={Setting}
            options={{
                headerTitle: "Cài đặt",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                // headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="OrderHistory"
            component={OrderHistory}
            options={{
                headerTitle: "Lịch sử đơn hàng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                // headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="SelectAddress"
            component={SelectAdress}
            options={{
                headerTitle: "Địa chỉ",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="FeedbackAndHelp"
            component={FeedbackAndHelp}
            options={{
                headerTitle: "Phản hồi và hỗ trợ",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                // headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
                headerTitle: "Thay đổi mật khẩu",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                // headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="Logout"
            component={SignInScreen}
            options={{
                headerTitle: "Phản hồi và hỗ trợ",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerShown: false,
                // headerLeft: () => <HeaderBackButton />,
            }}
        />
    </Stack.Navigator>
);

function UserNavigator() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "#006C5E",
                    tabBarInactiveTintColor: "#CBCBD4",
                    tabBarStyle: styles.bottomTabBar,
                    tabBarShowLabel: true,
                    headerShown: false,
                    tabBarHideOnKeyboard: true,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Orders") {
                            iconName = "cart";
                        } else if (route.name === "Coupons") {
                            iconName = "bookmark";
                        } else if (route.name === "Others") {
                            iconName = "reorder-three";
                        }
                        return (
                            <TabBarIcon
                                focused={focused}
                                name={iconName}
                                color={color}
                            />
                        );
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Orders" component={UserPlaceOrderScreen} />
                <Tab.Screen name="Coupons" component={UserCouponsScreen} />
                <Tab.Screen name="Others" component={OtherStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default UserNavigator;

const styles = StyleSheet.create({
    bottomTabBar: {
        backgroundColor: "white",
        borderTopColor: "#CBCBD4",
        borderTopWidth: 1,
        borderOpacity: 0.5,
        height: 83,
    },
});
