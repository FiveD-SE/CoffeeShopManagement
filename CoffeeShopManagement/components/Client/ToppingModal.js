import React, { useState } from "react";
import {
	Modal,
	View,
	StyleSheet,
	ScrollView,
	Platform,
	Dimensions,
	Pressable,
} from "react-native";
import Section from "./Section";
import ToppingItem1 from "./ToppingItem1";
import ModalHeader from "./Header/ModalHeader";
import CustomButton from "./Button/CustomButton";

const modalHeight = Dimensions.get("window").height * 0.8;

const ToppingModal = ({ visible, onClose, onConfirm }) => {
	const [selectedToppings, setSelectedToppings] = useState([]);

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
				isChecked={selectedToppings.some(
					(topping) => topping.title === item.title
				)}
				onToggle={() => handleToppingPress(item)}
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
				isChecked={selectedToppings.some(
					(topping) => topping.title === item.title
				)}
				onToggle={() => handleToppingPress(item)}
			/>
		));
	};

	const handleToppingPress = (topping) => {
		const isSelected = selectedToppings.some(
			(item) => item.title === topping.title
		);
		if (isSelected) {
			setSelectedToppings(
				selectedToppings.filter((item) => item.title !== topping.title)
			);
		} else {
			setSelectedToppings([...selectedToppings, topping]);
		}
	};

	const handleConfirm = () => {
		onConfirm(selectedToppings);
		onClose();
	};

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<Pressable style={styles.modalContainer} onPress={onClose}>
				<View style={styles.modalContent}>
					<ModalHeader title="Chọn topping" onClose={onClose} />
					<View style={{ paddingHorizontal: "5%" }}>
						<ScrollView style={styles.main}>
							<View style={{ marginTop: "5%" }}>
								<Section title="Trân châu">
									<View style={styles.itemListContainer}>
										{renderBubbleToppingItem()}
									</View>
								</Section>
							</View>
							<View style={{ marginTop: "5%" }}>
								<Section title="Pudding">
									<View style={styles.itemListContainer}>
										{renderPuddingToppingItem()}
									</View>
								</Section>
							</View>
						</ScrollView>

						<CustomButton text={"Xác nhận"} onPress={handleConfirm} />
					</View>
				</View>
			</Pressable>
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
		height: modalHeight,
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
		marginBottom: "2%",
	},
	itemListContainer: {
		marginTop: "5%",
		borderColor: "rgba(58, 58, 58, 0.10)",
		borderRadius: 10,
		paddingHorizontal: "5%",
		borderWidth: 1,
	},
});
