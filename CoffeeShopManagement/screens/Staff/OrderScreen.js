import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	FlatList,
} from "react-native";
import React from "react";
import ProductCard from "../../components/Staff/ProductCard";
import Section from "../../components/Client/Section";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../services/firebaseService";
import { colors } from "../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";

export default function OrderScreen({ route }) {
	const selectedOrder = route.params.selectedOrder;

	const navigation = useNavigation();

	const handleAcceptOrder = async (order) => {
		const orderDocRef = doc(db, "orders", order.orderId);
		await updateDoc(orderDocRef, {
			orderState: 2,
		});
		navigation.goBack();
	};

	const handleCancelOrder = async (order) => {
		const orderDocRef = doc(db, "orders", order.orderId);
		await updateDoc(orderDocRef, {
			orderState: 5,
		});
		navigation.goBack();
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const getTitleForState = (state) => {
		switch (state) {
			case 1:
				return "Chờ xác nhận";
			case 2:
				return "Đang thực hiện";
			case 3:
				return "Đang giao";
			case 4:
				return "Đã giao";
			case 5:
				return "Đã huỷ";
		}
	};

	const renderAcceptButton = (order) => {
		if (order.orderState === 1) {
			return (
				<View style={styles.bottomApp}>
					<TouchableOpacity
						onPress={() => handleAcceptOrder(selectedOrder)}
						style={styles.acceptButton}
					>
						<Text style={styles.acceptText}>
							Nhận đơn ⋅ {formatCurrency(order.orderTotalPrice)}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => handleCancelOrder(selectedOrder)}
						style={styles.deleteButton}
					>
						<Ionicons name="trash" size={24} color={colors.error} />
						<Text style={styles.deleteText}>Huỷ đơn</Text>
					</TouchableOpacity>
				</View>
			);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.bodyApp}>
				<View>
					<Text style={styles.topText}>Sản phẩm</Text>
					<FlatList
						data={selectedOrder.products}
						keyExtractor={(item) => item.id}
						style={styles.productList}
						renderItem={({ item }) => <ProductCard item={item} />}
					/>
				</View>
				<Section title="Thông tin giao hàng">
					<View style={styles.deliInforWrapper}>
						<View style={styles.rowContainer}>
							<Text style={styles.label}>Người nhận: </Text>
							<Text style={{ fontFamily: "lato-bold" }}>
								{selectedOrder.deliveryAddress.name}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.label}>SDT người nhận: </Text>
							<Text style={{ fontFamily: "lato-bold" }}>
								{selectedOrder.deliveryAddress.phoneNumber}
							</Text>
						</View>
						<View style={styles.rowContainer}>
							<Text style={styles.label}>Trạng thái: </Text>
							<Text style={{ fontFamily: "lato-bold" }}>
								{getTitleForState(selectedOrder.orderState)}
							</Text>
						</View>
					</View>
				</Section>
			</View>
			{renderAcceptButton(selectedOrder)}
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bodyApp: {
		flex: 1,
		padding: "5%",
	},
	topText: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: "3%",
	},
	productList: {
		height: "60%",
		marginBottom: "5%",
	},
	inforText: {},
	deliInforWrapper: {
		flexDirection: "column",
		padding: "4%",
		marginTop: "2%",
		backgroundColor: colors.white_100,
		borderRadius: 10,
	},
	rowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: "2%",
	},
	label: {
		fontFamily: "lato-regular",
	},
	bottomApp: {
		backgroundColor: "rgba(255, 255, 255, 1)",
		padding: "4%",
	},
	acceptButton: {
		backgroundColor: colors.green_100,
		justifyContent: "center",
		alignItems: "center",
		padding: "4%",
		borderRadius: 12,
		marginBottom: "2%",
		elevation: 2,
	},
	acceptText: {
		color: colors.white_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	deleteButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		borderWidth: 1,
		backgroundColor: colors.white_100,
		borderColor: colors.grey_50,
		elevation: 2,
	},
	deleteText: {
		color: colors.error,
		fontSize: 16,
		fontFamily: "lato-bold",
		padding: "4%",
	},
	orderText: {
		fontFamily: "lato-regular",
		fontSize: 14,
		marginBottom: "1%",
	},
});
