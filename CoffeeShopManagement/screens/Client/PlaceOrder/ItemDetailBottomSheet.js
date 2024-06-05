import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	Pressable,
	ScrollView,
	Platform,
	Alert,
	Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Section from "../../../components/Client/Section";
import SizeItem from "../../../components/Client/Button/SizeItem";
import OptionSection from "../../../components/Client/List/OptionSection";
import ToppingButton from "../../../components/Client/Button/ToppingButton";
import ToppingItemList from "../../../components/Client/List/ToppingItemList";
import BottomSheet from "../../../components/Client/BottomSheet/BottomSheet";
import { useIsOpen } from "../../../utils/IsOpenContext";
import { connect } from "react-redux";
import {
	addToCart,
	addToFavorites,
	removeFromFavorites,
} from "../../../redux/actions/userActions";
import store from "../../../redux/store/store";
import { colors } from "../../../assets/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const cardHeight = Dimensions.get("window").height / 3;

const ItemDetailBottomSheet = ({
	bottomSheetRef,
	snapPoints,
	selectedItem,
	isVisible,
	onClose,
	addToCart,
	cartList,
	userData,
}) => {
	console.log(selectedItem);

	const { setIsOpen } = useIsOpen();

	const navigation = useNavigation();

	const [quantity, setQuantity] = useState(1);

	const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

	const [selectedToppings, setSelectedToppings] = useState([]);

	const [selectedSugarOption, setSelectedSugarOption] = useState("Bình thường");

	const [selectedMilkOption, setSelectedMilkOption] = useState("Bình thường");

	const [selectedIceOption, setSelectedIceOption] = useState("Bình thường");

	const [localIsFavorite, setLocalIsFavorite] = useState(null);

	const sizeItemList = [
		{
			size: "S",
			price: selectedItem.productPrice,
			enabled: selectedItem.size.smallEnabled,
		},
		{
			size: "M",
			price: selectedItem.productPrice + 10000,
			enabled: selectedItem.size.mediumEnabled,
		},
		{
			size: "L",
			price: selectedItem.productPrice + 20000,
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

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		if (selectedSizeIndex !== null) {
			totalPrice += sizeItemList[selectedSizeIndex].price;
		}
		totalPrice += selectedToppings.reduce((accumulator, currentTopping) => {
			return accumulator + currentTopping.price;
		}, 0);
		return totalPrice;
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

	const renderSizeItemList = () =>
		sizeItemList.map(({ size, price }, index) => (
			<SizeItem
				key={index}
				index={index}
				size={size}
				price={
					index === 0
						? formatCurrency(selectedItem?.productPrice)
						: formatCurrency(price)
				}
				isSelected={selectedSizeIndex === index}
				onPress={handleSizePress}
			/>
		));

	const renderOptionSection = () =>
		optionList.map((item, index) => (
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

	const handleClose = () => {
		onClose();
	};

	const handleIncreaseQuantity = () => {
		setQuantity(quantity + 1);
	};

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};

	const handleToppingsSelected = (toppings) => {
		setSelectedToppings(toppings);
	};

	const renderToppingButton = () => {
		if (selectedItem && selectedItem.type !== "COFFEE") {
			return (
				<View style={{ marginTop: "5%" }}>
					<ToppingButton onToppingsSelected={handleToppingsSelected} />
				</View>
			);
		}
		return null;
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

	const handleAddToCart = () => {
		if (selectedItem && selectedSizeIndex !== null) {
			const isAlreadyInCart = cartList.some(
				(item) => item._id === selectedItem._id
			);

			if (isAlreadyInCart) {
				Alert.alert(
					"Đã được thêm vào giỏ hàng",
					"Kiểm tra giỏ hàng bạn ngay bạn nhé !",
					[
						{
							text: "Cancel",
							style: "destructive",
						},
						{
							text: "OK",
							onPress: () => goToCartScreen(),
							style: "default",
						},
					]
				);
			} else {
				const itemToAdd = {
					...selectedItem,
					size: sizeItemList[selectedSizeIndex].size,
					quantity: 1,
					options: [selectedSugarOption, selectedMilkOption, selectedIceOption],
					totalPrice: calculateTotalPrice(),
				};
				addToCart(itemToAdd);
			}
		}
	};

	const goToCartScreen = () => navigation.navigate("UserCartScreen");

	useEffect(() => {
		setSelectedSizeIndex(sizeItemList.length > 0 ? 0 : null);
		return () => {
			setSelectedToppings([]);
		};
	}, [selectedItem]);

	useEffect(() => {
		console.log("CHECK FAVORITES");
		if (userData && selectedItem) {
			const checkFavorites = async () => {
				const favoritesRef = doc(db, "favorites", userData.id);
				const favoritesDoc = await getDoc(favoritesRef);

				if (favoritesDoc.exists()) {
					if (favoritesDoc.data().productIds.includes(selectedItem.id)) {
						console.log("IS FAVORITE");
						setLocalIsFavorite(true);
					} else {
						console.log("IS NOT FAVORITE");
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
							<Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
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
						{renderToppingButton()}
						{renderToppingItemList()}
					</View>
				</View>

				<View style={styles.footer}>
					<View style={{ flex: 1, flexDirection: "column", marginRight: "4%" }}>
						<Pressable style={styles.buyButton}>
							<Text style={styles.buyButtonText}>Mua hàng</Text>
							<Icon name="ellipsis-vertical" color="#FFFFFF" size={16} />
							<Text style={styles.buyButtonText}>
								{formatCurrency(calculateTotalPrice())}
							</Text>
						</Pressable>

						<Pressable style={styles.addToCartButton} onPress={handleAddToCart}>
							<Ionicons style={styles.addToCartIcon} name="cart" size={24} />
							<Text style={styles.addToCartText}>Thêm vào giỏ</Text>
						</Pressable>
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

const mapDispatchToProps = {
	addToFavorites,
	removeFromFavorites,
	addToCart,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ItemDetailBottomSheet);

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
	},
	scrollViewContent: {},
	imageContainer: {
		height: cardHeight,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "stretch",
	},
	adjustQuantity: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "2%",
		backgroundColor: colors.grey_10,
		borderRadius: 5,
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
		padding: "5%",
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
		fontSize: 16,
		fontFamily: "lato-regular",
		marginTop: "5%",
	},
	favoriteButton: {},
	description: {
		color: colors.black_100,
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "lato-regular",
		marginTop: "5%",
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
	totalPriceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	buyButton: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: colors.green_100,
		justifyContent: "space-evenly",
		alignItems: "center",
		marginBottom: "2%",
		paddingVertical: "4%",
		borderRadius: 12,
		shadowColor: colors.black_100,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	buyButtonText: {
		color: colors.white_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	addToCartButton: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: colors.grey_20,
		borderColor: colors.grey_50,
		borderWidth: 1,
		paddingVertical: "4%",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: "6%",
		borderRadius: 12,
		shadowColor: colors.grey_100,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.2,
		shadowRadius: 2,
		elevation: 2,
	},
	addToCartIcon: {
		color: colors.grey_100,
	},
	addToCartText: {
		color: colors.grey_100,
		fontSize: 16,
		fontFamily: "lato-bold",
		marginLeft: "4%",
	},
});
