import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const PromotionImageButton = ({
    text,
    onImageSelected,
    selectedImage: initialSelectedImage,
    ratio,
}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        setSelectedImage(initialSelectedImage);
    }, [initialSelectedImage]);

    const handleImagePick = async () => {
        try {
            const permissionResult =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissionResult.granted) {
                Alert.alert(
                    "Quyền truy cập bị từ chối",
                    "Cần cấp quyền truy cập thư viện ảnh!"
                );
                return;
            }

            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
                aspect: ratio ? ratio : null,
            });

            if (
                !pickerResult.canceled &&
                pickerResult.assets &&
                pickerResult.assets.length > 0
            ) {
                setSelectedImage(pickerResult.assets[0].uri);
                onImageSelected(pickerResult.assets[0].uri);
            }
        } catch (error) {
            console.log("Lỗi chọn ảnh:", error);
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleImagePick}>
            <View style={styles.content}>
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.image}
                    />
                ) : (
                    <View style={styles.placeholder}>
                        <Entypo name="plus" size={24} color="#9D9D9D" />
                        <Text style={styles.text}>{text}</Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: "#9D9D9D",
        borderRadius: 10,
        width: 450,
        height: 150,
        borderStyle: "dashed",
    },
    content: {
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    placeholder: {
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "#9D9D9D",
        fontSize: 14,
        fontWeight: "600",
        marginTop: "2%",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 10,
    },
});

export default PromotionImageButton;
