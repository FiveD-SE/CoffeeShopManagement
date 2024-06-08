import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const VoucherCard = ({ title, point, imageSource, onPress }) => {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image
					style={styles.image}
					source={{ uri: imageSource }}
					resizeMode="contain"
				/>
			</View>
			<View style={styles.main}>
				<Text style={styles.title}>{title}</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={styles.label}>Số xu: </Text>
					<View style={styles.pointContainer}>
						<Text style={styles.point}>{point}</Text>
					</View>
				</View>
			</View>
			<Pressable style={styles.exchangeButton} onPress={onPress}>
				<Text style={styles.exchangeButtonText}>Đổi</Text>
			</Pressable>
		</View>
	);
};

export default VoucherCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		marginVertical: "2%",
		padding: "4%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "rgba(58,58,58,0.05)",
	},
	imageContainer: {
		borderWidth: 1,
		borderColor: "rgba(58,58,58,0.05)",
		borderRadius: 10,
	},
	image: {
		width: 80,
		height: 80,
	},
	main: {
		flex: 1,
		paddingHorizontal: "5%",
	},
	title: {
		width: "100%",
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
		lineHeight: 20,
		marginBottom: "10%",
	},
	label: {
		color: "rgba(58,58,58,0.5)",
		fontSize: 14,
		fontWeight: "500",
	},
	pointContainer: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		marginLeft: "5%",
		paddingVertical: "2%",
		paddingHorizontal: "16%",
		backgroundColor: "rgba(78, 203, 113, 0.10)",
	},
	point: {
		color: "#4ECB71",
		fontSize: 14,
		fontWeight: "500",
	},
	exchangeButton: {
		minHeight: 36,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: "8%",
		borderWidth: 1,
		borderColor: colors.grey_50,
		backgroundColor: colors.green_100,
		borderRadius: 30,
	},
	exchangeButtonText: {
		color: colors.white_100,
		fontSize: 14,
		fontFamily: "lato-bold",
	},
});
