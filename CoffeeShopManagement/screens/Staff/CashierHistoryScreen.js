import { View, StyleSheet } from "react-native";
import React from "react";

import HistoryTabs from "../../components/Staff/HistoryTabs";

export default function CashierHistoryScreen() {
	return (
		<View style={styles.container}>
			<HistoryTabs />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
