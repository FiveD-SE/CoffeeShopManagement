import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";

import { colors } from "../../../assets/colors/colors";
import { db } from "../../../services/firebaseService";

import Section from "../../../components/Client/Section";

export default function UserSelectBranchScreen({ route }) {
	const { productOrders, addresses } = route.params;

	const navigation = useNavigation();
	const [nearbyBranch, setNearbyBranch] = useState([]);
	const [otherBranch, setOtherBranch] = useState([]);

	const formatHour = (timestamp) => {
		if (!timestamp || !timestamp.seconds) return null;
		const date = new Date(timestamp.seconds * 1000);
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const strMinutes = minutes < 10 ? "0" + minutes : minutes;
		return hours + ":" + strMinutes;
	};

	const handleSelectBranch = (item) => {
		navigation.navigate("UserOrderConfirmationScreen", {
			productOrders,
			selectedBranch: item,
			selectedAddress: addresses,
		});
	};

	const renderBranchItem = (item, available) => (
		<TouchableOpacity
			style={[styles.addressItem, !available && { opacity: 0.5 }]}
			key={item.id}
			activeOpacity={0.8}
			onPress={() => handleSelectBranch(item)}
			disabled={!available}
		>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: item.branchImage }}
					resizeMode="stretch"
				/>
			</View>
			<View style={styles.vertical}>
				<Text style={styles.nameBranchText}>{item.branchName}</Text>
				<Text style={styles.addressBranchText}>
					{item.street}, {item.wardName}, {item.districtName},{" "}
					{item.provinceName}
				</Text>
				<Text style={styles.operationTime}>
					Giờ hoạt động: {formatHour(item.openingHour)} -{" "}
					{formatHour(item.closingHour)}
				</Text>
			</View>
		</TouchableOpacity>
	);

	useEffect(() => {
		const fetchBranches = async () => {
			let nearbyBranch = [];
			let otherBranch = [];
			const q = query(collection(db, "branches"));

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				const branchData = doc.data();
				const branch = { id: doc.id, ...branchData };
				if (branch.provinceId === addresses.provinceId) {
					nearbyBranch.push(branch);
				} else {
					otherBranch.push(branch);
				}
			});
			setNearbyBranch(nearbyBranch);
			setOtherBranch(otherBranch);
		};
		fetchBranches();
	}, [addresses]);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollViewContent}>
				<Section title={"Chi nhánh gần đây"}>
					{nearbyBranch.length === 0 ? (
						<View style={styles.emptyContainer}>
							<Image
								source={require("../../../assets/empty.png")}
								style={styles.emptyImage}
							/>
							<Text style={styles.emptyText}>
								Không tìm thấy chi nhánh phù hợp
							</Text>
						</View>
					) : (
						nearbyBranch.map((item) => renderBranchItem(item, true))
					)}
				</Section>
				<Section title={"Chi nhánh khác"}>
					{otherBranch.length === 0 ? (
						<View style={styles.emptyContainer}>
							<Image
								source={require("../../../assets/empty.png")}
								style={styles.emptyImage}
							/>
							<Text style={styles.emptyText}>
								Không tìm thấy chi nhánh khác
							</Text>
						</View>
					) : (
						otherBranch.map((item) => renderBranchItem(item, false))
					)}
				</Section>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollViewContent: {
		padding: "4%",
	},
	addressItem: {
		backgroundColor: colors.white_100,
		flexDirection: "row",
		marginVertical: "4%",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: colors.grey_50,
		padding: "2%",
		elevation: 2,
	},
	nameBranchText: {
		flex: 1,
		fontFamily: "lato-regular",
		fontSize: 16,
		color: colors.black_100,
	},
	addressBranchText: {
		flex: 1,
		fontFamily: "lato-regular",
		fontSize: 14,
		lineHeight: 20,
		color: colors.grey_100,
	},
	operationTime: {
		flex: 1,
		color: colors.black_100,
		fontSize: 14,
		fontFamily: "lato-regular",
		lineHeight: 30,
	},
	imageContainer: {
		flex: 0.4,
	},
	image: {
		width: "100%",
		height: 100,
		borderRadius: 5,
		backgroundColor: "#CBCBD4",
		marginRight: "4%",
	},
	emptyContainer: {
		justifyContent: "center",
		alignItems: "center",
		padding: "4%",
	},
	emptyImage: {
		width: 100,
		height: 100,
	},
	emptyText: {
		color: colors.grey_100,
		fontSize: 14,
		fontFamily: "lato-bold",
		marginTop: "4%",
	},
	vertical: {
		flex: 1,
		flexDirection: "column",
		marginLeft: "4%",
	},
});
