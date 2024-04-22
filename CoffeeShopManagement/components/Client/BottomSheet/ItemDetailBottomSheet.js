import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { BottomSheetModal, BottomSheetBackdrop } from "@gorhom/bottom-sheet";

import Icon from "react-native-vector-icons/FontAwesome6";
import Section from "../Section";
import SizeItem from "../../../components/Client/Button/SizeItem";
import OptionSection from "../List/OptionSection";
import ToppingButton from "../../../components/Client/Button/ToppingButton";

const ItemDetailBottomSheet = ({
  product,
  bottomSheetRef,
  snapPoints,
  setIsOpen,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);
  const optionList = [{ title: "Đường" }, { title: "Sữa" }, { title: "Đá" }];
  const sugarOptionList = ["Bình thường", "Ít đường", "Không đường"];
  const milkOptionList = ["Bình thường", "Ít sữa", "Không sữa"];
  const iceOptionList = ["Bình thường", "Ít đá", "Không đá"];
  const sizeItemList = [
    {
      size: "S",
      price: 59000,
    },
    {
      size: "M",
      price: 79000,
    },
    ,
    {
      size: "L",
      price: 99000,
    },
  ];
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        animatedIndex={{
          value: 1,
        }}
      />
    ),
    []
  );

  const handleSizePress = (index) => {
    setSelectedSizeIndex(index);
  };

  const renderSizeItemList = () => {
    return sizeItemList.map((item, index) => (
      <SizeItem
        key={index}
        index={index}
        size={item.size}
        price={item.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
        isSelected={selectedSizeIndex === index}
        onPress={handleSizePress}
      />
    ));
  };

  const chooseOptionList = (title) => {
    if (title === "Đường") {
      return sugarOptionList;
    }
    if (title === "Sữa") {
      return milkOptionList;
    }
    if (title === "Đá") {
      return iceOptionList;
    }
  };

  const renderOptionSection = () => {
    return optionList.map((item, index) => (
      <OptionSection
        key={index}
        title={item.title}
        options={chooseOptionList(item.title)}
      />
    ));
  };

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheet}
      onDismiss={() => setIsOpen(false)}
      backdropComponent={renderBackdrop}
      enableContentPanningGesture={false}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../../../assets/starbucks.jpeg")}
            />
          </View>
          <View style={styles.main}>
            <View style={styles.header}>
              <View style={styles.contentContainer}>
                <Text style={styles.title}>
                  Smoothie Xoài Nhiệt Đới Granola
                </Text>
                <Text style={styles.price}>Price</Text>
              </View>
              <Pressable style={styles.favoriteButton}>
                <Icon name="heart" size={24} />
              </Pressable>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam,
                vivamus duis laoreet amet. Aliquet elementum ultrices molestie
                netus donec pellentesque quis.
              </Text>
            </View>
            <View style={{ marginTop: "5%" }}>
              <Section title="Kích cỡ">
                <View style={styles.sizeContainer}>{renderSizeItemList()}</View>
              </Section>
            </View>
            <View style={{ marginTop: "5%" }}>
              <Section title="Tuỳ chọn khác">
                <View style={styles.optionContainer}>
                  {renderOptionSection()}
                </View>
              </Section>
            </View>
            <ToppingButton />
          </View>
        </View>
        <View style={styles.footer}>
          <Pressable style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Thêm vào giỏ</Text>
            <Icon name="ellipsis-vertical" color="#FFFFFF" />
            <Text style={styles.addToCartButtonText}>59.000đ</Text>
          </Pressable>
          <Pressable style={styles.viewCartButton}>
            <Icon style={styles.viewCartButtonIcon} name="cart-shopping" />
          </Pressable>
        </View>
      </ScrollView>
    </BottomSheetModal>
  );
};

export default ItemDetailBottomSheet;

const styles = StyleSheet.create({
  bottomSheet: {
    borderRadius: 30,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "transparent",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {},
  image: {
    width: "100%",
    height: 300,
  },
  main: {
    flex: 0.5,
    padding: "5%",
  },
  header: {
    flexDirection: "row",
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: "#3A3A3A",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
  },
  price: {
    color: "#A6A6AA",
    fontSize: 16,
    fontWeight: "500",
    marginTop: "5%",
  },
  favoriteButton: {},
  descriptionContainer: {
    marginTop: "5%",
  },
  description: {
    color: "#3A3A3A",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  sizeContainer: {
    flexDirection: "row",
    marginTop: "5%",
    borderBottomWidth: 1,
    borderColor: "rgba(58, 58, 58, 0.10)",
    paddingBottom: "5%",
  },
  optionContainer: {
    borderBottomWidth: 1,
    borderColor: "rgba(58, 58, 58, 0.10)",
    paddingBottom: "5%",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: "5%",
    borderColor: "rgba(58, 58, 58, 0.20)",
    borderTopWidth: 1,
  },
  totalPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "700",
  },
  price: {
    color: "#3a3a3a",
    fontSize: 20,
    fontWeight: "700",
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFA730",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: "4%",
    borderRadius: 20,
    marginRight: "2%",
  },
  addToCartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "400",
  },
  viewCartButton: {
    flexDirection: "row",
    backgroundColor: "rgba(166, 166, 170, 0.20)",
    alignItems: "center",
    paddingHorizontal: "6%",
    borderRadius: 20,
  },
  viewCartButtonIcon: {
    color: "#A6A6AA",
    fontSize: 16,
    fontWeight: "600",
  },
});
