import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";

import Section from "../../../components/Client/Section";
import VoucherCard from "../../../components/Client/VoucherCard";

const UserExchangeVoucherScreen = () => {
  const voucherItemList = [
    {
      title: "Mua 1 tặng 1 + Freeship",
      point: 300,
      imageSource: require("../../../assets/voucher.jpeg"),
    },
    {
      title: "Mua 1 tặng 1 + Freeship",
      point: 300,
      imageSource: require("../../../assets/voucher.jpeg"),
    },
    {
      title: "Mua 1 tặng 1 + Freeship",
      point: 300,
      imageSource: require("../../../assets/voucher.jpeg"),
    },
  ];

  const renderVoucherItem = ({ item }) => (
    <VoucherCard
      title={item.title}
      point={item.point}
      imageSource={item.imageSource}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.currentPointContainer}>
          <View>
            <Image source={require("../../../assets/Bitcoin.png")} />
          </View>
          <View style={styles.currentPointContent}>
            <Text style={styles.labelText}>Số xu hiện tại của bạn</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.currentPointText}>0</Text>
              <Text style={styles.currentPointLabel}>Xu</Text>
            </View>
          </View>
        </View>
        <Section title="Chọn voucher bạn muốn đổi">
          <FlatList data={voucherItemList} renderItem={renderVoucherItem} />
        </Section>
      </View>
    </View>
  );
};

export default UserExchangeVoucherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7FA",
  },
  main: {
    padding: "5%",
  },
  currentPointContainer: {
    flexDirection: "row",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: "5%",
    borderColor: "rgba(203, 203, 212, 0.30)",
    borderWidth: 1,
  },
  currentPointContent: {
    marginLeft: "10%",
  },
  labelText: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: "10%",
  },
  currentPointText: {
    color: "#4ECB71",
    fontSize: 16,
    fontWeight: "600",
    marginRight: "5%",
  },
  currentPointLabel: {
    color: "#A6A6AA",
    fontSize: 16,
    fontWeight: "500",
  },
  selectVoucherContainer: {
    marginTop: "10%",
  },
});
