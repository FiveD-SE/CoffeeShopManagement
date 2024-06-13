import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import Toast from "react-native-toast-message";

import BottomSheet from "./BottomSheet";
import Section from "../Section";
import SelectCouponCard from "../Card/SelectCouponCard";

import { colors } from "../../../assets/colors/colors";
import { db } from "../../../services/firebaseService";

const ChooseCouponBottomSheet = ({
	userData,
	bottomSheetRef,
	snapPoints,
	setIsOpen,
	onSelectDeliveryCoupon,
	onSelectDiscountCoupon,
	totalProductsPrice
}) => {
	const [productVoucherList, setProductVoucherList] = useState([]);
	const [shipVoucherList, setShipVoucherList] = useState([]);
	const [selectedDeliveryCoupon, setSelectedDeliveryCoupon] = useState(null);
	const [selectedDiscountCoupon, setSelectedDiscountCoupon] = useState(null);

	const convertTimestampToDate = (timestamp) => {
		return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
	};

	const formatDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString("vi-VN", options);
	};

	const handleSelectedDeliveryCouponChange = (selectedCoupon) => {
		setSelectedDeliveryCoupon((prev) =>
			prev && prev.coupon === selectedCoupon
				? null
				: { coupon: selectedCoupon }
		);
	};

	const handleSelectedDiscountCouponChange = (selectedCoupon) => {
		setSelectedDiscountCoupon((prev) =>
			prev && prev.coupon === selectedCoupon
				? null
				: { coupon: selectedCoupon }
		);
	};


	const handleChooseVoucher = (minimumOrderPrice) => {
		if (minimumOrderPrice < totalProductsPrice) {
			return true;
		}
		else {
			return false;
		}
	}

	const handleApplyCoupon = () => {
		if (selectedDiscountCoupon === null && selectedDeliveryCoupon === null) {
			Toast.show({
				type: "error",
				text1: "Vui lòng chọn mã",
				text2: "Chọn ít nhất 1 mã giảm giá để áp dụng",
				text1Style: {
					color: colors.black_100,
					fontSize: 16,
					fontFamily: "lato-bold",
				},
				text2Style: {
					color: colors.grey_100,
					fontSize: 14,
					fontFamily: "lato-bold",
				},
				visibilityTime: 2500,
				autoHide: true,
			});
			return;
		}

		onSelectDiscountCoupon(
			selectedDiscountCoupon ? selectedDiscountCoupon.coupon : null
		);
		onSelectDeliveryCoupon(
			selectedDeliveryCoupon ? selectedDeliveryCoupon.coupon : null
		);
	};

	const renderDeliveryFee = () => {
		const sortedDeliveryVouchers = shipVoucherList.slice().sort((a, b) => {
			if (handleChooseVoucher(a.minimumOrderPrice) && !handleChooseVoucher(b.minimumOrderPrice)) {
				return -1;
			}
			if (!handleChooseVoucher(a.minimumOrderPrice) && handleChooseVoucher(b.minimumOrderPrice)) {
				return 1;
			}
			return 0;
		});

		return sortedDeliveryVouchers.map((item, index) => {
			const isChecked = selectedDeliveryCoupon && selectedDeliveryCoupon.coupon === item;
			return (
				<SelectCouponCard
					key={index}
					title={item.voucherName}
					quantity={item.quantity}
					expireDate={item.expirationDate}
					imageSource={item.voucherImage}
					minimumOrderPrice={item.minimumOrderPrice}
					isChecked={isChecked}
					onPress={() => handleChooseVoucher(item.minimumOrderPrice) ? handleSelectedDeliveryCouponChange(item) : null}
					isChooseAble={handleChooseVoucher(item.minimumOrderPrice)}
				/>
			);
		});
	};

	const renderDiscount = () => {
		const sortedDiscountVouchers = productVoucherList.slice().sort((a, b) => {
			if (handleChooseVoucher(a.minimumOrderPrice) && !handleChooseVoucher(b.minimumOrderPrice)) {
				return -1;
			}
			if (!handleChooseVoucher(a.minimumOrderPrice) && handleChooseVoucher(b.minimumOrderPrice)) {
				return 1;
			}
			return 0;
		});

		return sortedDiscountVouchers.map((item, index) => {
			const isChecked = selectedDiscountCoupon && selectedDiscountCoupon.coupon === item;
			return (
				<SelectCouponCard
					key={index}
					title={item.voucherName}
					quantity={item.quantity}
					expireDate={item.expirationDate}
					imageSource={item.voucherImage}
					minimumOrderPrice={item.minimumOrderPrice}
					isChecked={isChecked}
					onPress={() => handleChooseVoucher(item.minimumOrderPrice) ? handleSelectedDiscountCouponChange(item) : null}
					isChooseAble={handleChooseVoucher(item.minimumOrderPrice)}
				/>
			);
		});
	};

	useEffect(() => {
		const fetchUserVoucherData = async () => {
			const userVoucherRefs = [];
			const productVoucherList = [];
			const shipVoucherList = [];

			try {
				const userVouchersQuery = query(
					collection(db, "userVouchers"),
					where("userId", "==", userData.id)
				);
				const querySnapshot = await getDocs(userVouchersQuery);

				querySnapshot.forEach((doc) => {
					const data = doc.data();
					const voucherIds = data.voucherId;

					voucherIds.forEach((voucher) => {
						userVoucherRefs.push({
							id: voucher.id,
							quantity: voucher.quantity,
						});
					});
				});

				for (const ref of userVoucherRefs) {
					const voucherDoc = await getDoc(doc(db, "vouchers", ref.id));
					const voucherData = voucherDoc.data();
					const expirationDate = convertTimestampToDate(
						voucherData.expirationDate
					);

					const voucherType = voucherData.voucherType;

					if (voucherType.discountType === "productDiscount") {
						productVoucherList.push({
							...voucherData,
							quantity: ref.quantity,
							expirationDate: formatDate(expirationDate),
						});
					} else if (voucherType.discountType === "shipDiscount") {
						shipVoucherList.push({
							...voucherData,
							quantity: ref.quantity,
							expirationDate: formatDate(expirationDate),
						});
					}
				}
				setProductVoucherList(productVoucherList);
				setShipVoucherList(shipVoucherList);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserVoucherData();
	}, [userData.id]);

	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
		>
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Section title="Ưu Đãi Vận Chuyển">
						<View style={{ marginTop: "2%" }}>{renderDeliveryFee()}</View>
					</Section>
					<View style={{ marginTop: "5%" }}>
						<Section title="Ưu Đãi Sản Phẩm">
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
		backgroundColor: colors.grey_10,
		padding: "4%",
	},
	applyButton: {
		backgroundColor: colors.green_100,
		justifyContent: "center",
		alignItems: "center",
		padding: "5%",
		borderRadius: 12,
		marginTop: "4%",
		marginBottom: "4%",
	},
	applyButtonText: {
		color: colors.white_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
});
