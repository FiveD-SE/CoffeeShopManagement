import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import SearchBar from "../../components/Client/SearchBar";
import { FontAwesome6 } from "@expo/vector-icons";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../services/firebaseService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../assets/colors/colors";

export default function AdminBillingScreen() {
	const navigation = useNavigation();
	const [invoiceData, setInvoiceData] = useState([]);
	const [totalInvoice, setTotalInvoice] = useState(0);
	const [filteredInvoiceData, setFilteredInvoiceData] = useState([]);
	const [selectedButtonIndex, setSelectedButtonIndex] = useState(1);
	const [trendingPercentage, setTrendingPercentage] = useState(0);

	useEffect(() => {
		const fetchInvoiceData = async () => {
			const invoicesCollection = collection(db, "orders");
			const invoicesSnapshot = await getDocs(query(invoicesCollection));
			const invoicesListData = invoicesSnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			invoicesListData.sort((a, b) => {
				const dateA = new Date(a.orderDate.seconds * 1000);
				const dateB = new Date(b.orderDate.seconds * 1000);
				return dateB - dateA;
			});

			const usersCollection = collection(db, "users");
			const usersSnapshot = await getDocs(query(usersCollection));
			const usersListData = usersSnapshot.docs.reduce((acc, doc) => {
				acc[doc.id] = doc.data().fullName;
				return acc;
			}, {});

			const date30DaysAgo = new Date();
			date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
			const date60DaysAgo = new Date();
			date60DaysAgo.setDate(date60DaysAgo.getDate() - 60);

			const newInvoicesThisMonth = invoicesListData.filter(
				(invoice) => new Date(invoice.orderDate.seconds * 1000) >= date30DaysAgo
			);
			const newInvoicesLastMonth = invoicesListData.filter((invoice) => {
				const invoiceCreatedDate = new Date(invoice.orderDate.seconds * 1000);
				return (
					invoiceCreatedDate >= date60DaysAgo &&
					invoiceCreatedDate < date30DaysAgo
				);
			});

			const newInvoicesTrending =
				newInvoicesLastMonth.length === 0
					? newInvoicesThisMonth.length * 100
					: ((newInvoicesThisMonth.length - newInvoicesLastMonth.length) /
							newInvoicesLastMonth.length) *
					  100;

			const enrichedInvoicesListData = invoicesListData.map((invoice) => ({
				...invoice,
				userName: usersListData[invoice.userId] || "Không tên",
			}));

			setTrendingPercentage(newInvoicesTrending);
			setInvoiceData(enrichedInvoicesListData);
			setFilteredInvoiceData(enrichedInvoicesListData);
			setTotalInvoice(enrichedInvoicesListData.length);
		};

		fetchInvoiceData();
	}, []);

	const handleNavigateToOrderDetail = (item) => {
		navigation.navigate("AdminDetailBilling", {
			orderData: item,
		});
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const renderOrdersList = () =>
		filteredInvoiceData.map((item) => {
			const date = new Date(item.orderDate.seconds * 1000).toLocaleDateString(
				"vi-VN"
			);
			return (
				<Pressable
					style={styles.labelItem}
					key={item.orderId}
					onPress={() => handleNavigateToOrderDetail(item)}
				>
					<View style={styles.row}>
						<Text style={styles.itemId}>
							Mã đơn hàng: #{item.orderId.substring(0, 6).toUpperCase()}
						</Text>
						<Text style={styles.itemDate}>{date}</Text>
					</View>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<Text style={styles.itemClientLabel}>Khách hàng:</Text>
						<Text style={styles.itemClientName}>{item.userName}</Text>
					</View>
					<View
						style={{ flexDirection: "row", justifyContent: "space-between" }}
					>
						<Text style={styles.itemClientLabel}>Tổng cộng:</Text>
						<Text style={styles.itemPrice}>
							{formatCurrency(item.orderTotalPrice)}
						</Text>
					</View>
				</Pressable>
			);
		});

	const handleSearch = (query) => {
		const filteredData = invoiceData.filter(
			(item) =>
				item.orderId
					.substring(0, 6)
					.toLowerCase()
					.includes(query.toLowerCase()) ||
				item.userName.toLowerCase().includes(query.toLowerCase())
		);
		setFilteredInvoiceData(filteredData);
	};

	return (
		<View style={styles.container}>
			<View style={styles.section}>
				<SearchBar onChangeText={handleSearch} />
				<View style={styles.invoice}>
					<View style={styles.invoiceFirst}>
						<View style={styles.invoiceIconContainer}>
							<FontAwesome6
								name="file-invoice-dollar"
								size={40}
								color="#006C5E"
							/>
						</View>
					</View>
					<View style={[styles.invoiceFirst, { flexDirection: "column" }]}>
						<Text style={styles.orderNumber}>{totalInvoice}</Text>
						<Text style={styles.invoiceText} numberOfLines={2}>
							Hóa đơn
						</Text>
					</View>
					<View style={[styles.invoiceFirst, { flexDirection: "row" }]}>
						<Text
							style={
								trendingPercentage > 0
									? styles.upTrendText
									: styles.downTrendText
							}
						>
							<Ionicons
								name={trendingPercentage > 0 ? "trending-up" : "trending-down"}
								style={
									trendingPercentage > 0
										? styles.upTrendIcon
										: styles.downTrendIcon
								}
								size={40}
							/>{" "}
							{Math.abs(Number(trendingPercentage.toFixed(1)))}%
						</Text>
					</View>
				</View>
				{/* <View style={styles.selectionButtonContainer}>
          {selectionButtons.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.selectionButton, selectedButtonIndex === item.id && styles.selectedSelectionButton]}
              onPress={() => setSelectedButtonIndex(item.id)}>
              <Text style={[
                styles.selectionButtonText,
                selectedButtonIndex === item.id && styles.selectedSelectionButtonText
              ]}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View> */}
				<ScrollView
					showsVerticalScrollIndicator={false}
					style={{ height: "82%" }}
				>
					{renderOrdersList()}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	section: {
		marginTop: "14%",
		marginBottom: "5%",
		marginHorizontal: "3%",
	},
	invoice: {
		backgroundColor: "#fff",
		borderRadius: 10,
		width: "100%",
		flexDirection: "row",
		marginVertical: "3%",
		justifyContent: "space-between",
		alignItems: "center",
	},
	invoiceFirst: {
		paddingHorizontal: "3%",
		paddingVertical: "5%",
		justifyContent: "space-between",
	},
	invoiceIconContainer: {
		width: 70,
		height: 70,
		backgroundColor: "#ddebe9",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 100,
	},
	orderNumber: {
		fontSize: 25,
		fontWeight: "600",
		marginBottom: "3%",
	},
	invoiceText: {
		fontSize: 16,
		color: "#a6a6aa",
		fontFamily: "lato-bold",
	},
	selectionButtonContainer: {
		flexDirection: "row",
		marginBottom: "5%",
		gap: 10,
	},
	selectionButton: {
		paddingVertical: "2%",
		paddingHorizontal: "5%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
		paddingHorizontal: "6%",
		backgroundColor: "#FFFFFF",
	},
	selectedSelectionButton: {
		backgroundColor: "#006C5E",
	},
	selectionButtonText: {
		color: "#9D9D9D",
		fontFamily: "lato-regular",
		fontSize: 16,
	},
	selectedSelectionButtonText: {
		color: "white",
		fontFamily: "lato-bold",
	},
	labelItem: {
		backgroundColor: "#FFFFFF",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 10,
		marginBottom: 10,
		gap: 15,
	},
	row: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
	},
	itemId: {
		color: "#151515",
		fontFamily: "lato-bold",
		fontSize: 16,
		textAlignVertical: "bottom",
	},
	itemDate: {
		color: "#A3A3A3",
		fontFamily: "lato-bold",
		fontSize: 16,
		lineHeight: 20,
	},
	itemPrice: {
		color: "#151515",
		fontFamily: "lato-bold",
		fontSize: 20,
		lineHeight: 24,
		textAlignVertical: "bottom",
	},
	itemClientLabel: {
		flex: 1,
		fontSize: 14,
		fontFamily: "lato-bold",
		color: colors.grey_100,
		alignItems: "center",
	},
	itemClientName: {
		color: colors.black_100,
		fontFamily: "lato-bold",
		fontSize: 14,
	},
	currency: {
		color: "#A3A3A3",
		fontFamily: "lato-bold",
		fontSize: 16,
		lineHeight: 18,
		textAlignVertical: "bottom",
	},
	itemStatus: {
		fontSize: 14,
		fontFamily: "lato-bold",
		alignSelf: "center",
	},
	labelStatus: {
		paddingHorizontal: 10,
		paddingVertical: 2,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		flexDirection: "row",
		borderRadius: 10,
	},
	upTrendText: {
		color: "#4ECB71",
		fontSize: 30,
		fontFamily: "lato-bold",
		justifyContent: "center",
		alignItems: "center",
	},
	downTrendText: {
		color: "#F61A3D",
		fontSize: 30,
		fontFamily: "lato-bold",
		justifyContent: "center",
		alignItems: "center",
	},
	upTrendIcon: {
		color: "#4ECB71",
	},
	downTrendIcon: {
		color: "#F61A3D",
	},
});
