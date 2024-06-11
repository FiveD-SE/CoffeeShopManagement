import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ColorButton from "../../components/Admin/Button/ColorButton";
import { db, uploadPromotionToFirebase } from "../../services/firebaseService";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import PromotionImageButton from "../../components/Admin/PromotionImageButton";
import DeleteButton from "../../components/Admin/Button/DeleteButton";

const EditPromotionScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { promotionId } = route.params;

    const [promotionName, setPromotionName] = useState("");
    const [promotionContent, setPromotionContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const docRef = doc(db, "promotions", promotionId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPromotionName(data.name);
                    setPromotionContent(data.content);
                    setSelectedImage(data.imageUrl);
                    setImageUrl(data.imageUrl);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching promotion:", error);
            }
        };

        fetchPromotion();
    }, [promotionId]);

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
                let updatedImageUrl = imageUrl;

                if (selectedImage !== imageUrl) {
                    updatedImageUrl = await uploadPromotionToFirebase(
                        selectedImage,
                        `promotions/${promotionName}_${new Date().getTime()}.jpg`
                    );
                }

                await updateDoc(doc(db, "promotions", promotionId), {
                    name: promotionName,
                    content: promotionContent,
                    imageUrl: updatedImageUrl,
                    dateUpdated: new Date(),
                });

                navigation.goBack();
                Toast.show({
                    type: "success",
                    text1: "Thành công",
                    text2: "Chương trình khuyến mãi đã được cập nhật",
                });
            } catch (error) {
                console.log(error);
                Toast.show({
                    type: "error",
                    text1: "Lỗi",
                    text2: "Có lỗi xảy ra khi cập nhật chương trình khuyến mãi",
                });
            }
        }
    };

    const handleDeletePromotion = async () => {
        try {
            await deleteDoc(doc(db, "promotions", promotionId));
            navigation.goBack();
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Chương trình khuyến mãi đã được xóa",
            });
        } catch (error) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Có lỗi xảy ra khi xóa chương trình khuyến mãi",
            });
        }
    };

    const confirmDeletePromotion = () => {
        Alert.alert(
            "Xóa chương trình khuyến mãi",
            "Bạn có chắc chắn muốn xóa chương trình khuyến mãi này không?",
            [
                {
                    text: "Hủy",
                    style: "cancel",
                },
                {
                    text: "Xóa",
                    onPress: handleDeletePromotion,
                    style: "destructive",
                },
            ]
        );
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
                        value={promotionName}
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
                        value={promotionContent}
                        onChangeText={(text) => setPromotionContent(text)}
                    />
                </View>
            </View>
            <ColorButton
                OnPress={handleSavePromotion}
                color="#00A188"
                text="Cập nhật"
                textColor="#ffffff"
            />
            <DeleteButton
                OnPress={confirmDeletePromotion}
                color="#ff0000"
                text="Xóa"
                textColor="#ffffff"
                style={{ marginTop: 10 }}
            />
        </ScrollView>
    );
};

export default EditPromotionScreen;

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
