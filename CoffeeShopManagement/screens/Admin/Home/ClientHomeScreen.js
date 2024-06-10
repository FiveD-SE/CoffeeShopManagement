import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../services/firebaseService';
import { ScrollView } from 'react-native-gesture-handler';
import SearchBar from '../../../components/Client/SearchBar';

const AdminClientScreen = () => {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalNewUsers, setTotalNewUsers] = useState(0);
  const [filteredUsersData, setFilteredUsersData] = useState([]);
  const [totalNewUsersPercentage, setTotalNewUsersPercentage] = useState(0);

  const date30DaysAgo = new Date();
  date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
  const handleNavigateToClientDetail = (item) => {
    console.log(item)
    navigation.navigate("ClientDetailHome", {
      selectedUser: item,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('role', '==', 'user'));
      const usersSnapshot = await getDocs(userQuery);
      let usersListData = usersSnapshot.docs.map(doc => doc.data());
    
      usersListData = usersListData.sort((a, b) => b.credit - a.credit);
      
      const date30DaysAgo = new Date();
      date30DaysAgo.setDate(date30DaysAgo.getDate() - 30);
      const date60DaysAgo = new Date();
      date60DaysAgo.setDate(date60DaysAgo.getDate() - 60);
    
      const newUserThisMonth = usersListData.filter(user => {
        const userCreatedDate = new Date(user.createdAt.seconds * 1000);
        return userCreatedDate >= date30DaysAgo;
      });

      const newUserLastMonth = usersListData.filter(user => {
        const userCreatedDate = new Date(user.createdAt.seconds * 1000);
        return userCreatedDate >= date60DaysAgo && userCreatedDate < date30DaysAgo;
      });

      let totalNewUsersTrending = 0;
      if (newUserLastMonth.length === 0) {
        totalNewUsersTrending = newUserThisMonth.length * 100;
      } else {
        totalNewUsersTrending = ((newUserThisMonth.length - newUserLastMonth.length) / newUserLastMonth.length) * 100;
      }
      
      setUsersData(usersListData);
      setFilteredUsersData(usersListData);
      setTotalUsers(usersListData.length);
      setTotalNewUsersPercentage(totalNewUsersTrending);
      setTotalNewUsers(newUserThisMonth.length);
    };
    
    fetchUsers();

  }, []);

  const splitName = (name) => {
    return name.split(" ").pop();
  }

  const handleSearch = (query) => {
    const filteredList = usersData.filter(item => 
      item.fullName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsersData(filteredList);
  };

  const RenderUserList = () => {
    return (
      filteredUsersData.map((item, index) => (
        <Pressable key={index} style={styles.item} onPress={() => handleNavigateToClientDetail(item)}>
          <View style={{ width: '25%', alignItems: 'center' }}>
            <Text style={styles.text}>{index + 1}</Text>
          </View>
          <View style={{ width: '45%', alignItems: 'center' }}>
            <Text style={styles.text}>{splitName(item.fullName)}</Text>
          </View>
          <View style={{ width: '30%', alignItems: 'center' }}>
            <Text style={styles.text}>{item.credit}</Text>
          </View>
        </Pressable>
    )))
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onChangeText={handleSearch}/>
      <View style={styles.section}>
        <View style={styles.label}>
          <View style={styles.row}>
            <Ionicons name="people" size={35} color="#000" />
          </View>
          <View style={styles.row}>
          <Text style={styles.clientKind}>Tổng số khách{'\n'}hàng</Text>
            <Text style={styles.amount}>{totalUsers}</Text>
          </View>
        </View>
        <View style={styles.label}>
          <View style={styles.row}>
            <MaterialIcons name="fiber-new" size={35} color="#000" />
              <Text style={totalNewUsersPercentage > 0 ? styles.uptrendicon : styles.downtrendicon}>
                <Ionicons name={totalNewUsersPercentage > 0 ? "trending-up" : "trending-down"} size={30} style={totalNewUsersPercentage > 0 ? styles.uptrendicon : styles.downtrendicon}/> {Math.abs(Number(totalNewUsersPercentage.toFixed(1)))}%
              </Text>
          </View>
          <View style={styles.row}>
          <Text style={styles.clientKind}>Khách hàng mới{'\n'}</Text>
            <Text style={styles.amount}>{totalNewUsers}</Text>
          </View>
        </View>
      </View>

      <View style={styles.clientList}>
        <View style={styles.item}>
          <View style={{ width: '25%', alignItems: 'center' }}>
            <Text style={styles.text}>Thứ hạng</Text>
          </View>
          <View style={{ width: '45%', alignItems: 'center' }}>
            <Text style={styles.text}>Tên</Text>
          </View>
          <View style={{ width: '30%', alignItems: 'center' }}>
            <Text style={styles.text}>Doanh số</Text>
          </View>
        </View>
        <ScrollView>
          <RenderUserList />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default AdminClientScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  section:{
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  labelOptions: {
    flexDirection: "row",   
    width: '25%',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  labelSearch: {
    flexDirection: "row",
    width: '100%',
    alignItems: "center",
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  label: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    marginHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  clientList: {
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  uptrendicon: {
    color: '#4ECB71',
    fontSize: 25,
  },
  downtrendicon: {
    color: '#F61A3D',
    fontSize: 25,
  },
  amount: {
    fontFamily: 'lato-bold',
    fontSize: 25,
    color: '#000000',
    lineHeight: 30,
  },
  clientKind: {
    fontFamily: 'lato-regular',
    fontSize: 13,
    color: '#A3A3A3',
    lineHeight: 15,
  },
  text: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#A3A3A3',
    lineHeight: 18,
  }
});
