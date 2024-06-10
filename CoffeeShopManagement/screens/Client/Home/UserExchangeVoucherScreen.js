import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import Section from "../../../components/Client/Section";
import VoucherCard from "../../../components/Client/Card/VoucherCard";
import { db } from "../../../services/firebaseService";
import { query, collection, where, getDocs } from "firebase/firestore";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const UserExchangeVoucherScreen = ({ userData }) => {
	const navigation = useNavigation();
	const [voucherItemList, setVoucherItemList] = useState([]);
	const [currentCredit, setCurrentCredit] = useState(userData.credit);

	const goToVoucherDetails = (item, type) => {
		navigation.navigate("VoucherDetails", { voucherDetails: item, type });
	};

	const renderVoucherItem = ({ item }) => {
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

		return (
			<VoucherCard
				title={item.voucherName}
				point={item.voucherExchangePrice}
				imageSource={item.voucherImage}
				onPress={() => goToVoucherDetails(item, "isExchange")}
			/>
		);
	};

	useEffect(() => {
		const fetchVoucherData = async () => {
			const voucherList = [];

			try {
				const voucherQuery = query(
					collection(db, "vouchers"),
					where("voucherExchangePrice", "<=", userData.credit)
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

		fetchVoucherData();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<View style={styles.currentPointContainer}>
					<View>
						<Image
							source={require("../../../assets/coffee-beans-coin.png")}
							style={styles.image}
						/>
					</View>
					<View style={styles.currentPointContent}>
						<Text style={styles.labelText}>Số điểm hiện tại của bạn</Text>
						<View style={{ flexDirection: "row" }}>
							<Text style={styles.currentPointText}>{currentCredit}</Text>
							<Text style={styles.currentPointLabel}>điểm</Text>
						</View>
					</View>
				</View>
				<View style={{ marginTop: "5%" }}>
					<Section title="Chọn voucher bạn muốn đổi">
						<FlatList
							data={voucherItemList}
							renderItem={renderVoucherItem}
							keyExtractor={(item) => item.voucherId}
							contentContainerStyle={{ marginTop: "2%" }}
						/>
					</Section>
				</View>
			</View>
		</View>
	);
};

const mapStateToProps = (state) => ({
	userData: state.auth.userData,
});

export default connect(mapStateToProps)(UserExchangeVoucherScreen);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	main: {
		padding: "5%",
	},
	image: {
		width: 48,
		height: 48,
	},
	currentPointContainer: {
		flexDirection: "row",
		borderRadius: 20,
		alignItems: "center",
		backgroundColor: "#ffffff",
		padding: "5%",
		borderColor: "rgba(203, 203, 212, 0.30)",
		borderWidth: 1,
	},
	currentPointContent: {
		marginLeft: "10%",
	},
	labelText: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
		marginBottom: "10%",
	},
	currentPointText: {
		color: "#4ECB71",
		fontSize: 16,
		fontWeight: "600",
		marginRight: "5%",
	},
	currentPointLabel: {
		color: "#A6A6AA",
		fontSize: 16,
		fontWeight: "500",
	},
	selectVoucherContainer: {
		marginTop: "10%",
	},
});
