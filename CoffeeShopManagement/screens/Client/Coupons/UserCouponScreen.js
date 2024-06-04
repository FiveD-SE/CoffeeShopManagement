import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
	SafeAreaView,
	Image,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import VoucherCard from "../../../components/Client/Card/VoucherCard";
import UserVoucherCard from "../../../components/Client/Card/UserVoucherCard";

export default function Promotions() {
	const navigation = useNavigation();

	const coupon = require("../../../assets/coupon.png");
	const crown = require("../../../assets/crown.png");
	const bean = require("../../../assets/bean.png");
	const gift = require("../../../assets/gift.png");
	const rights = require("../../../assets/rights.png");

	const [beanTotal, setbeanTotal] = useState("0");

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

	const renderYourVoucherItemList = () => {
		return yourVoucherItemList.map((item, index) => (
			<UserVoucherCard
				key={index}
				title={item.title}
				expiryDate={item.expiryDate}
				option={item.option}
				imageSource={item.imageSource}
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
			/>
		));
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.heading}>
					<View style={styles.row}>
						<View style={styles.column}>
							<Text
								style={[styles.textColumn, { fontSize: 20, fontWeight: "600" }]}
							>
								Ưu đãi
							</Text>
							<Text
								style={[styles.textColumn, { fontSize: 30, fontWeight: "700" }]}
							>
								Mới
							</Text>
							<Text
								style={[styles.textColumn, { fontSize: 15, fontWeight: "600" }]}
							>
								{beanTotal} bean
							</Text>
						</View>
						<Pressable
							style={styles.voucher}
							onPress={() => navigation.navigate("YourVoucher")}
						>
							<Image
								style={{ height: 25, width: 25, marginRight: 6 }}
								source={coupon}
								resizeMode="contain"
							/>
							<Text
								style={{
									fontFamily: "lato-regular",
									color: "#006C5E",
									fontStyle: "normal",
									fontSize: 16,
									lineHeight: 20,
									textAlign: "center",
								}}
							>
								Voucher của tôi
							</Text>
						</Pressable>
					</View>

					<Image style={styles.barcode} />

					<Text style={styles.headingText}>
						Còn 100 BEAN nữa bạn sẻ thăng hạng.{"\n"}Đổi quà không ảnh hưởng tới
						việc thăng hạng của bạn{"\n"}Chưa tích điểm
					</Text>
				</View>

				<View style={styles.body}>
					<View style={styles.row}>
						<Pressable
							style={styles.component}
							onPress={() => navigation.navigate("Rank")}
						>
							<Image
								style={{ height: 20, width: 20 }}
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
								style={{ height: 20, width: 20 }}
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
								style={{ height: 20, width: 20 }}
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
								style={{ height: 20, width: 20 }}
								source={rights}
								resizeMode="contain"
							/>
							<Text style={styles.componentText}>Quyền lợi của bạn</Text>
						</Pressable>
					</View>
				</View>

				<View style={styles.section}>
					<View style={styles.rowLabel}>
						<Text style={styles.rowLabelText}>Voucher của bạn</Text>
						<Pressable
							style={styles.viewMore}
							onPress={() => navigation.navigate("YourVoucher")}
						>
							<Text style={styles.viewMoreText}>Xem tất cả</Text>
						</Pressable>
					</View>

					{renderYourVoucherItemList()}
				</View>

				<View style={styles.section}>
					<View style={styles.rowLabel}>
						<Text style={styles.rowLabelText}>Đổi voucher</Text>
						<Pressable
							style={styles.viewMore}
							onPress={() => navigation.navigate("Exchange")}
						>
							<Text style={styles.viewMoreText}>Xem tất cả</Text>
						</Pressable>
					</View>

					{renderVoucherItem()}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	heading: {
		width: "100%",
		height: 330,
		backgroundColor: "#006C5E",
		paddingTop: 40,
		paddingHorizontal: 15,
		gap: 10,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 20,
	},
	column: {
		flexDirection: "column",
		justifyContent: "space-between",
	},
	textColumn: {
		fontFamily: "lato-regular",
		color: "#fff",
		textAlign: "center",
		paddingVertical: 5,
		paddingHorizontal: 15,
	},
	voucher: {
		flexDirection: "row",
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 160,
		height: 45,
		backgroundColor: "#FFFFFF",
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
	},
	barcode: {
		height: 80,
		width: "100%",
		borderRadius: 10,
		backgroundColor: "#FFFFFF",
		marginTop: 20,
	},
	headingText: {
		fontFamily: "lato-regular",
		color: "#FFFFFF",
		fontSize: 10,
		fontWeight: "500",
		marginLeft: 10,
	},
	body: {
		paddingHorizontal: 20,
		paddingVertical: 20,
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
	},
	componentIcon: {
		height: 20,
		width: 20,
	},
	componentText: {
		fontFamily: "lato-regular",
		textAlign: "center",
		lineHeight: 20,
		fontSize: 15,
		fontWeight: "600",
	},
	section: {
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
	rowLabel: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 10,
		marginBottom: 15,
	},
	rowLabelText: {
		fontFamily: "lato-regular",
		textAlign: "center",
		fontSize: 18,
		fontStyle: "normal",
		fontWeight: "600",
		color: "#000000",
	},
	viewMore: {
		width: 90,
		height: 25,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 5,
		paddingHorizontal: 20,
		backgroundColor: "#FAEBDE",
		borderRadius: 10,
		marginTop: 20,
	},
	viewMoreText: {
		fontFamily: "lato-regular",
		textAlign: "center",
		fontSize: 10,
		fontStyle: "normal",
		fontWeight: "700",
		color: "#FFA730",
	},
});
