import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import Entypo from '@expo/vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';

const viewByRevenue = [
  { label: "Tuần", value: "Week" },
  { label: "Tháng", value: "Month" },
  { label: "Quý", value: "Quarter" },
  { label: "Năm", value: "Year" }
];

const viewByStatic = [
  { label: "Tuần", value: "Week" },
  { label: "Tháng", value: "Month" },
  { label: "Quý", value: "Quarter" },
  { label: "Năm", value: "Year" }
];

const AdminRevenueScreen = ({ route }) => {
  const navigation = useNavigation();
  const branch = route.params ? route.params.branch : undefined;
  const [isRevenueFocus, setIsRevenueFocus] = useState(false);
  const [isStaticFocus, setIsStaticFocus] = useState(false);
  const [viewByRevenueValue, setViewByRevenueValue] = useState("Week");
  const [viewByStaticValue, setViewByStaticValue] = useState("Week");

  const [revenueData, setRevenueData] = useState([]);
  const [growthData, setGrowthData] = useState([]);

  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    if (!branch) return;
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.deliveryBranch.branchId === branch.branchId) {
          ordersData.push(data);
        }
      });
      setOrdersData(ordersData);
    });

    return () => unsubscribe();
  }, [branch]);

  useEffect(() => {
    const processData = () => {
      const currentDate = new Date();
      let groupedData = [];

      switch (viewByRevenueValue) {
        case "Week":
          groupedData = groupDataByWeek(ordersData, currentDate);
          break;
        case "Month":
          groupedData = groupDataByMonth(ordersData, currentDate);
          break;
        case "Quarter":
          groupedData = groupDataByQuarter(ordersData, currentDate);
          break;
        case "Year":
          groupedData = groupDataByYear(ordersData, currentDate);
          break;
        default:
          groupedData = groupDataByWeek(ordersData, currentDate);
          break;
      }

      setRevenueData(groupedData);
    };

    processData();
  }, [ordersData, viewByRevenueValue]);

  useEffect(() => {
    const calculateGrowth = () => {
      const currentDate = new Date();
      let growth = [];

      switch (viewByStaticValue) {
        case "Week":
          growth = calculateGrowthByWeek(ordersData, currentDate);
          break;
        case "Month":
          growth = calculateGrowthByMonth(ordersData, currentDate);
          break;
        case "Quarter":
          growth = calculateGrowthByQuarter(ordersData, currentDate);
          break;
        case "Year":
          growth = calculateGrowthByYear(ordersData, currentDate);
          break;
        default:
          growth = calculateGrowthByWeek(ordersData, currentDate);
          break;
      }

      setGrowthData(growth);
    };

    calculateGrowth();
  }, [ordersData, viewByStaticValue]);

  const calculateGrowthByWeek = (orders, date) => {
    const startOfWeek = getStartOfWeek(date);
    let weekGrowth = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      const dayOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        return (
          orderDate.getDate() === day.getDate() &&
          orderDate.getMonth() === day.getMonth() &&
          orderDate.getFullYear() === day.getFullYear()
        );
      });
      const totalRevenue = dayOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      weekGrowth.push({ label: i === 6 ? "CN" : `T${i + 2}`, value: totalRevenue });
    }
    return weekGrowth;
  };

  const calculateGrowthByMonth = (orders, date) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    let monthGrowth = [];

    for (let i = 0; i <= currentMonth; i++) {
      const monthOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        return orderDate.getMonth() === i && orderDate.getFullYear() === currentYear;
      });
      const totalRevenue = monthOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      monthGrowth.push({ label: new Date(currentYear, i).toLocaleString('default', { month: 'short' }), value: totalRevenue });
    }
    return monthGrowth;
  };

  const calculateGrowthByQuarter = (orders, date) => {
    const currentQuarter = Math.floor((date.getMonth() + 3) / 3);
    const currentYear = date.getFullYear();
    let quarterGrowth = [];

    for (let i = 1; i <= currentQuarter; i++) {
      const quarterOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        const orderQuarter = Math.floor((orderDate.getMonth() + 3) / 3);
        return orderQuarter === i && orderDate.getFullYear() === currentYear;
      });
      const totalRevenue = quarterOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      quarterGrowth.push({ label: `Q${i}`, value: totalRevenue });
    }
    return quarterGrowth;
  };

  const calculateGrowthByYear = (orders, date) => {
    const currentYear = date.getFullYear();
    let yearGrowth = [];

    for (let i = currentYear - 5; i <= currentYear; i++) {
      const yearOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        return orderDate.getFullYear() === i;
      });
      const totalRevenue = yearOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      yearGrowth.push({ label: i.toString(), value: totalRevenue });
    }
    return yearGrowth;
  };

  const groupDataByWeek = (orders, date) => {
    const startOfWeek = getStartOfWeek(date);
    let weekData = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      const dayOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        return (
          orderDate.getDate() === day.getDate() &&
          orderDate.getMonth() === day.getMonth() &&
          orderDate.getFullYear() === day.getFullYear()
        );
      });
      const totalRevenue = dayOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      weekData.push({ label: i === 6 ? "CN" : `T${i + 2}`, value: totalRevenue });
    }
    return weekData;
  };

  const groupDataByMonth = (orders, date) => {
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    let monthData = [];

    for (let i = 0; i <= currentMonth; i++) {
      const monthOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        return orderDate.getMonth() === i && orderDate.getFullYear() === currentYear;
      });
      const totalRevenue = monthOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      monthData.push({ label: new Date(currentYear, i).toLocaleString('default', { month: 'short' }), value: totalRevenue });
    }
    return monthData;
  };

  const groupDataByQuarter = (orders, date) => {
    const currentQuarter = Math.floor((date.getMonth() + 3) / 3);
    const currentYear = date.getFullYear();
    let quarterData = [];

    for (let i = 1; i <= currentQuarter; i++) {
      const quarterOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        const orderQuarter = Math.floor((orderDate.getMonth() + 3) / 3);
        return orderQuarter === i && orderDate.getFullYear() === currentYear;
      });
      const totalRevenue = quarterOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      quarterData.push({ label: `Q${i}`, value: totalRevenue });
    }
    return quarterData;
  };

  const groupDataByYear = (orders, date) => {
    const currentYear = date.getFullYear();
    let yearData = [];

    for (let i = currentYear - 5; i <= currentYear; i++) {
      const yearOrders = orders.filter(order => {
        const orderDate = order.orderDate.toDate();
        return orderDate.getFullYear() === i;
      });
      const totalRevenue = yearOrders.reduce((sum, order) => sum + order.orderTotalPrice, 0);
      yearData.push({ label: i.toString(), value: totalRevenue });
    }
    return yearData;
  };

  const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const handleSelectBranch = () => {
    navigation.navigate("AdminSelectBranchScreen");
  };

  const formatCurrency = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.selectBranchContainer}>
          <View style={styles.row}>
            <Entypo name="address" size={24} color="black" style={styles.icon} />
            <Text style={styles.selectBranchText}>{branch ? branch.branchName : "Chọn chi nhánh"}</Text>
          </View>
          <Pressable onPress={handleSelectBranch}>
            <Entypo name="chevron-small-down" size={24} color="black" />
          </Pressable>
        </View>
        {branch && (
          <>
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
              <View style={styles.chartContainer}>
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
                  textFontSize={15}
                  textColor="#151515"
                />
              </View>
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
              <View style={styles.chartContainer}>
                <LineChart
                  noOfSections={5}
                  data={growthData}
                  color={'#006C5E'}
                  thickness={3}
                  dataPointsColor={'#FFA730'}
                  yAxisThickness={0}
                  xAxisThickness={0}
                  isAnimated
                  showValuesAsDataPointsText
                  textFontSize={15}
                  textColor="#151515"
                />
              </View>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default AdminRevenueScreen;

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
  },
  selectBranchContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10
  },
  selectBranchText: {
    fontSize: 16,
    fontFamily: 'lato-regular',
    lineHeight: 20,
    color: '#151515'
  }
});
