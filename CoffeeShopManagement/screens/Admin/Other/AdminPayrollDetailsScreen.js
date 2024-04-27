import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
} from "react-native";
import React from "react";
import ColorButton from "../../../components/Admin/Button/ColorButton";

export default function AdminPayrollDetailsScreen() {
    const payrollItemSelected = {
        dateStart: "19/03/2024",
        dateEnd: "29/02/2023",
        total: "100.000",
        status: false,
    };

    const staffList = [
        {
            name: "Nguyen Quoc Thang",
            avatar: require("../../../assets/vietnam.png"),
            phonenumber: "0346129897",
            postion: "Pha chế",
            TWT: "100",
            hourlyWage: "22.000",
            total: "100.000",
        },
        {
            name: "Nguyen Quoc Thang",
            avatar: require("../../../assets/vietnam.png"),
            phonenumber: "0346129897",
            postion: "Pha chế",
            TWT: "100",
            hourlyWage: "22.000",
            total: "100.000",
        },
        {
            name: "Nguyen Quoc Thang",
            avatar: require("../../../assets/vietnam.png"),
            phonenumber: "0346129897",
            postion: "Pha chế",
            TWT: "100",
            hourlyWage: "22.000",
            total: "100.000",
        },
        {
            name: "Nguyen Quoc Thang",
            avatar: require("../../../assets/vietnam.png"),
            phonenumber: "0346129897",
            postion: "Pha chế",
            TWT: "100",
            hourlyWage: "22.000",
            total: "100.000",
        },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.payroll}>
            <View style={[styles.row, { justifyContent: "flex-start" }]}>
                <Image source={item.avatar} style={styles.avatar} />
                <View style={styles.column}>
                    <Text style={styles.textPrimary}>{item.name}</Text>
                    <Text style={styles.textSecondary}>{item.phonenumber}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Chức vụ:</Text>
                <Text style={styles.textSecondary}>{item.postion}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Tổng thời gian làm việc:</Text>
                <Text style={styles.textSecondary}>{item.TWT} giờ</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Mức lương chức vụ:</Text>
                <Text style={styles.textSecondary}>
                    {item.hourlyWage} / giờ
                </Text>
            </View>
            <View style={styles.blackLine} />
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Tổng lương:</Text>
                <Text style={[styles.textPrimary, { color: "#F61A3D" }]}>
                    {item.total} VNĐ
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin bản lương</Text>
                    <View style={styles.payroll}>
                        <View style={styles.row}>
                            <Text style={styles.textPrimary}>
                                Mã bảng lương
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>
                                Kỳ làm việc từ:
                            </Text>
                            <Text style={styles.textSecondary}>
                                {payrollItemSelected.dateStart}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>
                                Kỳ làm việc đến:
                            </Text>
                            <Text style={styles.textSecondary}>
                                {payrollItemSelected.dateEnd}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>
                                Tổng lương:
                            </Text>
                            <Text style={styles.textPrimary}>
                                {payrollItemSelected.total} VNĐ
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>
                                Tình trạng:
                            </Text>
                            <Text
                                style={[
                                    styles.textPrimary,
                                    {
                                        color: payrollItemSelected.status
                                            ? "green"
                                            : "red",
                                    },
                                ]}
                            >
                                {payrollItemSelected.status
                                    ? "Đã thanh toán"
                                    : "Chưa thanh toán"}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Thông tin lương nhân viên
                    </Text>
                    {staffList.map((item) => renderItem({ item }))}
                </View>

                {!payrollItemSelected.status && (
                    <ColorButton
                        color={"#FFA730"}
                        text={"Trả lương"}
                        textColor={"#FFFFFF"}
                        OnPress={() => {}}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    sectionTitle: {
        fontFamily: "Lato-Bold",
        fontSize: 20,
        marginBottom: 20,
        lineHeight: 30,
    },
    payroll: {
        borderRadius: 10,
        backgroundColor: "#fff",
        padding: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    column: {
        flexDirection: "column",
        gap: 15,
        marginLeft: 10,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 10,
        marginRight: 10,
    },
    textPrimary: {
        fontSize: 16,
        fontFamily: "Lato-Bold",
    },
    textSecondary: {
        fontSize: 16,
        fontFamily: "Lato-Regular",
        color: "#A1A1A1",
    },
    blackLine: {
        height: 1,
        backgroundColor: "#E5E4E7",
        marginVertical: 10,
    },
});
