import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    SafeAreaView,
    Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import VoucherCard from "../../../components/Client/Card/VoucherCard";
import UserVoucherCard from "../../../components/Client/Card/UserVoucherCard";
import { auth, db } from "../../../services/firebaseService";
import { doc, getDoc } from "firebase/firestore";

export default function Promotions() {
    const navigation = useNavigation();

    const coupon = require("../../../assets/coupon.png");
    const crown = require("../../../assets/crown.png");
    const bean = require("../../../assets/bean.png");
    const gift = require("../../../assets/gift.png");
    const rights = require("../../../assets/rights.png");

    const [beanTotal, setbeanTotal] = useState("0");
    const [userRank, setUserRank] = useState("Chưa tích điểm");
    const [beansToNextRank, setBeansToNextRank] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setbeanTotal(userDoc.data().credit);
                let rank = "Mới";
                const credit = userDoc.data().credit;
                let beansToNextRank = 0;

                if (credit >= 500) {
                    rank = "Kim cương";
                } else if (credit >= 300) {
                    rank = "Vàng";
                    beansToNextRank = 500 - credit;
                } else if (credit >= 200) {
                    rank = "Bạc";
                    beansToNextRank = 300 - credit;
                } else if (credit >= 100) {
                    rank = "Đồng";
                    beansToNextRank = 200 - credit;
                } else {
                    beansToNextRank = 100 - credit; // For not yet reaching Đồng rank
                }

                setUserRank(rank);
                setBeansToNextRank(beansToNextRank);
            } else {
                console.log("User document does not exist.");
            }
        };

        fetchUserData();
    }, []);

    const yourVoucherItemList = [
        {
            title: "Combo Cơm Nhà 89K + Freeship",
            expiryDate: "2024-05-01",
            option: "Giao hàng",
            imageSource: require("../../../assets/voucher.jpeg"),
        },
        {
            title: "Combo Cơm Nhà 89K + Freeship",
            expiryDate: "2024-04-25",
            option: "Tại chỗ",
            imageSource: require("../../../assets/voucher.jpeg"),
        },
        {
            title: "Combo Cơm Nhà 89K + Freeship",
            expiryDate: "2024-05-04",
            option: "Mang đi",
            imageSource: require("../../../assets/voucher.jpeg"),
        },
    ];

    const voucherItemList = [
        {
            title: "Mua 1 tặng 1 + Freeship",
            point: 300,
            imageSource: require("../../../assets/voucher.jpeg"),
        },
        {
            title: "Mua 1 tặng 1 + Freeship",
            point: 300,
            imageSource: require("../../../assets/voucher.jpeg"),
        },
        {
            title: "Mua 1 tặng 1 + Freeship",
            point: 300,
            imageSource: require("../../../assets/voucher.jpeg"),
        },
    ];

    const renderYourVoucherItemList = () => {
        return yourVoucherItemList.map((item, index) => (
            <UserVoucherCard
                key={index}
                title={item.title}
                expiryDate={item.expiryDate}
                option={item.option}
                imageSource={item.imageSource}
            />
        ));
    };

    const renderVoucherItem = () => {
        return voucherItemList.map((item, index) => (
            <VoucherCard
                key={index}
                title={item.title}
                point={item.point}
                imageSource={item.imageSource}
            />
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.heading}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text
                                style={[
                                    styles.textColumn,
                                    { fontSize: 25, fontWeight: "650" },
                                ]}
                            >
                                Ưu đãi của bạn
                            </Text>
                            <Text
                                style={[
                                    styles.textColumn,
                                    { fontSize: 15, fontWeight: "600" },
                                ]}
                            >
                                {beanTotal} bean
                            </Text>
                        </View>
                        <Pressable
                            style={styles.voucher}
                            onPress={() => navigation.navigate("YourVoucher")}
                        >
                            <Image
                                style={{
                                    height: 25,
                                    width: 25,
                                    marginRight: 6,
                                }}
                                source={coupon}
                                resizeMode="contain"
                            />
                            <Text
                                style={{
                                    fontFamily: "lato-regular",
                                    color: "#006C5E",
                                    fontStyle: "normal",
                                    fontSize: 16,
                                    lineHeight: 20,
                                    textAlign: "center",
                                }}
                            >
                                Voucher của tôi
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.barcodeContainer}>
                        <Text
                            style={[
                                styles.barcodeRank,
                                {
                                    fontFamily: "lato-bold",
                                    color: "#006C5E",
                                    fontSize: 30,
                                    textAlign: "center",
                                    textAlignVertical: "center",
                                    lineHeight: 30,
                                    numberOfLines: 2,
                                },
                            ]}
                        >
                            <Text style={{ fontSize: 20 }}>
                                Hạng thành viên{"\n"}
                            </Text>
                            {userRank}
                        </Text>
                    </View>

                    <Text style={styles.headingText}>
                        Còn {beansToNextRank} BEAN nữa bạn sẻ thăng hạng.{"\n"}
                        Đổi quà không ảnh hưởng tới việc thăng hạng của bạn
                    </Text>
                </View>

                <View style={styles.body}>
                    <View style={styles.row}>
                        <Pressable
                            style={styles.component}
                            onPress={() => navigation.navigate("Rank")}
                        >
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={crown}
                                resizeMode="contain"
                            />
                            <Text style={styles.componentText}>
                                Hạng thành viên
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.component}
                            onPress={() => navigation.navigate("Exchange")}
                        >
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={gift}
                                resizeMode="contain"
                            />
                            <Text style={styles.componentText}>Đổi Bean</Text>
                        </Pressable>
                    </View>
                    <View style={[styles.row, { marginTop: 20 }]}>
                        <Pressable
                            style={styles.component}
                            onPress={() => navigation.navigate("History")}
                        >
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={bean}
                                resizeMode="contain"
                            />
                            <Text style={styles.componentText}>
                                Lịch sử BEAN
                            </Text>
                        </Pressable>
                        <Pressable
                            style={styles.component}
                            onPress={() => navigation.navigate("Benefit")}
                        >
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={rights}
                                resizeMode="contain"
                            />
                            <Text style={styles.componentText}>
                                Quyền lợi của bạn
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.rowLabel}>
                        <Text style={styles.rowLabelText}>Voucher của bạn</Text>
                        <Pressable
                            style={styles.viewMore}
                            onPress={() => navigation.navigate("YourVoucher")}
                        >
                            <Text style={styles.viewMoreText}>Xem tất cả</Text>
                        </Pressable>
                    </View>

                    {renderYourVoucherItemList()}
                </View>

                <View style={styles.section}>
                    <View style={styles.rowLabel}>
                        <Text style={styles.rowLabelText}>Đổi voucher</Text>
                        <Pressable
                            style={styles.viewMore}
                            onPress={() => navigation.navigate("Exchange")}
                        >
                            <Text style={styles.viewMoreText}>Xem tất cả</Text>
                        </Pressable>
                    </View>

                    {renderVoucherItem()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        width: "100%",
        height: 300,
        backgroundColor: "#006C5E",
        paddingTop: 40,
        paddingHorizontal: 15,
        gap: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    textColumn: {
        fontFamily: "lato-regular",
        color: "#fff",
        textAlign: "left",
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    voucher: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 160,
        height: 45,
        backgroundColor: "#FFFFFF",
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    barcodeContainer: {
        height: 80,
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },

    barcodeRank: {
        fontFamily: "lato-regular",
        color: "#006C5E",
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
    },
    headingText: {
        fontFamily: "lato-regular",
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "500",
        marginLeft: 10,
    },
    body: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    component: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#FFFFFF",
        paddingVertical: 15,
        paddingHorizontal: 20,
        gap: 10,
        borderRadius: 5,
    },
    componentIcon: {
        height: 20,
        width: 20,
    },
    componentText: {
        fontFamily: "lato-regular",
        textAlign: "center",
        lineHeight: 20,
        fontSize: 15,
        fontWeight: "600",
    },
    section: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    rowLabel: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    rowLabelText: {
        fontFamily: "lato-regular",
        textAlign: "center",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "600",
        color: "#000000",
    },
    viewMore: {
        width: 90,
        height: 25,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: "#FAEBDE",
        borderRadius: 10,
        marginTop: 20,
    },
    viewMoreText: {
        fontFamily: "lato-regular",
        textAlign: "center",
        fontSize: 10,
        fontStyle: "normal",
        fontWeight: "700",
        color: "#FFA730",
    },
});
