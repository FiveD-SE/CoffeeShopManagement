import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

const viewByRevenue = [
  { label: "Hôm nay", value: "Today" },
  { label: "Tuần", value: "Week" },
  { label: "Tháng", value: "Month" },
  { label: "Quý", value: "Quarter " },
  { label: "Năm", value: "Year" }
]

const viewByStatic = [
  { label: "Tuần", value: "Week" },
  { label: "Tháng", value: "Month" },
  { label: "Quý", value: "Quarter " },
  { label: "Năm", value: "Year" }
]

const AdminRevenueScreen = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [viewByRevenueValue, setViewByRevenueValue] = useState("Today")
  const [viewByStaticValue, setViewByStaticValue] = useState("Week");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tổng doanh thu</Text>

          <View style={styles.dropDownBox}>
            <Dropdown
              style={[styles.dropDown, isFocus && { borderColor: '#006C5E' }]}
              data={viewByRevenue}
              selectedTextStyle={styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              onFocus={() => setIsFocus(true)}
              value={viewByRevenueValue}
              onChange={item => {
                setViewByRevenueValue(item.value);
                setIsFocus(false);
              }} />
          </View>
        </View>

        <View>
          <Text>Chart</Text>
        </View>
      </View >

      <View style={styles.sectionContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tăng trưởng</Text>
          <View style={styles.dropDownBox}>
            <Dropdown
              style={[styles.dropDown, isFocus && { borderColor: 'blue' }]}
              data={viewByStatic}
              selectedTextStyle={styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              onFocus={() => setIsFocus(true)}
              value={viewByStaticValue}
              onChange={item => {
                setViewByStaticValue(item.value);
                setIsFocus(false);
              }} />
          </View>
        </View>
        <View>
          <Text>Chart</Text>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default AdminRevenueScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "5%",
  },

  sectionContainer: {
    flex: 1,
    marginVertical: "3%"
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "600",
  },

  dropDown: {
    backgroundColor: "#ffffff",
    borderColor: "rgba(58,58,58,0.2)",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: "6%",
  },

  dropDownBox: {
    flex: 0.4,
  },

  selectedTextStyle: {
    fontSize: 16,
  },
});