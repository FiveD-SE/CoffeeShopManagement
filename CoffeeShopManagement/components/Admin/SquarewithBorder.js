import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'; 

const SquareWithBorder = ({ text }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePick = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Cần cấp quyền truy cập thư viện ảnh!');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!pickerResult.cancelled) {
        setSelectedImage(pickerResult.uri);
      }
    } catch (error) {
      console.log('Lỗi chọn ảnh:', error);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleImagePick}>
      <View style={styles.content}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
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
    borderColor: '#9D9D9D',
    borderRadius: 10,
    paddingHorizontal: '4%',
    paddingVertical: '8%',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  placeholder: {
    alignItems: 'center',
  },
  text: {
    color: '#9D9D9D',
    fontSize: 14,
    fontWeight: '600',
    marginTop: '2%',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default SquareWithBorder;
