import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AdminAddBranchScreen = ({ navigation, route }) => {
    const { id } = route.params;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [operatingHours, setOperatingHours] = useState("7:30 - 22:00");
    const [image, setImage] = useState(
        require("../../assets/images/branch1.jpg")
    );

    const handleSubmit = () => {
        // Handle logic when the user presses "Hoàn thành" (Complete)
    };

    const handleSelectImage = () => {
        // Implement logic to select an image
    };

    const handleDeleteBranch = () => {
        // Implement logic to delete the branch
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity style={styles.avt}>
                            <Image source={image} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Thông tin chung</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Tên chi nhánh"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại"
                        value={phone}
                        onChangeText={setPhone}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.locationContainer}>
                    <Text style={styles.label}>Thông tin địa chỉ</Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.button, { width: "60%" }]}
                        >
                            <Text
                                style={[styles.buttonText, { marginRight: 70 }]}
                            >
                                Tỉnh/Thành phố
                            </Text>
                            <Image
                                source={require("../../assets/icons/ep_arrow-right.png")}
                                style={{ width: 20, height: 20 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Quận/Huyện</Text>
                            <Image
                                source={require("../../assets/icons/ep_arrow-right.png")}
                                style={{ width: 20, height: 20 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={[styles.button, styles.locationButton]}
                        >
                            <Text
                                style={[styles.buttonText, { marginRight: 10 }]}
                            >
                                Địa chỉ cụ thể
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                { marginLeft: 10, borderRadius: 250 },
                            ]}
                        >
                            <Icon name="location-on" size={20} color="#333" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.operatingHoursContainer}>
                        <TouchableOpacity style={styles.operatingHoursButton}>
                            <Text style={styles.labelInButton}>
                                Giờ hoạt động
                            </Text>
                            <Text style={styles.operatingHoursText}>
                                Từ 7:30 đến 22:00
                            </Text>
                            <Image
                                source={require("../../assets/icons/ep_arrow-right.png")}
                                style={{ width: 20, height: 20 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteBranch}
                >
                    <Image
                        source={require("../../assets/trash.png")}
                        style={{
                            width: 20,
                            height: 20,
                            marginRight: 8,
                        }}
                    />
                    <Text style={styles.deleteButtonText}>Xoá chi nhánh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Hoàn thành</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F7FA",
    },
    content: {
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 8,
        marginBottom: 8,
    },
    locationContainer: {
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
    labelInButton: {
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        height: 50,
    },
    avt: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    locationButton: {
        flex: 1,
    },
    buttonText: {
        marginRight: 8,
    },
    operatingHoursContainer: {
        marginBottom: 16,
        height: 50,
    },
    operatingHoursButton: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        height: 50,
    },
    operatingHoursText: {
        marginRight: 8,
        flex: 1,
        textAlign: "right",
    },
    submitButton: {
        backgroundColor: "#006c5e",
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "rgba(58, 58, 58, 0.501960813999176)",
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: "center",
        marginBottom: 16,
        flexDirection: "row",
        justifyContent: "center",
    },
    deleteButtonText: {
        color: "#F61A3D",
        fontWeight: "bold",
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 5,
        backgroundColor: "rgba(203, 203, 212, 1)",
        marginBottom: 8,
    },
});

export default AdminAddBranchScreen;
