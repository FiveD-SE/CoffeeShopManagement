import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';

export default function SelectBranch() {
    const [nearbyBranch, setNearbyBranch] = useState([
        { id: '1', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '2', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
      ]);
      const [ortherBranch, setOrtherBranch] = useState([
        { id: '3', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '4', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
    ]);
    
    const renderNearbyBranchItem = ({ item }) => (
    <TouchableOpacity style={styles.addressItem}>
        <Image style={styles.image}/>
        <View style={styles.vertical}> 
            <View>
              <Text style={styles.nameBranchText}>{item.nameBranch}</Text>
              <Text style={styles.addressBranchText}>{item.addressBranch}</Text>
            </View>
            <Text style={styles.distanceBranchText}>{item.distanceBranch}</Text>
        </View>
    </TouchableOpacity>
    );

    const renderOrtherBranchItem = ({ item }) => (
      <TouchableOpacity style={styles.addressItem}>
      <Image style={styles.image}/>
      <View style={styles.vertical}> 
          <View>
            <Text style={styles.nameBranchText}>{item.nameBranch}</Text>
            <Text style={styles.addressBranchText}>{item.addressBranch}</Text>
          </View>
          <Text style={styles.distanceBranchText}>{item.distanceBranch}</Text>
      </View>
  </TouchableOpacity>
    );

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.section}>
                <Text style={styles.sectionHeading}>Chi nhánh gần đây</Text>
                <FlatList
                data={nearbyBranch}
                renderItem={renderNearbyBranchItem}
                keyExtractor={item => item.id}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionHeading}>Các chi nhánh khác</Text>
                <FlatList
                data={ortherBranch}
                renderItem={renderOrtherBranchItem}
                keyExtractor={item => item.id}
                />
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollViewContent: {
      paddingHorizontal: 20,
      paddingVertical: 50,
    },
    section: {
      marginBottom: 20,
    },
    sectionHeading: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    addressItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      padding: 15,
    },
    icon: {
      marginRight: 15,
    },
    editIcon: {
      marginLeft: 'auto',
      color: '#FFA730',
    },
    nameBranchText: {
      flex: 1,
      fontFamily: 'Lato',
      fontSize: 16,
      color: '#9C9C9C',
    },
    addressBranchText: {
      flex: 1,
      fontFamily: 'Lato',
      fontSize: 16,
      color: '#000',
    },
    distanceBranchText: {
      flex: 1,
      fontFamily: 'Lato',
      fontSize: 16,
      color: '#9C9C9C',
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 5,
      backgroundColor: '#CBCBD4',
      marginRight: 16,
    },
    vertical: {
      flexDirection: 'column',
      gap: 10,
    }
  });