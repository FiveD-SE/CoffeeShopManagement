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

import UserPlaceOrderScreen from "../screens/Client/PlaceOrder/UserPlaceOrderScreen";

import EditProfile from "../screens/Client/Other/UserEditProfileScreen";
import ProfileDetails from "../screens/Client/Other/UserProfileDetailScreen";
import EditAddress from "../screens/Client/Other/UserEditAddressScreen";
import AddNewAddress from "../screens/Client/Other/UserAddNewAddressScreen";
import Other from "../screens/Client/Other/UserOtherScreen";

import TabBarIcon from "./components/TabBarIcon";
import HeaderBackButton from "./components/HeaderBackButton";
import UserCartScreen from "../screens/Client/PlaceOrder/UserCartScreen";

import OrderHistory from "../screens/Client/Other/UserOrderHistoryScreen";
import Setting from "../screens/Client/Other/UserSettingScreen";
import SelectAdress from "../screens/Client/Other/UserAddressScreen";
import SelectBranch from "../screens/Client/Other/UserSelectBranchScreen";
import FeedbackAndHelp from "../screens/Client/Other/UserFeedbackAndHelpScreen";
import ChangePassword from "../screens/Client/ChangePassword";
import SignInScreen from "../screens/Client/SignInScreen";
import UserOrderConfirmationScreen from "../screens/Client/PlaceOrder/UserOrderConfirmationScreen";

import Promotions from "../screens/Client/Coupons/UserCouponScreen";
import MembershipTier from "../screens/Client/Coupons/UserMembershipTierScreen";
import History from "../screens/Client/Coupons/UserExchangeHistoryScreen";
import Benefit from "../screens/Client/Coupons/UserBenefitScreen";
import YourVoucher from "../screens/Client/Coupons/UserVoucherScreen";

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

const OrderStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="UserPlaceOrderScreen"
            component={UserPlaceOrderScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="UserSearchScreen"
            component={UserSearchScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="UserFavoriteItemScreen"
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
            name="UserCartScreen"
            component={UserCartScreen}
            options={{
                headerTitle: "Giỏ hàng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="UserOrderConfirmationScreen"
            component={UserOrderConfirmationScreen}
            options={{
                headerTitle: "Xác nhận đơn hàng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="SelectAddressScreen"
            component={SelectAdress}
            options={{
                headerTitle: "",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="SelectBranchScreen"
            component={SelectBranch}
            options={{
                headerTitle: "",
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
        <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
                headerTitle: "Hồ sơ",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="ProfileDetails"
            component={ProfileDetails}
            options={{
                headerTitle: "Hồ sơ",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
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
        <Stack.Screen
            name="EditAddress"
            component={EditAddress}
            options={{
                headerTitle: "Sửa địa chỉ",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AddNewAddress"
            component={AddNewAddress}
            options={{
                headerTitle: "Thêm địa chỉ mới",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
    </Stack.Navigator>
);

const CouponsStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Promotions"
            component={Promotions}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Rank"
            component={MembershipTier}
            options={{
                headerTitle: "Hạng thành viên",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />

        <Stack.Screen
            name="YourVoucher"
            component={YourVoucher}
            options={{
                headerTitle: "Voucher của bạn",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="History"
            component={History}
            options={{
                headerTitle: "Lịch sử đổi thưởng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="Benefit"
            component={Benefit}
            options={{
                headerTitle: "Quyền lợi của bạn",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="Exchange"
            component={UserExchangeVoucherScreen}
            options={{
                headerTitle: "Đổi thưởng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
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
                <Tab.Screen name="Orders" component={OrderStack} />
                <Tab.Screen name="Coupons" component={CouponsStack} />
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
