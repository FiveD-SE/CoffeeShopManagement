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
import ChooseDeliveryBottomSheet from "../../../components/Client/BottomSheet/ChooseDeliveryBottomSheet";
import DeliveryInformationButton from "../../../components/Client/Button/DeliveryInformationButton";
import ChooseCouponBottomSheet from "../../../components/Client/BottomSheet/ChooseCouponBottomSheet";
import SelectTimeBottomSheet from "../../../components/Client/BottomSheet/SelectTimeBottomSheet";

import { colors } from "../../../assets/colors/colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const CASH_ICON = require("../../../assets/cash.png");
const MOMO_ICON = require("../../../assets/momo.png");

const isIOS = Platform.OS === "ios";

const UserOrderConfirmationScreen = ({ route, userData }) => {
	const { productOrders, selectedAddress, selectedBranch } = route.params;

	// console.log("productOrders: ", productOrders);

	console.log("selectedAddress: ", selectedAddress);

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

	const [addresses, setAddresses] = useState(null);

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
		delivery: {
			branch: {
				title: "Chi nhánh",
				details: selectedBranch && `${selectedBranch.branchName}`,
			},
			address: {
				title: "Thông tin đặt hàng",
				details:
					addresses &&
					`${addresses.street}, ${addresses.districtName}, ${addresses.provinceName}`,
			},
			deliveryTime: {
				title: "Thời gian nhận hàng",
				details:
					selectedTime && selectedDate && `${selectedDate} (${selectedTime})`,
			},
		},
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
		if (title === "Thông tin đặt hàng") {
			goToSelectAddress();
		} else if (title === "Thời gian nhận hàng") {
			handleSelectTime();
		} else if (title === "Chi nhánh") {
			goToSelectBranch();
		}
	};

	const renderDeliveryList = () => {
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
		navigation.navigate("SelectAddress", { productOrders, isOrdered: true });
	};

	const goToSelectBranch = () => {
		navigation.navigate("SelectBranchScreen", { productOrders, addresses });
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
	headerTitle: {
		color: colors.black_100,
		fontSize: 20,
		fontFamily: "lato-bold",
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
