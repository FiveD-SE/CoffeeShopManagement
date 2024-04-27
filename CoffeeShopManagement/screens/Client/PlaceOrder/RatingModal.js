import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	View,
	TextInput,
} from "react-native";
import React, { useState } from "react";
import ModalHeader from "../../../components/Client/Header/ModalHeader";

import StarRating from "../../../components/Client/StarRating";
const RatingModal = ({ visible, onClose }) => {
	const [rating, setRating] = useState(0);

	const handleRating = (newRating) => {
		setRating(newRating);
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
					<ModalHeader title="Đánh giá" onClose={onClose} />
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							padding: "5%",
						}}
					>
						<Text
							style={{
								color: "#3a3a3a",
								fontSize: 24,
								fontWeight: "600",
							}}
						>
							Giao hàng thành công
						</Text>
						<Text
							style={{
								color: "#3a3a3a",
								fontSize: 14,
								fontWeight: "400",
								marginTop: "5%",
							}}
						>
							Vui lòng đánh giá để chúng tôi cải thiện dịch vụ
						</Text>
						<View style={{ marginTop: "5%" }}>
							<StarRating rating={rating} onRate={handleRating} />
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								style={styles.input}
								placeholder="Chúng tôi cần làm gì?"
								multiline={true}
								numberOfLines={4}
								textAlignVertical="top"
							/>
						</View>
					</View>
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
		height: "80%",
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
	inputContainer: {
		width: "100%",
		height: "50%",
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 15,
		borderColor: "#CCCCCC",
		padding: "5%",
		backgroundColor: "#ffffff",

		marginTop: "5%",
	},
	input: {
		flex: 1,
		maxHeight: 200,
		color: "rgba(58,58,58, 1)",
		fontSize: 16,
		fontWeight: "400",
		alignSelf: "flex-start",
	},
});
