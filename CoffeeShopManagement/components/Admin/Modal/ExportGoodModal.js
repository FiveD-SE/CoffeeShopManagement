import { View, Text, Modal, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import ColorButton from '../Button/ColorButton'
import { connect } from 'react-redux'
import { warehouseItemUpdate } from '../../../redux/actions/adminActions'

const ExportGoodModal = ({ visible, onClose, selectedGoods, onMinus, warehouseItemUpdate }) => {
	const [selectedQuantity, setSelectedQuantity] = useState(0);

	const handleMinus = async () => {
		if (selectedQuantity === 0 || selectedQuantity > selectedGoods?.goodsQuantity) {
			Alert.alert("Cảnh báo", "Số lượng không hợp lệ. Hãy chọn số lượng nhỏ hơn hoặc bằng số lượng hàng hóa trong kho.");
			return;
		}
		try {
			const exportGoodsLabel = {
				warehouseItemId: selectedGoods?.warehouseItemId,
				goodsId: selectedGoods?.goodsId,
				goodsName: selectedGoods?.goodsName,
				goodsPrice: selectedGoods?.goodsPrice,
				goodsUnit: selectedGoods?.goodsUnit,
				goodsQuantity: selectedQuantity,
				goodsImage: selectedGoods?.goodsImage,
			};

			const newQuantity = selectedGoods.goodsQuantity - selectedQuantity;
			warehouseItemUpdate({...selectedGoods, goodsQuantity: newQuantity});
			onMinus(exportGoodsLabel);
			setSelectedQuantity(0);
			onClose();
		} catch (error) {
			console.error("Error updating document: ", error);
		}
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
					<ModalHeader title="Xuất hàng" onClose={onClose} />
					<View style={styles.main}>
						<View style={{ flexDirection: "column", alignItems: "center" }}>
							<View style={styles.imageContainer}>
								<Image style={styles.image} source={{ uri: selectedGoods?.goodsImage }} />							
							</View>
							<Text style={styles.title}>{selectedGoods?.goodsName}</Text>
						</View>
						<Text style={styles.header}>Số lượng mặt hàng trong kho ({selectedGoods?.goodsQuantity})</Text>
						<View style={styles.inputContainer}>
							<View style={styles.inputBox}>
								<TextInput
									keyboardType="phone-pad"
									style={styles.input}
									placeholder="Số lượng"
									value={selectedQuantity}
									onChangeText={(newText) => {
										const quantity = Number(newText);
										if (quantity <= selectedGoods?.goodsQuantity && quantity >= 0) {
											setSelectedQuantity(quantity);
										} else {
											Alert.alert("Cảnh báo", "Số lượng không hợp lệ. Hãy chọn số lượng nhỏ hơn hoặc bằng số lượng hàng hóa trong kho.");
										}
									}}
								/>
							</View>
						</View>
						<ColorButton color="#00A188" text="Xác nhận" textColor="#ffffff" OnPress={handleMinus} />
					</View>
				</View>
			</View>
		</Modal>
	)
}

const mapDispatchToProps = {
	warehouseItemUpdate
}

export default connect(null, mapDispatchToProps)(ExportGoodModal);

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
		height: "50%",
	},
	imageContainer: {
		marginTop: "5%",
		flexDirection: "row",
		justifyContent: "center"
	},
	main: {
		height: "auto",
		borderRadius: 20,
		paddingBottom: "5%",
		paddingHorizontal: "5%",
		backgroundColor: "#F8F7FA",
	},
	header: {
		color: "#3a3a3a",
		fontSize: 18,
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
		color: "#9D9D9D",
		fontSize: 15,
		fontWeight: "400",
	},
	title: {
		marginTop: "2%",
		color: "#3a3a3a",
		fontSize: 20,
		fontWeight: "500",
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
