import React, { useState, useMemo, useRef, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";

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

import { colors } from "../../../assets/colors/colors";
import {
	addDoc,
	collection,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const CASH_ICON = require("../../../assets/cash.png");
const MOMO_ICON = require("../../../assets/momo.png");

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

	const [totalDiscount, setTotalDiscount] = useState(0);

	const [isOpen, setIsOpen] = useState(false);

	const [modalVisible, setModalVisible] = useState(false);

	const paymentMethods = {
		cash: { title: "Tiền mặt", imageSource: CASH_ICON },
		momo: { title: "Momo", imageSource: MOMO_ICON },
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
				selectedTime && selectedDate && `${selectedDate} (${selectedTime})`,
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

	const handleChooseCoupon = () => {
		chooseCouponBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const handleSelectDeliveryCoupon = (deliveryCoupon) => {
		if (deliveryCoupon) {
			setSelectedDeliveryCoupon({
				deliveryCoupon: deliveryCoupon,
			});
		} else {
			setSelectedDeliveryCoupon(null);
		}
	};

	const handleSelectDiscountCoupon = (discountCoupon) => {
		if (discountCoupon) {
			setSelectedDiscountCoupon({
				discountCoupon: discountCoupon,
			});
		} else {
			setSelectedDiscountCoupon(null);
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

	const handleConfirmOrder = async () => {
		if (checkConfirmValidation()) {
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

				showSuccessModal();
			} catch (e) {
				console.error("Error adding document: ", e);
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

		productOrders.forEach((product) => {
			total += product.totalPrice * product.quantity;
		});

		if (selectedDeliveryCoupon && selectedDeliveryCoupon.deliveryCoupon) {
			total -=
				total *
				(selectedDeliveryCoupon.deliveryCoupon.discountPercentage / 100);

			totalDiscount +=
				total *
				(selectedDeliveryCoupon.deliveryCoupon.discountPercentage / 100);
		}

		if (selectedDiscountCoupon && selectedDiscountCoupon.discountCoupon) {
			total -=
				total *
				(selectedDiscountCoupon.discountCoupon.discountPercentage / 100);

			totalDiscount +=
				total *
				(selectedDiscountCoupon.discountCoupon.discountPercentage / 100);
		}

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
	}, [selectedDeliveryCoupon, selectedDiscountCoupon]);

	return (
		<>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container} showsVerticalScrollIndicator={false}>
					{renderDeliveryList()}
					<View style={{ marginTop: "5%" }}>
						<Section title="Sản phẩm đã chọn">
							<View style={{ marginTop: "2%" }}>
								<SelectedProductList orderList={productOrders} />
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
									orderInformation={productOrders}
									totalDiscount={totalDiscount}
								/>
							</View>
						</Section>
					</View>
					<View style={{ marginTop: "5%" }}>
						<Section title="Phương thức thanh toán">
							<View style={{ marginTop: "2%" }}>{renderPaymentMethods()}</View>
						</Section>
					</View>
				</View>
			</ScrollView>
			<View style={styles.footer}>
				<View style={styles.totalPriceContainer}>
					<Text style={styles.label}>Tổng cộng:</Text>
					<Text style={styles.price}>{formatCurrency(totalPrice)}</Text>
				</View>
				<CustomButton text={"Đặt hàng"} onPress={handleConfirmOrder} />
			</View>
			<ChooseCouponBottomSheet
				userData={userData}
				bottomSheetRef={chooseCouponBottomSheetRef}
				snapPoints={chooseCouponSnapPoints}
				onSelectDeliveryCoupon={handleSelectDeliveryCoupon}
				onSelectDiscountCoupon={handleSelectDiscountCoupon}
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
