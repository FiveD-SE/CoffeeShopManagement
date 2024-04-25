import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalHeader from "../../../components/Client/Header/ModalHeader";
const RatingModal = ({ visible, onClose }) => {
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
				</View>
			</View>
		</Modal>
	);
};

export default RatingModal;

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
