import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Image,
	Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { colors } from "../../../assets/colors/colors";

import Icon from "react-native-vector-icons/FontAwesome6";

const AdminHomeScreen = ({ userData }) => {
	const navigation = useNavigation();
	const [totalUsers, setTotalUsers] = useState(0);
	const [totalStaffs, setTotalStaffs] = useState(0);
	const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);
	const [totalRevenue, setTotalRevenue] = useState(0);
	const [totalGrowthAmount, setTotalGrowthAmount] = useState(0);

	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, "admin_notifications"),
			(snapshot) => {
				const unreadNotifications = [];
				snapshot.forEach((doc) => {
					const data = doc.data();
					if (!data.notificationStatus) {
						unreadNotifications.push(data);
					}
				});
				unreadNotifications.sort((a, b) => b.buyCount - a.buyCount);
				setTotalUnreadNotification(unreadNotifications.length);
			}
		);

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
			const ordersListData = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				ordersListData.push(data);
			});

			const currentMonth = new Date().getMonth();
			const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
			const currentYear = new Date().getFullYear();

			const lastMonthOrders = ordersListData.filter((order) => {
				const orderDate = order.orderDate.toDate();
				return (
					orderDate.getMonth() === lastMonth &&
					orderDate.getFullYear() === currentYear
				);
			});

			const currentMonthOrders = ordersListData.filter((order) => {
				const orderDate = order.orderDate.toDate();
				return (
					orderDate.getMonth() === currentMonth &&
					orderDate.getFullYear() === currentYear
				);
			});

			const lastMonthRevenue = lastMonthOrders.reduce(
				(acc, cur) => acc + cur.orderTotalPrice,
				0
			);
			const currentMonthRevenue = currentMonthOrders.reduce(
				(acc, cur) => acc + cur.orderTotalPrice,
				0
			);

			console.log("Last Month Revenue:", lastMonthRevenue);
			console.log("Current Month Revenue:", currentMonthRevenue);
			setTotalGrowthAmount(currentMonthRevenue - lastMonthRevenue);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
			const ordersListData = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				ordersListData.push(data);
			});
			setTotalRevenue(
				ordersListData.reduce((acc, cur) => acc + cur.orderTotalPrice, 0)
			);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
			const updatedUserList = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				if (data.role === "user") {
					updatedUserList.push(data);
				}
			});
			setTotalUsers(updatedUserList.length);
		});

		return () => unsubscribe();
	}, []);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "staffs"), (snapshot) => {
			const updatedStaffList = [];
			snapshot.forEach((doc) => {
				const data = doc.data();
				updatedStaffList.push({ ...data, id: doc.id });
			});
			setTotalStaffs(updatedStaffList.length);
		});

		return () => unsubscribe();
	}, []);

	const formatCurrency = (value) => {
		return value.toLocaleString("vi", { style: "currency", currency: "VND" });
	};

	return (
		<ScrollView
			contentContainerStyle={styles.container}
			showsVerticalScrollIndicator={false}
		>
			<View style={styles.section}>
				<View style={styles.profile}>
					<Pressable onPress={() => navigation.navigate("AdminProfileDetail")}>
						<Image
							alt="avatar"
							source={{ uri: userData?.userImage }}
							style={styles.profileAvatar}
						/>
					</Pressable>
					<View style={styles.profileBody}>
						<Text style={styles.profileRole}>Admin</Text>
						<Text style={styles.profileName}>{userData?.name}</Text>
					</View>
					<TouchableOpacity
						style={styles.iconContainer}
						onPress={() => navigation.navigate("Notification")}
					>
						{totalUnreadNotification > 0 && (
							<Text style={styles.notificationCount}>
								{totalUnreadNotification}
							</Text>
						)}
						<Icon name="bell" size={20} />
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.body}>
				<View style={styles.peopleDataContainer}>
					<Pressable
						onPress={() => navigation.navigate("StaffHome")}
						style={styles.dataContainer}
					>
						<View style={styles.dataHeader}>
							<Text style={styles.dataTitle}>NHÂN VIÊN</Text>
							<Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
						</View>
						<View style={styles.data}>
							<View
								style={[
									styles.iconComponentContainer,
									{
										alignSelf: "flex-start",
										padding: "12%",
										backgroundColor: "#F0F5FF",
									},
								]}
							>
								<MaterialIcons name="work" size={24} color="#699BF7" />
							</View>
							<Text style={styles.dataNumber}>{totalStaffs}</Text>
							<Text style={styles.dataName}>Tổng nhân viên</Text>
						</View>
					</Pressable>

					<Pressable
						onPress={() => navigation.navigate("ClientHome")}
						style={styles.dataContainer}
					>
						<View style={styles.dataHeader}>
							<Text style={styles.dataTitle}>KHÁCH HÀNG</Text>
							<Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
						</View>
						<View style={styles.data}>
							<View
								style={[
									styles.iconComponentContainer,
									{
										alignSelf: "flex-start",
										padding: "12%",
										backgroundColor: "#EEFAF1",
									},
								]}
							>
								<Ionicons name="people" size={24} color="#4ECB71" />
							</View>
							<Text style={styles.dataNumber}>{totalUsers}</Text>
							<Text style={styles.dataName}>Tổng khách hàng</Text>
						</View>
					</Pressable>
				</View>

				<Pressable
					onPress={() => navigation.navigate("Revenue")}
					style={styles.dataContainer}
				>
					<View style={styles.dataHeader}>
						<Text style={styles.dataTitle}>DOANH THU</Text>

						<Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
					</View>
					<View
						style={[
							styles.data,
							{
								justifyContent: "center",
								alignItems: "center",
							},
						]}
					>
						<View
							style={[
								styles.iconComponentContainer,
								{ padding: "6%", backgroundColor: "#FFFAE6" },
							]}
						>
							<Icon name="money-bills" size={24} color="#FFC700" />
						</View>
						<Text style={styles.dataNumber}>
							{formatCurrency(Number(totalRevenue))}
						</Text>
						<Text style={styles.dataName}>Tổng doanh thu</Text>
					</View>
					<View
						style={[
							styles.data,
							{
								justifyContent: "center",
								alignItems: "center",
							},
						]}
					>
						<View
							style={[
								styles.iconComponentContainer,
								{ padding: "6%", backgroundColor: "#FFEACC" },
							]}
						>
							<FontAwesome name="line-chart" size={24} color="#FF9800" />
						</View>
						<Text style={[styles.dataNumber, { marginTop: "3%" }]}>
							{formatCurrency(Number(totalGrowthAmount))}
						</Text>
						<Text style={[styles.dataName, { marginTop: "1%" }]}>
							Tăng trưởng
						</Text>
					</View>
				</Pressable>
			</View>
		</ScrollView>
	);
};

const mapStateToProps = (state) => {
	return {
		userData: state.auth.userData,
	};
};

export default connect(mapStateToProps)(AdminHomeScreen);

const styles = StyleSheet.create({
	container: {
		padding: "4%",
	},
	section: {
		marginTop: "12%",
		marginBottom: "4%",
	},
	profile: {
		padding: "2%",
		backgroundColor: colors.white_100,
		borderRadius: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	profileAvatar: {
		width: 80,
		height: 80,
		borderRadius: 16,
		marginRight: "6%",
	},
	profileBody: {
		flex: 1,
	},
	profileName: {
		color: colors.black_100,
		fontSize: 18,
		fontFamily: "lato-bold",
	},
	profileRole: {
		color: colors.grey_100,
		fontSize: 16,
		fontFamily: "lato-regular",
	},
	iconContainer: {
		minHeight: 48,
		minWidth: 48,
		justifyContent: "center",
		alignItems: "center",
		padding: "4%",
		borderWidth: 1,
		borderRadius: 100,
		borderColor: colors.grey_50,
	},
	body: {
		flex: 1,
		flexDirection: "column",
		gap: 12,
	},
	iconComponentContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	peopleDataContainer: {
		flexDirection: "row",
		gap: 12,
	},
	dataContainer: {
		flex: 1,
		padding: "2%",
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	dataHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	dataTitle: {
		fontSize: 14,
		color: "#3A3A3A",
		fontFamily: "lato-bold",
	},
	data: {
		marginTop: "2%",
		flexDirection: "column",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#CCCCCC",
		padding: "6%",
	},
	dataNumber: {
		fontSize: 24,
		color: "#3A3A3A",
		marginTop: "4%",
		fontFamily: "lato-bold",
	},
	dataName: {
		fontSize: 16,
		color: "#3A3A3A",
		marginTop: "2%",
		fontFamily: "lato-regular",
	},
	notificationCount: {
		position: "absolute",
		height: 20,
		width: 20,
		right: 0,
		top: -4,
		backgroundColor: "#C80036",
		color: "white",
		borderRadius: 100,
		textAlign: "center",
		fontSize: 12,
		fontFamily: "lato-bold",
	},
});
