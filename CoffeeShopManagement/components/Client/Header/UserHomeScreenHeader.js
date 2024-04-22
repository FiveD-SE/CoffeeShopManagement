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

const COFFEE_BEAN_ICONS = require("../../../assets/coffee-bean.png");

const UserHomeScreenHeader = ({
  username,
  userImageSource,
  totalPoint,
  onPressBean,
  onPressNotify,
  onPressFavorite,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.imageContainer}>
          <Image
            source={userImageSource}
            style={styles.userImage}
            resizeMode="stretch"
          />
        </View>
        <View>
          <Text style={styles.welcomeText}>Xin chào,</Text>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Pressable style={styles.iconContainer} onPress={onPressBean}>
          <Image source={COFFEE_BEAN_ICONS} style={styles.icon} />
          <Text style={styles.iconText}>{totalPoint}</Text>
        </Pressable>
        <Pressable style={styles.iconContainer} onPress={onPressNotify}>
          <Icon name="bell" size={20} />
        </Pressable>
        <Pressable style={styles.iconContainer} onPress={onPressFavorite}>
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
