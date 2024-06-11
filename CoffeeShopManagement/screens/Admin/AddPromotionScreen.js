import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import PromotionImageButton from "../../components/Admin/PromotionImageButton";
import ColorButton from "../../components/Admin/Button/ColorButton";
import { db, uploadPromotionToFirebase } from "../../services/firebaseService";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const AdminAddPromotionScreen = () => {
    const navigation = useNavigation();
    const [promotionName, setPromotionName] = useState("");
    const [promotionContent, setPromotionContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageSelected = (uri) => {
        setSelectedImage(uri);
    };

    const handleSavePromotion = async () => {
        if (promotionName === "" || promotionContent === "" || !selectedImage) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Vui lòng nhập đầy đủ thông tin",
            });
        } else {
            try {
                const imageUrl = await uploadPromotionToFirebase(
                    selectedImage,
                    `promotions/${promotionName}_${new Date().getTime()}.jpg`
                );

                const promotionRef = await addDoc(
                    collection(db, "promotions"),
                    {
                        name: promotionName,
                        content: promotionContent,
                        imageUrl: imageUrl,
                        dateCreated: new Date(),
                    }
                );
                const promotionId = promotionRef.id;
                await updateDoc(
                    doc(collection(db, "promotions"), promotionId),
                    {
                        promotionId: promotionId,
                    }
                );

                navigation.goBack();
                Toast.show({
                    type: "success",
                    text1: "Thành công",
                    text2: "Chương trình khuyến mãi đã được thêm mới",
                });
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Có lỗi xảy ra khi thêm chương trình khuyến mãi",
                });
            }
        }
    };

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.imageContainer}>
                <PromotionImageButton
                    text="Ảnh chương trình khuyến mãi"
                    onImageSelected={handleImageSelected}
                    selectedImage={selectedImage}
                    ratio={[3, 1]}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.header}>
                    Thông tin chương trình khuyến mãi
                </Text>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { flex: 1 }]}
                        placeholder="Tên chương trình khuyến mãi"
                        onChangeText={(text) => setPromotionName(text)}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[
                            styles.input,
                            { flex: 1, textAlignVertical: "top" },
                        ]}
                        placeholder="Nội dung chương trình khuyến mãi"
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => setPromotionContent(text)}
                    />
                </View>
            </View>
            <ColorButton
                OnPress={handleSavePromotion}
                color="#00A188"
                text="Thêm mới"
                textColor="#ffffff"
            />
        </ScrollView>
    );
};

export default AdminAddPromotionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "4%",
        marginHorizontal: "3%",
    },
    imageContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    inputContainer: {
        flex: 1,
        flexDirection: "column",
        marginVertical: "3%",
    },
    inputBox: {
        marginVertical: "2%",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#ECECEC",
        paddingHorizontal: "5%",
        paddingVertical: "3%",
        backgroundColor: "#ffffff",
    },
    input: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
    },
    header: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        marginVertical: "4%",
    },
});
