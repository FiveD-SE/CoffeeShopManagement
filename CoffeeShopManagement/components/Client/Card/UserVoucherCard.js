import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const UserVoucherCard = ({ title, expiryDate, option, imageSource }) => {
  const navigation = useNavigation();

  const goToVoucherDetails = () => {
    navigation.navigate("VoucherDetails");
  };

  return (
    <Pressable style={styles.item} onPress={goToVoucherDetails}>
        <Image source={imageSource} style={styles.itemImage} />
        <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemExpiry}>Hết hạn: {expiryDate}</Text>
        </View>
    </Pressable>
  );
};

export default UserVoucherCard;

const styles = StyleSheet.create({
    item: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
		backgroundColor: "#FFFFFF",
		padding: 10,
		borderRadius: 10,
	},
	itemImage: {
		width: 70,
		height: 70,
		marginRight: 20,
	},
	itemDetails: {
		flexDirection: "column",
	},
	itemTitle: {
		fontFamily: "Lato-Regular",
		fontSize: 16,
		fontWeight: "bold",
		marginBottom: 25,
	},
	itemExpiry: {
		fontFamily: "Lato-Regular",
		fontSize: 14,
	},
});
