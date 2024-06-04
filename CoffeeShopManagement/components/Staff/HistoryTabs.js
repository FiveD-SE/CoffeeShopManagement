import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllTab from './Tabs/AllTab';
import DeliveryTab from './Tabs/DeliveryTab';
import TakeawayTab from './Tabs/TakeawayTab';

const Tab = createMaterialTopTabNavigator();

const HistoryTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: {
                    textTransform: "capitalize",
                    fontFamily: "lato-bold",
                },
                tabBarIndicatorStyle: {
                    height: 2,
                    borderRadius: 10,
                    backgroundColor: '#4ecb71',
                },
                tabBarPressColor: "transparent",
                tabBarPressOpacity: 1,
            }}
        >
            <Tab.Screen name="Tất cả" component={AllTab} />
            <Tab.Screen name="Giao hàng tận nơi" component={DeliveryTab} />
            <Tab.Screen name="Tự đến lấy hàng" component={TakeawayTab} />
        </Tab.Navigator>
    );
};

export default HistoryTabs;