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
import { auth, db } from "../../../services/firebaseService"; 
import { addDoc, collection } from "firebase/firestore"; 
import Toast from "react-native-toast-message";
import { colors } from "../../../assets/colors/colors";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const FeedbackAndHelp = ({ userData, route }) => {
    const navigation = useNavigation();
    const branch = route.params ? route.params.branch : undefined;
    const [report, setReport] = useState("");
    const [branchName, setBranchName] = useState(
        branch?.branchName || "Địa chỉ"
    );

    const handleSubmitFeedback = async () => {
        try {
            const user = auth.currentUser;
            const userName = userData?.name;
            const phoneNumber = userData.phoneNumber;

            if (branch.branchName.trim() === "") {
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
                branch: branch,
                report: report,
                date: new Date(),
                userId: user.uid,
                userName: userName,
                phoneNumber: phoneNumber,
            });

            setReport("");
            setBranchName("Địa chỉ");

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

    const handleNavigateToBranch = () => {
        navigation.navigate("ReportBranch");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.primaryText} numberOfLines={2}>
                        Chúng mình luôn lắng nghe! Hãy cho chúng mình biết cảm
                        nhận của bạn
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.primaryText}>Chi nhánh*</Text>
                    <View style={styles.rowLabelText}>
                        <Text style={styles.textInput}>
                            {branch ? branchName : "Địa chỉ"}
                        </Text>
                        <TouchableOpacity onPress={handleNavigateToBranch}>
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
                            placeholderTextColor={"#151515"}
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
        color: "#151515",
        fontFamily: "lato-regular",
        fontSize: 18,
        lineHeight: 20,
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
        fontSize: 16,
        fontFamily: "lato-regular",
        color: "#151515",
    },
    textInputMultiline: {
        flex: 1,
        minHeight: 150,
        fontFamily: "lato-regular",
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
