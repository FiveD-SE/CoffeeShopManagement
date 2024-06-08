import {
	StyleSheet,
	Text,
	View,
	Pressable,
	ScrollView,
	Platform,
} from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Section from "../../../components/Client/Section";
import SelectedProductList from "../../../components/Client/List/SelectedProductList";
import ApplyVoucherButton from "../../../components/Client/Button/ApplyVoucherButton";
import TotalOrderList from "../../../components/Client/List/TotalOrderList";
import PaymentMethodButton from "../../../components/Client/Button/PaymentMethodButton";
import ChooseDeliveryButton from "../../../components/Client/Button/ChooseDeliveryButton";
import ChooseDeliveryBottomSheet from "../../../components/Client/BottomSheet/ChooseDeliveryBottomSheet";
import DeliveryInformationButton from "../../../components/Client/Button/DeliveryInformationButton";
import ChooseCouponBottomSheet from "../../../components/Client/BottomSheet/ChooseCouponBottomSheet";
import { useNavigation } from "@react-navigation/native";
import SelectTimeBottomSheet from "../../../components/Client/BottomSheet/SelectTimeBottomSheet";
import { colors } from "../../../assets/colors/colors";

const CASH_ICON = require("../../../assets/cash.png");
const MOMO_ICON = require("../../../assets/momo.png");

const isIOS = Platform.OS === "ios";

const UserOrderConfirmationScreen = ({ route }) => {
	const { productOrders } = route.params;

	const navigation = useNavigation();

	const selectTimeBottomSheetRef = useRef();
	const selectTimeSnapPoints = useMemo(() => [isIOS ? "50%" : "40%"], []);

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

	const [deliveryOption, setDeliveryOption] = useState("");

	const [selectedDeliveryCoupon, setSelectedDeliveryCoupon] = useState(null);

	const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useState(null);

	const [selectedDate, setSelectedDate] = useState("");

	const [selectedTime, setSelectedTime] = useState("");

	const [isOpen, setIsOpen] = useState(false);

	const chooseDeliverySnapPoints = useMemo(() => ["30%"], []);

	const chooseDeliveryBottomSheetRef = useRef(null);

	const chooseCouponSnapPoints = useMemo(() => ["85%"], []);

	const chooseCouponBottomSheetRef = useRef(null);

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

	const handlePaymentMethodChange = (method) => {
		setSelectedPaymentMethod(method);
	};

	const handleChooseDeliveryMethod = () => {
		chooseDeliveryBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const handleChooseCoupon = () => {
		chooseCouponBottomSheetRef.current?.present();
		setIsOpen(true);
	};

	const handleConfirmOrder = () => {
		navigation.navigate("UserOrderInformationScreen");
	};

	const handleSelectDeliveryCoupon = (deliveryCouponIndex) => {
		setSelectedDeliveryCoupon({
			deliveryCouponIndex: deliveryCouponIndex,
		});
	};

	const handleSelectDiscountCoupon = (discountCouponIndex) => {
		setSelectedDiscountCoupon({
			discountCouponIndex: discountCouponIndex,
		});
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

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const calculateTotalPrice = () => {
		let total = 0;
		productOrders.forEach((product) => {
			total += product.totalPrice * product.quantity;
		});
		if (selectedDeliveryCoupon || selectedDiscountCoupon) {
			total = total * 0.5;
		}
		return total;
	};

	const setChooseDeliveryButtonTitle = () => {
		if (deliveryOption === "takeaway") {
			return "Tự đến lấy hàng";
		} else if (deliveryOption === "delivery") {
			return "Giao hàng tận nơi";
		}
		return "Chọn phương thức đặt hàng";
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
	const handleSelectTime = () => {
		selectTimeBottomSheetRef.current.present();
	};
	const goToSelectBranch = () => {
		alert("BRANCH");
	};

	useEffect(() => {
		chooseDeliveryBottomSheetRef.current.close();
	}, [deliveryOption]);

	useEffect(() => {
		chooseCouponBottomSheetRef.current.close();
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
								<TotalOrderList orderInformation={productOrders} />
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
					<Text style={styles.price}>
						{formatCurrency(calculateTotalPrice())}
					</Text>
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

export default UserOrderConfirmationScreen;

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 1,
		borderTopColor: "rgba(58,58,58,0.1)",
		backgroundColor: "#FFFFFF",
		padding: "5%",
	},
	headerContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		color: "#3a3a3a",
		fontSize: 18,
		fontWeight: "600",
	},
	buttonContainer: {
		backgroundColor: "rgba(0, 161, 136, 0.1)",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "2%",
		paddingHorizontal: "4%",
		borderRadius: 30,
	},
	buttonText: {
		marginRight: "5%",
		color: "#00A188",
		fontSize: 14,
		fontWeight: "700",
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 5,
	},
	footer: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: "5%",
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
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "700",
	},
	price: {
		color: "#3a3a3a",
		fontSize: 20,
		fontWeight: "700",
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
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
