import { View, Text, Modal, StyleSheet, Image, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import ColorButton from '../Button/ColorButton'
import { goodsUpdate } from '../../../redux/actions/adminActions'
import { connect } from 'react-redux'

const AddGoodModal = ({ visible, onClose, selectedGoods, onAdd, goodsUpdate }) => {
	const [selectedQuantity, setSelectedQuantity] = useState(0);
	const handleAdd = async () => {
		if (selectedQuantity === 0 || selectedQuantity > selectedGoods?.goodsQuantity) {
			Alert.alert("Cảnh báo", "Số lượng không hợp lệ. Hãy chọn số lượng nhỏ hơn hoặc bằng số lượng hàng hóa trong kho.");
			return;
		}
		try {
			const importGoodsLabel = {
				goodsId: selectedGoods?.goodsId,
				goodsName: selectedGoods?.goodsName,
				goodsPrice: selectedGoods?.goodsPrice,
				goodsUnit: selectedGoods?.goodsUnit,
				goodsQuantity: selectedQuantity,
				goodsImage: selectedGoods?.goodsImage,
			};
			const newQuantity = selectedGoods.goodsQuantity - selectedQuantity;
			goodsUpdate({...selectedGoods, goodsQuantity: newQuantity});
			onAdd(importGoodsLabel);
			setSelectedQuantity(0);
			onClose();
		} catch (error) {
			console.error("Error updating document: ", error);
		}
	}

	function formatVND(number) {
		return number.toLocaleString('vi-VN');
	}

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<ModalHeader title="Nhập hàng" onClose={onClose} />
					<ScrollView style={styles.main}>
						<View style={{ flexDirection: "column", alignItems: "center" }}>
							<View style={styles.imageContainer}>
								<Image style={styles.image} source={{ uri: selectedGoods?.goodsImage }} />
							</View>
							<Text style={styles.title}>{selectedGoods?.goodsName}</Text>
						</View>
						<Text style={styles.header}>Thông tin mặt hàng ({selectedGoods?.goodsQuantity})</Text>
						<View style={styles.inputContainer}>
							<View style={styles.inputBox}>
								<TextInput
									keyboardType="phone-pad"
									style={styles.input}
									placeholder="Số lượng"
									value={selectedQuantity}
									onChangeText={(newText) => setSelectedQuantity(newText)}
								/>
							</View>
							<View style={styles.inputBox}>
								<Text style={styles.text}>{formatVND(Number(selectedGoods?.goodsPrice))} VNĐ</Text>
							</View>
						</View>
						<ColorButton color="#00A188" text="Thêm" textColor="#ffffff" OnPress={handleAdd} />
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

const mapDispatchToProps = {
	goodsUpdate
}

export default connect(null, mapDispatchToProps)(AddGoodModal);

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#F8F7FA",
		borderRadius: 20,
		width: "90%",
		height: "auto",
	},
	imageContainer: {
		marginTop: "5%",
		flexDirection: "row",
		justifyContent: "center"
	},
	main: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		borderRadius: 20,
	},
	header: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
		marginVertical: "4%"
	},
	inputContainer: {
		flexDirection: "column",
		marginBottom: "5%"
	},
	inputBox: {
		marginVertical: "2%",
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#ECECEC",
		paddingHorizontal: "5%",
		paddingVertical: "2%",
		backgroundColor: "#ffffff"
	},
	input: {
		color: "#3a3a3a",
		width: "100%",
		fontSize: 15,
		fontWeight: "400",
	},
	title: {
		marginTop: "2%",
		color: "#3a3a3a",
		fontSize: 20,
		fontWeight: "600",
	},
	image: {
		width: 150,
		height: 150,
		resizeMode: "cover",
		borderRadius: 20,
	},
	text: {
		color: "#3a3a3a",
		fontSize: 15,
		lineHeight: 25,
		fontWeight: "400",
	},
});