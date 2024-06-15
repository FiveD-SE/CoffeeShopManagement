import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderCard1 from "../../components/Staff/OrderCard1";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useState, useEffect } from "react";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { connect } from "react-redux";
import { colors } from "../../assets/colors/colors";

const CashierHome = ({ userData }) => {
	const [orderData, setOrderData] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

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

	const fetchOrderData = async () => {
		try {
			const orderQuery = query(
				collection(db, "orders"),
				where("orderState", "==", 1)
			);
			const snapshot = await getDocs(orderQuery);
			const orderList = [];
			for (const docSnapshot of snapshot.docs) {
				const order = docSnapshot.data();
				const userDocRef = doc(db, "users", order.userId);
				const userDocSnapshot = await getDoc(userDocRef);
				if (userDocSnapshot.exists()) {
					const userData = userDocSnapshot.data();
					order.orderOwner = userData.fullName;
					orderList.push(order);
				}
			}
			orderList.sort((a, b) => a.orderDate.seconds - b.orderDate.seconds);

			setOrderData(orderList);
		} catch (error) {
			console.error("Error fetching orders: ", error);
		}
	};

	useEffect(() => {
		fetchOrderData();
	}, []);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchOrderData();
		setRefreshing(false);
	};

	const navigation = useNavigation();
	const handleNotification = () => {
		navigation.navigate("CashierNotification");
	};
	const handleDetailOrder = (item) => {
		navigation.navigate("OrderScreen", {
			selectedOrder: item,
		});
	};
	const handleCashierInfor = () => {
		navigation.navigate("CashierInformation");
	};

	const renderListOrder = () => {
		if (orderData.length === 0) {
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
					data={orderData}
					showsVerticalScrollIndicator={false}
					keyExtractor={(item) => item.orderId}
					renderItem={({ item }) => (
						<OrderCard1
							orderId={item.orderId}
							orderTime={formatDate(convertTimestampToDate(item.orderDate))}
							orderType={item.orderType}
							orderOwner={item.orderOwner}
							orderOwnerPhone={item.orderOwnerPhone}
							orderState={item.orderState}
							orderPaymentState={item.orderPaymentState}
							handleDetailOrder={() => handleDetailOrder(item)}
						/>
					)}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
			);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.cashierInforWrapper}>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity
						onPress={handleCashierInfor}
						style={styles.imageWrapper}
					>
						<Image
							source={{ uri: userData.userImage }}
							style={styles.userImage}
						/>
					</TouchableOpacity>
					<View style={styles.inforTextWrapper}>
						<Text style={styles.nameText}>{userData.name}</Text>
						<Text style={styles.emailText}>{userData.email}</Text>
						<Text style={styles.roleText}>{userData.role}</Text>
					</View>
				</View>
				<TouchableOpacity
					onPress={handleNotification}
					style={styles.notiButton}
				>
					<Icon name="bell" size={20} />
				</TouchableOpacity>
			</View>
			<Text style={styles.listOrderText}>Đơn hàng chờ xác nhận</Text>
			{renderListOrder()}
		</View>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(CashierHome);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: "5%",
		marginTop: "10%",
	},
	cashierInforWrapper: {
		backgroundColor: "#fff",
		padding: "3%",
		flexDirection: "row",
		borderRadius: 10,
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: "5%",
	},
	inforTextWrapper: {
		justifyContent: "space-between",
		marginStart: "5%",
	},
	nameText: {
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	emailText: {
		fontFamily: "lato-regular",
		fontSize: 14,
	},
	roleText: {
		fontSize: 14,
		fontStyle: "italic",
	},
	notiButton: {
		justifyContent: "center",
		alignItems: "center",
		padding: "5%",
		borderWidth: 1,
		borderRadius: 30,
		borderColor: "#CCCCCC",
	},
	listOrderText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: "5%",
	},
	imageWrapper: {
		width: 64,
		height: 64,
		justifyContent: "center",
		alignItems: "center",
		marginRight: "5%",
	},
	userImage: {
		width: "80%",
		height: "80%",
		borderRadius: 100,
		aspectRatio: 1,
	},
});
