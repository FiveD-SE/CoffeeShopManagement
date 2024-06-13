import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../assets/colors/colors";

const BronzeTab = () => {
	const data = [
		{
			icon: "sale",
			content: "1 voucher giảm giá 15% cho mọi loại nước",
		},
		{
			icon: "coffee",
			content: "Mở khóa tính năng đổi thưởng bằng xu",
		},
	];

	const renderSection = ({ item }) => {
		return (
			<View style={styles.section}>
				<MaterialCommunityIcons
					name={item.icon}
					size={28}
					color={"#006C5E"}
					style={styles.icon}
				/>
				<Text style={styles.text}>{item.content}</Text>
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				renderItem={renderSection}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

export default BronzeTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white_100,
	},
	section: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: "6%",
	},
	text: {
		flex: 1,
		fontFamily: "lato-regular",
		fontSize: 16,
		color: "#000",
		lineHeight: 24,
		marginLeft: "4%",
		textAlign: "justify",
	},
	icon: {},
});
