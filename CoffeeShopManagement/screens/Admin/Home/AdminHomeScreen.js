import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { connect } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const AdminHomeScreen = ({ userData }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [totalUnreadNotification, setTotalUnreadNotification] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      const users = await getDocs(query(collection(db, "users"), where("role", "==", "user")));
      setTotalUsers(users.docs.length);

      const staffs = await getDocs(collection(db, "staffs"));
      setTotalStaffs(staffs.docs.length);

      const notifications = await getDocs(collection(db, "admin_notifications"));
      const unreadNotifications = notifications.docs.filter((doc) => doc.data().notificationStatus === false);
      setTotalUnreadNotification(unreadNotifications.length);
    };

    fetchData();
  }, [isFocused]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <View style={styles.profile}>
          <Pressable onPress={() => navigation.navigate("AdminProfileDetail")}>
            <Image alt="avatar" source={{ uri: userData?.userImage }} style={styles.profileAvatar} />
          </Pressable>
          <View style={styles.profileBody}>
            <Text style={styles.profileRole}>Admin</Text>
            <Text style={styles.profileName}>{userData?.name}</Text>
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.navigate("Notification")}>
            {totalUnreadNotification > 0 && <Text style={styles.notificationCount}>{totalUnreadNotification}</Text>}
            <Icon name="bell" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.peopleDataContainer}>
          <View style={[styles.dataContainer, { marginLeft: "3%", marginRight: "2%" }]}>
            <View>
              <View style={styles.dataHeader}>
                <Text style={styles.dataTitle}>NHÂN VIÊN</Text>
                <Pressable onPress={() => navigation.navigate("StaffHome")}>
                  <Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
                </Pressable>
              </View>
              <View style={[styles.data, { padding: "7%" }]}>
                <View style={[styles.iconComponentContainer, { alignSelf: "flex-start", padding: "13%", backgroundColor: "#F0F5FF" }]}>
                  <MaterialIcons name="work" size={30} color="#699BF7" />
                </View>
                <Text style={[styles.dataNumber, { marginTop: "5%" }]}>{totalStaffs}</Text>
                <Text style={[styles.dataName, { marginTop: "3%" }]}>Tổng nhân viên</Text>
              </View>
            </View>
          </View>

          <View style={[styles.dataContainer, { marginLeft: "2%", marginRight: "3%" }]}>
            <View>
              <View style={styles.dataHeader}>
                <Text style={styles.dataTitle}>KHÁCH HÀNG</Text>
                <Pressable onPress={() => navigation.navigate("ClientHome")}>
                  <Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
                </Pressable>
              </View>
              <View style={[styles.data, { padding: "7%" }]}>
                <View style={[styles.iconComponentContainer, { alignSelf: "flex-start", padding: "13%", backgroundColor: "#EEFAF1" }]}>
                  <Ionicons name="people" size={30} color="#4ECB71" />
                </View>
                <Text style={[styles.dataNumber, { marginTop: "5%" }]}>{totalUsers}</Text>
                <Text style={[styles.dataName, { marginTop: "3%" }]}>Tổng khách hàng</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.dataContainer, { marginTop: "3%", marginHorizontal: "3%" }]}>
          <View style={styles.dataHeader}>
            <Text style={styles.dataTitle}>DOANH THU</Text>
            <Pressable onPress={() => navigation.navigate("Revenue")}>
              <Ionicons name="arrow-forward" size={20} color="#3A3A3A" />
            </Pressable>
          </View>
          <View style={[styles.data, { flex: 1, justifyContent: "center", alignItems: "center", padding: "3%" }]}>
            <View style={[styles.iconComponentContainer, { padding: "6%", backgroundColor: "#FFFAE6" }]}>
              <Icon name="money-bills" size={30} color="#FFC700" />
            </View>
            <Text style={[styles.dataNumber, { marginTop: "3%" }]}>100.000.000</Text>
            <Text style={[styles.dataName, { marginTop: "1%" }]}>Tổng doanh thu</Text>
          </View>
          <View style={[styles.data, { flex: 1, justifyContent: "center", alignItems: "center", padding: "3%", marginTop: "3%" }]}>
            <View style={[styles.iconComponentContainer, { padding: "6%", backgroundColor: "#FFEACC" }]}>
              <FontAwesome name="line-chart" size={30} color="#FF9800" />
            </View>
            <Text style={[styles.dataNumber, { marginTop: "3%" }]}>33.300.000</Text>
            <Text style={[styles.dataName, { marginTop: "1%" }]}>Tăng trưởng</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};

export default connect(mapStateToProps)(AdminHomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: "14%",
    marginBottom: "5%",
    marginHorizontal: "3%",
  },
  profile: {
    padding: "3%",
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 12,
  },
  profileBody: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#292929",
  },
  profileRole: {
    fontSize: 16,
    fontWeight: "400",
    color: "#858585",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "5%",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#CCCCCC",
  },
  body: {
    flex: 1,
    flexDirection: "column",
  },
  iconComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  peopleDataContainer: {
    flexDirection: "row",
  },
  dataContainer: {
    flex: 1,
    padding: "3%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  dataHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dataTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#3A3A3A",
  },
  data: {
    marginTop: "2%",
    flexDirection: "column",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CCCCCC",
  },
  dataNumber: {
    fontSize: 26,
    fontWeight: "600",
    color: "#3A3A3A",
    marginTop: "3%",
  },
  dataName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3A3A3A",
    marginTop: "1%",
  },
  notificationCount: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#C80036',
    color: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 19,
    fontWeight: 'bold',
  },
});
