import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import UserOrderCard from "../../../components/Client/Card/UserOrderCard";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
	collection,
	getDocs,
	onSnapshot,
	or,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const UserOrderScreen = ({ userData }) => {
	const navigation = useNavigation();
	const [orderData, setOrderData] = useState([]);

	useEffect(() => {
		const fetchOrderData = async () => {
			try {
				const orderQuery = query(
					collection(db, "orders"),
					where("userId", "==", userData.id)
				);
				const unsubscribe = onSnapshot(
					orderQuery,
					(querySnapshot) => {
						const orderListData = [];
						querySnapshot.forEach((doc) => {
							orderListData.push(doc.data());
						});
						orderListData.sort((a, b) => b.orderState - a.orderState);
						setOrderData(orderListData);
					},
					(error) => {
						console.error(error);
					}
				);

    const handleOpenOrderDetail = (item) => {
        navigation.navigate("UserOrderInformationScreen", {
            orderData: item,
        });
    };
	const renderOrderData = () =>
		orderData.map((order, index) => (
			<UserOrderCard
				key={index}
				orderId={order.orderId}
				status={order.orderState}
				total={order.orderTotalPrice}
				onPress={() => handleOpenOrderDetail(order)}
			/>
		));

	return (
		<View style={styles.container}>
			<ScrollView>{renderOrderData()}</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: "5%",
	},
	orderContainer: {
		backgroundColor: "#FFFFFF",
		padding: "5%",
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	orderDetails: {
		flex: 1,
	},
	orderId: {
		flexDirection: "row",
		alignItems: "center",
	},
	orderIdText: {
		color: "#3a3a3a",
		fontSize: 18,
		fontWeight: "500",
	},
	orderIdValue: {
		color: "#3a3a3a",
		fontSize: 18,
		fontWeight: "500",
		marginLeft: "2%",
	},
	orderStatus: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderStatusText: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
	},
	statusIndicator: {
		backgroundColor: "rgba(255, 167, 48, 0.10)",
		paddingVertical: "1%",
		paddingHorizontal: "4%",
		marginLeft: "2%",
		borderRadius: 30,
	},
	statusText: {
		color: "#FFA730",
		fontSize: 16,
		fontFamily: "lato_regular",
	},
	orderTotal: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	orderTotalText: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
	},
	orderTotalValue: {
		color: "#3a3a3a",
		fontFamily: "lato-bold",
		fontSize: 16,
		marginLeft: "5%",
	},
});

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserOrderScreen);
