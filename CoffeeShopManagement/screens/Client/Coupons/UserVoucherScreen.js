import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DiscountCouponTab from "./Tabs/DiscountCouponTab";
import DeliveryCouponTab from "./Tabs/DeliveryCouponTab";
import { colors } from "../../../assets/colors/colors";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { connect } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const UserVoucherScreen = ({ userData }) => {
	const [productVoucherList, setProductVoucherList] = useState([]);
	const [shipVoucherList, setShipVoucherList] = useState([]);

	const convertTimestampToDate = (timestamp) => {
		return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
	};

	const formatDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString("vi-VN", options);
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
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: {
					textTransform: "capitalize",
					fontFamily: "lato-bold",
				},
				tabBarIndicatorStyle: {
					height: 2,
					borderRadius: 10,
					backgroundColor: colors.green_100,
				},
				tabBarActiveTintColor: colors.green_100,
				tabBarInactiveTintColor: colors.grey_100,
				tabBarStyle: {
					borderTopWidth: 1,
					borderTopColor: colors.grey_50,
				},
				tabBarPressColor: "transparent",
				tabBarPressOpacity: 1,
			}}
		>
			<Tab.Screen
				name="Giảm giá sản phẩm"
				children={() => (
					<DiscountCouponTab productVoucherList={productVoucherList} />
				)}
			/>
			<Tab.Screen
				name="Giảm giá vận chuyển"
				children={() => <DeliveryCouponTab shipVoucherList={shipVoucherList} />}
			/>
		</Tab.Navigator>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserVoucherScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	heading: {
		flexDirection: "row",
		width: "100%",
		height: "auto",
		backgroundColor: "#FFFFFF",
		alignItems: "center",
		justifyContent: "space-between",
	},
	headingText: {
		fontFamily: "lato-regular",
		color: "#000000",
		textAlign: "center",
		fontSize: 15,
		fontStyle: "normal",
		fontWeight: "700",
		lineHeight: 22,
	},
	section: {
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	sectionText: {
		fontFamily: "lato-regular",
		color: "#000000",
		textAlign: "left",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "700",
		marginBottom: 20,
	},
	headingLabel: {
		flex: 1,
		alignItems: "center",
		paddingVertical: 10,
	},
	selectedLabel: {
		borderBottomWidth: 2,
		borderBottomColor: "#006C5E",
	},
});
