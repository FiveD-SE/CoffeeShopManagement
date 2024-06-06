import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Section from "../../../components/Client/Section";
import VoucherCard from "../../../components/Client/Card/VoucherCard";
import { auth, db } from "../../../services/firebaseService";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

const UserExchangeVoucherScreen = () => {
    const [voucherItemList, setVoucherItemList] = useState([]);
    const [currentCredit, setCurrentCredit] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                setCurrentCredit(userDoc.data().credit);
            } else {
                console.log("User document does not exist.");
            }
        };

        fetchUserData();
    }, []);

    const renderVoucherItem = ({ item }) => (
        <VoucherCard title={item?.title} point={item?.point} imageSource={{}} />
    );

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={styles.currentPointContainer}>
                    <View>
                        <Image
                            source={require("../../../assets/Bitcoin.png")}
                        />
                    </View>
                    <View style={styles.currentPointContent}>
                        <Text style={styles.labelText}>
                            Số bean hiện tại của bạn
                        </Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.currentPointText}>
                                {currentCredit}
                            </Text>
                            <Text style={styles.currentPointLabel}>bean</Text>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: "5%" }}>
                    <Section title="Chọn voucher bạn muốn đổi">
                        <FlatList
                            data={voucherItemList}
                            renderItem={renderVoucherItem}
                        />
                    </Section>
                </View>
            </View>
        </View>
    );
};

export default UserExchangeVoucherScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        padding: "5%",
    },
    currentPointContainer: {
        flexDirection: "row",
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "5%",
        borderColor: "rgba(203, 203, 212, 0.30)",
        borderWidth: 1,
    },
    currentPointContent: {
        marginLeft: "10%",
    },
    labelText: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "600",
        marginBottom: "10%",
    },
    currentPointText: {
        color: "#4ECB71",
        fontSize: 16,
        fontWeight: "600",
        marginRight: "5%",
    },
    currentPointLabel: {
        color: "#A6A6AA",
        fontSize: 16,
        fontWeight: "500",
    },
    selectVoucherContainer: {
        marginTop: "10%",
    },
});
