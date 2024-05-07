import React, { useState } from "react";
import {
	View,
	Text,
	Pressable,
	StyleSheet,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Section from "../../../components/Client/Section";

const UserChooseAddressScreen = () => {
	const navigation = useNavigation();

	const [recentAddresses, setRecentAddresses] = useState([
		{
			id: "1",
			address:
				"FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
		},
		{
			id: "2",
			address:
				"FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
		},
		{
			id: "3",
			address:
				"FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
		},
		{
			id: "4",
			address:
				"FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
		},
	]);
	const [savedAddresses, setSavedAddresses] = useState([
		{
			id: "1",
			address:
				"FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
		},
		{
			id: "2",
			address:
				"FEEL Coffee & Tee Express, 82 Đ. Vành Đai, Đông Hoà, Dĩ An, Bình Dương, Việt Nam",
		},
	]);

	const renderRecentAddressItem = (item) => (
		<Pressable
			style={styles.addressItem}
			onPress={() => {
				navigation.goBack();
			}}
		>
			<FontAwesome6 name="clock-rotate-left" size={16} style={styles.icon} />
			<Text style={styles.addressText}>{item.address}</Text>
		</Pressable>
	);

	const renderSavedAddressItem = (item) => (
		<Pressable
			style={styles.addressItem}
			onPress={() => navigation.navigate("EditAddress")}
		>
			<FontAwesome5 name="map-marker-alt" size={16} style={styles.icon} />
			<Text style={styles.addressText}>{item.address}</Text>
			<FontAwesome5 name="edit" size={16} style={styles.editIcon} />
		</Pressable>
	);

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Section title="Đã đặt gần đây">
					<View style={{ marginTop: "2%" }}>
						{recentAddresses.map((item) => renderRecentAddressItem(item))}
					</View>
				</Section>

				<View style={{ marginTop: "5%" }}>
					<Section title="Địa chỉ đã lưu">
						<View style={{ marginTop: "2%" }}>
							{savedAddresses.map((item) => renderSavedAddressItem(item))}
						</View>
					</Section>
				</View>
				<Pressable
					style={styles.addButton}
					onPress={() => navigation.navigate("AddNewAddress")}
				>
					<FontAwesome5 name="plus" size={16} style={styles.icon} />
					<Text style={styles.addText}>Thêm địa chỉ mới</Text>
				</Pressable>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: "5%",
	},
	addressItem: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: "1%",
		paddingVertical: "2%",
		paddingHorizontal: "5%",
		backgroundColor: "#fff",
		borderRadius: 10,
	},
	icon: {
		marginRight: "5%",
	},
	editIcon: {
		color: "#FFA730",
	},
	addressText: {
		flex: 1,
		fontSize: 16,
		marginHorizontal: "2%",
		fontWeight: "500",
		color: "#9C9C9C",
	},
	addButton: {
		backgroundColor: "#fff",
		marginTop: "2%",
		flexDirection: "row",
		alignItems: "center",
		marginVertical: "1%",
		paddingVertical: "4%",
		paddingHorizontal: "5%",
		borderRadius: 10,
	},
	addText: {
		color: "#3a3a3a",
		fontWeight: "500",
		fontSize: 16,
	},
});

export default UserChooseAddressScreen;
