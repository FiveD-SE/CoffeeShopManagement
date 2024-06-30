import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { saveUserData } from "../../redux/actions/userActions";
import { db, uploadImageToFirebase } from "../../services/firebaseService";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Update from "expo-updates";
import { colors } from "../../assets/colors/colors";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Ionicons } from "@expo/vector-icons";

const CashierInformation = ({ userData, saveUserData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [todaySchedule, setTodaySchedule] = useState([]);
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const userImage = await uploadImageToFirebase(
        result.assets[0].uri,
        "user_" + userData.id
      );
      const updatedUserData = { ...userData, userImage: userImage };
      saveUserData(updatedUserData);
      const userDocRef = doc(db, "users", userData.id);
      await updateDoc(userDocRef, {
        userImage: userImage,
      });
    }
  };
  const Capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const renderHeader = (date) => {
    const formattedDate = selectedDate
      ? format(new Date(selectedDate), "'Ngày' dd 'tháng' MM 'năm' yyyy", {
          locale: vi,
        })
      : format(new Date(date), "'Ngày' dd 'tháng' MM 'năm' yyyy", {
          locale: vi,
        });

    return (
      <View>
        <Text style={{ fontSize: 16, fontFamily: "lato-bold" }}>
          {formattedDate}
        </Text>
      </View>
    );
  };
  const formatTime = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    const fetchShifts = async () => {
      const staffQuery = query(
        collection(db, "staffs"),
        where("staffId", "==", userData.id)
      );
      const staffSnapshot = await getDocs(staffQuery);
      const staffData = staffSnapshot.docs.map((doc) => doc.data());
      const shiftQuery = query(
        collection(db, "shifts"),
        where("branch", "==", staffData[0].branch)
      );
      const shifts = [];
      const querySnapshot = await getDocs(shiftQuery);
      querySnapshot.forEach((doc) => {
        shifts.push(doc.data());
      });
      setTodaySchedule(shifts);
    };
    fetchShifts();
  }, [selectedDate]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inforWrapper}>
        <TouchableOpacity
          style={styles.imageWrapper}
          onPress={() => handleImagePicker()}
        >
          <Image
            source={{ uri: userData.userImage }}
            resizeMode="stretch"
            style={styles.userImage}
          />
        </TouchableOpacity>
        <View style={styles.inforTextWrapper}>
          <Text style={styles.shopNameText}>TaiCoffeeShop</Text>
          <Text style={{ color: "#fff", fontSize: 14 }}>
            <Text>{userData.name}</Text>
            <Text> | </Text>
            <Text style={{ fontWeight: "600" }}>
              {Capitalize(userData.role)}
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.bodyApp}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            marginBottom: "5%",
          }}
        >
          Lịch làm việc
        </Text>
        <View style={styles.calender}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            onMonthChange={(date) => {
              setCurrentMonth(new Date(date.dateString));
            }}
            renderArrow={(direction) => {
              return direction === "left" ? (
                <Ionicons
                  name="chevron-back"
                  size={24}
                  color={colors.black_100}
                />
              ) : (
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={colors.black_100}
                />
              );
            }}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedColor: colors.green_100,
              },
            }}
            renderHeader={renderHeader}
          />
        </View>
        <Text style={styles.dateText}>
          {selectedDate
            ? format(
                new Date(selectedDate),
                "'Ngày' dd 'tháng' MM 'năm' yyyy",
                {
                  locale: vi,
                }
              )
            : ""}
        </Text>
        {todaySchedule.map((shift) => (
          <View style={styles.shiftContainer} key={shift.shiftId}>
            <Text style={styles.shiftText}>
              {shift.shiftName}: {formatTime(shift.startTime.toDate())} -{" "}
              {formatTime(shift.endTime.toDate())}
            </Text>
            <View style={styles.noteContainer}>
              <Text style={styles.noteText}>
                • Đi sớm dọn quán, check vệ sinh ca trước
              </Text>
              <Text style={styles.noteText}>• Dọn dẹp thật kĩ cho ca sau</Text>
              <Text style={styles.noteText}>
                • Về sau cùng nhớ tắt hết điện và đóng cửa
              </Text>
              <Text style={styles.noteText}>
                • Không làm việc riêng trong giờ
              </Text>
            </View>
          </View>
        ))}
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.removeItem("isRemembered");
            AsyncStorage.removeItem("email");
            AsyncStorage.removeItem("password");
            Update.reloadAsync();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

const mapDispatchToProps = {
  saveUserData,
};
export default connect(mapStateToProps, mapDispatchToProps)(CashierInformation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green_100,
  },
  inforWrapper: {
    flexDirection: "row",
    padding: "4%",
  },
  inforTextWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  shopNameText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bodyApp: {
    backgroundColor: "#f8f7fa",
    padding: "4%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "100%",
    paddingBottom: "10%",
  },
  calender: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    marginBottom: "5%",
    padding: "3%",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: "5%",
  },
  shiftContainer: {
    backgroundColor: colors.green_20,
    borderRadius: 10,
    padding: "4%",
    marginBottom: "5%",
    borderWidth: 1,
    borderColor: colors.grey_50,
  },
  shiftText: {
    fontSize: 16,
    fontFamily: "lato-bold",
    marginBottom: "2%",
  },
  noteContainer: {},
  noteText: {
    fontSize: 14,
    fontFamily: "lato-regular",
    textDecorationStyle: "dotted",
  },
  button: {
    backgroundColor: "#006d5d",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: "4%",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  imageWrapper: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    marginRight: "4%",
    borderWidth: 1,
    borderRadius: 100,
    borderColor: colors.grey_100,
    backgroundColor: colors.grey_10,
    elevation: 4,
  },
  userImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    aspectRatio: 1,
  },
});
