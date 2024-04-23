import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const VoucherCard = ({ title, point, imageSource }) => {
  const navigation = useNavigation();

  const goToVoucherDetails = () => {
    navigation.navigate("VoucherDetails");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={imageSource} resizeMode="center" />
      </View>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text style={styles.label}>Số xu: </Text>
          </View>
          <View style={styles.pointContainer}>
            <Text style={styles.point}>{point}</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.exchangeButton} onPress={goToVoucherDetails}>
        <Text style={styles.exchangeButtonText}>Đổi</Text>
      </Pressable>
    </View>
  );
};

export default VoucherCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginVertical: "2%",
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
    paddingHorizontal: "5%",
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
    fontSize: 14,
    fontWeight: "500",
  },
  pointContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: "5%",
    paddingVertical: "2%",
    paddingHorizontal: "10%",
    backgroundColor: "rgba(78, 203, 113, 0.10)",
  },
  point: {
    color: "#4ECB71",
    fontSize: 12,
    fontWeight: "500",
  },
  exchangeButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "2%",
    paddingHorizontal: "7%",
    borderWidth: 1,
    borderColor: "rgba(255, 218, 189, 0.5)",
    backgroundColor: "rgba(255, 218, 189, 0.2)",
    borderRadius: 20,
  },
  exchangeButtonText: {
    color: "#FFA730",
    fontSize: 14,
    fontWeight: "500",
  },
});
