import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import UserVoucherCard from "../../../../components/Client/Card/UserVoucherCard";
import { colors } from "../../../../assets/colors/colors";

const DeliveryCouponTab = ({ shipVoucherList }) => {
	const navigation = useNavigation();

	const goToVoucherDetails = (item, type) => {
		navigation.navigate("VoucherDetails", { voucherDetails: item, type });
	};

	const renderVoucherItem = ({ item }) => {
		return (
			<UserVoucherCard
				title={item.voucherName}
				quantity={item.quantity}
				expiryDate={item.expirationDate}
				imageSource={item.voucherImage}
				onPress={() => goToVoucherDetails(item, "")}
			/>
		);
	};
	return (
		<View style={styles.container}>
			<FlatList data={shipVoucherList} renderItem={renderVoucherItem} />
		</View>
	);
};

export default DeliveryCouponTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey_10,
		padding: "4%",
	},
});
