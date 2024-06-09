import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native'
import React from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from '@react-navigation/native';

export default function AdminClientScreen() {
  const navigation = useNavigation();
  
  const clientList = [
    {id: 1, name: 'Thắng', total: '10.000.000'},
    {id: 2, name: 'Nam', total: '8.000.000'},
    {id: 3, name: 'Linh', total: '5.000.000'},
    {id: 4, name: 'Hải', total: '3.000.000'},
    {id: 5, name: 'Trang', total: '2.000.000'},
    {id: 6, name: 'Thắng', total: '10.000.000'},
    {id: 7, name: 'Nam', total: '8.000.000'},
    {id: 8, name: 'Linh', total: '5.000.000'},
    {id: 9, name: 'Hải', total: '3.000.000'},
    {id: 10, name: 'Trang', total: '2.000.000'},
    {id: 11, name: 'Thắng', total: '10.000.000'},
    {id: 12, name: 'Nam', total: '8.000.000'},
    {id: 13, name: 'Linh', total: '5.000.000'},
    {id: 14, name: 'Hải', total: '3.000.000'},
    {id: 15, name: 'Trang', total: '2.000.000'},
  ]

  const renderClientItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => { navigation.navigate("ClientDetailHome")}}>
      <View style={{ width: '35%',  }}>
        <Text style={styles.text}>{item.id}</Text>
      </View>
      <View style={{ width: '35%' }}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
      <View style={{ width: '30%' }}>
        <Text style={styles.text}>{item.total}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <View style={styles.labelOptions}>
          <Text style={styles.text}>Tất cả</Text>
          <Ionicons name="chevron-down" size={20} color="#000" />
        </View>
        <View style={styles.labelSearch}>
          <Text style={styles.text}>Tìm kiếm</Text>
          <Ionicons name="search" size={20} color="#000" />
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.label}>
          <View style={styles.row}>
            <Ionicons name="people" size={30} color="#000" />
            <Text style={styles.downtrendicon}>
              <Ionicons name="trending-down" size={30} style={styles.downtrendicon}/> 20%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.amount}>69</Text>
            <Text style={styles.clientKind}>Tổng số{'\n'}khách hàng</Text>
          </View>
        </View>
        <View style={styles.label}>
          <View style={styles.row}>
            <MaterialIcons name="fiber-new" size={30} color="#000" />
            <Text style={styles.uptrendicon}>
              <Ionicons name="trending-up" size={30} style={styles.uptrendicon} /> 20%
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.amount}>69</Text>
            <Text style={styles.clientKind}>Khách hàng{'\n'}mới</Text>
          </View>
        </View>
      </View>

      <View style={styles.clientList}>
        <View style={styles.item}>
          <View style={{ width: '35%' }}>
            <Text style={styles.text}>Thứ hạng</Text>
          </View>
          <View style={{ width: '35%' }}>
            <Text style={styles.text}>Tên</Text>
          </View>
          <View style={{ width: '40%' }}>
            <Text style={styles.text}>Doanh số</Text>
          </View>
        </View>
        <FlatList
          data={clientList}
          renderItem={renderClientItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#000000',
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
    width: '70%',
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
    flex: 1,
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
    fontSize: 30,
  },
  downtrendicon: {
    color: '#F61A3D',
    fontSize: 30,
  },
  amount: {
    fontFamily: 'lato-bold',
    fontSize: 25,
    color: '#000000',
    lineHeight: 30,
  },
  clientKind: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#A3A3A3',
    lineHeight: 21,
  },
  text: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#A3A3A3',
    lineHeight: 18,
  }
});
