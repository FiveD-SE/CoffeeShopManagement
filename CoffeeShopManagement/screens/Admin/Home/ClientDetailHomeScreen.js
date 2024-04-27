import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Pressable, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const ClientDetailHomeScreen = () => {
    const DATA = [
        {
            id: '#123456',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '#123457',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '#123458',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
    ]

    const [firstName] = useState("Nguyễn Quốc");
    const [lastName] = useState("Thắng");
    const [gender] = useState("Nam");
    const [birthday] = useState("13/03/2004");
    const [phone] = useState("346129897");
    const [email] = useState("22521337@gm.uit.edu.vn");

    const avatar = require("../../../assets/vietnam.png");
    const flag = require("../../../assets/vietnam.png");

    const renderItem = ({item}) => (
      <View style={styles.labelItem}>
        <Text style={styles.itemId}>{item.id}</Text>
        <View style={styles.row}>
            <View style={styles.labelStatus}>
                <Text style={styles.itemStatus}>{item.state}</Text>
            </View>
            <Text style={styles.itemDate}>{item.date}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={{
                    color: "#CBCBD4",
                    fontFamily: "Lato-Bold",
                    fontSize: 16,
                    fontWeight: "bold",
                    lineHeight: 20,
                }}> VNĐ</Text>
            </View>
        </View>
      </View>
    )
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                    <Image alt="avatar" source={avatar} style={styles.profileAvatar} />
                </View>

                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Thông tin chung</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "48%" }]}>
                            <Text style={styles.text}>{firstName}</Text>
                        </View>
                        <View style={[styles.rowLabelText, { width: "48%" }]}>
                            <Text style={styles.text}>{lastName}</Text>
                        </View>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.label}>Giới tính</Text>
                            <View style={styles.row_space_between}>
                                <Text style={styles.text}>{gender}</Text>
                                <Pressable>
                                    <FontAwesome name="angle-right" size={32} style={{ marginLeft: 15 }} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.label}>Ngày sinh</Text>
                            <View style={styles.row_space_between}>
                                <Text style={styles.text}>{birthday}</Text>
                                <Pressable>
                                    <FontAwesome name="angle-right" size={32} style={{ marginLeft: 15 }} />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Số điện thoại</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%", justifyContent: "flex-start" }]}>
                            <Image style={{ height: 32, width: 32, marginRight: 10 }} source={flag} resizeMode="contain" />
                            <Text style={styles.text}>+84 {phone}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>Email</Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View style={[styles.rowLabelText, { width: "100%" }]}>
                            <Text style={styles.text}>{email}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Lịch sử giao dịch</Text>
                  {DATA.map(item => renderItem({ item }))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FA",
    },
    content: {
        paddingHorizontal: 20,
    },
    section: {
        paddingVertical: 10,
    },
    sectionTitle: {
        color: "#000",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    editButton: {
        color: "#006C5E",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontWeight: "bold",
        lineHeight: 20,
        marginBottom: 15,
    },
    profile: {
        backgroundColor: "#fff",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    profileAvatar: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
    rowLabelText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        marginBottom: 10,
    },
    row_space_between: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    iconContainer: {
        marginRight: 10,
    },
    text: {
        color: "#000",
        fontFamily: "Lato-Regular",
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 30
    },
    label: {
        color: "black",
        fontWeight: "900",
    },
    labelItem: {
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        marginBottom: 10,
        gap: 20,
    },
    itemTitle: {
        color: "#000",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        width: '100%',
        alignItems: "center",
        justifyContent: "space-between"
    },
    itemStatus: {
        color: "#4ECB71",
        fontFamily: "Lato-Bold",
        fontSize: 16,
        lineHeight: 20,
    },
    labelStatus: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 10,
        backgroundColor: "#E3FFEA",
    },
    itemId: {
        color: "#000000",
        fontFamily: "Lato-Bold",
        fontSize: 25,
        lineHeight: 27,
    },
    itemDate: {
        color: "#CBCBD4",
        fontFamily: "Lato-Regular",
        fontSize: 16,
        lineHeight: 20,
    },
    itemPrice: {
        color: "#000000",
        fontFamily: "Lato-Bold",
        fontSize: 25,
        lineHeight: 27,
    },
});

export default ClientDetailHomeScreen;