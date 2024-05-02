import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown'
import { BarChart, LineChart } from 'react-native-gifted-charts'

const WeekData = [
  { label: "T2", value: 50 },
  { label: "T3", value: 100 },
  { label: "T4", value: 350 },
  { label: "T5", value: 200 },
  { label: "T6", value: 550 },
  { label: "T7", value: 300 },
  { label: "CN", value: 150 },
]

const QuarterData = [
  { label: "First", value: 1000 },
  { label: "Second", value: 3700 },
  { label: "Third", value: 5000 },
  { label: "Fourth", value: 2900 },
]

const MonthData = [
  { label: "Jan", value: 500 },
  { label: "Feb", value: 1000 },
  { label: "Mar", value: 3500 },
  { label: "Apr", value: 2000 },
  { label: "May", value: 5500 },
  { label: "Jun", value: 3000 },
  { label: "Jul", value: 1500 },
  { label: "Aug", value: 4000 },
  { label: "Sep", value: 4500 },
  { label: "Oct", value: 5000 },
  { label: "Nov", value: 2500 },
  { label: "Dec", value: 6000 },
]

const YearData = [
  { label: "2019", value: 50910 },
  { label: "2020", value: 10000 },
  { label: "2021", value: 35030 },
  { label: "2022", value: 20030 },
  { label: "2023", value: 55010 },
  { label: "2024", value: 30040 },
]

const viewByRevenue = [
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
  const [isRevenueFocus, setIsRevenueFocus] = useState(false);
  const [isStaticFocus, setIsStaticFocus] = useState(false);
  const [viewByRevenueValue, setViewByRevenueValue] = useState("Week")
  const [viewByStaticValue, setViewByStaticValue] = useState("Week");

  const [revenueData, setRevenueData] = useState();
  const [staticData, setStaticData] = useState();

  useEffect(() => {
    switch (viewByRevenueValue) {
      case "Week":
        setRevenueData(WeekData);
        break;
      case "Month":
        setRevenueData(MonthData);
        break;
      case "Quarter":
        setRevenueData(QuarterData);
        break;
      case "Year":
        setRevenueData(YearData);
        break;
      default:
        setRevenueData(WeekData);
        break;
    }
  }, [viewByRevenueValue]);

  useEffect(() => {
    switch (viewByStaticValue) {
      case "Week":
        setStaticData(WeekData);
        break;
      case "Month":
        setStaticData(MonthData);
        break;
      case "Quarter":
        setStaticData(QuarterData);
        break;
      case "Year":
        setStaticData(YearData);
        break;
      default:
        setStaticData(WeekData);
        break;
    }
  }, [viewByStaticValue]);

  return (
    <View style={styles.container}>
      <View style={styles.sectionContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tổng doanh thu</Text>

          <View style={styles.dropDownBox}>
            <Dropdown
              style={[styles.dropDown, isRevenueFocus && { borderColor: '#006C5E' }]}
              data={viewByRevenue}
              selectedTextStyle={styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              onFocus={() => setIsRevenueFocus(true)}
              value={viewByRevenueValue}
              onChange={item => {
                setViewByRevenueValue(item.value);
                setIsRevenueFocus(false);
              }} />
          </View>
        </View>

        <ScrollView style={styles.chartContainer}>
          <BarChart
            noOfSections={5}
            barBorderRadius={5}
            frontColor="#006C5E"
            data={revenueData}
            yAxisThickness={0}
            xAxisThickness={0}
            isAnimated
            showValuesAsTopLabel
            yAxisLabelFormatter={(value) => value.toFixed(1)}
          />
        </ScrollView>
      </View >

      <View style={styles.sectionContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Tăng trưởng</Text>
          <View style={styles.dropDownBox}>
            <Dropdown
              style={[styles.dropDown, isStaticFocus && { borderColor: '#006C5E' }]}
              data={viewByStatic}
              selectedTextStyle={styles.selectedTextStyle}
              labelField="label"
              valueField="value"
              onFocus={() => setIsStaticFocus(true)}
              value={viewByStaticValue}
              onChange={item => {
                setViewByStaticValue(item.value);
                setIsStaticFocus(false);
              }} />
          </View>
        </View>
        <ScrollView style={styles.chartContainer}>
          <LineChart
            noOfSections={5}
            data={staticData}
            color={'#006C5E'}
            thickness={3}
            dataPointsColor={'#FFA730'}
            yAxisThickness={0}
            xAxisThickness={0}
            isAnimated
            showValuesAsDataPointsText
          />
        </ScrollView>
      </View>
    </View >
  )
}

export default AdminRevenueScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "3%",
    marginVertical: "2%"
  },

  sectionContainer: {
    flex: 1,
    marginTop: "2%",
    backgroundColor: "#ffffff",
    padding: "2%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DDDDDD"
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
  chartContainer: {
    marginTop: "3%",
    flex: 1
  }
});