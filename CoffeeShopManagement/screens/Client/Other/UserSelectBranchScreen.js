import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	Pressable,
	Image,
	Dimensions,
	TouchableOpacity,
} from "react-native";
import { colors } from "../../../assets/colors/colors";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import Section from "../../../components/Client/Section";
import { useNavigation } from "@react-navigation/native";

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
		});
	};

	const renderBranchItem = (item) => (
		<TouchableOpacity
			style={styles.addressItem}
			key={item.id}
			activeOpacity={0.8}
			onPress={() => handleSelectBranch(item)}
		>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: item.imageDownloadUrl }}
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
			const q = query(
				collection(db, "branches"),
				where("provinceId", "==", addresses.provinceId)
			);

			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				const branchData = doc.data();
				const branch = { id: doc.id, ...branchData };
				if (
					branch.districtId === addresses.districtId &&
					branch.wardId === addresses.wardId
				) {
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
					{nearbyBranch.map(renderBranchItem)}
				</Section>

				<Section title={"Các chi nhánh khác"}>
					{otherBranch.map(renderBranchItem)}
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
	vertical: {
		flex: 1,
		flexDirection: "column",
		marginLeft: "4%",
	},
});
