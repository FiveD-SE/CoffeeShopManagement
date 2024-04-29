import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import SquareWithBorder from '../SquarewithBorder'
import ColorButton from '../Button/ColorButton'
import { ScrollView } from 'react-native-gesture-handler'

const AddGoodModal = ({ visible, onClose }) => {

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
								<SquareWithBorder text="Ảnh mặt hàng" />
							</View>
							<Text style={styles.title}>Tên mặt hàng</Text>
						</View>
						<Text style={styles.header}>Thông tin mặt hàng</Text>
						<View style={styles.inputContainer}>
							<View style={styles.inputBox}>
								<TextInput
									style={styles.input}
									placeholder="Số lượng"
								/>
							</View>
							<View style={styles.inputBox}>
								<TextInput
									style={styles.input}
									placeholder="Giá nhập mới (bỏ trống để giữ giá cũ)"
								/>
							</View>
						</View>
						<ColorButton color="#00A188" text="Thêm mới" textColor="#ffffff" />
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}

export default AddGoodModal

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
		height: "57%",
	},
	imageContainer: {
		marginTop: "5%",
		flexDirection: "row",
		justifyContent: "center"
	},
	main: {
		paddingHorizontal: "5%",
		marginBottom: "10%",
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
		color: "#9D9D9D",
		fontSize: 15,
		fontWeight: "400",
	},
	title: {
		marginTop: "2%",
		color: "#3a3a3a",
		fontSize: 15,
		fontWeight: "500",
	},
});