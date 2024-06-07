import { View, Text, Modal, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import ModalHeader from '../../Client/Header/ModalHeader';
import SquareWithBorder from '../SquarewithBorder';
import ColorButton from '../Button/ColorButton';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, uploadImageToFirebase } from '../../../services/firebaseService';

const AddNewGoodModal = ({ visible, onClose }) => {
	const [selectedImage, setSelectedImage] = useState("");
	const [goodsName, setGoodsName] = useState("");
	const [goodsUnit, setGoodsUnit] = useState("");
	const [goodsPrice, setGoodsPrice] = useState("");
	const [formattedPrice, setFormattedPrice] = useState("");

	const handleAddNewGood = async () => {
		const price = parseFloat(goodsPrice.replace(/\./g, ''));
		if (selectedImage && goodsName && goodsUnit && price) {
			const newGoodsRef = doc(collection(db, "goods"));
			const goodsId = newGoodsRef.id;
			
			const imageURI = await uploadImageToFirebase(selectedImage, goodsId);
			
			const goods = {
				goodsId: goodsId,
				goodsImage: imageURI,
				goodsName: goodsName,
				goodsUnit: goodsUnit,
				goodsPrice: price,
				goodsQuantity: 0,
			};
			
			await setDoc(newGoodsRef, goods);
			Alert.alert("Thêm mới thành công", "Mặt hàng đã được thêm vào kho");
			onClose();
		} else {
			Alert.alert("Thêm mới thất bại", "Vui lòng điền đầy đủ thông tin");
		}
	};

	const formatPrice = (value) => {
		const cleanedValue = value.replace(/[^0-9]/g, '');
		const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
		setFormattedPrice(formattedValue ? `${formattedValue}` : '');
		setGoodsPrice(cleanedValue);
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
					<ModalHeader title="Thêm mặt hàng mới" onClose={onClose} />
					<View style={styles.main}>
						<View style={styles.imageContainer}>
							<SquareWithBorder text="Ảnh mặt hàng" onImageSelected={setSelectedImage} />
						</View>
						<Text style={styles.header}>Thông tin mặt hàng</Text>
						<View style={styles.inputContainer}>
							<View style={styles.inputBox}>
								<TextInput
									style={styles.input}
									placeholder="Tên mặt hàng"
									onChangeText={setGoodsName}
								/>
							</View>
							<View style={styles.inputBox}>
								<TextInput
									style={styles.input}
									placeholder="Đơn vị"
									onChangeText={setGoodsUnit}
								/>
							</View>
							<View style={styles.inputBox}>
								<TextInput
									keyboardType="phone-pad"
									style={styles.input}
									placeholder="Giá nhập ban đầu"
									value={formattedPrice}
									onChangeText={formatPrice}
								/>
								<Text style={{ color: "#9D9D9D", fontSize: 15, fontWeight: "400", marginLeft: "auto" }}>VND</Text>
							</View>
						</View>
						<ColorButton color="#00A188" text="Thêm mới" textColor="#ffffff" OnPress={handleAddNewGood} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AddNewGoodModal;

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
		backgroundColor: "#F8F7FA",
	},
	header: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "600",
		marginVertical: "4%"
	},
	inputContainer: {
		flexDirection: "column",
		marginBottom: "5%",

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
});
