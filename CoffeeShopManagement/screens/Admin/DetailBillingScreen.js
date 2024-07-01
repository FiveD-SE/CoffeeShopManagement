import React from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	Pressable,
} from "react-native";
import { colors } from "../../assets/colors/colors";
import OrderedItem from "../../components/Client/Card/OrderedItem";

export default function DetailBillingScreen({ route }) {
	const { orderData } = route.params;
	const totalPrice =
		orderData.orderTotalPrice +
		orderData.deliveryFee -
		orderData.orderTotalDiscount;

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const orderDate = new Date(orderData.orderDate.seconds * 1000);

	const formattedOrderDate = orderDate.toLocaleDateString("vi-VN", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
	const renderOrderedItem = () =>
		orderData.products.map((item, index) => (
			<OrderedItem
				key={index}
				title={item.productName}
				price={formatCurrency(item.totalPrice)}
				quantity={item.quantity}
				imageSource={{ uri: item.productImage }}
			/>
		));

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.sectionContainer}>
				<Text style={styles.sectionText}>Sản phẩm</Text>
				{renderOrderedItem()}
			</View>

			<View style={styles.sectionContainer}>
				<Text style={styles.sectionText}>Thông tin khách hàng</Text>
				<View style={styles.infoWrapper}>
					<View style={styles.infoItem}>
						<Text style={styles.titleText}>Người nhận: </Text>
						<Text style={styles.contentText}>
							{orderData.deliveryAddress.name}
						</Text>
					</View>
					<View style={styles.infoItem}>
						<Text style={styles.titleText}>Số điện thoại:</Text>
						<Text style={styles.contentText}>
							{orderData.deliveryAddress.phoneNumber}
						</Text>
					</View>
					<View style={styles.infoItem}>
						<Text style={styles.titleText}>Địa chỉ: </Text>
						<Text style={styles.contentText}>
							{orderData.deliveryAddress.street},{" "}
							{orderData.deliveryAddress.wardName},{" "}
							{orderData.deliveryAddress.districtName},{" "}
							{orderData.deliveryAddress.provinceName}
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.sectionContainer}>
				<Text style={styles.sectionText}>Thông tin đơn hàng</Text>
				<View style={styles.infoWrapper}>
					<View style={styles.totalItem}>
						<Text style={styles.titleText}>Ngày đặt hàng:</Text>
						<Text style={styles.contentText}>{formattedOrderDate}</Text>
					</View>
					<View style={styles.totalItem}>
						<Text style={styles.titleText}>Tổng tiền hàng:</Text>
						<Text style={styles.contentText}>
							{formatCurrency(orderData.orderTotalPrice)}
						</Text>
					</View>
					<View style={styles.totalItem}>
						<Text style={styles.titleText}>Phí vận chuyển:</Text>
						<Text style={styles.contentText}>
							{formatCurrency(orderData.deliveryFee)}
						</Text>
					</View>
					<View style={styles.totalItem}>
						<Text style={styles.titleText}>Giảm giá: </Text>
						<Text style={styles.contentText}>
							{formatCurrency(orderData.orderTotalDiscount)}
						</Text>
					</View>
				</View>
			</View>

			<View style={styles.totalContainer}>
				<Text style={styles.totalAmountTitle}>Tổng cộng:</Text>
				<Text style={styles.totalAmount}>{formatCurrency(totalPrice)} </Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.grey_20,
		padding: "4%",
	},
	header: {
		alignItems: "center",
	},
	branchImage: {
		width: 100,
		height: 100,
		marginBottom: "2%",
		borderRadius: 20,
	},
	title: {
		fontSize: 24,
		fontFamily: "lato-bold",
		color: colors.black_100,
	},
	sectionContainer: {
		marginVertical: "2%",
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: "4%",
	},
	sectionText: {
		fontSize: 16,
		fontFamily: "lato-bold",
		color: colors.black_100,
	},
	infoWrapper: {
		marginTop: "4%",
	},
	infoItem: {
		marginBottom: "2%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	titleText: {
		flex: 1,
		fontSize: 14,
		fontFamily: "lato-bold",
		color: "#333",
	},
	contentText: {
		flex: 1,
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "lato-regular",
		color: "#666",
	},
	totalItem: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: "4%",
		marginTop: 5,
		backgroundColor: colors.green_20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: colors.grey_50,
	},
	totalAmountTitle: {
		fontSize: 20,
		fontFamily: "lato-bold",
		color: colors.black_100,
	},
	totalAmount: {
		fontSize: 20,
		fontFamily: "lato-bold",
		color: "#333",
	},
});
