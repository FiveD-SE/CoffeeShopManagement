import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"; // Import các thành phần cần thiết từ react-native
import Checkbox from "expo-checkbox";

const StaffCard2 = ({item, onPress }) => {
    const [toggleCheckBox, setToggleCheckBox] = useState(true)
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.staffItem}>
            <View style={{ flexDirection: "row" }}>
                <View
                    style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "#cbcbd4",
                        borderRadius: 10,
                    }}
                ></View>
                <View
                    style={{
                        marginStart: "5%",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                        {item.fullName}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#808080" }}>
                        {item.phoneNumber}
                    </Text>
                    <View
                        style={{
                            backgroundColor: "#edfaf1",
                            borderRadius: 15,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "5%",
                        }}
                    >
                        <Text
                            style={{ color: "#5bcf7c", fontSize: 14 }}
                        >
                            {item.role.roleName}
                        </Text>
                    </View>
                </View>
            </View>
            <Checkbox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    staffItem: {
        backgroundColor: "#fff",
        padding: "3%",
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 10,
        alignItems: "center",
        marginBottom: "3%",
    },
});

export default StaffCard2;
