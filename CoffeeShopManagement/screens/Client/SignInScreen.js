import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import InputField from "../../components/Client/InputField";
import PasswordInput from "../../components/Client/PasswordInput";
import BrownButton from "../../components/Client/Button/BrownButton";
import BrownTextButton from "../../components/Client/Button/BrownTextButton";
import { signIn, getFavoritesListById } from "../../api";
import {
	signInSuccess,
	savePhoneNumber,
	saveUserData,
	initializeFavorites,
} from "../../redux/actions/userActions";
import { connect } from "react-redux";
import { saveToken } from "../../services/authServices";
import store from "../../redux/store/store";

const GOOGLE_ICON_SOURCE = require("../../assets/google.png");
const BACKGROUND_SOURCE = require("../../assets/background.png");

const SignInScreen = () => {
	const navigation = useNavigation();
	const [isChecked, setChecked] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");

	const goToForgotPassword = () => {
		navigation.navigate("SendOTP");
	};

	const goToSignUp = () => {
		navigation.navigate("SignUpScreen");
	};

	const handleRememberMe = () => {
		setChecked(!isChecked);
	};

	useEffect(() => {
		if (role === "user") {
			console.log("Role is user");
			navigation.navigate("UserNavigator");
		} else if (role === "cashier") {
			console.log("Role is cashier");
			navigation.navigate("CashierNavigator");
		} else if (role === "admin") {
			console.log("Role is admin");
			navigation.navigate("AdminNavigator");
		} else {
			console.log("Role is not defined");
		}
	}, [role]);

	const handleSignIn = () => {
		signIn(phoneNumber, password).then((data) => {
			console.log(data);
			if (isChecked) {
				saveToken(JSON.stringify(data.user));
				store.dispatch(savePhoneNumber(data.user.phoneNumber));
				store.dispatch(saveUserData(data.user));
				console.log("Store: " + store.getState().auth.phoneNumber);
				console.log("Store: " + store.getState().auth.userData);
				setRole(data.user.role);
			} else {
				store.dispatch(savePhoneNumber(data.user.phoneNumber));
				store.dispatch(saveUserData(data.user));
				console.log("Store: " + store.getState().auth.phoneNumber);
				console.log("Store: " + store.getState().auth.userData._id);
				setRole(data.user.role);
			}
			getFavoritesListById(data.user._id)
				.then((favorites) => {
					console.log("Favorites:", favorites);
					if (favorites !== null) {
						const { products } = favorites;
						store.dispatch(initializeFavorites(products));
						console.log(
							"Store: " + JSON.stringify(store.getState().user.favoriteList)
						);
					} else {
						console.log("Favorites is null");
					}
				})
				.catch((error) => {
					console.error("Error fetching favorites:", error);
				});
		});
	};

	return (
		<View style={styles.container}>
			<Image style={styles.header} source={BACKGROUND_SOURCE} />
			<View style={styles.main}>
				<Text style={styles.title}>Đăng nhập</Text>
				<InputField
					placeholder="Số điện thoại"
					keyboardType="phone-pad"
					onChangeText={setPhoneNumber}
				/>
				<PasswordInput placeholder="Mật khẩu" onChangeText={setPassword} />
				<View style={styles.helperContainer}>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							marginRight: "auto",
						}}
					>
						<Checkbox
							style={styles.checkbox}
							value={isChecked}
							color={isChecked ? "#a8a19b" : undefined}
							onValueChange={handleRememberMe}
						/>
						<Text style={styles.helperText}>Ghi nhớ tôi</Text>
					</View>
					<BrownTextButton text="Quên mật khẩu?" onPress={goToForgotPassword} />
				</View>
				<BrownButton text="Đăng nhập" onPress={handleSignIn} />
				<View style={styles.labelContainer}>
					<View style={styles.divider}></View>
					<Text style={styles.label}>hoặc đăng nhập bằng</Text>
					<View style={styles.divider}></View>
				</View>
				<Pressable style={styles.iconButton}>
					<Image source={GOOGLE_ICON_SOURCE} style={styles.icon} />
				</Pressable>
				<View style={styles.helperContainer}>
					<Text style={styles.helperText}>Khách hàng mới?</Text>
					<View style={{ marginLeft: "2%" }}>
						<BrownTextButton
							text="Tạo một tài khoản mới"
							onPress={goToSignUp}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	header: {
		width: "100%",
		resizeMode: "stretch",
	},
	main: {
		flex: 1,
		alignItems: "center",
		padding: "5%",
	},
	title: {
		fontSize: 32,
		fontWeight: "600",
		color: "#54433A",
	},
	helperContainer: {
		flexDirection: "row",
		marginTop: "5%",
	},
	checkbox: {
		borderColor: "#A8A19B",
		borderRadius: 100,
		marginRight: "2%",
	},
	helperText: {
		color: "#3a3a3a",
		fontWeight: "400",
		fontSize: 16,
	},
	labelContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		marginTop: "5%",
	},
	divider: {
		flex: 1,
		borderWidth: 0.5,
		height: 1,
	},
	label: {
		marginHorizontal: "3%",
		color: "#3a3a3a",
		fontSize: 12,
		fontWeight: "500",
	},
	iconButton: {
		marginTop: "5%",
		borderWidth: 1,
		borderRadius: 30,
		padding: "2%",
		borderColor: "rgba(58,58,58,0.2)",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		resizeMode: "cover",
		width: 24,
		height: 24,
	},
});

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

const mapDispatchToProps = {
	signInSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
