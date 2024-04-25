import React from "react";
import { Text, StyleSheet, Dimensions, Platform } from "react-native";
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

import AdminOtherScreen from "../screens/Admin/Other/AdminOtherScreen";
import AdminEditProfile from "../screens/Admin/AdminEditProfileScreen";
import ProfileDetail from "../screens/Admin/Other/AdminProfileDetailScreen";
import AdminBranchManagement from "../screens/Admin/AdminBranchManagement";
import AdminEditBranchScreen from "../screens/Admin/AdminEditBranchScreen";
import AdminAddBranchScreen from "../screens/Admin/AdminAddBranchScreen";
import AdminPayrollScreen from "../screens/Admin/Other/AdminPayrollScreen";
import AdminPayrollDetailsScreen from "../screens/Admin/Other/AdminPayrollDetailsScreen";
import AdminAddPayrollScreen from "../screens/Admin/Other/AdminAddPayrollScreen";

import HeaderBackButton from "./components/HeaderBackButton";
import AddBranchButton from "./components/AddBranchButton";
import AddPayrollButton from "./components/AddPayrollButton";

import StaffHomeScreen from "../screens/Admin/ManageStaffScreen";
import RoleListScreen from "../screens/Admin/RoleListScreen";
import ManageStaffScreen from "../screens/Admin/ManageStaffScreen";

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

        <Stack.Screen
            name="AdminPayrollScreen"
            component={AdminPayrollScreen}
            options={{
                headerTitle: "Bảng tính lương",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
                headerRight: () => <AddPayrollButton />,
            }}
        />

        <Stack.Screen
            name="AdminPayrollDetailsScreen"
            component={AdminPayrollDetailsScreen}
            options={{
                headerTitle: "Chi tiết bảng lương",
                headerLeftContainerStyle: {
                    padding: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminAddPayrollScreen"
            component={AdminAddPayrollScreen}
            options={{
                headerTitle: "Thêm bảng lương",
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
            component={ManageStaffScreen}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen
            name="RoleList"
            component={RoleListScreen}
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
    );
}

export default AdminNavigator;

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
        fontFamily: "Lato-Bold",
        marginBottom: isIOS ? 0 : 15,
    },
});
