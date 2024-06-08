import {
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	View,
	Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Section from "../../../components/Client/Section";
import CartItemCard from "../../../components/Client/Card/CartItemCard";
import { connect } from "react-redux";
import {
	confirmOrder,
	updateCartItemQuantity,
} from "../../../redux/actions/userActions";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import Toast from "react-native-toast-message";
import { colors } from "../../../assets/colors/colors";
import Checkbox from "expo-checkbox";

const isIOS = Platform.OS === "ios";

const UserCartScreen = ({ userData }) => {
	const navigation = useNavigation();
	const [totalPrice, setTotalPrice] = useState(0);
	const [isChecked, setChecked] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [selectedItems, setSelectedItems] = useState([]);

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const renderCartList = ({ item, index }) => (
		<CartItemCard
			id={item.cartItemId}
			name={item.productName}
			price={formatCurrency(item.totalPrice)}
			imageSource={item.productImage}
			quantity={item.quantity}
			options={`${item.size}, ${
				item.productOptions.sugarEnable ? "Có đường" : "Không đường"
			}, ${item.productOptions.milkEnable ? "Có sữa" : "Không sữa"}, ${
				item.productOptions.iceEnable ? "Có đá" : "Không đá"
			}`}
			isChecked={selectedItems[index]}
			onChecked={() => handleItemChecked(index)}
			handleDecrease={() => handleDecrease(item)}
			handleIncrease={() => handleIncrease(item)}
		/>
	);

	useEffect(() => {
		const fetchCartItems = async () => {
			if (!userData.id) return;

			const cartRef = doc(db, "carts", userData.id);
			const cartDoc = await getDoc(cartRef);

			if (cartDoc.exists()) {
				const cartData = cartDoc.data();
				setCartItems(cartData.items || []);
				setSelectedItems(new Array((cartData.items || []).length).fill(false));
			} else {
				setCartItems([]);
				setSelectedItems([]);
			}
		};

		fetchCartItems();
	}, [userData]);

	const handleChecked = () => {
		const newChecked = !isChecked;
		setChecked(newChecked);
		const newSelectedItems = selectedItems.map(() => newChecked);
		setSelectedItems(newSelectedItems);
		calculateTotalPrice(cartItems, newSelectedItems);
	};

	const handleItemChecked = (index) => {
		const updatedSelectedItems = [...selectedItems];
		updatedSelectedItems[index] = !updatedSelectedItems[index];
		setChecked(updatedSelectedItems.every((item) => item));
		setSelectedItems(updatedSelectedItems);
		calculateTotalPrice(cartItems, updatedSelectedItems);
	};

	const handleDecrease = async (item) => {
		const updatedCartItems = [...cartItems];
		const index = updatedCartItems.findIndex(
			(cartItem) => cartItem.cartItemId === item.cartItemId
		);

		if (updatedCartItems[index].quantity === 1) {
			Alert.alert(
				"Xác nhận",
				"Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
				[
					{ text: "Không", style: "cancel" },
					{
						text: "Có",
						onPress: async () => {
							await removeItemFromFirestore(item.cartItemId);
							updatedCartItems.splice(index, 1);
							setCartItems(updatedCartItems);
							const newSelectedItems = selectedItems.filter(
								(_, i) => i !== index
							);
							setSelectedItems(newSelectedItems);
							calculateTotalPrice(updatedCartItems, newSelectedItems);
						},
					},
				]
			);
		} else {
			updatedCartItems[index].quantity -= 1;
			setCartItems(updatedCartItems);
			calculateTotalPrice(updatedCartItems, selectedItems);
			await updateQuantityInFirestore(
				item.cartItemId,
				updatedCartItems[index].quantity
			);
		}
	};

	const handleIncrease = async (item) => {
		const updatedCartItems = [...cartItems];
		const index = updatedCartItems.findIndex(
			(cartItem) => cartItem.cartItemId === item.cartItemId
		);

		updatedCartItems[index].quantity += 1;

		setCartItems(updatedCartItems);

		calculateTotalPrice(updatedCartItems, selectedItems);

		await updateQuantityInFirestore(
			item.cartItemId,
			updatedCartItems[index].quantity
		);
	};

	const calculateTotalPrice = (items, selectedItemsStatus = selectedItems) => {
		const total = items.reduce(
			(sum, item, index) =>
				sum +
				(selectedItemsStatus[index] ? item.totalPrice * item.quantity : 0),
			0
		);
		setTotalPrice(total);
	};

	const updateQuantityInFirestore = async (cartItemId, newQuantity) => {
		try {
			const cartRef = doc(db, "carts", userData.id);
			const cartDoc = await getDoc(cartRef);

			if (cartDoc.exists()) {
				const cartData = cartDoc.data();
				let cartItems = cartData.items;
				let itemToUpdate = cartItems.find(
					(cartItem) => cartItem.cartItemId === cartItemId
				);
				if (itemToUpdate) {
					itemToUpdate.quantity = newQuantity;
					await updateDoc(cartRef, {
						items: cartItems,
					});
				} else {
					console.error("Item not found in Firestore.");
				}
			}
		} catch (error) {
			console.error("Error updating item quantity:", error);
		}
	};

	const removeItemFromFirestore = async (cartItemId) => {
		try {
			const cartRef = doc(db, "carts", userData.id);
			const cartDoc = await getDoc(cartRef);

			if (cartDoc.exists()) {
				const cartData = cartDoc.data();
				let cartItems = cartData.items.filter(
					(item) => item.cartItemId !== cartItemId
				);
				await updateDoc(cartRef, {
					items: cartItems,
				});
			}
		} catch (error) {
			console.error("Error removing item from Firestore: ", error);
		}
	};

	const handleConfirmOrdering = () => {
		let checkedItems = cartItems.filter((_, index) => selectedItems[index]);

		if (checkedItems.length > 0) {
			navigation.navigate("UserOrderConfirmationScreen", {
				productOrders: checkedItems,
			});
		} else {
			Toast.show({
				type: "error",
				text1: "Vui lòng chọn sản phẩm",
				text2: "Chọn ít nhất 1 sản phẩm trước khi tiếp tục",
				text1Style: {
					fontSize: 16,
					fontFamily: "lato-bold",
					color: colors.black_100,
				},
				text2Style: {
					fontSize: 14,
					fontFamily: "lato-regular",
					color: colors.grey_100,
					marginTop: "2%",
				},
				autoHide: true,
				visibilityTime: 1800,
			});
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<View
					style={{
						flexDirection: "row",
						paddingVertical: "4%",
						paddingHorizontal: "8%",
					}}
				>
					<Checkbox
						style={styles.checkbox}
						value={isChecked}
						color={isChecked ? colors.grey_100 : undefined}
						onValueChange={handleChecked}
					/>
					<Text
						style={{
							textTransform: "uppercase",
							color: colors.black_100,
							fontFamily: "lato-bold",
						}}
					>
						Chọn tất cả
					</Text>
				</View>
				<View style={styles.cartListContainer}>
					<Section title="Sản phẩm đã thêm">
						<FlatList
							showsVerticalScrollIndicator={false}
							data={cartItems}
							renderItem={renderCartList}
							keyExtractor={(item) => item.cartItemId}
							contentContainerStyle={{ paddingBottom: "10%" }}
						/>
					</Section>
				</View>
			</View>
			<View style={styles.footer}>
				<View style={styles.totalPriceContainer}>
					<Text style={styles.label}>Tổng cộng:</Text>
					<Text style={styles.price}>{formatCurrency(totalPrice)}</Text>
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
	},
	cartListContainer: {
		flex: 1,
		backgroundColor: colors.white_100,
		padding: "4%",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderTopWidth: 1,
		borderLeftWidth: 1,
		borderRightWidth: 1,
		borderColor: colors.grey_50,
	},
	footer: {
		backgroundColor: colors.white_100,
		paddingHorizontal: "6%",
		paddingVertical: isIOS ? "10%" : "6%",
		borderTopWidth: 1,
		borderTopColor: colors.grey_50,
	},
	totalPriceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	label: {
		color: colors.black_100,
		fontSize: 20,
		fontFamily: "lato-bold",
	},
	price: {
		color: colors.black_100,
		fontSize: 20,
		fontFamily: "lato-bold",
	},
	orderButton: {
		backgroundColor: colors.green_100,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: "4%",
		borderRadius: 12,
		marginTop: "4%",
		shadowColor: colors.grey_100,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	orderButtonText: {
		color: colors.white_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	checkbox: {
		borderColor: colors.black_100,
		borderRadius: 4,
		marginRight: "4%",
	},
});

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

const mapDispatchToProps = { confirmOrder, updateCartItemQuantity };

export default connect(mapStateToProps, mapDispatchToProps)(UserCartScreen);
