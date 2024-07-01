import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native"; // Import các thành phần cần thiết từ react-native
import Checkbox from "expo-checkbox";
import { doc, updateDoc, setDoc, getDoc, getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';
import { colors } from "../../../assets/colors/colors";
const StaffCardWithCheckBox = ({ item, onToggleSelect, isSelected }) => {
    const [staffData, setStaffData] = useState(null);

    useEffect(() => {
        const fetchStaffData = async () => {
            try {
                const staffRef = doc(db, "staffs", item);
                const staffSnapshot = await getDoc(staffRef);

                if (staffSnapshot.exists()) {
                    const staffInfo = staffSnapshot.data();
                    setStaffData(staffInfo);
                } else {
                    console.log("Staff not found");
                }
            } catch (error) {
                console.log("Error fetching staff data:", error);
            }
        };

        fetchStaffData();
    }, [item]);

    return (
        <Pressable style={styles.container} onPress={() => onToggleSelect(item)}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: staffData?.staffImage }} resizeMode="cover" />
            </View>
            <View style={styles.main}>
                <Text style={styles.name}>{staffData?.fullName}</Text>
                <Text style={styles.phoneNumber}>{staffData?.phoneNumber}</Text>
                <Text style={styles.role}>{staffData?.role.roleName}</Text>
            </View>
            <View>
                <MaterialIcons
                    name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
                    size={24}
                    color={isSelected ? "#006C5E" : "#3a3a3a"}
                />
            </View>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "2%",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D8D8D8",
        padding: "2%",
        backgroundColor: "#FFFFFF",
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: "#D8D8D8",
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 100,
        aspectRatio: 1,
    },
    main: {
        flex: 1,
        paddingHorizontal: "5%",
    },
    name: {
        width: "100%",
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 20,
        marginTop: "1%",
        fontFamily: "lato-bold"
    },
    phoneNumber: {
        marginTop: "5%",
        color: "rgba(58,58,58,0.5)",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: "lato-regular"
    },
    role: {
        color: colors.green_100,
        fontSize: 14,
        fontWeight: "500",
        marginTop: "2%",
        fontFamily: "lato-regular"
    },
    roleContainer: {

    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        padding: "2%",
        backgroundColor: "#00A188",
        borderRadius: 100,
    },
});

export default StaffCardWithCheckBox;
