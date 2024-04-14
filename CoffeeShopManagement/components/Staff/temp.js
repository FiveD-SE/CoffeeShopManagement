import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MyTabs = createBottomTabNavigator({
    screens: {
        Home: HomeScreen,
        Profile: ProfileScreen,
    },
});
