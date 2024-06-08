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
import { doc, getDoc } from "firebase/firestore";
import { colors } from "../../../assets/colors/colors";
import Section from "../../../components/Client/Section";

const COFFEE_BEAN_ICONS = require("../../../assets/coffee-bean.png");
const coupon = require("../../../assets/coupon.png");
const crown = require("../../../assets/crown.png");
const bean = require("../../../assets/bean.png");
const gift = require("../../../assets/gift.png");
const rights = require("../../../assets/rights.png");

const yourVoucherItemList = [
	{
		title: "Combo Cơm Nhà 89K + Freeship",
		expiryDate: "2024-05-01",
		option: "Giao hàng",
		imageSource: require("../../../assets/voucher.jpeg"),
	},
	{
		title: "Combo Cơm Nhà 89K + Freeship",
		expiryDate: "2024-04-25",
		option: "Tại chỗ",
		imageSource: require("../../../assets/voucher.jpeg"),
	},
	{
		title: "Combo Cơm Nhà 89K + Freeship",
		expiryDate: "2024-05-04",
		option: "Mang đi",
		imageSource: require("../../../assets/voucher.jpeg"),
	},
];

const voucherItemList = [
	{
		title: "Mua 1 tặng 1 + Freeship",
		point: 300,
		imageSource: require("../../../assets/voucher.jpeg"),
	},
	{
		title: "Mua 1 tặng 1 + Freeship",
		point: 300,
		imageSource: require("../../../assets/voucher.jpeg"),
	},
	{
		title: "Mua 1 tặng 1 + Freeship",
		point: 300,
		imageSource: require("../../../assets/voucher.jpeg"),
	},
];

export default function Promotions() {
	const navigation = useNavigation();

	const [beanTotal, setbeanTotal] = useState(0);
	const [userRank, setUserRank] = useState("Chưa tích điểm");
	const [beansToNextRank, setBeansToNextRank] = useState(0);

	const goToVoucherDetails = () => {
		navigation.navigate("VoucherDetails");
	};

	const renderYourVoucherItemList = () => {
		return yourVoucherItemList.map((item, index) => (
			<UserVoucherCard
				key={index}
				title={item.title}
				expiryDate={item.expiryDate}
				option={item.option}
				imageSource={item.imageSource}
				onPress={goToVoucherDetails}
			/>
		));
	};

	const renderVoucherItem = () => {
		return voucherItemList.map((item, index) => (
			<VoucherCard
				key={index}
				title={item.title}
				point={item.point}
				imageSource={item.imageSource}
				onPress={goToVoucherDetails}
			/>
		));
	};

	useEffect(() => {
		const fetchUserData = async () => {
			const userDocRef = doc(db, "users", auth.currentUser.uid);
			const userDoc = await getDoc(userDocRef);

			if (userDoc.exists()) {
				setbeanTotal(userDoc.data().credit);
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

		fetchUserData();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Ưu đãi của bạn</Text>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<View style={styles.beanContainer}>
							<Text style={styles.beanText}>{beanTotal}</Text>
							<Image
								source={COFFEE_BEAN_ICONS}
								style={{
									width: 24,
									height: 24,
									marginLeft: "10%",
								}}
							/>
						</View>
						<Pressable
							style={styles.voucherButton}
							onPress={() => navigation.navigate("YourVoucher")}
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
						</Pressable>
					</View>

					<View style={styles.rankContainer}>
						<Text style={styles.rankLabel}>Hạng thành viên{"\n"}</Text>
						<Text style={styles.rankText}>{userRank}</Text>
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
							onPress={() => navigation.navigate("Exchange")}
						>
							<Image
								style={{ height: 24, width: 24 }}
								source={gift}
								resizeMode="contain"
							/>
							<Text style={styles.componentText}>Đổi Bean</Text>
						</Pressable>
					</View>
					<View style={[styles.row, { marginTop: 20 }]}>
						<Pressable
							style={styles.component}
							onPress={() => navigation.navigate("History")}
						>
							<Image
								style={{ height: 24, width: 24 }}
								source={bean}
								resizeMode="contain"
							/>
							<Text style={styles.componentText}>Lịch sử BEAN</Text>
						</Pressable>
						<Pressable
							style={styles.component}
							onPress={() => navigation.navigate("Benefit")}
						>
							<Image
								style={{ height: 24, width: 24 }}
								source={rights}
								resizeMode="contain"
							/>
							<Text style={styles.componentText}>Quyền lợi của bạn</Text>
						</Pressable>
					</View>
				</View>

				<View style={{ padding: "4%" }}>
					<Section
						title={"Voucher của bạn"}
						showSubtitle={true}
						subtitle={"Xem tất cả"}
					>
						<View style={{ marginTop: "4%" }}>
							{renderYourVoucherItemList()}
						</View>
					</Section>

					<Section
						title={"Đổi voucher"}
						showSubtitle={true}
						subtitle={"Xem tất cả"}
					>
						<View style={{ marginTop: "4%" }}>{renderVoucherItem()}</View>
					</Section>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

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
		color: colors.green_100,
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
		fontSize: 15,
		fontWeight: "600",
	},
});
