import { View, Text, StyleSheet, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const ProductCard = ({
  title, quantity, price, imageSource, unit, OnPress
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={OnPress}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} resizeMode="center" />
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.label}>Số lượng:</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>{quantity}</Text>
            <Text style={styles.label}>/{unit}</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.label}>Giá nhập:</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.label}>{price} VND</Text>
            <Text style={styles.label}>/{unit}</Text>
          </View>
        </View>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={30} color="rgba(58,58,58,0.5)" />
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginVertical: "1%",
    padding: "2%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(58,58,58,0.05)",
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "rgba(58,58,58,0.05)",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 100,
    aspectRatio: 1,
  },
  main: {
    flex: 1,
    paddingRight: "5%",
    paddingLeft: "3%"
  },
  title: {
    width: "100%",
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: "10%",
  },
  label: {
    color: "rgba(58,58,58,0.5)",
    fontSize: 13,
    fontWeight: "500",
  },
});
