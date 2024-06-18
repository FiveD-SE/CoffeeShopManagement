import {
	View,
	Text,
	SafeAreaView,
	StyleSheet,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import OrderCard1 from "../../components/Staff/OrderCard1";
import SearchBar from "../../components/Client/SearchBar";
import { useNavigation } from "@react-navigation/native";
import unidecode from "unidecode";
import {
	collection,
	doc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../services/firebaseService";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";

const CashierBillingScreen = ({ userData }) => {
	const [orderData, setOrderData] = useState([]);

	const [searchQuery, setSearchQuery] = useState("");

	const [filteredProductList, setFilteredProductList] = useState([]);

	const [branchId, setBranchId] = useState(null);

	const navigation = useNavigation();

	const handleDetailOrder = (item) => {
		navigation.navigate("OrderScreen", { selectedOrder: item });
	};

	const handleUpdateOrderState = async (order) => {
		const orderDocRef = doc(db, "orders", order.orderId);
		await updateDoc(orderDocRef, {
			orderState: order.orderState + 1,
		});
		Toast.show({
			type: "success",
			text1: "Đơn hàng đang được giao",
			text1Style: { fontSize: 16 },
		});
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
			where("orderState", "==", 2),
			orderBy("orderDate", "asc")
		);

		const unsubscribe = onSnapshot(q, (snapshot) => {
			setOrderData(
				snapshot.docs.map((doc) => ({ orderId: doc.id, ...doc.data() }))
			);
		});
		return () => unsubscribe();
	}, [branchId]);

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
							onLongPress={() => handleUpdateOrderState(item)}
						/>
					)}
				/>
			);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchBoxWrapper}>
				<SearchBar onChangeText={handleSearch} />
			</View>
			{renderListOrder()}
		</View>
	);
};

const mapStateToProps = (state) => {
	return {
		userData: state.auth.userData,
	};
};

export default connect(mapStateToProps)(CashierBillingScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: "4%",
	},
	searchBoxWrapper: {
		marginTop: "20%",
		marginBottom: "10%",
		justifyContent: "center",
	},
	searchBox: {
		backgroundColor: "#fff",
		borderRadius: 10,
		borderColor: "#ebebeb",
		borderWidth: 1,
		padding: "3%",
	},
});
