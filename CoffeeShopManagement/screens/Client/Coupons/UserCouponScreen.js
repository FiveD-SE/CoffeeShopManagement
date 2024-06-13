import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
	SafeAreaView,
	Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import VoucherCard from "../../../components/Client/Card/VoucherCard";
import UserVoucherCard from "../../../components/Client/Card/UserVoucherCard";
import { auth, db } from "../../../services/firebaseService";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import { colors } from "../../../assets/colors/colors";
import Section from "../../../components/Client/Section";
import { connect } from "react-redux";

const COFFEE_BEAN_ICONS = require("../../../assets/coffee-bean.png");
const coupon = require("../../../assets/coupon.png");
const crown = require("../../../assets/crown.png");
const bean = require("../../../assets/bean.png");
const gift = require("../../../assets/gift.png");
const rights = require("../../../assets/rights.png");

function UserCouponScreen({ userData }) {
	const navigation = useNavigation();

	const [beanTotal, setBeanTotal] = useState(0);
	const [userVoucherItemList, setUserVoucherItemList] = useState([]);
	const [voucherItemList, setVoucherItemList] = useState([]);
	const [userRank, setUserRank] = useState("Chưa tích điểm");
	const [beansToNextRank, setBeansToNextRank] = useState(0);

	const goToVoucherDetails = (item, type) => {
		navigation.navigate("VoucherDetails", { voucherDetails: item, type });
	};

	const goToUserVoucherScreen = () => {
		navigation.navigate("UserVoucherScreen");
	};

	const goToExchangeVoucherScreen = () => {
		navigation.navigate("Exchange");
	};

	const convertTimestampToDate = (timestamp) => {
		return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
	};

	const formatDate = (date) => {
		const options = { year: "numeric", month: "long", day: "numeric" };
		return date.toLocaleDateString("vi-VN", options);
	};

	const renderYourVoucherItemList = () => {
		return userVoucherItemList.map((item, index) => (
			<UserVoucherCard
				key={index}
				title={item.voucherName}
				expiryDate={item.expirationDate}
				quantity={item.quantity}
				imageSource={item.voucherImage}
				onPress={() => goToVoucherDetails(item, "")}
			/>
		));
	};

	const renderVoucherItem = () => {
		if (voucherItemList.length === 0) {
			return (
				<View style={styles.emptyContainer}>
					<Image
						source={require("../../../assets/empty.png")}
						resizeMode="contain"
						style={{ width: 64, height: 64 }}
					/>
					<Text style={styles.emptyText}>
						Không có voucher có sẵn để quy đổi
					</Text>
				</View>
			);
		}

		return voucherItemList.map((item, index) => (
			<VoucherCard
				key={index}
				title={item.voucherName}
				point={item.voucherExchangePrice}
				imageSource={item.voucherImage}
				onPress={() => goToVoucherDetails(item, "isExchange")}
			/>
		));
	};

	const changeColorByRank = () => {
		switch (userRank) {
			case "Mới":
				return colors.green_100;
			case "Đồng":
				return colors.bronze;
			case "Bạc":
				return colors.silver;
			case "Vàng":
				return colors.gold;
			case "Kim cương":
				return colors.diamond;
			default:
				return colors.green_100;
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			const userDocRef = doc(db, "users", auth.currentUser.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				setBeanTotal(userDoc.data().credit);
				let rank = "Mới";
				const credit = userDoc.data().credit;
				let beansToNextRank = 0;

				if (credit >= 500) {
					rank = "Kim cương";
				} else if (credit >= 300) {
					rank = "Vàng";
					beansToNextRank = 500 - credit;
				} else if (credit >= 200) {
					rank = "Bạc";
					beansToNextRank = 300 - credit;
				} else if (credit >= 100) {
					rank = "Đồng";
					beansToNextRank = 200 - credit;
				} else {
					beansToNextRank = 100 - credit;
				}

				setUserRank(rank);
				setBeansToNextRank(beansToNextRank);
			} else {
				console.log("User document does not exist.");
			}
		};

		const fetchVoucherData = async () => {
			const voucherList = [];

			try {
				const voucherQuery = query(
					collection(db, "vouchers"),
					where("voucherExchangePrice", "<=", userData.credit),
					orderBy("dateCreated", "desc"),
					limit(3)
				);

				const querySnapshot = await getDocs(voucherQuery);
				querySnapshot.forEach((doc) => {
					const data = doc.data();
					voucherList.push({ ...data, id: doc.id });
				});
				setVoucherItemList(voucherList);
			} catch (error) {
				console.error(error);
			}
		};

		const fetchUserVoucherData = async () => {
			const userVoucherList = [];
			const userVoucherRefs = [];

			try {
				const userVouchersQuery = query(
					collection(db, "userVouchers"),
					where("userId", "==", userData.id)
				);
				const querySnapshot = await getDocs(userVouchersQuery);

				querySnapshot.forEach((doc) => {
					const data = doc.data();
					const voucherIds = data.voucherId;

					voucherIds.forEach((voucher) => {
						userVoucherRefs.push({
							id: voucher.id,
							quantity: voucher.quantity,
						});
					});
				});

				for (const ref of userVoucherRefs) {
					const voucherDoc = await getDoc(doc(db, "vouchers", ref.id));
					const voucherData = voucherDoc.data();

					userVoucherList.push({
						...voucherData,
						quantity: ref.quantity,
						expirationDate: voucherData.expirationDate,
					});
				}

				userVoucherList.sort((a, b) => {
					return a.expirationDate - b.expirationDate;
				});

				const formattedVoucherList = userVoucherList
					.map((voucher) => ({
						...voucher,
						expirationDate: formatDate(
							convertTimestampToDate(voucher.expirationDate)
						),
					}))
					.slice(0, 3);

				setUserVoucherItemList(formattedVoucherList);
			} catch (error) {
				console.error(error);
			}
		};

		fetchUserVoucherData();
		fetchVoucherData();
		fetchUserData();
	}, [userData.credit]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Text style={styles.headerTitle}>Ưu đãi của bạn</Text>
						<View style={styles.beanContainer}>
							<Text style={styles.beanText}>{userData.credit}</Text>
							<Image
								source={COFFEE_BEAN_ICONS}
								style={{
									width: 24,
									height: 24,
									marginLeft: "10%",
								}}
							/>
						</View>
						{/* <Pressable
							style={styles.voucherButton}
							onPress={() => navigation.navigate("UserVoucherScreen")}
						>
							<Image
								style={{
									height: 24,
									width: 24,
									marginRight: "10%",
								}}
								source={coupon}
								resizeMode="contain"
							/>
							<Text style={styles.voucherText}>Voucher của tôi</Text>
						</Pressable> */}
					</View>

					<View style={styles.rankContainer}>
						<Text style={styles.rankLabel}>Hạng thành viên{"\n"}</Text>
						<Text style={[styles.rankText, { color: changeColorByRank() }]}>
							{userRank}
						</Text>
					</View>

					<Text style={styles.headerText}>
						Còn {beansToNextRank} BEAN nữa bạn sẽ thăng hạng.{"\n"}
						Đổi quà không ảnh hưởng tới việc thăng hạng của bạn
					</Text>
				</View>

				<View style={styles.main}>
					<View style={styles.row}>
						<Pressable
							style={styles.component}
							onPress={() => navigation.navigate("Rank")}
						>
							<Image
								style={{ height: 24, width: 24 }}
								source={crown}
								resizeMode="contain"
							/>
							<Text style={styles.componentText}>Hạng thành viên</Text>
						</Pressable>
						<Pressable
							style={styles.component}
							onPress={() => navigation.navigate("History")}
						>
							<Image
								style={{ height: 24, width: 24 }}
								source={bean}
								resizeMode="contain"
							/>
							<Text style={styles.componentText}>Lịch sử đổi voucher</Text>
						</Pressable>
					</View>
				</View>

				<View style={{ padding: "4%" }}>
					<Section
						title={"Voucher của bạn"}
						showSubtitle={true}
						subtitle={"Xem tất cả"}
						onPressSubtitle={goToUserVoucherScreen}
					>
						<View style={{ marginTop: "4%" }}>
							{renderYourVoucherItemList()}
						</View>
					</Section>

					<Section
						title={"Đổi voucher"}
						showSubtitle={true}
						subtitle={"Xem tất cả"}
						onPressSubtitle={goToExchangeVoucherScreen}
					>
						<View style={{ marginTop: "4%" }}>{renderVoucherItem()}</View>
					</Section>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserCouponScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#006C5E",
		paddingHorizontal: "4%",
		paddingTop: "10%",
		paddingBottom: "4%",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 20,
	},
	column: {
		flexDirection: "column",
	},
	beanContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: colors.green_10,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: colors.grey_50,
		paddingVertical: "2%",
		paddingHorizontal: "4%",
	},
	beanText: {
		fontSize: 16,
		fontFamily: "lato-regular",
		color: colors.white_100,
	},
	headerTitle: {
		fontSize: 24,
		fontFamily: "lato-bold",
		color: "#fff",
		textAlign: "left",
		marginVertical: "4%",
	},
	voucherButton: {
		flexDirection: "row",
		backgroundColor: colors.white_100,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		padding: "4%",
		borderWidth: 2,
		borderColor: colors.grey_50,
		elevation: 4,
	},
	voucherText: {
		fontSize: 14,
		fontFamily: "lato-bold",
		color: "#006C5E",
		textTransform: "capitalize",
		textAlign: "center",
	},
	rankContainer: {
		flex: 1,
		borderRadius: 10,
		backgroundColor: colors.white_100,
		marginTop: "6%",
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 2,
		borderColor: colors.grey_50,
		paddingVertical: "2%",
	},
	rankLabel: {
		fontFamily: "lato-bold",
		color: colors.black_100,
		fontSize: 16,
		textAlign: "center",
		textAlignVertical: "center",
	},
	rankText: {
		fontFamily: "lato-bold",
		fontSize: 30,
		textAlign: "center",
	},
	headerText: {
		fontFamily: "lato-regular",
		color: "#FFFFFF",
		fontSize: 14,
		lineHeight: 24,
		marginTop: "4%",
	},
	main: {
		padding: "4%",
	},
	component: {
		flex: 1,
		flexDirection: "column",
		alignItems: "flex-start",
		backgroundColor: "#FFFFFF",
		paddingVertical: 15,
		paddingHorizontal: 20,
		gap: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: colors.grey_50,
		elevation: 2,
	},
	componentText: {
		fontFamily: "lato-regular",
		textAlign: "center",
		lineHeight: 20,
		fontSize: 14,
		fontFamily: "lato-bold",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	emptyText: {
		color: colors.black_100,
		fontSize: 16,
		fontFamily: "lato-bold",
		marginTop: "4%",
	},
});
