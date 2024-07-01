import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Pressable,
	Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	collection,
	getDocs,
	query,
	where,
	doc,
	getDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import { connect } from "react-redux";
import { colors } from "../../../assets/colors/colors";

const UserExchangeHistoryScreen = ({ userData }) => {
	const [voucherList, setVoucherList] = useState([]);

	console.log("voucherList", voucherList);

	const formatDate = (date) => {
		const newDate = new Date(date);
		return `${newDate.getDate()} tháng ${
			newDate.getMonth() + 1
		}, ${newDate.getFullYear()}`;
	};

	useEffect(() => {
		const fetchUserVouchers = async () => {
			const q = query(
				collection(db, "userHistoryVouchers"),
				where("userId", "==", userData.id)
			);
			const querySnapshot = await getDocs(q);
			let voucherIds = [];

			querySnapshot.forEach((doc) => {
				const voucherData = doc.data();
				voucherIds = [...voucherIds, ...voucherData.voucherId];
			});

			voucherIds.sort(
				(a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
			);

			const voucherDetailsPromises = voucherIds.map(async (voucher) => {
				const voucherDoc = await getDoc(doc(db, "vouchers", voucher.id));
				return {
					...voucherDoc.data(),
					...voucher,
					dateCreated: formatDate(voucher.dateCreated),
				};
			});

			const voucherDetails = await Promise.all(voucherDetailsPromises);
			setVoucherList(voucherDetails);
		};

		fetchUserVouchers();
	}, [userData.id]);

	const renderExchangedItemList = () => {
		return voucherList.map((item, index) => (
			<Pressable key={index} style={styles.item}>
				<Image source={{ uri: item.voucherImage }} style={styles.image} />
				<View style={styles.contentContainer}>
					<Text style={styles.name}>{item.voucherName}</Text>
					<Text style={styles.description}>Đã đổi vào: {item.dateCreated}</Text>
				</View>
				<View style={styles.priceContainer}>
					<View style={styles.itemPointContainer}>
						<Text style={styles.itemPoint}>{item.voucherExchangePrice}</Text>
					</View>
					<Text
						style={{
							color: colors.black_100,
							fontSize: 12,
							fontFamily: "lato-regular",
						}}
					>
						ĐIỂM
					</Text>
				</View>
			</Pressable>
		));
	};

	return (
		<SafeAreaView style={styles.container}>
			{renderExchangedItemList()}
		</SafeAreaView>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserExchangeHistoryScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
		backgroundColor: "#F9F9F9",
	},
	text: {
		fontFamily: "lato-regular",
		fontSize: 20,
		marginBottom: 20,
		color: "#333",
		lineHeight: 30,
	},
	item: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		backgroundColor: colors.white_100,
		borderRadius: 8,
		padding: "4%",
		elevation: 2,
		borderColor: colors.grey_20,
		borderWidth: 1,
		opacity: 1,
	},
	image: {
		width: 80,
		height: 80,
	},
	contentContainer: {
		flex: 1,
		marginLeft: "4%",
	},
	name: {
		flex: 1,
		fontFamily: "lato-bold",
		fontSize: 16,
		lineHeight: 24,
		color: colors.black_100,
	},
	description: {
		fontFamily: "lato-regular",
		fontSize: 14,
		lineHeight: 20,
		color: colors.grey_100,
	},
	itemPointContainer: {
		backgroundColor: "#EDF9F0",
		borderRadius: 100,
		paddingHorizontal: "20%",
		paddingVertical: "6%",
		borderWidth: 1,
		borderColor: colors.green_20,
		marginBottom: "20%",
		elevation: 2,
	},
	itemPoint: {
		fontFamily: "lato-bold",
		fontSize: 16,
		color: "#4ECB71",
	},
	priceContainer: {
		flex: 0.3,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
