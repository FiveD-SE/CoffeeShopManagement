import React, { useState, useMemo, useRef, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ScrollView,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";

import Section from "../../../components/Client/Section";
import SelectedProductList from "../../../components/Client/List/SelectedProductList";
import ApplyVoucherButton from "../../../components/Client/Button/ApplyVoucherButton";
import TotalOrderList from "../../../components/Client/List/TotalOrderList";
import PaymentMethodButton from "../../../components/Client/Button/PaymentMethodButton";
import ChooseDeliveryButton from "../../../components/Client/Button/ChooseDeliveryButton";
import ChooseDeliveryBottomSheet from "../../../components/Client/BottomSheet/ChooseDeliveryBottomSheet";
import DeliveryInformationButton from "../../../components/Client/Button/DeliveryInformationButton";
import ChooseCouponBottomSheet from "../../../components/Client/BottomSheet/ChooseCouponBottomSheet";
import SelectTimeBottomSheet from "../../../components/Client/BottomSheet/SelectTimeBottomSheet";

import { colors } from "../../../assets/colors/colors";

const CASH_ICON = require("../../../assets/cash.png");
const MOMO_ICON = require("../../../assets/momo.png");

const isIOS = Platform.OS === "ios";

const UserOrderConfirmationScreen = ({ route, userData }) => {
	const { productOrders } = route.params;

	console.log("productOrders: ", productOrders);

	const navigation = useNavigation();

	const selectTimeBottomSheetRef = useRef();

	const chooseDeliveryBottomSheetRef = useRef(null);

	const chooseCouponBottomSheetRef = useRef(null);

	const selectTimeSnapPoints = useMemo(() => [isIOS ? "50%" : "40%"], []);

	const chooseDeliverySnapPoints = useMemo(() => ["30%"], []);

	const chooseCouponSnapPoints = useMemo(() => ["85%"], []);

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

	const [deliveryOption, setDeliveryOption] = useState("");

	const [selectedDeliveryCoupon, setSelectedDeliveryCoupon] = useState(null);

	const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useState(null);

	const [selectedDate, setSelectedDate] = useState("");

	const [selectedTime, setSelectedTime] = useState("");

	const [totalPrice, setTotalPrice] = useState(0);

	const [totalDiscount, setTotalDiscount] = useState(0);

	const [isOpen, setIsOpen] = useState(false);

	const paymentMethods = {
		cash: { title: "Tiền mặt", imageSource: CASH_ICON },
		momo: { title: "Momo", imageSource: MOMO_ICON },
	};

	const deliveryMethod = {
		takeaway: {
			branch: {
				title: "Chi nhánh",
				details: "66E Hoàng Diệu 2, Quận Thủ Đức, Hồ Chí Minh, Việt Nam",
			},
			receiver: {
				title: "Thông tin người nhận",
				details: "Tánh Chần (0352085655)",
			},
			deliveryTime: {
				title: "Thời gian nhận hàng",
				details: `${selectedDate} (${selectedTime})`,
			},
		},
		delivery: {
			address: {
				title: "Địa chỉ giao hàng",
				details: "KTX khu B, Đông Hoà, Dĩ An, Bình Dương",
			},
			receiver: {
				title: "Thông tin người nhận",
				details: "Tánh Chần (0352085655)",
			},
			deliveryTime: {
				title: "Thời gian nhận hàng",
				details:
					selectedTime && selectedDate && `${selectedDate} (${selectedTime})`,
			},
		},
	};

	const handleChooseDeliveryMethod = () => {
		chooseDeliveryBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const handleSelectDeliveryCoupon = (deliveryCoupon) => {
		console.log(deliveryCoupon);
		if (deliveryCoupon) {
			setSelectedDeliveryCoupon({
				deliveryCoupon: deliveryCoupon,
			});
		} else {
			setSelectedDeliveryCoupon(null);
		}
	};

	const handleSelectDiscountCoupon = (discountCoupon) => {
		console.log(discountCoupon);
		if (discountCoupon) {
			setSelectedDiscountCoupon({
				discountCoupon: discountCoupon,
			});
		} else {
			setSelectedDiscountCoupon(null);
		}
	};

	const handleChooseCoupon = () => {
		chooseCouponBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const handlePaymentMethodChange = (method) => {
		setSelectedPaymentMethod(method);
	};

	const handleConfirmOrder = () => {
		navigation.navigate("UserOrderInformationScreen");
	};

	const handleDeliveryInfoPress = (title) => {
		if (title === "Địa chỉ giao hàng") {
			goToSelectAddress();
		} else if (title === "Thông tin người nhận") {
			goToSelectReceiver();
		} else if (title === "Thời gian nhận hàng") {
			handleSelectTime();
		} else if (title === "Chi nhánh") {
			goToSelectBranch();
		}
	};

	const renderDeliveryList = () => {
		if (deliveryOption === "delivery") {
			const delivery = deliveryMethod.delivery;

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
		}
		return null;
	};

	const setChooseDeliveryButtonTitle = () => {
		if (deliveryOption === "takeaway") {
			return "Tự đến lấy hàng";
		} else if (deliveryOption === "delivery") {
			return "Giao hàng tận nơi";
		}
		return "Chọn phương thức đặt hàng";
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

	const handleDeliveryTypeSelect = (deliveryType) => {
		setDeliveryOption(deliveryType);
	};

	const goToSelectAddress = () => {
		navigation.navigate("UserChooseAddressScreen");
	};

	const goToSelectReceiver = () => {
		alert("INFORMATION");
	};
	const goToSelectBranch = () => {
		alert("BRANCH");
	};

	const handleSelectTime = () => {
		selectTimeBottomSheetRef.current.present();
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

	const renderTakeawayList = () => {
		if (deliveryOption === "takeaway") {
			const takeaway = deliveryMethod.takeaway;

			return Object.keys(takeaway).map((index) => {
				const { title, details } = takeaway[index];
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
		}
		return null;
	};

	useEffect(() => {
		calculateTotalPrice();
	});

	useEffect(() => {
		chooseDeliveryBottomSheetRef.current.close();
	}, [deliveryOption]);

	useEffect(() => {
		if (selectedDeliveryCoupon || selectedDiscountCoupon) {
			chooseCouponBottomSheetRef.current.close();
		}
	}, [selectedDeliveryCoupon, selectedDiscountCoupon]);

	return (
		<>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container} showsVerticalScrollIndicator={false}>
					<ChooseDeliveryButton
						title={setChooseDeliveryButtonTitle()}
						onPress={handleChooseDeliveryMethod}
					/>
					{renderTakeawayList()}
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
				<Pressable style={styles.orderButton} onPress={handleConfirmOrder}>
					<Text style={styles.orderButtonText}>Đặt hàng</Text>
				</Pressable>
			</View>
			<ChooseDeliveryBottomSheet
				bottomSheetRef={chooseDeliveryBottomSheetRef}
				snapPoints={chooseDeliverySnapPoints}
				onDeliveryTypeSelect={handleDeliveryTypeSelect}
			/>
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
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		color: colors.black_100,
		fontSize: 18,
		fontWeight: "600",
	},
	buttonContainer: {
		backgroundColor: colors.green_10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "2%",
		paddingHorizontal: "4%",
		borderRadius: 30,
	},
	buttonText: {
		marginRight: "5%",
		color: colors.green_100,
		fontSize: 14,
		fontFamily: "lato-regular",
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
	orderButton: {
		backgroundColor: colors.green_100,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "6%",
		borderRadius: 12,
		marginTop: "4%",
		shadowColor: colors.grey_100,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.4,
		shadowRadius: 4,
		elevation: 4,
	},
	orderButtonText: {
		color: colors.white_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
});
