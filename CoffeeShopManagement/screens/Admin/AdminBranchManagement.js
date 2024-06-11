import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Branch from "../../components/Admin/Branch";
import {
    doc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    writeBatch,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseService";

const AdminBranchManagement = () => {
    const navigation = useNavigation();
    const [branchList, setBranchList] = useState([]);
    const handleDetailBranch = (id) => {
        navigation.navigate("AdminBranchEditScreen", { id: id });
    };

    useEffect(() => {
        const loadBranches = async () => {
            try {
                const q = query(
                    collection(db, "branches"),
                );
                const querySnapshot = await getDocs(q);
                const loadBranches = [];
                querySnapshot.forEach((doc) => {
                    loadBranches.push(doc.data());
                });
                setBranchList(loadBranches);
            } catch (error) {
                console.log("Error loading branches:", error);
            }
        };

        loadBranches();
        const unsubscribe = navigation.addListener("focus", () => {
            loadBranches();
        });

        return unsubscribe;
    }, [navigation]);

    const renderBranchList = () => {
        return branchList.map((item) => {
            const address = `${item.street}, ${item.wardName}, ${item.districtName}, ${item.provinceName}`;
            return (
                <Branch
                    key={item.branchId}
                    storeName="FIVED COFFEE"
                    branchName={item.branchName}
                    address={address}
                    image={{ uri: item.imageDownloadUrl }}
                    onPress={() => handleDetailBranch(item.id)}
                />
            );
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Danh sách chi nhánh</Text>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {renderBranchList()}
            </ScrollView>
        </View>
    );
}

export default AdminBranchManagement;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: "3%",
        marginHorizontal: "3%"
    },
    header: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: "3%",
    },
    scrollView: {
        flex: 1,
    },
});