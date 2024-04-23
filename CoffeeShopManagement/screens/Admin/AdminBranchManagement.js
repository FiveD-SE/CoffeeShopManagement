import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Branch from "../../components/Admin/Branch";

export default function AdminBranchManagement() {
    const navigation = useNavigation();
    const handleDetailBranch = (id) => {
        navigation.navigate("AdminBranchEditScreen", { id: id });
    };

    const DATA = [
        {
            id: 1,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D1",
            distance: "3.3",
            image: require("../../assets/images/branch1.jpg"),
        },
        {
            id: 2,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D2",
            distance: "3.3",
            image: require("../../assets/images/branch1.jpg"),
        },
        {
            id: 3,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D3",
            distance: "3.3",
            image: require("../../assets/images/branch1.jpg"),
        },
        {
            id: 4,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D4",
            distance: "3.3",
            image: require("../../assets/images/branch1.jpg"),
        },
        {
            id: 5,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D5",
            distance: "3.3",
            image: require("../../assets/images/branch1.jpg"),
        },
        {
            id: 6,
            storeName: "Fived Coffee",
            branchName: "HCM Đường D6",
            distance: "3.3",
            image: require("../../assets/images/branch1.jpg"),
        },
    ];

    return (
        <View style={styles.root}>
            <Text style={styles.header}>Danh sách chi nhánh</Text>
            <ScrollView style={styles.scrollView}>
                {DATA.map((item) => (
                    <Branch
                        key={item.id}
                        storeName={item.storeName}
                        branchName={item.branchName}
                        distance={item.distance}
                        image={item.image}
                        onPress={() => handleDetailBranch(item.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        padding: 10,
    },
    header: {
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
});
