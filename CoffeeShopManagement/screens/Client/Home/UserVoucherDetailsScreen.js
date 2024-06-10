import {
	Alert,
	Dimensions,
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { updateUserCredit } from "../../../redux/actions/userActions";
import Toast from "react-native-toast-message";

const height = Dimensions.get("window").height / 3;

const UserVoucherDetailsScreen = ({ route, userData, updateUserCredit }) => {
	const navigation = useNavigation();

	const { voucherDetails, type } = route.params;
	console.log("voucherDetails", voucherDetails);

	const handleExchangeVoucher = async () => {
		try {
			const userVoucherRef = doc(db, "userVouchers", userData.id);
			const userVoucherSnap = await getDoc(userVoucherRef);

			if (userVoucherSnap.exists()) {
				const userVoucherData = userVoucherSnap.data();
				const vouchers = userVoucherData.voucherId || [];

				const voucherIndex = vouchers.findIndex(
					(v) => v.id === voucherDetails.id
				);
				if (voucherIndex >= 0) {
					vouchers[voucherIndex].quantity += 1;
				} else {
					vouchers.push({ id: voucherDetails.id, quantity: 1 });
				}

				await updateDoc(userVoucherRef, {
					voucherId: vouchers,
				});
			} else {
				await setDoc(userVoucherRef, {
					userId: userData.id,
					voucherId: [{ id: voucherDetails.id, quantity: 1 }],
				});
			}

			const newCredit = userData.credit - voucherDetails.voucherExchangePrice;
			updateUserCredit(newCredit);

			const userDocRef = doc(db, "users", userData.id);
			await updateDoc(userDocRef, {
				credit: newCredit,
			});

			Toast.show({
				type: "success",
				text1: "Đổi thành công",
				text2: "Voucher đã được quy đổi thành công",
				text1Style: {
					color: colors.black_100,
					fontSize: 16,
					fontFamily: "lato-bold",
				},
				text2Style: {
					color: colors.grey_100,
					fontSize: 14,
					fontFamily: "lato-regular",
				},
				autoHide: true,
			});

			navigation.goBack();
		} catch (error) {
			console.error("Error exchanging voucher: ", error);
			Alert.alert("Error", "Failed to exchange voucher. Please try again.");
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.scrollView}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image
						source={{ uri: voucherDetails.voucherImage }}
						resizeMode="stretch"
						style={styles.image}
					/>
				</View>
				<View style={styles.main}>
					<View style={styles.titleContainer}>
						<Text style={styles.title} numberOfLines={3}>
							{voucherDetails.voucherName}
						</Text>
					</View>
					<View style={styles.pointContainer}>
						<Text style={styles.point}>
							{voucherDetails.voucherExchangePrice} điểm
						</Text>
					</View>
					<View style={styles.detailsContainer}>
						<Text style={styles.detailsTitle}>Chi tiết ưu đãi</Text>
						<Text style={styles.details}>
							{voucherDetails.voucherDescription}
						</Text>
					</View>
					{type === "isExchange" && (
						<Pressable
							style={styles.exchangeButton}
							onPress={handleExchangeVoucher}
						>
							<Text style={styles.exchangeButtonText}>ĐỔI NGAY</Text>
						</Pressable>
					)}
				</View>
			</View>
		</ScrollView>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

const mapDispatchToProps = {
	updateUserCredit,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserVoucherDetailsScreen);

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	container: {
		flex: 1,
	},
	imageContainer: {
		width: "100%",
		height: height,
	},
	image: {
		width: "100%",
		height: "100%",
	},
	main: {
		flex: 1,
		padding: "6%",
	},
	titleContainer: {},
	title: {
		color: "#3a3a3a",
		fontSize: 20,
		lineHeight: 24,
		fontFamily: "lato-bold",
	},
	pointContainer: {
		alignSelf: "flex-start",
		backgroundColor: "rgba(78, 203, 113, 0.10)",
		paddingHorizontal: "6%",
		paddingVertical: "2%",
		borderRadius: 20,
		marginTop: "6%",
	},
	point: {
		color: "#4ECB71",
		fontSize: 14,
		fontFamily: "lato-regular",
	},
	detailsContainer: {
		flex: 1,
		marginTop: "6%",
	},
	detailsTitle: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	details: {
		color: colors.black_100,
		fontSize: 14,
		lineHeight: 16,
		marginTop: "4%",
		fontFamily: "lato-regular",
	},
	exchangeButton: {
		backgroundColor: colors.green_100,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		paddingVertical: "4%",
		marginTop: "5%",
		elevation: 2,
	},
	exchangeButtonText: {
		color: "#FFFFFF",
		fontSize: 12,
		fontFamily: "lato-bold",
	},
});
