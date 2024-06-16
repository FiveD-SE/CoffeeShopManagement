import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import unidecode from "unidecode";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { useNavigation } from "@react-navigation/native";

import SearchBar from "../../Client/SearchBar";
import OrderCard1 from "../OrderCard1";
import Section from "../../Client/Section";

export default function SuccessOrderTab() {
	const [orderData, setOrderData] = useState([]);

	const navigation = useNavigation();

	const [searchQuery, setSearchQuery] = useState("");

	const [filteredProductList, setFilteredProductList] = useState([]);

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
		const unsub = onSnapshot(
			query(collection(db, "orders"), where("orderState", "==", 4)),
			(snapshot) => {
				setOrderData(snapshot.docs.map((doc) => doc.data()));
			}
		);
		return () => unsub();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.searchBoxWrapper}>
				<SearchBar onChangeText={handleSearch} />
			</View>
			<Section title={`Đơn hàng đã giao (${orderData.length})`}>
				{renderListOrder()}
			</Section>
		</View>
	);
}

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
