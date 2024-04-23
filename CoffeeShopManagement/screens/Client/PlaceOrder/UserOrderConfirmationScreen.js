import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import React, { useState, useMemo, useRef } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import Section from "../../../components/Client/Section";
import SelectedProductList from "../../../components/Client/List/SelectedProductList";
import ApplyVoucherButton from "../../../components/Client/Button/ApplyVoucherButton";
import TotalOrderList from "../../../components/Client/List/TotalOrderList";
import PaymentMethodButton from "../../../components/Client/Button/PaymentMethodButton";
import ChooseDeliveryButton from "../../../components/Client/Button/ChooseDeliveryButton";
import ChooseDeliveryBottomSheet from "../../../components/Client/BottomSheet/ChooseDeliveryBottomSheet";

const CASH_ICON = require("../../../assets/cash.png");
const CREDIT_CARD_ICON = require("../../../assets/credit-card.png");
const MOMO_ICON = require("../../../assets/momo.png");

const UserOrderConfirmationScreen = () => {
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const chooseDeliverySnapPoints = useMemo(() => ["30%"], []);
	const chooseDeliveryBottomSheetRef = useRef(null);
	const paymentMethods = {
		cash: { title: "Tiền mặt", imageSource: CASH_ICON },
		creditCard: { title: "Thẻ ngân hàng", imageSource: CREDIT_CARD_ICON },
		momo: { title: "Momo", imageSource: MOMO_ICON },
	};

	const handlePaymentMethodChange = (method) => {
		setSelectedPaymentMethod(method);
	};

	const handleChooseDeliveryMethod = () => {
		chooseDeliveryBottomSheetRef.current?.present();
		setIsOpen(true);
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

	return (
		<BottomSheetModalProvider>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container} showsVerticalScrollIndicator={false}>
					<ChooseDeliveryButton
						title={"Chọn phương thức đặt hàng"}
						onPress={handleChooseDeliveryMethod}
					/>
					<View style={{ marginTop: "5%" }}>
						<Section title="Sản phẩm đã chọn">
							<View style={{ marginTop: "2%" }}>
								<SelectedProductList />
							</View>
						</Section>
					</View>
					<View style={{ marginTop: "5%" }}>
						<ApplyVoucherButton />
					</View>
					<View style={{ marginTop: "5%" }}>
						<Section title="Tổng cộng">
							<View style={{ marginTop: "2%" }}>
								<TotalOrderList />
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
						{(10000).toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
					</Text>
				</View>
				<Pressable style={styles.orderButton}>
					<Text style={styles.orderButtonText}>Đặt hàng</Text>
				</Pressable>
			</View>
			<ChooseDeliveryBottomSheet
				bottomSheetRef={chooseDeliveryBottomSheetRef}
				snapPoints={chooseDeliverySnapPoints}
				setIsOpen={setIsOpen}
			/>
		</BottomSheetModalProvider>
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

	footer: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: "5%",
		paddingVertical: "2%",
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
		backgroundColor: "#00A188",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "4%",
		borderRadius: 20,
		marginTop: "5%",
	},
	orderButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
