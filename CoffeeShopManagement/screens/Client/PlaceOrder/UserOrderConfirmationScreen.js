import React, { useState, useMemo, useRef, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";
import { Linking } from "react-native";

import Section from "../../../components/Client/Section";
import SelectedProductList from "../../../components/Client/List/SelectedProductList";
import ApplyVoucherButton from "../../../components/Client/Button/ApplyVoucherButton";
import TotalOrderList from "../../../components/Client/List/TotalOrderList";
import PaymentMethodButton from "../../../components/Client/Button/PaymentMethodButton";
import DeliveryInformationButton from "../../../components/Client/Button/DeliveryInformationButton";
import ChooseCouponBottomSheet from "../../../components/Client/BottomSheet/ChooseCouponBottomSheet";
import SelectTimeBottomSheet from "../../../components/Client/BottomSheet/SelectTimeBottomSheet";
import SuccessModal from "../../../components/Client/SuccessModal";
import CustomButton from "../../../components/Client/Button/CustomButton";
import { calculateFee } from "../../../services/ghnService";

import { colors } from "../../../assets/colors/colors";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
    docRef,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const CASH_ICON = require("../../../assets/cash.png");
const MOMO_ICON = require("../../../assets/bank.png");

const isIOS = Platform.OS === "ios";

const UserOrderConfirmationScreen = ({ route, userData }) => {
    const { productOrders, selectedAddress, selectedBranch } = route.params;

    const navigation = useNavigation();

    const selectTimeBottomSheetRef = useRef();

    const chooseCouponBottomSheetRef = useRef(null);

    const selectTimeSnapPoints = useMemo(() => [isIOS ? "50%" : "40%"], []);

    const chooseCouponSnapPoints = useMemo(() => ["85%"], []);

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [selectedDeliveryCoupon, setSelectedDeliveryCoupon] = useState(null);
    const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useState(null);
    const [addresses, setAddresses] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [productDiscount, setProductDiscount] = useState(0);
    const [deliveryDiscount, setDeliveryDiscount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isChangeAddress, setIsChangeAddress] = useState(false);

    const [paymentLoading, setPaymentLoading] = useState(false);
    const [formValue, setFormValue] = useState({});

    const totalProductsPrice = productOrders.reduce(
        (accumulator, currentItem) => {
            return accumulator + currentItem.totalPrice * currentItem.quantity;
        },
        0
    );

    const paymentMethods = {
        cash: { title: "Tiền mặt", imageSource: CASH_ICON },
        bank: { title: "Ngân hàng", imageSource: MOMO_ICON },
    };

    const generateRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const deliveryOption = {
        address: {
            title: "Thông tin đặt hàng",
            details:
                addresses &&
                `${addresses.street}, ${addresses.districtName}, ${addresses.provinceName}`,
        },
        branch: {
            title: "Chi nhánh",
            details: selectedBranch && `${selectedBranch.branchName}`,
        },
        deliveryTime: {
            title: "Thời gian nhận hàng",
            details:
                selectedTime &&
                selectedDate &&
                `${selectedDate} (${selectedTime})`,
        },
    };

    const handleDeliveryInfoPress = (title) => {
        if (title === "Thông tin đặt hàng") {
            handleSelectAddress();
        } else if (title === "Thời gian nhận hàng") {
            handleSelectTime();
        } else if (title === "Chi nhánh") {
            handleSelectBranch();
        }
    };

    const handleSelectAddress = () => {
        navigation.navigate("SelectAddress", {
            productOrders,
            selectedBranch,
            isOrdered: true,
        });
    };

    const handleSelectBranch = () => {
        navigation.navigate("SelectBranchScreen", {
            productOrders,
            addresses,
        });
    };

    const handleSelectTime = () => {
        selectTimeBottomSheetRef.current.present();
    };

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setSelectedDeliveryCoupon(null);
            setIsChangeAddress(true);
        }
        console.log("isChange: ", isChangeAddress);
    }, [isFocused, selectedAddress]);

    const renderDeliveryList = () => {
        const delivery = deliveryOption;

        return Object.keys(delivery).map((index) => {
            const { title, details } = delivery[index];
            return (
                <View key={index} style={{ marginTop: "5%" }}>
                    <DeliveryInformationButton
                        title={title}
                        details={details}
                        onPress={() => handleDeliveryInfoPress(title)}
                    />
                </View>
            );
        });
    };

    const calculateShippingFee = async (address, selectedBranch) => {
        try {
            const from_district_id = selectedBranch.districtId;
            const from_ward_code = selectedBranch.wardId;
            const service_id = null;
            const service_type_id = 2;
            const to_district_id = address.districtId;
            const to_ward_code = address.wardId;
            const height = 10;
            const length = 50;
            const weight = 200;
            const width = 20;
            const insurance_value = 1000;
            const cod_failed_amount = 2000;
            const coupon = null;

            const feeData = {
                from_district_id,
                from_ward_code,
                service_id,
                service_type_id,
                to_district_id,
                to_ward_code,
                height,
                length,
                weight,
                width,
                insurance_value,
                cod_failed_amount,
                coupon,
            };
            const feeResponse = await calculateFee(feeData);

            const newShippingFee = feeResponse;
            setDeliveryFee(newShippingFee);
        } catch (error) {
            console.log("Error calculating shipping fee:", error);
        }
    };

    const calculateAndUpdateUserCredit = async (totalPrice) => {
        try {
            const creditToAdd = Math.round(totalPrice * 0.0005);
            const userRef = doc(db, "users", userData.id);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                const currentCredit = userSnap.data().credit || 0;
                const currentRankPoint = userSnap.data().rankPoint || 0;

                const newCredit = currentCredit + creditToAdd;
                const newRankPoint = currentRankPoint + creditToAdd;

                await updateDoc(userRef, {
                    credit: newCredit,
                    rankPoint: newRankPoint,
                });
            } else {
                console.error("User document does not exist!");
            }
        } catch (error) {
            console.error("Error updating user credit: ", error);
        }
    };

    const handleChooseCoupon = () => {
        chooseCouponBottomSheetRef.current?.present();
        setIsOpen(true);
    };

    const handleSelectDeliveryCoupon = (deliveryCoupon) => {
        console.log("deliveryCoupon: ", deliveryCoupon);
        if (deliveryCoupon) {
            setSelectedDeliveryCoupon({
                deliveryCoupon: deliveryCoupon,
            });
            if (
                deliveryFee !== 0 &&
                deliveryCoupon.discountPrice > deliveryFee
            ) {
                setDeliveryDiscount(deliveryFee);
            } else {
                setDeliveryDiscount(deliveryCoupon.discountPrice);
            }
        } else {
            setSelectedDeliveryCoupon(null);
            setDeliveryDiscount(0);
        }
    };

    const handleSelectDiscountCoupon = (discountCoupon) => {
        console.log("discountCoupon: ", discountCoupon);
        if (discountCoupon) {
            setSelectedDiscountCoupon({
                discountCoupon: discountCoupon,
            });
            const productDiscount =
                totalProductsPrice *
                (discountCoupon.discountPrice.discountPercentage / 100);
            if (
                productDiscount > discountCoupon.discountPrice.maximumDiscount
            ) {
                setProductDiscount(
                    discountCoupon.discountPrice.maximumDiscount
                );
            } else {
                setProductDiscount(productDiscount);
            }
            console.log("discount:", productDiscount);
        } else {
            setSelectedDiscountCoupon(null);
            setProductDiscount(0);
        }
    };

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
    };

    const renderPaymentMethods = () => {
        return Object.keys(paymentMethods).map((method) => {
            const { title, imageSource } = paymentMethods[method];
            const isChecked = selectedPaymentMethod === method;

            return (
                <PaymentMethodButton
                    key={method}
                    title={title}
                    imageSource={imageSource}
                    isChecked={isChecked}
                    onPress={() => handlePaymentMethodChange(method)}
                />
            );
        });
    };

    const checkConfirmValidation = () => {
        if (!selectedBranch) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Vui lòng chọn chi nhánh đặt hàng",
                text1Style: {
                    color: colors.black_100,
                    fontSize: 16,
                    fontFamily: "lato-bold",
                },
                text2Style: {
                    color: colors.grey_100,
                    fontSize: 14,
                    fontFamily: "lato-regular",
                },
                autoHide: true,
            });
            return false;
        } else if (!selectedDate || !selectedTime) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Vui lòng chọn thời gian nhận hàng",
                text1Style: {
                    color: colors.black_100,
                    fontSize: 16,
                    fontFamily: "lato-bold",
                },
                text2Style: {
                    color: colors.grey_100,
                    fontSize: 14,
                    fontFamily: "lato-regular",
                },
                autoHide: true,
            });
            return false;
        } else if (!selectedPaymentMethod) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Vui lòng chọn phương thức thanh toán",
                text1Style: {
                    color: colors.black_100,
                    fontSize: 16,
                    fontFamily: "lato-bold",
                },
                text2Style: {
                    color: colors.grey_100,
                    fontSize: 14,
                    fontFamily: "lato-regular",
                },
                autoHide: true,
            });
            return false;
        } else if (!addresses) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Vui lòng chọn địa chỉ nhận hàng",
                text1Style: {
                    color: colors.black_100,
                    fontSize: 16,
                    fontFamily: "lato-bold",
                },
                text2Style: {
                    color: colors.grey_100,
                    fontSize: 14,
                    fontFamily: "lato-regular",
                },
                autoHide: true,
            });
            return false;
        }
        return true;
    };

    const createOrder = async () => {
        try {
            const docRef = await addDoc(collection(db, "orders"), {
                userId: userData.id,
                products: productOrders,
                orderTotalPrice: totalPrice,
                orderTotalDiscount: totalDiscount,
                paymentMethod: selectedPaymentMethod,
                deliveryAddress: addresses,
                deliveryFee: deliveryFee,
                deliveryBranch: selectedBranch,
                deliveryTime: `${selectedDate} (${selectedTime})`,
                orderDate: new Date(),
                orderState: 1,
            });
            await updateDoc(docRef, { orderId: docRef.id });

            const userNotificationRef = doc(
                collection(db, "user_notifications")
            );
            const user_notificationId = userNotificationRef.id;
            const user_notification = {
                notificationId: user_notificationId,
                notificationTitle: "Đơn hàng mới",
                notificationContent: "Đặt hàng thành công!",
                notificationType: 2,
                notificationStatus: false,
                orderId: docRef.id,
                notificationCreatedDate: new Date(),
                userId: userData.id,
            };
            await setDoc(userNotificationRef, user_notification);

            const adminNotificationRef = doc(
                collection(db, "admin_notifications")
            );

            const admin_notificationId = adminNotificationRef.id;
            const admin_notification = {
                notificationId: admin_notificationId,
                notificationTitle: "Đơn hàng mới",
                notificationContent: "Có đơn hàng mới cần xử lý!",
                notificationType: 2,
                notificationStatus: false,
                orderId: docRef.id,
                notificationCreatedDate: new Date(),
            };

            await setDoc(adminNotificationRef, admin_notification);
            await calculateAndUpdateUserCredit(totalPrice);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const updateUserVoucher = async () => {
        if (selectedDeliveryCoupon) {
            console.log("selectedDeliveryCoupon: ", selectedDeliveryCoupon);
            const userVoucherRef = doc(db, "userVouchers", userData.id);
            const userVoucherSnap = await getDoc(userVoucherRef);
            const userVoucherData = userVoucherSnap.data();
            const vouchers = userVoucherData.voucherId || [];
            const voucherIndex = vouchers.findIndex(
                (v) => v.id === selectedDeliveryCoupon.deliveryCoupon.voucherId
            );
            if (voucherIndex >= 0) {
                if (vouchers[voucherIndex].quantity === 1) {
                    vouchers.splice(voucherIndex, 1);
                } else {
                    vouchers[voucherIndex].quantity -= 1;
                }
                await updateDoc(userVoucherRef, {
                    voucherId: vouchers,
                });
            }
        }

        if (selectedDiscountCoupon) {
            console.log("selectedDiscountCoupon: ", selectedDiscountCoupon);
            const userVoucherRef = doc(db, "userVouchers", userData.id);
            const userVoucherSnap = await getDoc(userVoucherRef);
            const userVoucherData = userVoucherSnap.data();
            const vouchers = userVoucherData.voucherId || [];
            const voucherIndex = vouchers.findIndex(
                (v) => v.id === selectedDiscountCoupon.discountCoupon.voucherId
            );
            if (voucherIndex >= 0) {
                if (vouchers[voucherIndex].quantity === 1) {
                    vouchers.splice(voucherIndex, 1);
                } else {
                    vouchers[voucherIndex].quantity -= 1;
                }
                await updateDoc(userVoucherRef, {
                    voucherId: vouchers,
                });
            }
        }
    };

    const handleConfirmOrder = async () => {
        if (checkConfirmValidation()) {
            setPaymentLoading(true);
            try {
                if (selectedPaymentMethod === "bank") {
                    const body = {
                        orderCode: generateRandomNumber(100000, 999999),
                        amount: 2000,
                        description: "Thanh toán đơn hàng",
                    };

                    setFormValue(body);

                    try {
                        const response = await axios.post(
                            "https://cfbe.up.railway.app/create-payment-link",
                            body
                        );
                        const paymentUrl = response.data.paymentUrl;
                        console.log("paymentUrl: ", paymentUrl);
                        Linking.openURL(paymentUrl);
                    } catch (error) {
                        console.error("Error adding document: ", error);
                    }
                } else {
                    await createOrder();

                    await updateUserVoucher();

                    showSuccessModal();
                }
            } catch (e) {
                console.error("Error adding document: ", e);
            } finally {
                setPaymentLoading(false);
            }
        }
    };

    const handleContinue = async () => {
        if (selectedPaymentMethod === "bank") {
            setPaymentLoading(true);
            try {
                const response = await fetch(
                    `https://cfbe.up.railway.app/payment-link/${formValue.orderCode}`
                );
                const data = await response.json();
                const dataStatus = data.data.status;
                console.log("Payment link information:", data);

                if (dataStatus === "PAID") {
                    await createOrder();
                    showSuccessModal();
                } else {
                    console.log("Payment link is not confirmed");
                    Toast.show({
                        type: "error",
                        text1: "Lỗi",
                        text2: "Thanh toán chưa thành công",
                        text1Style: {
                            fontSize: 16,
                            fontFamily: "lato-bold",
                        },
                        text2Style: {
                            fontSize: 12,
                            fontFamily: "lato-bold",
                            color: colors.grey_100,
                        },
                    });
                }
            } catch (error) {
                console.log("Error getting payment link information:", error);
            } finally {
                setPaymentLoading(false);
            }
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const calculateTotalPrice = () => {
        let total = 0;
        let totalDiscount = 0;
        let shipFee = 0;

        productOrders.forEach((product) => {
            total += product.totalPrice * product.quantity;
        });

        if (selectedDeliveryCoupon && selectedDeliveryCoupon.deliveryCoupon) {
            const newDeliveryFee = deliveryFee - deliveryDiscount;

            if (newDeliveryFee >= 0) {
                shipFee = newDeliveryFee;
                totalDiscount += deliveryDiscount;
            } else {
                totalDiscount += deliveryFee;
            }

            totalDiscount += deliveryDiscount;
        } else {
            shipFee = deliveryFee;
        }

        if (selectedDiscountCoupon && selectedDiscountCoupon.discountCoupon) {
            total -= productDiscount;

            totalDiscount += productDiscount;
        }

        total += shipFee;
        setTotalDiscount(totalDiscount);
        setTotalPrice(total);
    };

    const showSuccessModal = () => {
        setModalVisible(true);
    };

    const hideSuccessModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        calculateTotalPrice();
    });

    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const q = query(
                    collection(db, "addresses"),
                    where("userId", "==", userData.id),
                    where("isDefault", "==", true)
                );

                const querySnapshot = await getDocs(q);
                const loadedAddresses = [];
                querySnapshot.forEach((doc) => {
                    loadedAddresses.push(doc.data());
                });

                if (loadedAddresses.length > 0) {
                    setAddresses(loadedAddresses[0]);
                }

                console.log("loadedAddresses: ", loadedAddresses);
            } catch (error) {
                console.error("Error loading addresses:", error);
            }
        };

        loadAddresses();
    }, [userData.id]);

    useEffect(() => {
        setAddresses(selectedAddress);
    }, [selectedAddress]);

    useEffect(() => {
        if (selectedDeliveryCoupon || selectedDiscountCoupon) {
            chooseCouponBottomSheetRef.current.close();
        }
        if (!selectedDiscountCoupon) {
            setProductDiscount(0);
        }
        if (!selectedDeliveryCoupon) {
            setDeliveryDiscount(0);
        }
    }, [selectedDeliveryCoupon, selectedDiscountCoupon]);

    useEffect(() => {
        if (addresses && selectedBranch) {
            if (
                addresses.districtId === selectedBranch.districtId &&
                addresses.provinceId === selectedBranch.provinceId &&
                addresses.wardId === selectedBranch.wardId
            ) {
                setDeliveryFee(0);
            } else {
                calculateShippingFee(addresses, selectedBranch);
            }
        } else {
            setDeliveryFee(0);
        }
    }, [addresses, selectedBranch]);

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                >
                    {renderDeliveryList()}
                    <View style={{ marginTop: "5%" }}>
                        <Section title="Sản phẩm đã chọn">
                            <View style={{ marginTop: "2%" }}>
                                <SelectedProductList
                                    orderList={productOrders}
                                />
                            </View>
                        </Section>
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <ApplyVoucherButton onPress={handleChooseCoupon} />
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <Section title="Tổng cộng">
                            <View style={{ marginTop: "2%" }}>
                                <TotalOrderList
                                    totalPrice={totalProductsPrice}
                                    deliveryDiscount={deliveryDiscount}
                                    deliveryfee={deliveryFee}
                                    productDiscount={productDiscount}
                                />
                            </View>
                        </Section>
                    </View>
                    <View style={{ marginTop: "5%" }}>
                        <Section title="Phương thức thanh toán">
                            <View style={{ marginTop: "2%" }}>
                                {renderPaymentMethods()}
                            </View>
                        </Section>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.totalPriceContainer}>
                    <Text style={styles.label}>Tổng cộng:</Text>
                    <Text style={styles.price}>
                        {formatCurrency(totalPrice)}
                    </Text>
                </View>
                <CustomButton
                    text={paymentLoading ? "Đang xử lý..." : "Tiếp tục"}
                    onPress={handleConfirmOrder}
                    disabled={paymentLoading}
                />
                {selectedPaymentMethod == "bank" && (
                    <CustomButton
                        text={
                            paymentLoading
                                ? "Đang xử lý..."
                                : "Kiểm tra thanh toán"
                        }
                        onPress={handleContinue}
                        disabled={paymentLoading}
                    />
                )}
            </View>
            <ChooseCouponBottomSheet
                userData={userData}
                bottomSheetRef={chooseCouponBottomSheetRef}
                snapPoints={chooseCouponSnapPoints}
                onSelectDeliveryCoupon={handleSelectDeliveryCoupon}
                onSelectDiscountCoupon={handleSelectDiscountCoupon}
                totalProductsPrice={totalProductsPrice}
                deliveryFee={deliveryFee}
                isChangeAddress={isChangeAddress}
                setIsChangeAddress={setIsChangeAddress}
            />
            <SelectTimeBottomSheet
                bottomSheetRef={selectTimeBottomSheetRef}
                snapPoints={selectTimeSnapPoints}
                onDateSelected={setSelectedDate}
                onTimeSelected={setSelectedTime}
            />
            <SuccessModal visible={modalVisible} onClose={hideSuccessModal} />
        </>
    );
};

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserOrderConfirmationScreen);

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderTopColor: colors.grey_50,
        backgroundColor: colors.white_100,
        padding: "4%",
    },
    title: {
        color: colors.black_100,
        fontSize: 18,
        fontWeight: "600",
    },
    footer: {
        backgroundColor: colors.white_100,
        paddingHorizontal: "4%",
        paddingVertical: isIOS ? "10%" : "6%",
        borderTopWidth: 1,
        borderTopColor: colors.grey_50,
    },
    totalPriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        color: colors.black_100,
        fontSize: 16,
        fontFamily: "lato-bold",
    },
    price: {
        color: colors.black_100,
        fontSize: 20,
        fontFamily: "lato-bold",
    },
});
