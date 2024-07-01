import React, { useState } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	Text,
	Pressable,
	Image,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import {
	db,
	auth,
	uploadImageToFirebase,
} from "../../services/firebaseService";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { saveUserData } from "../../redux/actions/userActions";
import * as ImagePicker from "expo-image-picker";
import { colors } from "../../assets/colors/colors";

const flag = require("../../assets/vietnam.png");

const EditProfileDetails = ({ userData, saveUserData }) => {
	const navigation = useNavigation();

	const [name, setName] = useState(userData?.name || "");
	const [phoneNumber, setPhoneNumber] = useState(userData?.phoneNumber || "");

	const formatPhoneNumber = (phoneNumber) => {
		if (phoneNumber.startsWith("0")) {
			phoneNumber = phoneNumber.substring(1);
		}
		return phoneNumber.replace(/(\d{2})(\d{3})(\d{3})/, "$1 $2 $3");
	};

	const handleImagePicker = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("Sorry, we need camera roll permissions to make this work!");
			return;
		}
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.canceled) {
			const userImage = await uploadImageToFirebase(
				result.assets[0].uri,
				"user_" + userData.id
			);
			const updatedUserData = { ...userData, userImage: userImage };
			saveUserData(updatedUserData);
			const userDocRef = doc(db, "users", userData.id);
			await updateDoc(userDocRef, {
				userImage: userImage,
			});
		}
	};

	const navigateToProfileDetails = async () => {
		try {
			const user = auth.currentUser;
			const docRef = doc(db, "users", user.uid);
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				await updateDoc(docRef, {
					fullName: name,
					phoneNumber: phoneNumber,
				});
				saveUserData({
					...userData,
					name: name,
					phoneNumber: phoneNumber,
				});

				navigation.navigate("AdminProfileDetail");

				console.log("Cập nhật dữ liệu người dùng thành công");
			}
		} catch (error) {
			console.error("Lỗi khi lấy hoặc cập nhật dữ liệu người dùng:", error);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={{ paddingVertical: "4%", alignItems: "center" }}>
					<TouchableOpacity onPress={() => handleImagePicker()}>
						<Image
							alt="avatar"
							source={{ uri: userData?.userImage }}
							style={styles.profileAvatar}
							resizeMode="stretch"
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.section}>
					<View style={styles.row_space_between}>
						<Text style={styles.sectionTitle}>Thông tin chung</Text>
						<Pressable onPress={navigateToProfileDetails}>
							<Text style={styles.editButton}>Lưu</Text>
						</Pressable>
					</View>
					<View style={styles.row_space_between}>
						<View style={[styles.rowLabelText]}>
							<TextInput
								style={styles.text}
								onChangeText={setName}
								value={name}
							/>
						</View>
					</View>

					<View style={styles.row_space_between}>
						<View
							style={[
								styles.rowLabelText,
								{ width: "100%", justifyContent: "flex-start" },
							]}
						>
							<Image
								style={{
									height: 32,
									width: 32,
									marginRight: "4%",
								}}
								source={flag}
								resizeMode="contain"
							/>
							<Text style={styles.text}>+84 </Text>
							<TextInput
								style={styles.text}
								onChangeText={setPhoneNumber}
								value={formatPhoneNumber(phoneNumber)}
							/>
						</View>
					</View>
				</View>
				<View style={styles.section}>
					<View style={styles.row_space_between}>
						<Text style={styles.sectionTitle}>Email</Text>
					</View>
					<View style={styles.row_space_between}>
						<View style={[styles.rowLabelText, { width: "100%" }]}>
							<Text style={styles.text}>{userData?.email}</Text>
						</View>
					</View>
				</View>
				{/* <View style={styles.section}>
                    <View style={styles.row_space_between}>
                        <Text style={styles.sectionTitle}>
                            Tài khoản liên kết
                        </Text>
                    </View>
                    <View style={styles.row_space_between}>
                        <View
                            style={[
                                styles.rowLabelText,
                                {
                                    width: "100%",
                                    justifyContent: "space-between",
                                },
                            ]}
                        >
                            <View style={styles.row_space_between}>
                                <View style={styles.iconContainer}>
                                    <FontAwesome name="google" size={32} />
                                </View>
                                <Text style={styles.text}>Google</Text>
                            </View>
                            <SwitchToggle
                                onColor="#4ECB71"
                                offColor="gray"
                                labelStyle={styles.label}
                                size="medium"
                                isOn={isToggled}
                                onToggle={handleToggle}
                            />
                        </View>
                    </View>
                </View> */}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		paddingHorizontal: "4%",
	},
	section: {
		paddingVertical: "2%",
	},
	sectionTitle: {
		color: "#000",
		fontSize: 16,
		fontFamily: "lato-bold",
	},
	editButton: {
		color: "#006C5E",
		fontFamily: "lato-bold",
		fontSize: 16,
		lineHeight: 20,
	},
	profile: {
		backgroundColor: "#fff",
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	profileAvatar: {
		width: 150,
		height: 150,
		borderRadius: 20,
	},
	rowLabelText: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "4%",
		backgroundColor: colors.white_100,
		borderWidth: 1,
		borderColor: colors.grey_50,
		borderRadius: 12,
		marginVertical: "2%",
	},
	row_space_between: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconContainer: {
		marginRight: "4%",
	},
	text: {
		color: "#000",
		fontFamily: "lato-regular",
		fontSize: 16,
		lineHeight: 24,
	},
});
const mapStateToProps = (state) => {
	return {
		userData: state.auth.userData,
	};
};

const mapDispatchToProps = {
	saveUserData,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDetails);
