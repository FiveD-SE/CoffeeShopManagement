import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, FlatList, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';

export default function AdminPayrollScreen() {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = useState('all');

  const [payrollList, setPayrollList] = useState([]);
  const [filterPayrollList, setFilterPayrollList] = useState([]);

  useFocusEffect(useCallback(
    () => {
      const unsub = onSnapshot(
        query(collection(db, "payrolls"), orderBy('createdAt', 'desc')),
        (snapshot) => {
          setPayrollList(snapshot.docs.map((doc) => doc.data()));
          setFilterPayrollList(snapshot.docs.map((doc) => doc.data()));
        }
      );
      return () => unsub();
    }, []));

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'all') {
      setFilterPayrollList(payrollList);
    } else if (tab === 'paid') {
      setFilterPayrollList(payrollList.filter(item => item.status === true));
    } else if (tab === 'unpaid') {
      setFilterPayrollList(payrollList.filter(item => item.status === false));
    }
  };
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatSalary = (salary) => {
    const formattedSalary = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(salary);
    return formattedSalary;
  };

  const renderPayrollItem = ({ item }) => {
    const caculateTotal = () => {
      let total = 0;
      item.staffs.forEach(staff => {
        total += staff.role.salary * staff.workingHours;
      });
      return total;
    }
    return (
      <View style={styles.item}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={[styles.textPrimary, { marginBottom: 15 }]}>Mã bảng lương: {item.payrollId}</Text>
            <Text style={styles.textSecondary}>{formatDate(item.startDate.toDate())}-{formatDate(item.endDate.toDate())}</Text>
          </View>
          <Pressable onPress={() => { navigation.navigate("AdminPayrollDetailsScreen", { staffs: item.staffs, payrollId: item.payrollId, startDate: item.startDate, endDate: item.endDate, status: item.status, total: caculateTotal() }) }}>
            <FontAwesome name='angle-right' size={32} />
          </Pressable>
        </View>
        <View style={styles.blackLine} />
        <View style={styles.row}>
          <Text style={styles.textPrimary}>Tổng lương</Text>
          <Text style={styles.textPrimary}>{formatSalary(caculateTotal())} </Text>
        </View>
        <View style={[styles.statusLabel, { backgroundColor: item.status ? '#F2F8F7' : '#FEE8EC' }]}>
          <Text style={[styles.statusText, { color: item.status ? '#006C5E' : '#F61A3D' }]}>
            {item.status ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </Text>
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.heading}>
        {/* Tab buttons */}
        <Pressable
          style={[styles.headingLabel, selectedTab === 'all' && styles.selectedLabel]}
          onPress={() => handleTabPress('all')}
        >
          <View style={styles.labelWrapper}>
            <Text style={[styles.headingText, selectedTab === 'all' && styles.selectedText]}>Tất cả</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.headingLabel, selectedTab === 'paid' && styles.selectedLabel]}
          onPress={() => handleTabPress('paid')}
        >
          <View style={styles.labelWrapper}>
            <Text style={[styles.headingText, selectedTab === 'paid' && styles.selectedText]}>Đã thanh toán</Text>
          </View>
        </Pressable>
        <Pressable
          style={[styles.headingLabel, selectedTab === 'unpaid' && styles.selectedLabel]}
          onPress={() => handleTabPress('unpaid')}
        >
          <View style={styles.labelWrapper}>
            <Text style={[styles.headingText, selectedTab === 'unpaid' && styles.selectedText]}>Chưa thanh toán</Text>
          </View>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.body}>
        <View style={styles.search}>
          <TextInput placeholder='Tìm kiếm'
            style={{
              color: '#000',
              fontFamily: 'Lato-Regular',
              fontSize: 16,
              fontWeight: '600',
              fontStyle: 'normal',
            }}
          />
        </View>

        {/* Payroll List */}
        <FlatList
          data={filterPayrollList}
          renderItem={renderPayrollItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headingLabel: {
    flex: 1,
    alignItems: 'center'
  },
  headingText: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  selectedLabel: {
    borderBottomWidth: 2,
    borderBottomColor: '#006C5E'
  },
  selectedText: {
    color: '#006C5E'
  },
  labelWrapper: {
    paddingBottom: 12
  },
  body: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  search: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBCBD4',
    borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2
  },
  item: {
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#CBCBD4',
    borderRadius: 10,
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
    marginVertical: 10,
    gap: 13
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 10
  },
  blackLine: {
    height: 1,
    backgroundColor: '#E5E4E7'
  },
  statusLabel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    textAlign: 'center',
  },
  statusText: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    textAlign: 'center'
  },
  textPrimary: {
    fontFamily: 'lato-bold',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  textSecondary: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#9C9C9C',
    textAlign: 'center',
  }
});