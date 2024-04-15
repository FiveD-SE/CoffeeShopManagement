import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
const ProductCardVertical = ({ title, price, imageSource }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} resizeMode="cover" />
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <Pressable style={styles.addButton}>
        <Icon name="plus" color="#FFFFFF" />
      </Pressable>
    </View>
  );
};

export default ProductCardVertical;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "2%",
  },
  imageContainer: {
    flex: 0.7,
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  main: {
    flex: 1,
    paddingHorizontal: "5%",
  },
  title: {
    width: "100%",
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
  price: {
    marginTop: "5%",
    color: "rgba(58,58,58,0.5)",
    fontSize: 14,
    fontWeight: "500",
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: "2%",
    backgroundColor: "#FFA730",
    borderRadius: 100,
  },
});
