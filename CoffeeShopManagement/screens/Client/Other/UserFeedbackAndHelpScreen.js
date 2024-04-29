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

const FeedbackAndHelp = () => {
    const [store, setStore] = useState("");
    const [report, setReport] = useState("");

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
                            keyboardType="text"
                            multiline={true}
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.submitButton}>
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
        backgroundColor: "#F8F7FA",
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    section: {
        marginBottom: 20,
    },
    primaryText: {
        color: "#000",
        fontFamily: "Lato-Regular",
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
        fontFamily: "Lato-Bold",
        fontSize: 18,
    },
});

export default FeedbackAndHelp;
