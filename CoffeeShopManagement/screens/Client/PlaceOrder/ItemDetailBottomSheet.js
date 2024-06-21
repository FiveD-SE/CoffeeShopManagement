import React, { useState, useEffect, useCallback } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	Pressable,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";

import Icon from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Section from "../../../components/Client/Section";
import SizeItem from "../../../components/Client/Button/SizeItem";
import OptionSection from "../../../components/Client/List/OptionSection";
import ToppingButton from "../../../components/Client/Button/ToppingButton";
import ToppingItemList from "../../../components/Client/List/ToppingItemList";
import BottomSheet from "../../../components/Client/BottomSheet/BottomSheet";
import CustomBuyButton from "../../../components/Client/Button/CustomBuyButton";
import CustomAddToCartButton from "../../../components/Client/Button/CustomAddToCartButton";

import { useIsOpen } from "../../../utils/IsOpenContext";
import { connect } from "react-redux";
import { db } from "../../../services/firebaseService";
import { colors } from "../../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";

import Toast from "react-native-toast-message";

const ItemDetailBottomSheet = ({
	bottomSheetRef,
	snapPoints,
	selectedItem,
	isVisible,
	onClose,
	userData,
}) => {
	const { setIsOpen } = useIsOpen();

	const navigation = useNavigation();

	const [quantity, setQuantity] = useState(1);

	const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

	const [selectedSugarOption, setSelectedSugarOption] = useState("Bình thường");

	const [selectedMilkOption, setSelectedMilkOption] = useState("Bình thường");

	const [selectedIceOption, setSelectedIceOption] = useState("Bình thường");

	const [selectedToppings, setSelectedToppings] = useState([]);

	const [localIsFavorite, setLocalIsFavorite] = useState(null);

	const sizeItemList = [
		{
			size: "S",
			price: selectedItem.productPrice,
			enabled: selectedItem.size.smallEnabled,
		},
		{
			size: "M",
			price: selectedItem.productPrice,
			enabled: selectedItem.size.mediumEnabled,
		},
		{
			size: "L",
			price: selectedItem.productPrice,
			enabled: selectedItem.size.largeEnabled,
		},
	].filter((sizeItem) => sizeItem.enabled);

	const optionList = [
		{ title: "Đường", enabled: selectedItem.productOptions.sugarEnable },
		{ title: "Sữa", enabled: selectedItem.productOptions.milkEnable },
		{ title: "Đá", enabled: selectedItem.productOptions.iceEnable },
	].filter((optionItem) => optionItem.enabled);

	const sugarOptionList = ["Bình thường", "Ít đường", "Không đường"];
	const milkOptionList = ["Bình thường", "Ít sữa", "Không sữa"];
	const iceOptionList = ["Bình thường", "Ít đá", "Không đá"];

	const handleClose = () => {
		onClose();
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const toggleFavorite = async () => {
		try {
			const userId = userData.id;

			const favoritesRef = doc(db, "favorites", userId);

			const favoritesDoc = await getDoc(favoritesRef);

			if (favoritesDoc.exists()) {
				if (!localIsFavorite) {
					await updateDoc(favoritesRef, {
						productIds: arrayUnion(selectedItem.id),
					});

					setLocalIsFavorite(true);
				} else {
					await updateDoc(favoritesRef, {
						productIds: arrayRemove(selectedItem.id),
					});

					setLocalIsFavorite(false);
				}
			} else {
				await setDoc(favoritesRef, {
					productIds: [selectedItem.id],
				});

				setLocalIsFavorite(true);
			}
		} catch (error) {
			console.error("Error toggling favorite:", error);
		}
	};

	const handleSizePress = (index) => setSelectedSizeIndex(index);

	const handleToppingsSelected = (toppings) => {
		setSelectedToppings(toppings);
	};

	const formattedSizeItemList = () => {
		const formattedSizeItemList = [...sizeItemList];

		formattedSizeItemList.forEach((item, index) => {
			let stepPrice = 10000;
			if (index === 0) {
				item.price = selectedItem.productPrice;
			} else {
				item.price = formattedSizeItemList[index - 1].price + stepPrice;
			}
		});

		return formattedSizeItemList;
	};

	const renderSizeItemList = () =>
		formattedSizeItemList().map(({ size, price }, index) => (
			<SizeItem
				key={index}
				index={index}
				size={size}
				price={formatCurrency(price)}
				isSelected={selectedSizeIndex === index}
				onPress={handleSizePress}
			/>
		));

	const chooseOptionList = (title) => {
		switch (title) {
			case "Đường":
				return sugarOptionList;
			case "Sữa":
				return milkOptionList;
			case "Đá":
				return iceOptionList;
			default:
				return [];
		}
	};

	const renderOptionSection = () => {
		return optionList.map((item, index) => (
			<OptionSection
				key={index}
				title={item.title}
				options={chooseOptionList(item.title)}
				onSelectOption={(title, optionValue) => {
					switch (title) {
						case "Đường":
							setSelectedSugarOption(optionValue);
							break;
						case "Sữa":
							setSelectedMilkOption(optionValue);
							break;
						case "Đá":
							setSelectedIceOption(optionValue);
							break;
						default:
							break;
					}
				}}
			/>
		));
	};

	const renderToppingItemList = () => {
		if (selectedToppings.length > 0) {
			return (
				<View style={{ marginTop: "5%" }}>
					<ToppingItemList toppings={selectedToppings} />
				</View>
			);
		}
		return null;
	};

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		if (selectedSizeIndex !== null) {
			totalPrice += sizeItemList[selectedSizeIndex].price;
		}
		totalPrice += selectedToppings.reduce((accumulator, currentTopping) => {
			return accumulator + currentTopping.price;
		}, 0);
		return totalPrice * quantity;
	};

	const handleBuyItem = () => {
		const products = {
			...selectedItem,
			size: sizeItemList[selectedSizeIndex].size,
			quantity: quantity,
			toppings: selectedToppings,
			options: [selectedSugarOption, selectedMilkOption, selectedIceOption],
			totalPrice: calculateTotalPrice(),
			cartItemId:
				selectedItem.productId +
				sizeItemList[selectedSizeIndex].size +
				"-" +
				selectedSugarOption +
				"-" +
				selectedMilkOption +
				"-" +
				selectedIceOption,
		};
		navigation.navigate("UserOrderConfirmationScreen", {
			productOrders: [products],
		});

		handleClose();
	};

	const handleAddToCart = async () => {
		if (selectedItem && selectedSizeIndex !== null) {
			const itemToAdd = {
				...selectedItem,
				size: sizeItemList[selectedSizeIndex].size,
				quantity: quantity,
				toppings: selectedToppings,
				options: [selectedSugarOption, selectedMilkOption, selectedIceOption],
				totalPrice: calculateTotalPrice(),
				cartItemId:
					selectedItem.productId +
					sizeItemList[selectedSizeIndex].size +
					"-" +
					selectedSugarOption +
					"-" +
					selectedMilkOption +
					"-" +
					selectedIceOption,
			};

			try {
				const cartRef = doc(db, "carts", userData.id);
				const cartDoc = await getDoc(cartRef);

				if (cartDoc.exists()) {
					const existingItems = cartDoc.data().items;
					const existingItemIndex = existingItems.findIndex((item) => {
						return (
							item.cartItemId === itemToAdd.cartItemId &&
							item.options.every(
								(option, index) => option === itemToAdd.options[index]
							)
						);
					});

					if (existingItemIndex !== -1) {
						existingItems[existingItemIndex].quantity += itemToAdd.quantity;
						await updateDoc(cartRef, {
							items: existingItems,
						});
					} else {
						await updateDoc(cartRef, {
							items: arrayUnion(itemToAdd),
						});
					}
				} else {
					await setDoc(cartRef, {
						items: [itemToAdd],
					});
				}
				Toast.show({
					type: "success",
					text1: "Thành công",
					text2: "Sản phẩm đã được thêm vào giỏ hàng",
					text1Style: {
						fontSize: 16,
						fontFamily: "lato-bold",
					},
					text2Style: {
						fontSize: 12,
						fontFamily: "lato-bold",
						color: colors.grey_100,
					},
					visibilityTime: 2000,
					autoHide: true,
				});
			} catch (error) {
				console.error("Error adding item to cart: ", error);
			}
		}
	};

	const handleIncreaseQuantity = useCallback(() => {
		setQuantity(quantity + 1);
	}, [quantity]);

	const handleDecreaseQuantity = useCallback(() => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	}, [quantity]);

	useEffect(() => {
		setSelectedSizeIndex(sizeItemList.length > 0 ? 0 : null);
		return () => {
			setSelectedToppings([]);
		};
	}, [selectedItem]);

	useEffect(() => {
		if (isVisible) {
			bottomSheetRef.current?.present();
		} else {
			bottomSheetRef.current?.dismiss();
		}
	}, [isVisible, bottomSheetRef]);

	useEffect(() => {
		if (userData && selectedItem) {
			const checkFavorites = async () => {
				const favoritesRef = doc(db, "favorites", userData.id);
				const favoritesDoc = await getDoc(favoritesRef);

				if (favoritesDoc.exists()) {
					if (favoritesDoc.data().productIds.includes(selectedItem.id)) {
						setLocalIsFavorite(true);
					} else {
						setLocalIsFavorite(false);
					}
				}
			};
			checkFavorites();
		}
	}, [userData, selectedItem]);

	return (
		<BottomSheet
			bottomSheetRef={bottomSheetRef}
			snapPoints={snapPoints}
			setIsOpen={setIsOpen}
			isVisible={isVisible}
			onClose={handleClose}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.imageContainer}>
						<Image
							style={styles.image}
							source={{ uri: selectedItem.productImage }}
						/>
					</View>
					<View style={styles.main}>
						<View style={styles.header}>
							<View style={styles.contentContainer}>
								<Text style={styles.title}>{selectedItem.productName}</Text>
								<Text style={styles.price}>
									{formatCurrency(selectedItem.productPrice)}
								</Text>
							</View>
							<Pressable onPress={toggleFavorite}>
								{localIsFavorite ? (
									<FontAwesome name="heart" size={24} color={"#F61A3D"} />
								) : (
									<Icon name="heart" size={24} />
								)}
							</Pressable>
						</View>
						<Text style={styles.description}>
							{selectedItem ? selectedItem.productDescription : ""}
						</Text>
						<View style={{ marginTop: "5%" }}>
							<Section title="Kích cỡ">
								<View style={styles.sizeContainer}>{renderSizeItemList()}</View>
							</Section>
						</View>
						<View style={{ marginTop: "5%" }}>
							<Section title="Tuỳ chọn khác">
								<View style={styles.optionContainer}>
									{renderOptionSection()}
								</View>
							</Section>
						</View>
						{selectedItem.productType !== "Cà phê" && (
							<View style={{ marginTop: "5%" }}>
								<ToppingButton onToppingsSelected={handleToppingsSelected} />
							</View>
						)}
						{renderToppingItemList()}
					</View>
				</View>

				<View style={styles.footer}>
					<View style={styles.buttonContainer}>
						<CustomBuyButton
							totalPrice={calculateTotalPrice()}
							onPress={handleBuyItem}
						/>

						<CustomAddToCartButton onPress={handleAddToCart} />
					</View>

					<View style={styles.adjustQuantity}>
						<Pressable onPress={handleIncreaseQuantity}>
							<Ionicons name="add-sharp" size={24} color={colors.black_100} />
						</Pressable>
						<View style={styles.quantityContainer}>
							<Text style={styles.quantityText}>{quantity}</Text>
						</View>
						<Pressable onPress={handleDecreaseQuantity}>
							<Ionicons
								name="remove-sharp"
								size={24}
								color={colors.black_100}
							/>
						</Pressable>
					</View>
				</View>
			</ScrollView>
		</BottomSheet>
	);
};

const mapStateToProps = (state) => ({
	cartList: state.user.cartList,
	userData: state.auth.userData,
});

const mapDispatchToProps = {};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemDetailBottomSheet);

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
	},
	imageContainer: {
		aspectRatio: 1,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},
	adjustQuantity: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "2%",
		backgroundColor: colors.grey_10,
		borderRadius: 6,
		borderColor: colors.grey_50,
		borderWidth: 1,
	},
	quantityContainer: {
		marginVertical: "4%",
	},
	quantityText: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-regular",
		lineHeight: 20,
	},
	main: {
		flex: 1,
		padding: "4%",
	},
	header: {
		flexDirection: "row",
	},
	contentContainer: {
		flex: 1,
	},
	title: {
		color: colors.black_100,
		fontSize: 20,
		lineHeight: 24,
		fontFamily: "lato-bold",
	},
	price: {
		color: colors.grey_100,
		fontSize: 18,
		fontFamily: "lato-regular",
		marginTop: "5%",
	},
	description: {
		color: colors.black_100,
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "lato-regular",
		marginTop: "5%",
		textAlign: "justify",
	},
	sizeContainer: {
		flexDirection: "row",
		marginTop: "5%",
		borderBottomWidth: 1,
		borderColor: colors.grey_100,
		paddingBottom: "5%",
	},
	optionContainer: {
		borderBottomWidth: 1,
		borderColor: colors.grey_10,
		paddingBottom: "5%",
	},
	footer: {
		flexDirection: "row",
		backgroundColor: "#FFFFFF",
		padding: "4%",
		borderColor: colors.grey_50,
		borderTopWidth: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: "column",
		marginRight: "4%",
	},
});
