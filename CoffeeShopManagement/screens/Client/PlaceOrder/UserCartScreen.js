import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Section from "../../../components/Client/Section";
import CartItemCard from "../../../components/Client/Card/CartItemCard";
import { connect } from "react-redux";
import {
	confirmOrder,
	updateCartItemQuantity,
} from "../../../redux/actions/userActions";
const UserCartScreen = ({ cartList, updateQuantity, confirmOrder }) => {
	const navigation = useNavigation();

	const [totalPrice, setTotalPrice] = useState(0);

	const [updateTrigger, setUpdateTrigger] = useState(false);

	const renderCartList = ({ item, index }) => (
		<CartItemCard
			id={item._id}
			name={item.name}
			price={item.price.toLocaleString("vi-VN", {
				style: "currency",
				currency: "VND",
			})}
			imageSource={item.imageSource}
			quantity={item.quantity}
			options={`${item.size}, ${item.options
				.map((i) => i.toLowerCase())
				.join(", ")}`}
			onQuantityChange={(newQuantity) => {
				handleQuantityChange(item._id, newQuantity);
			}}
		/>
	);

	const handleQuantityChange = (id, newQuantity) => {
		if (newQuantity < 1) {
			updateQuantity(id, 0);
		} else {
			updateQuantity(id, newQuantity);
		}

		setUpdateTrigger(!updateTrigger);
	};

	const handleConfirmOrdering = () => {
		navigation.navigate("UserOrderConfirmationScreen");
		confirmOrder(cartList);
	};

	useEffect(() => {
		let newTotalPrice = 0;
		for (const item of cartList) {
			newTotalPrice += item.totalPrice * item.quantity;
		}
		setTotalPrice(newTotalPrice);
	}, [cartList, updateTrigger]);

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<View style={{ marginTop: "5%" }}>
					<Section title="Sản phẩm đã thêm">
						<View style={styles.cartListContainer}>
							<FlatList data={cartList} renderItem={renderCartList} />
						</View>
					</Section>
				</View>
			</View>
			<View style={styles.footer}>
				<View style={styles.totalPriceContainer}>
					<Text style={styles.label}>Tổng cộng:</Text>
					<Text style={styles.price}>
						{totalPrice.toLocaleString("vi-VN", {
							style: "currency",
							currency: "VND",
						})}
					</Text>
				</View>
				<Pressable style={styles.orderButton} onPress={handleConfirmOrdering}>
					<Text style={styles.orderButtonText}>Mua hàng</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	main: {
		flex: 1,
		paddingHorizontal: "5%",
	},
	cartListContainer: {
		marginTop: "2%",
	},
	footer: {
		backgroundColor: "#FFFFFF",
		paddingHorizontal: "5%",
		paddingVertical: "2%",
	},
	totalPriceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	label: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "700",
	},
	price: {
		color: "#3a3a3a",
		fontSize: 20,
		fontWeight: "700",
	},
	orderButton: {
		backgroundColor: "#00A188",
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "4%",
		borderRadius: 20,
		marginTop: "5%",
	},
	orderButtonText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "600",
	},
});

const mapStateToProps = (state) => ({
	cartList: state.user.cartList,
});

const mapDispatchToProps = (dispatch) => ({
	updateQuantity: (itemId, newQuantity) =>
		dispatch(updateCartItemQuantity(itemId, newQuantity)),
	confirmOrder: (cartList) => dispatch(confirmOrder(cartList)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserCartScreen);
