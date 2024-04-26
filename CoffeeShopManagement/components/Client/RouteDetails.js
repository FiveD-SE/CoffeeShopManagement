import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const RouteDetails = ({ from, to }) => {
	return (
		<View style={styles.sectionContainer}>
			<View style={styles.addressRow}>
				<Icon name="circle-dot" size={16} color="#49A2CB" />
				<Text style={styles.addressText}>{from}</Text>
			</View>
			<View style={styles.addressRow}>
				<Icon
					name="ellipsis-vertical"
					size={16}
					color="#7B7B7B"
					style={{ paddingHorizontal: "1.5%" }}
				/>
			</View>
			<View style={styles.addressRow}>
				<Icon
					name="location-dot"
					size={16}
					color="#ED6C66"
					style={{ padding: "0.5%" }}
				/>
				<Text style={styles.addressText} numberOfLines={1} ellipsizeMode="tail">
					{to}
				</Text>
			</View>
		</View>
	);
};

export default RouteDetails;

const styles = StyleSheet.create({
	sectionContainer: {
		backgroundColor: "#FFFFFF",
		padding: "5%",
		borderRadius: 20,
		marginTop: "5%",
	},
	addressRow: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: "2%",
	},
	addressText: {
		color: "#3a3a3a",
		fontSize: 14,
		fontWeight: "500",
		marginLeft: "5%",
		marginRight: "10%",
	},
});
