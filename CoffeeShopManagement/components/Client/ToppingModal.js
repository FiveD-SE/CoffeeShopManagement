import React from "react";
import { Modal, View, StyleSheet, ScrollView } from "react-native";
import Section from "./Section";
import ToppingItem1 from "./ToppingItem1";
import ModalHeader from "./Header/ModalHeader";

const ToppingModal = ({ visible, onClose }) => {
	const bubbleToppingList = [
		{ title: "Trân châu trắng", price: 5000 },
		{ title: "Trân châu đen", price: 5000 },
		{ title: "Trân châu hoàng kim", price: 5000 },
	];
	const puddingToppingList = [
		{ title: "Pudding xoài", price: 10000 },
		{ title: "Pudding trà xanh", price: 10000 },
	];

	const renderBubbleToppingItem = () => {
		return bubbleToppingList.map((item, index) => (
			<ToppingItem1
				key={index}
				title={item.title}
				price={item.price.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
			/>
		));
	};
	const renderPuddingToppingItem = () => {
		return puddingToppingList.map((item, index) => (
			<ToppingItem1
				key={index}
				title={item.title}
				price={item.price.toLocaleString("vi-VN", {
					style: "currency",
					currency: "VND",
				})}
			/>
		));
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ModalHeader title="Chọn topping" onClose={onClose} />
					<ScrollView style={styles.main}>
						<Section title="Trân châu">
							<View style={styles.itemListContainer}>
								{renderBubbleToppingItem()}
							</View>
						</Section>
						<Section title="Pudding">
							<View style={styles.itemListContainer}>
								{renderPuddingToppingItem()}
							</View>
						</Section>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
};

export default ToppingModal;

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "white",
		borderRadius: 20,
		width: "90%",
		height: "70%",
	},
	header: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		padding: "5%",
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		borderBottomWidth: 1,
		borderColor: "#CBCBD4",
	},
	headerTitle: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
	},
	main: {
		paddingHorizontal: "5%",
		marginBottom: "10%",
	},
	itemListContainer: {
		marginTop: "5%",
		borderColor: "rgba(58, 58, 58, 0.10)",
		borderRadius: 10,
		paddingHorizontal: "5%",
		borderWidth: 1,
	},
});
