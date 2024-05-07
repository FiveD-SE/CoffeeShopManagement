import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState, useMemo, useRef } from "react";
import Section from "../../../components/Client/Section";
import SelectedProductList from "../../../components/Client/List/SelectedProductList";
import ApplyVoucherButton from "../../../components/Client/Button/ApplyVoucherButton";
import TotalOrderList from "../../../components/Client/List/TotalOrderList";
import PaymentMethodButton from "../../../components/Client/Button/PaymentMethodButton";
import ChooseDeliveryButton from "../../../components/Client/Button/ChooseDeliveryButton";
import ChooseDeliveryBottomSheet from "../../../components/Client/BottomSheet/ChooseDeliveryBottomSheet";
import DeliveryInformationButton from "../../../components/Client/Button/DeliveryInformationButton";
import ChooseCouponBottomSheet from "../../../components/Client/BottomSheet/ChooseCouponBottomSheet";
import OrderConfirmationFooter from "../../../components/Client/OrderConfirmationFooter";
import { useNavigation } from "@react-navigation/native";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { connect } from "react-redux";

const CASH_ICON = require("../../../assets/cash.png");
const CREDIT_CARD_ICON = require("../../../assets/credit-card.png");
const MOMO_ICON = require("../../../assets/momo.png");

const UserOrderConfirmationScreen = ({ orderInformation }) => {
	const navigation = useNavigation();

	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

	const [deliveryOption, setDeliveryOption] = useState("");

	const [selectedCoupon, setSelectedCoupon] = useState(null);

	const [isOpen, setIsOpen] = useState(false);

	const chooseDeliverySnapPoints = useMemo(() => ["30%"], []);

	const chooseDeliveryBottomSheetRef = useRef(null);

	const chooseCouponSnapPoints = useMemo(() => ["85%"], []);

	const chooseCouponBottomSheetRef = useRef(null);

	const paymentMethods = {
		cash: { title: "Tiền mặt", imageSource: CASH_ICON },
		creditCard: { title: "Thẻ ngân hàng", imageSource: CREDIT_CARD_ICON },
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
				details: "15 - 30 phút (Càng sớm càng tốt)",
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
				details: "15 - 30 phút (Càng sớm càng tốt)",
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

	const handleOrderSuccess = () => {
		navigation.navigate("UserOrderInformationScreen");
	};

	const handleSelectCoupon = (deliveryCouponIndex, discountCouponIndex) => {
		setSelectedCoupon({
			deliveryCouponIndex: deliveryCouponIndex,
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
			goToSelectTime();
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

	const handleDeliveryTypeSelect = (deliveryType) => {
		setDeliveryOption(deliveryType);
	};

	const goToSelectAddress = () => {
		alert("ADDRESS");
	};
	const goToSelectReceiver = () => {
		alert("INFORMATION");
	};
	const goToSelectTime = () => {
		alert("TIME");
	};
	const goToSelectBranch = () => {
		alert("BRANCH");
	};

	return (
		<IsOpenProvider>
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
								<SelectedProductList orderList={orderInformation} />
							</View>
						</Section>
					</View>
					<View style={{ marginTop: "5%" }}>
						<ApplyVoucherButton onPress={handleChooseCoupon} />
					</View>
					<View style={{ marginTop: "5%" }}>
						<Section title="Tổng cộng">
							<View style={{ marginTop: "2%" }}>
								<TotalOrderList orderInformation={orderInformation} />
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
			<OrderConfirmationFooter onPress={handleOrderSuccess} />
			<ChooseDeliveryBottomSheet
				bottomSheetRef={chooseDeliveryBottomSheetRef}
				snapPoints={chooseDeliverySnapPoints}
				onDeliveryTypeSelect={handleDeliveryTypeSelect}
			/>
			<ChooseCouponBottomSheet
				bottomSheetRef={chooseCouponBottomSheetRef}
				snapPoints={chooseCouponSnapPoints}
				onSelectCoupon={handleSelectCoupon}
			/>
		</IsOpenProvider>
	);
};

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
});

const mapStateToProps = (state) => ({
	orderInformation: state.user.orderInformation,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserOrderConfirmationScreen);
