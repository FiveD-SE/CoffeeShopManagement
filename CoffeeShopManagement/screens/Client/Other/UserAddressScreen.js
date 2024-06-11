import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../assets/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";
import {
	doc,
	updateDoc,
	collection,
	query,
	where,
	getDocs,
	writeBatch,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import AddressInfo from "../../../components/Client/Card/AddressInfo";

const UserAddressScreen = ({ userData, route }) => {
	const { isOrdered, productOrders, selectedBranch } = route.params;

	const navigation = useNavigation();

	const [addresses, setAddresses] = useState([]);

	useEffect(() => {
		const loadAddresses = async () => {
			try {
				const q = query(
					collection(db, "addresses"),
					where("userId", "==", userData.id)
				);
				const querySnapshot = await getDocs(q);
				const loadedAddresses = [];
				querySnapshot.forEach((doc) => {
					loadedAddresses.push(doc.data());
				});
				setAddresses(loadedAddresses);
			} catch (error) {
				console.error("Error loading addresses:", error);
			}
		};

		loadAddresses();
		const unsubscribe = navigation.addListener("focus", () => {
			loadAddresses();
		});

		return unsubscribe;
	}, [userData.id, navigation]);

	const renderSavedAddressItem = (item) => {
		const sortedAddresses = [...addresses].sort(
			(a, b) => b.isDefault - a.isDefault
		);
		return sortedAddresses.map((item) => {
			const address = `${item.street}, ${item.wardName}, ${item.districtName}, ${item.provinceName}`;
			return (
				<AddressInfo
					key={`${item.addressId}-${item.phoneNumber}`}
					name={item.name}
					phoneNumber={item.phoneNumber}
					address={address}
					isDefault={item.isDefault}
					onSetDefaultAddress={() => handleSetDefaultAddress(item.addressId)}
					onChangeAddress={() => goToChangeAddressScreen(item)}
					onPress={() => handleSelectAddress(item)}
				/>
			);
		});
	};

	const goToChangeAddressScreen = (item) => {
		navigation.navigate("EditAddress", { address: item });
	};

	const handleSetDefaultAddress = async (addressId) => {
		try {
			const batch = writeBatch(db);

			const updatedAddresses = addresses.map((address) => {
				if (address.addressId === addressId) {
					return { ...address, isDefault: true };
				} else {
					return { ...address, isDefault: false };
				}
			});

			setAddresses(updatedAddresses);

			updatedAddresses.forEach((address) => {
				const docRef = doc(db, "addresses", address.addressId);
				batch.update(docRef, { isDefault: address.isDefault });
			});

			await batch.commit();
		} catch (error) {
			Toast.show({
				type: "error",
				text1: "Lỗi",
				text2: "Đã có lỗi xảy ra khi cập nhật địa chỉ",
				text1Style: {
					fontSize: 16,
					fontFamily: "lato-bold",
					color: colors.black_100,
				},
				text2Style: {
					fontSize: 12,
					fontFamily: "lato-regular",
					color: colors.grey_100,
				},
			});
		}
	};

	const handleSelectAddress = (item) => {
		if (isOrdered) {
			navigation.navigate("UserOrderConfirmationScreen", {
				productOrders,
				selectedBranch,
				selectedAddress: item,
			});
		}
	};

	const goToAddAddressScreen = () => {
		navigation.navigate("AddNewAddress");
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text style={styles.sectionHeading}>Địa chỉ đã lưu</Text>
				{renderSavedAddressItem()}
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={goToAddAddressScreen}
				>
					<View style={styles.titleContainer}>
						<MaterialIcons name="add-box" size={30} color={colors.green_100} />
						<Text style={styles.title}>Thêm địa chỉ mới</Text>
					</View>
					<MaterialIcons
						name="keyboard-arrow-right"
						size={36}
						color="#3a3a3a"
					/>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: "5%",
	},
	sectionHeading: {
		fontSize: 18,
		fontWeight: "bold",
		marginVertical: "4%",
	},
	addressItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		padding: 15,
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	icon: {
		marginRight: 15,
	},
	addressText: {
		flex: 1,
		fontSize: 16,
		color: "#9C9C9C",
	},
	addButton: {
		flexDirection: "row",
		padding: 15,
		borderRadius: 20,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	addText: {
		color: "#000000",
		fontSize: 16,
		fontFamily: "helvetica-bold",
	},
	buttonContainer: {
		backgroundColor: "#ffffff",
		borderRadius: 20,
		padding: "4%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 17,
		color: "#3a3a3a",
		fontWeight: "600",
		marginLeft: "10%",
	},
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
});

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserAddressScreen);
