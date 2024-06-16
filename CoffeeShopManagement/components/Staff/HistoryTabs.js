import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../../assets/colors/colors";
import AllOrderTab from "./Tabs/AllOrderTab";
import DeliveryOrderTab from "./Tabs/DeliveryOrderTab";
import SuccessOrderTab from "./Tabs/SuccessOrderTab";
import CanceledOrderTab from "./Tabs/CanceledOrderTab";

const Tab = createMaterialTopTabNavigator();

const HistoryTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: {
					fontSize: 14,
					textTransform: "capitalize",
					fontFamily: "lato-regular",
					lineHeight: 20,
				},
				tabBarIndicatorStyle: {
					height: 2,
					borderRadius: 10,
					backgroundColor: colors.green_100,
				},
				tabBarStyle: {
					paddingTop: "12%",
					backgroundColor: colors.white_100,
					elevation: 2,
					shadowOpacity: 0,
				},
				tabBarActiveTintColor: colors.green_100,
				tabBarInactiveTintColor: colors.grey_50,
				tabBarPressColor: "transparent",
				tabBarPressOpacity: 1,
			}}
		>
			<Tab.Screen name="Tất cả" component={AllOrderTab} />
			<Tab.Screen name="Đang giao" component={DeliveryOrderTab} />
			<Tab.Screen name="Đã giao" component={SuccessOrderTab} />
			<Tab.Screen name="Đã huỷ" component={CanceledOrderTab} />
			{/* <Tab.Screen name="Chờ xác nhận" component={CanceledOrderTab} />
			<Tab.Screen name="Đang thực hiện" component={CanceledOrderTab} /> */}
		</Tab.Navigator>
	);
};

export default HistoryTabs;
