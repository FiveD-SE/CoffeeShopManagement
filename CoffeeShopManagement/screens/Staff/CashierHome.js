import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	PixelRatio,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import OrderCard1 from "../../components/Staff/OrderCard1";
import { useState, useEffect } from "react";
import {
	collection,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { connect } from "react-redux";
import { colors } from "../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size) => size / fontScale;

const CashierHome = ({ userData }) => {
	const navigation = useNavigation();

	const [orderData, setOrderData] = useState([]);

	const [branchId, setBranchId] = useState(null);

	const handleNotification = () => {
		navigation.navigate("CashierNotification");
	};
	const handleDetailOrder = (item) => {
		navigation.navigate("OrderScreen", {
			selectedOrder: item,
		});
	};
	const goToCashierInformation = () => {
		navigation.navigate("CashierInformation");
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
							orderOwner={item.deliveryAddress.name}
							orderOwnerPhone={item.orderOwnerPhone}
							orderState={item.orderState}
							orderPaymentState={item.orderPaymentState}
							handleDetailOrder={() => handleDetailOrder(item)}
						/>
					)}
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
			where("orderState", "==", 1),
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
			<View style={styles.cashierInformationWrapper}>
				<View style={styles.imageWrapper}>
					<Image
						source={{ uri: userData.userImage }}
						style={styles.userImage}
					/>
				</View>
				<View style={styles.informationTextWrapper}>
					<Text style={styles.nameText}>{userData.name}</Text>
					<Text style={styles.roleText}>Nhân viên</Text>
				</View>
				<View style={styles.buttonContainer}>
					{/* <TouchableOpacity onPress={handleNotification} style={styles.button}>
						<Ionicons name="notifications" size={24} color={colors.black_100} />
					</TouchableOpacity> */}
					<TouchableOpacity
						onPress={goToCashierInformation}
						style={styles.button}
					>
						<Ionicons
							name="settings-sharp"
							size={24}
							color={colors.black_100}
						/>
					</TouchableOpacity>
				</View>
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
		paddingHorizontal: "4%",
		marginTop: "12%",
	},
	cashierInformationWrapper: {
		flexDirection: "row",
		marginBottom: "4%",
		borderRadius: 20,
		backgroundColor: colors.white_100,
		borderWidth: 1,
		borderColor: colors.grey_50,
	},
	informationTextWrapper: {
		flex: 1,
		justifyContent: "space-between",
		paddingVertical: "2%",
	},
	nameText: {
		fontSize: getFontSize(16),
		fontFamily: "lato-bold",
	},
	roleText: {
		color: colors.grey_100,
		fontSize: getFontSize(14),
		fontFamily: "lato-regular",
	},
	buttonContainer: {
		flexDirection: "row",
		backgroundColor: colors.grey_10,
		borderRadius: 20,
		padding: "2%",
	},
	button: {
		minWidth: 48,
		minHeight: 48,
		justifyContent: "center",
		alignItems: "center",
	},
	listOrderText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: "5%",
	},
	imageWrapper: {
		width: 64,
		height: 64,
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center",
		marginRight: "5%",
		backgroundColor: colors.grey_10,
		borderRadius: 20,
		elevation: 2,
	},
	userImage: {
		width: "100%",
		height: "100%",
		borderRadius: 20,
	},
});
