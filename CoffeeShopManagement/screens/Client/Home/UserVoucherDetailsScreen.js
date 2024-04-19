import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

const UserVoucherDetailsScreen = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/voucher.jpeg")}
            resizeMode="stretch"
            style={styles.image}
          />
        </View>
        <View style={styles.main}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={3}>
              Mua 1 tặng 1 + Freeship Mua 1 tặng 1 + Freeship Mua 1 tặng 1 +
              Freeship
            </Text>
          </View>
          <View style={styles.pointContainer}>
            <Text style={styles.point}>0 điểm</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Chi tiết ưu đãi</Text>
            <Text style={styles.details}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam,
              vivamus duis laoreet amet. Aliquet elementum ultrices molestie
              netus donec pellentesque quis.{"\n"}Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Diam, vivamus duis laoreet amet.
              Aliquet elementum ultrices molestie netus donec pellentesque quis.
              {"\n"}Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Diam, vivamus duis laoreet amet. Aliquet elementum ultrices
              molestie netus donec pellentesque quis. {"\n"}Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Diam, vivamus duis laoreet
              amet. Aliquet elementum ultrices molestie netus donec pellentesque
              quis.{"\n"}Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Diam, vivamus duis laoreet amet. Aliquet elementum ultrices
              molestie netus donec pellentesque quis.{"\n"}Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Diam, vivamus duis laoreet
              amet. Aliquet elementum ultrices molestie netus donec pellentesque
              quis.
            </Text>
          </View>
          <Pressable style={styles.exchangeButton}>
            <Text style={styles.exchangeButtonText}>ĐỔI NGAY</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserVoucherDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    width: "100%",
    marginTop: "5%",
    backgroundColor: "red",
  },
  image: {
    width: "100%",
  },
  main: {
    flex: 1,
    padding: "5%",
    justifyContent: "space-around",
  },
  titleContainer: {},
  title: {
    color: "#3a3a3a",
    fontSize: 20,
    fontWeight: "700",
    lineHeight: 24,
  },
  pointContainer: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(78, 203, 113, 0.10)",
    paddingHorizontal: "5%",
    paddingVertical: "2%",
    borderRadius: 20,
    marginTop: "5%",
  },
  point: {
    color: "#4ECB71",
    fontSize: 12,
    fontWeight: "500",
  },
  detailsContainer: {
    marginTop: "5%",
    flex: 1,
  },
  detailsTitle: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "700",
  },
  details: {
    color: "#3a3a3a",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    marginTop: "2%",
  },
  scrollView: {
    flex: 1,
  },
  exchangeButton: {
    width: "100%",
    backgroundColor: "#FFA730",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: "4%",
    marginTop: "5%",
  },
  exchangeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 12,
  },
});
