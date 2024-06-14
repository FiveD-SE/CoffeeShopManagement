import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import UserHomeScreen from "../screens/Client/Home/UserHomeScreen";
import UserExchangeVoucherScreen from "../screens/Client/Home/UserExchangeVoucherScreen";
import UserVoucherDetailsScreen from "../screens/Client/Home/UserVoucherDetailsScreen";
import UserSearchScreen from "../screens/Client/Home/UserSearchScreen";
import UserBestSellerScreen from "../screens/Client/Home/UserBestSellerScreen";
import UserFavoriteItemScreen from "../screens/Client/Home/UserFavoriteItemScreen";

import UserPlaceOrderScreen from "../screens/Client/PlaceOrder/UserPlaceOrderScreen";

import EditProfileDetail from "../screens/Client/Other/UserEditProfileScreen";
import ProfileDetails from "../screens/Client/Other/UserProfileDetailScreen";
import UserEditAddressScreen from "../screens/Client/Other/UserEditAddressScreen";
import UserAddNewAddressScreen from "../screens/Client/Other/UserAddNewAddressScreen";
import Other from "../screens/Client/Other/UserOtherScreen";

import TabBarIcon from "./components/TabBarIcon";
import HeaderBackButton from "./components/HeaderBackButton";
import UserCartScreen from "../screens/Client/PlaceOrder/UserCartScreen";
import SelectPositionButton from "./components/SelectPositionButton";
import SearchBar from "./components/SearchBar";
import UserOrderScreen from "../screens/Client/PlaceOrder/UserOrderScreen";
import OrderHistory from "../screens/Client/Other/UserOrderHistoryScreen";
import Setting from "../screens/Client/Other/UserSettingScreen";
import UserAddressScreen from "../screens/Client/Other/UserAddressScreen";
import SelectBranch from "../screens/Client/Other/UserSelectBranchScreen";
import FeedbackAndHelp from "../screens/Client/Other/UserFeedbackAndHelpScreen";
import ChangePassword from "../screens/Client/ChangePassword";
import SignInScreen from "../screens/Client/SignInScreen";
import UserOrderConfirmationScreen from "../screens/Client/PlaceOrder/UserOrderConfirmationScreen";
import UserMapScreen from "../screens/Client/Other/UserMapScreen";
import UserQuestions from "../screens/Client/Other/UserQuestions";

import MembershipTier from "../screens/Client/Coupons/UserMembershipTierScreen";
import History from "../screens/Client/Coupons/UserExchangeHistoryScreen";
import Benefit from "../screens/Client/Coupons/UserBenefitScreen";
import UserOrderInformationScreen from "../screens/Client/PlaceOrder/UserOrderInformationScreen";
import UserNotification from "../screens/Client/Home/UserNotification";
import ConfirmPassword from "../screens/Client/ConfirmPassword";
import StorePolicyScreen from "../screens/Client/Other/StorePolicyScreen";
import DetailBilling from "../screens/Admin/DetailBillingScreen";
import ReportBranch from "../screens/Client/Other/UserChooseBranchToReport";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { colors } from "../assets/colors/colors";
import UserCouponScreen from "../screens/Client/Coupons/UserCouponScreen";
import UserVoucherScreen from "../screens/Client/Coupons/UserVoucherScreen";
import UserAboutAppVersion from "../screens/Client/Other/UserAboutAppVersion";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ navigation, route }) => {
	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route);
		if (routeName === "ExchangeVoucher") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "VoucherDetails") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "BestSeller") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "SearchScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserNotification") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserOrderConfirmationScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserOrderScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "SelectAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "AddNewAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "EditAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "SelectBranchScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserOrderInformationScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "DetailBilling") {
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
		<Stack.Navigator>
			<Stack.Screen
				name="UserHomeScreen"
				component={UserHomeScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="UserOrderConfirmationScreen"
				component={UserOrderConfirmationScreen}
				options={{
					headerTitle: "Xác nhận đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="SelectAddress"
				component={UserAddressScreen}
				options={{
					headerTitle: "Chọn địa chỉ",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="AddNewAddress"
				component={UserAddNewAddressScreen}
				options={{
					headerTitle: "Thêm địa chỉ mới",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="EditAddress"
				component={UserEditAddressScreen}
				options={{
					headerTitle: "Sửa địa chỉ",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="SelectBranchScreen"
				component={SelectBranch}
				options={{
					headerTitle: "Chọn chi nhánh",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserOrderScreen"
				component={UserOrderScreen}
				options={{
					headerTitle: "Danh sách đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserOrderInformationScreen"
				component={UserOrderInformationScreen}
				options={{
					headerTitle: "Đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton isOrderSuccess={true} />,
				}}
			/>
			<Stack.Screen
				name="ExchangeVoucher"
				component={UserExchangeVoucherScreen}
				options={{
					headerTitle: "Đổi thưởng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
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
						paddingLeft: "5%",
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
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserNotification"
				component={UserNotification}
				options={{
					headerTitle: "Thông báo",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>

			<Stack.Screen
				name="DetailBilling"
				component={DetailBilling}
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

const OrderStack = ({ navigation, route }) => {
	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route);
		if (routeName === "UserOrderScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserSearchScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserMustTryItemScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserCartScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserFavoriteItemScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserOrderConfirmationScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "SelectAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "AddNewAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "EditAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "SelectBranchScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserOrderInformationScreen") {
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
		<Stack.Navigator>
			<Stack.Screen
				name="UserPlaceOrderScreen"
				component={UserPlaceOrderScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="UserOrderScreen"
				component={UserOrderScreen}
				options={{
					headerTitle: "Danh sách đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserSearchScreen"
				component={UserSearchScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="UserMustTryItemScreen"
				component={UserBestSellerScreen}
				options={{
					headerTitle: "Món mới phải thử",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
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
						paddingLeft: "5%",
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
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="SelectAddress"
				component={UserAddressScreen}
				options={{
					headerTitle: "Chọn địa chỉ",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="AddNewAddress"
				component={UserAddNewAddressScreen}
				options={{
					headerTitle: "Thêm địa chỉ mới",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="EditAddress"
				component={UserEditAddressScreen}
				options={{
					headerTitle: "Sửa địa chỉ",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="SelectBranchScreen"
				component={SelectBranch}
				options={{
					headerTitle: "Chọn chi nhánh",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserOrderInformationScreen"
				component={UserOrderInformationScreen}
				options={{
					headerTitle: "Đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserFavoriteItemScreen"
				component={UserFavoriteItemScreen}
				options={{
					headerTitle: "Yêu thích",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
		</Stack.Navigator>
	);
};

const CouponsStack = ({ navigation, route }) => {
	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route);
		if (routeName === "Rank") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserVoucherScreen") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "History") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "Benefit") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "Exchange") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "VoucherDetails") {
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
		<Stack.Navigator>
			<Stack.Screen
				name="Promotions"
				component={UserCouponScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Rank"
				component={MembershipTier}
				options={{
					headerTitle: "Hạng thành viên",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>

			<Stack.Screen
				name="UserVoucherScreen"
				component={UserVoucherScreen}
				options={{
					headerTitle: "Voucher của bạn",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
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
						paddingLeft: "5%",
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
						paddingLeft: "5%",
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
						paddingLeft: "5%",
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
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
		</Stack.Navigator>
	);
};

const OtherStack = ({ navigation, route }) => {
	useLayoutEffect(() => {
		const routeName = getFocusedRouteNameFromRoute(route);
		if (routeName === "AddNewAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "SelectAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "EditAddress") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "ReportBranch") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserQuestions") {
			navigation.setOptions({
				tabBarStyle: { display: "none" },
			});
		} else if (routeName === "UserAboutAppVersion") {
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
		<Stack.Navigator>
			<Stack.Screen
				name="Other"
				component={Other}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="EditProfile"
				component={EditProfileDetail}
				options={{
					headerTitle: "Hồ sơ",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
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
						paddingLeft: "5%",
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
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="OrderHistory"
				component={OrderHistory}
				options={{
					headerTitle: "Lịch sử đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="SelectAddress"
				component={UserAddressScreen}
				options={{
					headerTitle: "Địa chỉ của bạn",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
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
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="ChangePassword"
				component={ChangePassword}
				options={{
					headerTitle: "Thay đổi mật khẩu",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="Logout"
				component={SignInScreen}
				options={{
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="EditAddress"
				component={UserEditAddressScreen}
				options={{
					headerTitle: "Sửa địa chỉ",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="AddNewAddress"
				component={UserAddNewAddressScreen}
				options={{
					headerTitle: "Thêm địa chỉ mới",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="SelectBranch"
				component={SelectBranch}
				options={{
					headerTitle: () => <SearchBar />,
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
					headerRight: () => <SelectPositionButton />,
				}}
			/>
			<Stack.Screen
				name="SignIn"
				component={SignInScreen}
				options={{
					headerTitle: "Đăng nhập",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerShown: false,
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserMapScreen"
				component={UserMapScreen}
				options={{
					headerTitle: () => <SearchBar />,
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="ConfirmPassword"
				component={ConfirmPassword}
				options={{
					headerTitle: "Xác nhận mật khẩu",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="StorePolicyScreen"
				component={StorePolicyScreen}
				options={{
					headerTitle: "Chính sách",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="DetailBilling"
				component={DetailBilling}
				options={{
					headerTitle: "Chi tiết đơn hàng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="ReportBranch"
				component={ReportBranch}
				options={{
					headerTitle: "Chọn chi nhánh",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserQuestions"
				component={UserQuestions}
				options={{
					headerTitle: "Câu hỏi thường gặp",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
			<Stack.Screen
				name="UserAboutAppVersion"
				component={UserAboutAppVersion}
				options={{
					headerTitle: "Phiên bản ứng dụng",
					headerLeftContainerStyle: {
						paddingLeft: "5%",
					},
					headerLeft: () => <HeaderBackButton />,
				}}
			/>
		</Stack.Navigator>
	);
};

function UserNavigator() {
	const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarActiveTintColor: "#006C5E",
				tabBarInactiveTintColor: "#CBCBD4",
				tabBarStyle: {
					backgroundColor: "white",
					borderTopColor: "#CBCBD4",
					borderTopWidth: 1,
					borderOpacity: 0.5,
					height: 83,
					display: bottomSheetOpen ? "none" : "flex",
				},
				tabBarShowLabel: true,
				headerShown: false,
				tabBarHideOnKeyboard: true,
				tabBarLabelStyle: styles.labelStyle,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Trang chủ") {
						iconName = "home";
					} else if (route.name === "Đặt hàng") {
						iconName = "cart";
					} else if (route.name === "Ưu đãi") {
						iconName = "bookmark";
					} else if (route.name === "Khác") {
						iconName = "reorder-three";
					}
					return <TabBarIcon focused={focused} name={iconName} color={color} />;
				},
			})}
		>
			<Tab.Screen name="Trang chủ" component={HomeStack} />
			<Tab.Screen name="Đặt hàng" component={OrderStack} />
			<Tab.Screen name="Ưu đãi" component={CouponsStack} />
			<Tab.Screen name="Khác" component={OtherStack} />
		</Tab.Navigator>
	);
}

export default UserNavigator;

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
