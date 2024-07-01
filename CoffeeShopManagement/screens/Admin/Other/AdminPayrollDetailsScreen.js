import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    ScrollView,
    Alert,
} from "react-native";
import React, { useState } from "react";
import ColorButton from "../../../components/Admin/Button/ColorButton";
import { db } from "../../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { doc, updateDoc } from "firebase/firestore";

export default function AdminPayrollDetailsScreen({ route }) {

    const [staffs, setStaffs] = useState(route.params.staffs);
    const [payrollId, setPayrollId] = useState(route.params.payrollId);
    const [startDate, setStartDate] = useState(route.params.startDate);
    const [endDate, setEndDate] = useState(route.params.endDate);
    const [status, setStatus] = useState(route.params.status);
    const [total, setTotal] = useState(route.params.total);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatSalary = (salary) => {
        const formattedSalary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary);
        return formattedSalary;
    };

    const handleConfirm = () => {
        Alert.alert(
            "Xác nhận thanh toán",
            "Bạn có chắc chắn muốn thanh toán bảng lương này không?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Đồng ý",
                    style: "destructive",
                    onPress: async () => {
                        setLoading(true);
                        console.log(
                            "route.params.staffs.staffId",
                            route.params.staffs.staffId
                        );
                        try {
                            await updateDoc(doc(db, "payrolls", payrollId), {
                                status: true,
                            });
                            navigation.goBack();
                        } catch (error) {
                            console.log("Error confirm payroll:", error);
                            Toast.show({
                                type: "error",
                                text1: "Lỗi",
                                text2: "Đã xảy ra lỗi khi trả lương cho nhân viên",
                            });
                        }
                    },
                },
            ],
            { cancelable: false }
        );
        setLoading(false);
    }

    const renderItem = ({ item, key }) => (
        <View style={styles.payroll} key={key}>
            <View style={[styles.row, { justifyContent: "flex-start" }]}>
                <Image source={{ uri: item.staffImage }} style={styles.avatar} />
                <View style={styles.column}>
                    <Text style={styles.textPrimary}>{item.fullName}</Text>
                    <Text style={styles.textSecondary}>{item.phoneNumber}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Chức vụ:</Text>
                <Text style={styles.textSecondary}>{item.role.roleName} / {item.role.roleType.charAt(0).toUpperCase() + item.role.roleType.slice(1)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Tổng thời gian làm việc:</Text>
                <Text style={styles.textSecondary}>{item.workingHours} giờ</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Mức lương chức vụ:</Text>
                <Text style={styles.textSecondary}>
                    {formatSalary(item.role.salary)} / giờ
                </Text>
            </View>
            <View style={styles.blackLine} />
            <View style={styles.row}>
                <Text style={styles.textPrimary}>Tổng lương:</Text>
                <Text style={[styles.textPrimary, { color: "#F61A3D" }]}>
                    {formatSalary(item.role.salary * item.workingHours)} VNĐ
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
                                Mã bảng lương: {payrollId.substring(0, 6).toUpperCase()}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>
                                Kỳ làm việc từ:
                            </Text>
                            <Text style={styles.textSecondary}>
                                {formatDate(startDate.toDate())}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>
                                Kỳ làm việc đến:
                            </Text>
                            <Text style={styles.textSecondary}>
                                {formatDate(endDate.toDate())}
                            </Text>
                        </View>

                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>
                                Tổng lương:
                            </Text>
                            <Text style={styles.textPrimary}>
                                {formatSalary(total)}
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
                                        color: status
                                            ? "green"
                                            : "red",
                                    },
                                ]}
                            >
                                {status
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
                    {staffs.map((item, index) => renderItem({ item, key: index }))}
                </View>

                {!status && (
                    <ColorButton
                        color={"#006c5e"}
                        text={"Trả lương"}
                        textColor={"#FFFFFF"}
                        OnPress={() => handleConfirm()}
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
        fontFamily: "lato-bold",
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
        fontFamily: "lato-bold",
    },
    textSecondary: {
        fontSize: 16,
        fontFamily: "lato-regular",
        color: "#A1A1A1",
    },
    blackLine: {
        height: 1,
        backgroundColor: "#E5E4E7",
        marginVertical: 10,
    },
});
