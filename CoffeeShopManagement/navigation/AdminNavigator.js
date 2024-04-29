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
import AdminItemListScreen from "../screens/Admin/Sales/AdminItemListScreen";
import AdminVoucherListScreen from "../screens/Admin/Sales/AdminVoucherListScreen";
import AdminAddItemScreen from "../screens/Admin/Sales/AdminAddItemScreen";
import AdminAddVoucherScreen from "../screens/Admin/Sales/AdminAddVoucherScreen";
import AdminEditItemScreen from "../screens/Admin/Sales/AdminEditItemScreen";
import AdminEditVoucherScreen from "../screens/Admin/Sales/AdminEditVoucherScreen";

import AdminWareHouseScreen from "../screens/Admin/Warehouse/AdminWareHouseScreen";
import AdminImportGoodsScreen from "../screens/Admin/Warehouse/AdminImportGoodsScreen";
import AdminExportGoodsScreen from "../screens/Admin/Warehouse/AdminExportGoodsScreen";
import AdminListImportScreen from "../screens/Admin/Warehouse/AdminListImportScreen";
import AdminListExportScreen from "../screens/Admin/Warehouse/AdminListExportScreen";

import AdminOtherScreen from "../screens/Admin/Other/AdminOtherScreen";
import AdminEditProfile from "../screens/Admin/AdminEditProfileScreen";
import AdminProfileDetail from "../screens/Admin/Other/AdminProfileDetailScreen";
import AdminBranchManagement from "../screens/Admin/AdminBranchManagement";
import AdminEditBranchScreen from "../screens/Admin/AdminEditBranchScreen";
import AdminAddBranchScreen from "../screens/Admin/AdminAddBranchScreen";
import AdminPayrollScreen from "../screens/Admin/Other/AdminPayrollScreen";
import AdminPayrollDetailsScreen from "../screens/Admin/Other/AdminPayrollDetailsScreen";
import AdminAddPayrollScreen from "../screens/Admin/Other/AdminAddPayrollScreen";

import HeaderBackButton from "./components/HeaderBackButton";
import AddBranchButton from "./components/AddBranchButton";
import AddItemButton from "../components/Admin/Button/AddItemButton";
import AddVoucherButton from "../components/Admin/Button/AddVoucherButton";

import AddPayrollButton from "./components/AddPayrollButton";

import ClientHomeScreen from "../screens/Admin/Home/ClientHomeScreen";
import ClientDetailHomeScreen from "../screens/Admin/Home/ClientDetailHomeScreen";
import StaffHomeScreen from "../screens/Admin/ManageStaffScreen";
import RoleListScreen from "../screens/Admin/RoleListScreen";
import ManageStaffScreen from "../screens/Admin/ManageStaffScreen";
import AddStaffScreen from "../screens/Admin/AddStaffScreen";
import EditStaffScreen from "../screens/Admin/EditStaffScreen";

import ScheduleScreen from "../screens/Admin/ScheduleScreen";
import AddShiftButton from "./components/AddShiftButton";
import AddShiftScreen from "../screens/Admin/AddShiftScreen";
import AddShiftButton2 from "./components/AddShiftButton2";
import DetailShiftScreen from "../screens/Admin/DetailShiftScreen";
import AddStaffButton from "./components/AddStaffButton";

import SignInScreen from "../screens/Client/SignInScreen";

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
            name="AdminProfileDetail"
            component={AdminProfileDetail}
            options={{
                headerTitle: "Thông tin cá nhân",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
        <Stack.Screen
            name="AddStaff"
            component={AddStaffScreen}
            options={{
                headerTitle: "Tạo mới nhân viên",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="EditStaff"
            component={EditStaffScreen}
            options={{
                headerTitle: "Chỉnh sửa thông tin",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="Schedule"
            component={ScheduleScreen}
            options={{
                headerTitle: "Lịch biểu",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
                headerRight: () => <AddShiftButton />,
            }}
        />
        <Stack.Screen
            name="AddShift"
            component={AddShiftScreen}
            options={{
                headerTitle: "Thêm ca làm việc",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
                headerRight: () => <AddShiftButton2 />,
            }}
        />
        <Stack.Screen
            name="DetailShift"
            component={DetailShiftScreen}
            options={{
                headerTitle: "Tên ca",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
                headerRight: () => <AddStaffButton />,
            }}
        />
        <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={{ headerShown: false }}
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
                    paddingLeft: "5%",
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
        <Stack.Screen
            name="ClientHome"
            component={ClientHomeScreen}
            options={{
                headerTitle: "Khách hàng",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AddStaff"
            component={AddStaffScreen}
            options={{
                headerTitle: "Tạo mới nhân viên",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />

        <Stack.Screen
            name="ClientDetailHome"
            component={ClientDetailHomeScreen}
            options={{
                headerTitle: "Khách hàng",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />

        <Stack.Screen
            name="EditStaff"
            component={EditStaffScreen}
            options={{
                headerTitle: "Chỉnh sửa thông tin",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
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
        <Stack.Screen
            name="AdminItemList"
            component={AdminItemListScreen}
            options={{
                headerTitle: "Danh sách sản phẩm",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
                headerRight: () => <AddItemButton />,
            }}
        />
        <Stack.Screen
            name="AdminVoucherList"
            component={AdminVoucherListScreen}
            options={({ route }) => ({
                headerTitle: "Danh sách khuyến mãi",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
                headerRight: () => <AddVoucherButton />,
            })}
        />
        <Stack.Screen
            name="AdminAddItem"
            component={AdminAddItemScreen}
            options={{
                headerTitle: "Thêm sản phẩm",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminAddVoucher"
            component={AdminAddVoucherScreen}
            options={{
                headerTitle: "Thêm khuyến mãi",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminEditItem"
            component={AdminEditItemScreen}
            options={{
                headerTitle: "Chỉnh sửa sản phẩm",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
        />
        <Stack.Screen
            name="AdminEditVoucher"
            component={AdminEditVoucherScreen}
            options={{
                headerTitle: "Chỉnh sửa khuyến mãi",
                headerLeftContainerStyle: {
                    paddingLeft: "5%",
                },
                headerLeft: () => <HeaderBackButton />,
            }}
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    paddingLeft: "5%",
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
                    if (route.name === "Trang chủ") {
                        iconName = "home";
                    } else if (route.name === "Bán hàng") {
                        iconName = "cart";
                    } else if (route.name === "Kho hàng") {
                        iconName = "cube";
                    } else if (route.name === "Hoá đơn") {
                        iconName = "receipt";
                    } else if (route.name === "Khác") {
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
            <Tab.Screen name="Trang chủ" component={HomeStack} />
            <Tab.Screen name="Bán hàng" component={SalesStack} />
            <Tab.Screen name="Hoá đơn" component={BillingStack} />
            <Tab.Screen name="Kho hàng" component={WarehouseStack} />
            <Tab.Screen name="Khác" component={OtherStack} />
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
