import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Pressable, Image } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const ClientDetailHomeScreen = () => {
    const DATA = [
        {
            id: '123456',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123457',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
        {
            id: '123458',
            state: 'Hoàn thành',
            date: '01/01/2024',
            price: '236.000'
        },
    ]

    const [isToggled, setIsToggled] = useState(false);

    const [firstName] = useState("Nguyễn Quốc");
    const [lastName] = useState("Thắng");
    const [gender] = useState("Nam");
    const [birthday] = useState("13/03/2004");
    const [phone] = useState("346129897");
    const [email] = useState("22521337@gm.uit.edu.vn");

    const avatar = require("../../../assets/vietnam.png");
    const flag = require("../../../assets/vietnam.png");

    const renderItem = ({item}) => (
      <View 
        style={{padding: '5%', borderTopWidth: 1, borderColor: '#cccccc', borderWidth: 1, marginBottom: '5%', backgroundColor: '#fff', borderRadius: 10}}>
          <View>
              <Text style={{fontSize: 16, fontWeight: '600'}}>{item.id}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: '5%'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{backgroundColor: '#e3ffea', alignItems: 'center', justifyContent: 'center', padding: '3%', borderRadius: 15, marginEnd: '5%', paddingStart: '5%', paddingEnd: '5%'}}>
                      <Text style={{color: '#4ecb71'}}>{item.state}</Text>
                  </View>
                  <Text style={{color: '#808080'}}>{item.date}</Text>
              </View>
              <Text>
                  <Text>{item.price}</Text>
                  <Text>VND</Text>
              </Text>
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
});

export default ClientDetailHomeScreen;