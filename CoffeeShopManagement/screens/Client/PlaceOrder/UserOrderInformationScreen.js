import React, { useState, useRef, useMemo } from "react";
import { Text, View, ScrollView, Pressable, StyleSheet } from "react-native";
import OrderProgressBar from "../../../components/Client/OrderProgressBar";
import UserInfoRow from "../../../components/Client/UserInfoRow";
import OrderedItem from "../../../components/Client/Card/OrderedItem";
import StatusInfo from "../../../components/Client/StatusInfo";
import RouteDetails from "../../../components/Client/RouteDetails";
import SectionWithBackground from "../../../components/Client/SectionWithBackground";
import RatingModal from "./RatingModal";

const ORDER_ITEM_IMAGE = require("../../../assets/starbucks.jpeg");

const UserOrderInformationScreen = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const handleReceiveOrder = () => {
        setCurrentPage(4);
        setModalVisible(true);
    };

    const orderItemList = [
        {
            title: "Trà đào chân châu trắng",
            price: 59000,
            quantity: 4,
            imageSource: ORDER_ITEM_IMAGE,
        },
        {
            title: "Trà đào chân châu đen",
            price: 59000,
            quantity: 2,
            imageSource: ORDER_ITEM_IMAGE,
        },
    ];

    const renderOrderedItem = () =>
        orderItemList.map((item, index) => (
            <OrderedItem
                key={index}
                title={item.title}
                price={item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
                quantity={item.quantity}
                imageSource={item.imageSource}
            />
        ));

    const [modalVisible, setModalVisible] = useState(false);

    const showToppingModal = () => {
        setModalVisible(true);
    };

    const hideToppingModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.scrollViewContainer}
            >
                <View style={styles.container}>
                    <SectionWithBackground title="Sẽ xong lúc 10:50 SA">
                        <Text style={styles.subTitleText}>Đang thực hiện</Text>
                        <View style={{ marginTop: "5%" }}>
                            <OrderProgressBar
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </View>
                    </SectionWithBackground>
                    <SectionWithBackground title="THE COFFEE HOUSE chi nhánh D2">
                        <Text style={styles.infoText}>
                            66E Hoàng Diệu 2, Quận Thủ Đức, HCM, Việt Nam
                        </Text>
                    </SectionWithBackground>

                    <RouteDetails
                        from={"THE COFFEE HOUSE chi nhánh D2"}
                        to={"KTX khu B"}
                    />

                    <SectionWithBackground title="Thông tin khách hàng">
                        <UserInfoRow
                            label="Họ và tên"
                            value="Tánh'ss Trần'ss"
                        />
                        <UserInfoRow label="Số điện thoại" value="0352085655" />
                        <StatusInfo
                            label="Trạng thái thanh toán"
                            isPaid={true}
                        />
                    </SectionWithBackground>
                    <SectionWithBackground title="Danh sách các món đã đặt">
                        <Text style={styles.infoText}>
                            Kiểm tra kĩ trước khi nhận hàng bạn nhé
                        </Text>
                        <View style={{ marginTop: "5%" }}>
                            {renderOrderedItem()}
                        </View>
                        <View style={styles.totalContainer}>
                            <Text style={styles.titleText}>Tổng cộng:</Text>
                            <Text style={styles.titleText}>177.000đ</Text>
                        </View>
                    </SectionWithBackground>
                </View>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <Pressable
                    style={[
                        styles.button,
                        currentPage < 3 && styles.disabledButton,
                    ]}
                    onPress={handleReceiveOrder}
                    disabled={currentPage < 3}
                >
                    <Text style={styles.buttonText}>Đã nhận hàng</Text>
                </Pressable>
            </View>
            <RatingModal visible={modalVisible} onClose={hideToppingModal} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FA",
        padding: "5%",
    },
    scrollViewContainer: {
        marginBottom: "1%",
    },
    sectionContainer: {
        backgroundColor: "#FFFFFF",
        padding: "5%",
        borderRadius: 20,
        marginTop: "5%",
    },
    titleText: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "600",
    },
    subTitleText: {
        color: "rgba(58, 58, 58, 0.50)",
        fontSize: 12,
        fontWeight: "500",
        marginTop: "2%",
    },
    infoText: {
        color: "rgba(58, 58, 58, 0.5)",
        fontSize: 12,
        fontWeight: "500",
        marginTop: "2%",
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5%",
    },
    bottomContainer: {
        backgroundColor: "#FFFFFF",
        padding: "5%",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00A188",
        paddingVertical: "4%",
        borderRadius: 20,
        elevation: 2,
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    disabledButton: {
        backgroundColor: "#CBCBD4",
    },
});

export default UserOrderInformationScreen;
