import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome6";
import React from "react";

const UserHomeScreenHeader = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/google.png")}
            style={styles.userImage}
            resizeMode="stretch"
          />
        </View>
        <View>
          <Text style={styles.welcomeText}>Xin chào,</Text>
          <Text style={styles.usernameText}>Trương Lê Vĩnh Phúc</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Pressable style={styles.iconContainer}>
          <Image
            source={require("../../assets/coffee-bean.png")}
            style={styles.icon}
          />
          <Text style={styles.iconText}>20</Text>
        </Pressable>
        <Pressable style={styles.iconContainer}>
          <Icon name="bell" size={20} />
        </Pressable>
        <Pressable style={styles.iconContainer}>
          <Icon name="heart" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default UserHomeScreenHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    marginTop: Platform.select({
      android: "10%",
    }),
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imageContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10%",
    borderRadius: 30,
  },
  userImage: {
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    color: "#3a3a3a",
    fontSize: 14,
    marginRight: "2%",
  },
  usernameText: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "700",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "2%",
    padding: "5%",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "rgba(58,58,58,0.2)",
  },
  icon: {
    marginRight: "5%",
  },
  iconText: {
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "600",
  },
});
