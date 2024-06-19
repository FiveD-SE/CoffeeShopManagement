import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import InteractiveCard from "../../../components/Client/Card/InteractiveCard";
import { colors } from "../../../assets/colors/colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BronzeTab from "./MembershipTabs/BronzeTab";
import SilverTab from "./MembershipTabs/SilverTab";
import GoldTab from "./MembershipTabs/GoldTab";
import DiamondTab from "./MembershipTabs/DiamondTab";
import { useRoute } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

export default function UserMembershipTier() {
    const route = useRoute();
    const { rank } = route.params || { rank: "Đồng" };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.heading}>
                <View style={styles.card}>
                    <InteractiveCard />
                </View>
            </View>
            <Tab.Navigator
                initialRouteName={rank}
                screenOptions={{
                    tabBarLabelStyle: {
                        textTransform: "capitalize",
                        fontFamily: "lato-bold",
                        fontSize: 12,
                    },
                    tabBarIndicatorStyle: {
                        height: 2,
                        borderRadius: 10,
                        backgroundColor: colors.green_100,
                    },
                    tabBarActiveTintColor: colors.green_100,
                    tabBarInactiveTintColor: colors.grey_100,
                    tabBarStyle: {
                        borderTopWidth: 1,
                        borderTopColor: colors.grey_50,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                    },
                    tabBarPressColor: "transparent",
                    tabBarPressOpacity: 1,
                }}
            >
                <Tab.Screen name="Đồng" component={BronzeTab} />
                <Tab.Screen name="Bạc" component={SilverTab} />
                <Tab.Screen name="Vàng" component={GoldTab} />
                <Tab.Screen name="Kim cương" component={DiamondTab} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.green_20,
    },
    heading: {
        backgroundColor: colors.green_20,
        padding: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    card: {
        width: 320,
        height: 150,
    },
});
