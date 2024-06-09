import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../../assets/colors/colors";
import UserVoucherCard from "../../../../components/Client/Card/UserVoucherCard";
import { useNavigation } from "@react-navigation/native";

const DiscountCouponTab = ({ productVoucherList }) => {
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
			<FlatList data={productVoucherList} renderItem={renderVoucherItem} />
		</View>
	);
};

export default DiscountCouponTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.grey_10,
		padding: "4%",
	},
});
