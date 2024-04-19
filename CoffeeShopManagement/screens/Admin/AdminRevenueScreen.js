import { View, Text, ScrollView, StyleSheet } from 'react-native'
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
  const [value, setValue] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tổng doanh thu</Text>
          <Dropdown
            style={[styles.dropDown, isFocus && { borderColor: 'blue' }]}
            data={viewByRevenue}
            selectedTextStyle={styles.selectedTextStyle}
            value={value}
            onFocus={() => setIsFocus(true)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}/>
        </View>
      </View>
      <View style={styles.sectionContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tăng trưởng</Text>
          <Dropdown
            style={[styles.dropDown, isFocus && { borderColor: 'blue' }]}
            data={viewByStatic}
            selectedTextStyle={styles.selectedTextStyle}
            value={value}
            onFocus={() => setIsFocus(true)} 
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}/>
        </View>
      </View>
    </View>
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
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "600",
  },
  
  dropDown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});