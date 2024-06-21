import React, { useState } from "react";
import { StyleSheet, Text, Pressable, Image, Animated } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import ToppingModal from "../ToppingModal";
import { colors } from "../../../assets/colors/colors";

const TOPPING_ICON = require("../../../assets/topping-icon.png");

const ToppingButton = ({ onToppingsSelected }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const scaleValue = React.useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleValue, {
			toValue: 1,
			friction: 3,
			tension: 40,
			useNativeDriver: true,
		}).start();
	};

	const showToppingModal = () => {
		setModalVisible(true);
	};

	const hideToppingModal = () => {
		setModalVisible(false);
	};

	const handleConfirmToppings = (toppings) => {
		onToppingsSelected(toppings);
		setModalVisible(false);
	};

	return (
		<>
			<Pressable
				style={{ width: "100%" }}
				onPress={showToppingModal}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
			>
				<Animated.View
					style={[
						styles.container,
						{
							transform: [{ scale: scaleValue }],
						},
					]}
				>
					<Image source={TOPPING_ICON} style={styles.image} />
					<Text style={styles.title}>Dùng thêm topping bạn nhé</Text>
					<Icon name="chevron-right" style={styles.icon} size={16} />
				</Animated.View>
			</Pressable>
			<ToppingModal
				visible={modalVisible}
				onClose={hideToppingModal}
				onConfirm={handleConfirmToppings}
			/>
		</>
	);
};

export default ToppingButton;

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white_100,
		borderWidth: 1,
		borderRadius: 20,
		borderColor: "rgba(58, 58, 58, 0.2)",
		justifyContent: "space-around",
		flexDirection: "row",
		padding: "5%",
		alignItems: "center",
		shadowColor: colors.black_100,
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 2,
	},
	image: {},
	title: {
		color: "#3a3a3a",
		fontSize: 16,
		fontWeight: "500",
	},
	icon: {
		alignSelf: "center",
	},
});
