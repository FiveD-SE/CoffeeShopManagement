import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import unidecode from "unidecode";
import {
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../Client/SearchBar";
import OrderCard1 from "../OrderCard1";
import Section from "../../Client/Section";
import { connect } from "react-redux";

const CanceledOrderTab = ({ userData }) => {
	const [orderData, setOrderData] = useState([]);

	const navigation = useNavigation();

	const [searchQuery, setSearchQuery] = useState("");

	const [filteredProductList, setFilteredProductList] = useState([]);

	const [branchId, setBranchId] = useState(null);

	const convertTimestampToDate = (timestamp) => {
		return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
	};

	const formatDate = (date) => {
		const options = {
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		};
		return date.toLocaleDateString("vi-VN", options);
	};

	const handleDetailOrder = (item) => {
		navigation.navigate("OrderScreen", { selectedOrder: item });
	};

	const handleSearch = (text) => {
		setSearchQuery(text);
		const normalizedSearchText = unidecode(text.toLowerCase().trim());
		const filteredList = orderData.filter(
			(item) =>
				item.orderId &&
				unidecode(item.orderId.toLowerCase()).includes(normalizedSearchText)
		);
		setFilteredProductList(filteredList);
	};

	const renderListOrder = () => {
		const dataToRender = searchQuery ? filteredProductList : orderData;

		if (dataToRender.length === 0) {
			return (
				<View style={{ justifyContent: "center", flex: 1 }}>
					<Text
						style={{
							fontFamily: "lato-regular",
							justifyContent: "center",
							alignSelf: "center",
							fontSize: 16,
						}}
					>
						Không có đơn hàng nào
					</Text>
				</View>
			);
		} else {
			return (
				<FlatList
					data={dataToRender}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.orderId}
					renderItem={({ item }) => (
						<OrderCard1
							orderId={item.orderId}
							orderTime={formatDate(convertTimestampToDate(item.orderDate))}
							orderType={item.orderType}
							orderOwner={item.deliveryAddress.name}
							orderOwnerPhone={item.orderOwnerPhone}
							orderState={item.orderState}
							handleDetailOrder={() => handleDetailOrder(item)}
						/>
					)}
					contentContainerStyle={{ marginTop: "4%", paddingBottom: "25%" }}
				/>
			);
		}
	};

	useEffect(() => {
		const getBranchId = async () => {
			const staffsRef = collection(db, "staffs");

			const q = query(staffsRef, where("staffId", "==", userData.id));

			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => {
				const data = doc.data();
				setBranchId(data.branch.branchId);
			});
		};

		getBranchId();
	}, [userData.id]);

	useEffect(() => {
		const ordersRef = collection(db, "orders");

		const q = query(
			ordersRef,
			where("deliveryBranch.branchId", "==", branchId),
			where("orderState", "==", 5),
			orderBy("orderDate", "asc")
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			setOrderData(
				snapshot.docs.map((doc) => ({ orderId: doc.id, ...doc.data() }))
			);
		});
		return () => unsubscribe();
	}, [branchId]);

	return (
		<View style={styles.container}>
			<View style={styles.searchBoxWrapper}>
				<SearchBar onChangeText={handleSearch} />
			</View>
			<Section title={`Đơn hàng đã huỷ (${orderData.length})`}>
				{renderListOrder()}
			</Section>
		</View>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(CanceledOrderTab);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: "4%",
	},
	searchBoxWrapper: {
		marginTop: "5%",
		marginBottom: "10%",
		justifyContent: "center",
	},
});
