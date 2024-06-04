import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { auth, db } from "../../../services/firebaseService"; // Import from Firebase services file
import { addDoc, collection } from "firebase/firestore"; // Import from Firebase firestore
import Toast from "react-native-toast-message";
import { colors } from "../../../assets/colors/colors";
import { connect } from "react-redux";

const FeedbackAndHelp = ({ userData }) => {
    const [store, setStore] = useState("");
    const [report, setReport] = useState("");

    const handleSubmitFeedback = async () => {
        try {
            const user = auth.currentUser;

            const userName = userData?.name;
            const phoneNumber = userData.phoneNumber;

            // Validate store input
            if (store.trim() === "") {
                Toast.show({
                    type: "error",
                    text1: "Vui lòng nhập chi nhánh!",
                    text2: "Chi nhánh là thông tin bắt buộc.",

                    animation: "fade",

                    text1Style: {
                        fontSize: 16,
                        fontFamily: "lato-bold",
                        color: colors.black_100,
                    },
                    text2Style: {
                        fontSize: 12,
                        fontFamily: "lato-bold",
                        color: colors.grey_100,
                    },
                });
                return;
            }

            // Validate report length
            if (report.trim().length < 10) {
                Toast.show({
                    type: "error",
                    text1: "Vui lòng nhập thông tin chi tiết hơn!",
                    text2: "Thông tin cần ít nhất 10 ký tự.",

                    animation: "fade",

                    text1Style: {
                        fontSize: 16,
                        fontFamily: "lato-bold",
                        color: colors.black_100,
                    },
                    text2Style: {
                        fontSize: 12,
                        fontFamily: "lato-bold",
                        color: colors.grey_100,
                    },
                });
                return;
            }

            const feedbackCollectionRef = collection(db, "feedback");
            await addDoc(feedbackCollectionRef, {
                store: store,
                report: report,
                timestamp: new Date(), // Add timestamp for sorting
                user: user.uid,
                userName: userName,
                phoneNumber: phoneNumber,
            });
            setStore("");
            setReport("");
            Toast.show({
                type: "success",
                text1: "Cảm ơn bạn đã góp ý!",
                text2: "Chúng mình sẽ liên hệ với bạn sớm nhất có thể.",

                animation: "fade",

                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-bold",
                    color: colors.black_100,
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-bold",
                    color: colors.grey_100,
                },
            });
        } catch (error) {
            console.log("Error submitting feedback:", error);
            Toast.show({
                type: "error",
                text1: "Có lỗi xảy ra!",
                text2: "Vui lòng thử lại sau.",

                animation: "fade",

                text1Style: {
                    fontSize: 16,
                    fontFamily: "lato-bold",
                    color: colors.black_100,
                },
                text2Style: {
                    fontSize: 12,
                    fontFamily: "lato-bold",
                    color: colors.grey_100,
                },
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.primaryText}>
                        Chúng mình luôn lắng nghe! Hãy cho chúng{"\n"}mình biết
                        cảm nhận của bạn
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.primaryText}>Chi nhánh *</Text>
                    <View style={styles.rowLabelText}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setStore}
                            value={store}
                            placeholder="Địa chỉ"
                            keyboardType="default"
                        />
                        <TouchableOpacity>
                            <FontAwesome
                                name="angle-right"
                                size={32}
                                style={styles.angleIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.primaryText}>
                        Thông tin (tối đa 1500 ký tự)
                    </Text>
                    <View style={styles.rowLabelText}>
                        <TextInput
                            style={styles.textInputMultiline}
                            onChangeText={setReport}
                            value={report}
                            placeholder="Cảm nhận của bạn."
                            keyboardType="default"
                            multiline={true}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmitFeedback}
                >
                    <Text style={styles.submitText}>Gửi</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    section: {
        marginBottom: 20,
    },
    primaryText: {
        color: "#000",
        fontFamily: "lato-regular",
        fontSize: 18,
        fontWeight: "600",
    },
    rowLabelText: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#EBEBEB",
        borderRadius: 10,
        marginTop: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
    textInputMultiline: {
        flex: 1,
        minHeight: 150,
        textAlignVertical: "top",
        fontSize: 16,
    },
    angleIcon: {
        marginLeft: 15,
        color: "#9C9C9C",
    },
    submitButton: {
        backgroundColor: "#3A3A3A",
        padding: 15,
        borderRadius: 20,
        alignItems: "center",
        marginTop: 10,
    },
    submitText: {
        color: "#FFFFFF",
        fontFamily: "lato-bold",
        fontSize: 18,
    },
});

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

export default connect(mapStateToProps)(FeedbackAndHelp);
