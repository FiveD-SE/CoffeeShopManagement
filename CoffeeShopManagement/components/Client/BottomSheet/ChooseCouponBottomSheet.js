import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import Section from "../Section";
import SelectCouponCard from "../Card/SelectCouponCard";

const COUPON_IMAGE = require("../../../assets/coupon-image.png");

const ChooseCouponBottomSheet = ({
	bottomSheetRef,
	snapPoints,
	setIsOpen,
	onSelectCoupon,
}) => {
	const [selectedDeliveryCoupon, setSelectedDeliveryCoupon] = useState(null);
	const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useState(null);

	const couponList = {
		deliveryFee: [
			{
				title: "Combo Cơm Nhà 89K",
				expireDate: "31/03/2034",
				imageSource: COUPON_IMAGE,
			},
			{
				title: "Combo Cơm Nhà 89K + Freeship",
				expireDate: "31/03/2034",
				imageSource: COUPON_IMAGE,
			},
			{
				title: "Combo Cơm Nhà 89K + Freeship",
				expireDate: "31/03/2034",
				imageSource: COUPON_IMAGE,
			},
		],
		discount: [
			{
				title: "Combo Cơm Nhà 89K + Freeship",
				expireDate: "31/03/2034",
				imageSource: COUPON_IMAGE,
			},
			{
				title: "Combo Cơm Nhà 89K + Freeship",
				expireDate: "31/03/2034",
				imageSource: COUPON_IMAGE,
			},
			{
				title: "Combo Cơm Nhà 89K + Freeship",
				expireDate: "31/03/2034",
				imageSource: COUPON_IMAGE,
			},
		],
	};

	const handleSelectedDeliveryCouponChange = (index) => {
		setSelectedDeliveryCoupon({
			index: index,
			coupon: couponList.deliveryFee[index],
		});
	};

	const handleSelectedDiscountCouponChange = (index) => {
		setSelectedDiscountCoupon({
			index: index,
			coupon: couponList.discount[index],
		});
	};

	const handleApplyCoupon = () => {
		onSelectCoupon(
			selectedDeliveryCoupon.coupon,
			selectedDiscountCoupon.coupon
		);
	};

	const renderDeliveryFee = () => {
		const delivery = couponList.deliveryFee;
		return delivery.map((item, index) => {
			const isChecked =
				selectedDeliveryCoupon && selectedDeliveryCoupon.index === index;
			return (
				<SelectCouponCard
					key={index}
					title={item.title}
					expireDate={item.expireDate}
					imageSource={item.imageSource}
					isChecked={isChecked}
					onPress={() => handleSelectedDeliveryCouponChange(index)}
				/>
			);
		});
	};

	const renderDiscount = () => {
		const discount = couponList.discount;
		return discount.map((item, index) => {
			const isChecked =
				selectedDiscountCoupon && selectedDiscountCoupon.index === index;
			return (
				<SelectCouponCard
					key={index}
					title={item.title}
					expireDate={item.expireDate}
					imageSource={item.imageSource}
					isChecked={isChecked}
					onPress={() => handleSelectedDiscountCouponChange(index)}
				/>
			);
		});
	};

	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
		>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Section title="Ưu đãi phí vận chuyển">
						<View style={{ marginTop: "2%" }}>{renderDeliveryFee()}</View>
					</Section>
					<View style={{ marginTop: "5%" }}>
						<Section title="Mã giảm giá">
							<View style={{ marginTop: "2%" }}>{renderDiscount()}</View>
						</Section>
					</View>
				</ScrollView>
				<Pressable style={styles.applyButton} onPress={handleApplyCoupon}>
					<Text style={styles.applyButtonText}>Áp dụng</Text>
				</Pressable>
			</View>
		</BottomSheet>
	);
};

export default ChooseCouponBottomSheet;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F7FA",
		padding: "5%",
	},
	applyButton: {
		backgroundColor: "#00A188",
		justifyContent: "center",
		alignItems: "center",
		padding: "5%",
		borderRadius: 20,
		marginTop: "5%",
	},
	applyButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});
