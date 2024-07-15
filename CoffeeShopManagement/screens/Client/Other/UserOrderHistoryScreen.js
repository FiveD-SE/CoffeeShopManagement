import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import UserOrderCard from "../../../components/Client/Card/UserOrderCard";

const OrderHistory = ({ userData }) => {
	const navigation = useNavigation();
	const [orderHistoryData, setOrderHistoryData] = useState([]);

	useEffect(() => {
		const fetchOrdersData = async () => {
			const ordersCollection = collection(db, "orders");
			const orderSnapshot = await getDocs(
				query(ordersCollection, where("userId", "==", userData.id))
			);
			const orderListData = orderSnapshot.docs.map((doc) => doc.data());

			orderListData.sort((a, b) => {
				const dateA = new Date(a.orderDate.seconds * 1000);
				const dateB = new Date(b.orderDate.seconds * 1000);
				return dateB - dateA;
			});

			setOrderHistoryData(orderListData);
		};
		fetchOrdersData();
	}, [userData.id]);

	const handleGoToDetail = (orderData) => {
		navigation.navigate("UserOrderInformationScreen", { orderData });
	};

	const renderOrderData = () =>
		orderHistoryData.map((order, index) => (
			<UserOrderCard
				key={index}
				orderId={order.orderId}
				status={order.orderState}
				total={order.orderTotalPrice}
				date={order.orderDate}
				onPress={() => handleGoToDetail(order)}
			/>
		));

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>{renderOrderData()}</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
	labelItem: {
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderWidth: 1,
		borderColor: "#B3A398",
		backgroundColor: "#FFF",
		borderRadius: 10,
		marginBottom: 10,
		gap: 20,
	},
	row: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	itemId: {
		color: "#151515",
		fontFamily: "lato-bold",
		fontSize: 18,
		textAlignVertical: "bottom",
	},
	itemDate: {
		color: "#A3A3A3",
		fontFamily: "lato-bold",
		fontSize: 18,
	},
	itemPrice: {
		color: "#151515",
		fontFamily: "lato-bold",
		fontSize: 25,
		lineHeight: 25,
		textAlignVertical: "bottom",
	},
	currency: {
		color: "#A3A3A3",
		fontFamily: "lato-bold",
		fontSize: 16,
		lineHeight: 18,
		textAlignVertical: "bottom",
	},
	itemStatus: {
		fontFamily: "lato-bold",
		alignSelf: "center",
		fontSize: 16,
	},
	labelStatus: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		flexDirection: "row",
	},
	priceContainer: {
		flexDirection: "row",
	},
});

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(OrderHistory);
