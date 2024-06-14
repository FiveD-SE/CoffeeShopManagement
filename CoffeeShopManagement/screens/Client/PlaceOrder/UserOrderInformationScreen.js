import React, { useState } from "react";
import { Text, View, ScrollView, Pressable, StyleSheet } from "react-native";
import OrderProgressBar from "../../../components/Client/OrderProgressBar";
import UserInfoRow from "../../../components/Client/UserInfoRow";
import OrderedItem from "../../../components/Client/Card/OrderedItem";
import StatusInfo from "../../../components/Client/StatusInfo";
import RouteDetails from "../../../components/Client/RouteDetails";
import SectionWithBackground from "../../../components/Client/SectionWithBackground";
import RatingModal from "./RatingModal";
import { colors } from "../../../assets/colors/colors";

const UserOrderInformationScreen = ({ route }) => {
	const { orderData } = route.params;
	const [currentPage, setCurrentPage] = useState(
		orderData.orderState === 5 ? 0 : orderData.orderState - 1
	);
	const [modalVisible, setModalVisible] = useState(false);

	const handleReceiveOrder = () => {
		setCurrentPage(4);
		setModalVisible(true);
	};

	const renderOrderedItem = () =>
		orderData.products.map((item, index) => (
			<OrderedItem
				key={index}
				title={item.productName}
				price={item.totalPrice.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
				quantity={item.quantity}
				imageSource={{ uri: item.productImage }}
			/>
		));

	const showToppingModal = () => {
		setModalVisible(true);
	};

	const hideToppingModal = () => {
		setModalVisible(false);
	};

	const deliveryAddress = orderData.deliveryAddress;
	const deliveryBranch = orderData.deliveryBranch;

	return (
		<>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollViewContainer}
			>
				<View style={styles.container}>
					<SectionWithBackground title="Sẽ xong lúc 10:50 SA">
						<Text style={styles.subTitleText}>Đang thực hiện</Text>
						<View style={{ marginTop: "5%" }}>
							<OrderProgressBar
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						</View>
					</SectionWithBackground>
					<SectionWithBackground title={deliveryBranch.branchName}>
						<Text style={styles.infoText}>
							{`${deliveryBranch.street}, ${deliveryBranch.districtName}, ${deliveryBranch.provinceName}, Việt Nam`}
						</Text>
					</SectionWithBackground>

					<RouteDetails
						from={deliveryBranch.branchName}
						to={`${deliveryAddress.street}, ${deliveryAddress.wardName}`}
					/>

					<SectionWithBackground title="Thông tin khách hàng">
						<UserInfoRow label="Họ và tên" value={deliveryAddress.name} />
						<UserInfoRow
							label="Số điện thoại"
							value={deliveryAddress.phoneNumber}
						/>
						<StatusInfo
							label="Trạng thái thanh toán"
							isPaid={orderData.paymentMethod === "cash" ? false : true}
						/>
					</SectionWithBackground>
					<SectionWithBackground title="Danh sách các món đã đặt">
						<Text style={styles.infoText}>
							Kiểm tra kĩ trước khi nhận hàng bạn nhé
						</Text>
						<View style={{ marginTop: "5%" }}>{renderOrderedItem()}</View>
						<View style={styles.totalContainer}>
							<Text style={styles.titleText}>Tổng cộng:</Text>
							<Text style={styles.titleText}>
								{(
									orderData.orderTotalPrice +
									orderData.deliveryFee -
									orderData.orderTotalDiscount
								).toLocaleString("vi-VN", {
									style: "currency",
									currency: "VND",
								})}
							</Text>
						</View>
					</SectionWithBackground>
				</View>
			</ScrollView>
			<View style={styles.bottomContainer}>
				<Pressable
					style={[styles.button, currentPage < 3 && styles.disabledButton]}
					onPress={handleReceiveOrder}
					disabled={currentPage < 3}
				>
					<Text style={styles.buttonText}>Đã nhận hàng</Text>
				</Pressable>
			</View>
			<RatingModal visible={modalVisible} onClose={hideToppingModal} />
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F7FA",
		padding: "5%",
	},
	scrollViewContainer: {
		marginBottom: "1%",
	},
	sectionContainer: {
		backgroundColor: "#FFFFFF",
		padding: "5%",
		borderRadius: 20,
		marginTop: "5%",
	},
	titleText: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
	},
	subTitleText: {
		color: "rgba(58, 58, 58, 0.50)",
		fontSize: 16,
		fontWeight: "500",
		marginTop: "2%",
	},
	infoText: {
		color: colors.grey_100,
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "lato-regular",
		marginTop: "2%",
	},
	totalContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: "5%",
	},
	bottomContainer: {
		backgroundColor: "#FFFFFF",
		padding: "5%",
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#00A188",
		paddingVertical: "4%",
		borderRadius: 20,
		elevation: 2,
	},
	buttonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "700",
	},
	disabledButton: {
		backgroundColor: "#CBCBD4",
	},
});

export default UserOrderInformationScreen;
