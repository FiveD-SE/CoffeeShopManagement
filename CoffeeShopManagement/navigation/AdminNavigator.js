import React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "./components/TabBarIcon";

import AdminHomeScreen from "../screens/Admin/Home/AdminHomeScreen";
import AdminNotification from "../screens/Admin/Home/AdminNotification";
import AdminRevenueScreen from "../screens/Admin/Home/AdminRevenueScreen";

import AdminBillingScreen from "../screens/Admin/AdminBillingScreen";
import DetailBillingScreen from "../screens/Admin/DetailBillingScreen";
import AdminSalesScreen from "../screens/Admin/Sales/AdminSalesScreen";

import AdminWareHouseScreen from "../screens/Admin/Warehouse/AdminWareHouseScreen";
import AdminImportGoodsScreen from "../screens/Admin/Warehouse/AdminImportGoodsScreen";
import AdminExportGoodsScreen from "../screens/Admin/Warehouse/AdminExportGoodsScreen";
import AdminListImportScreen from "../screens/Admin/Warehouse/AdminListImportScreen";
import AdminListExportScreen from "../screens/Admin/Warehouse/AdminListExportScreen";

import AdminOtherScreen from "../screens/Admin/AdminOtherScreen";
import AdminEditProfile from "../screens/Admin/AdminEditProfileScreen";
import ProfileDetail from "../screens/Admin/AdminProfileDetailScreen";
import AdminBranchManagement from "../screens/Admin/AdminBranchManagement";
import AdminEditBranchScreen from "../screens/Admin/AdminEditBranchScreen";
import AdminAddBranchScreen from "../screens/Admin/AdminAddBranchScreen";

import HeaderBackButton from "./components/HeaderBackButton";
import AddBranchButton from "./components/AddBranchButton";

import StaffHomeScreen from "../screens/Admin/StaffHomeScreen";

const UserCouponsScreen = () => {
    return <Text>User Coupons Screen</Text>;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BillingStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="AdminBillingHome"
            component={AdminBillingScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AdminDetailBilling"
            component={DetailBillingScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const OtherStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Other"
            component={AdminOtherScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ProfileDetail"
            component={ProfileDetail}
            options={{
                headerTitle: "Thông tin cá nhân",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminEditProfile"
            component={AdminEditProfile}
            options={{
                headerTitle: "Chỉnh sửa thông tin cá nhân",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="BranchManagement"
            component={AdminBranchManagement}
            options={{
                headerTitle: "Quản lý chi nhánh",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
                headerRight: () => <AddBranchButton />,
            }}
        />
        <Stack.Screen
            name="AdminBranchEditScreen"
            component={AdminEditBranchScreen}
            options={{
                headerTitle: "Chỉnh sửa chi nhánh",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />

        <Stack.Screen
            name="AdminAddBranchScreen"
            component={AdminAddBranchScreen}
            options={{
                headerTitle: "Thêm chi nhánh",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
    </Stack.Navigator>
);

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="AdminHome"
            component={AdminHomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Notification"
            component={AdminNotification}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="Revenue"
            component={AdminRevenueScreen}
            options={{
                headerTitle: "Doanh thu",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="StaffHome"
            component={StaffHomeScreen}
            options={{
                headerShown: false,
            }}
        />
    </Stack.Navigator>
);

const SalesStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="AdminSales"
            component={AdminSalesScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const WarehouseStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="AdminWareHouse"
            component={AdminWareHouseScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AdminImportGoods"
            component={AdminImportGoodsScreen}
            options={{
                headerTitle: "Nhập kho",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminExportGoods"
            component={AdminExportGoodsScreen}
            options={{
                headerTitle: "Xuất kho",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminListImport"
            component={AdminListImportScreen}
            options={{
                headerTitle: "Danh sách nhập hàng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminListExport"
            component={AdminListExportScreen}
            options={{
                headerTitle: "Danh sách xuất hàng",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
    </Stack.Navigator>
);

function AdminNavigator() {
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
                        } else if (route.name === "Sales") {
                            iconName = "cart";
                        } else if (route.name === "Warehouse") {
                            iconName = "cube";
                        } else if (route.name === "Billing") {
                            iconName = "receipt";
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
                <Tab.Screen name="Sales" component={SalesStack} />
                <Tab.Screen name="Billing" component={BillingStack} />
                <Tab.Screen name="Warehouse" component={WarehouseStack} />
                <Tab.Screen name="Others" component={OtherStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AdminNavigator;

const styles = StyleSheet.create({
    bottomTabBar: {
        backgroundColor: "white",
        borderTopColor: "#CBCBD4",
        borderTopWidth: 1,
        borderOpacity: 0.5,
        height: 83,
    },
});
