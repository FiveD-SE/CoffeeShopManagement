import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import BottomSheet from '../../components/Client/BottomSheet/BottomSheet';
import RoleCard from '../../components/Staff/RoleCard';
import Ionicons from "react-native-vector-icons/Ionicons";
import AddRoleModal from '../../components/Admin/AddRoleModal';
import React, { useState } from 'react';

export default function RoleListScreen({bottomSheetRef, snapPoints, setIsOpen}) {
    
    const DATA = [
        {
            idRole: '123',
            roleName: 'Cashier',
            salary: '2.000.000',
        },
        {
            idRole: '124',
            roleName: 'Cashier',
            salary: '2.000.000',
        },
        {
            idRole: '125',
            roleName: 'Cashier',
            salary: '2.000.000',
        }
    ]
    const [modalVisible, setModalVisible] = useState(false);

    const showAddRoleModal = () => {
        setModalVisible(true);
    };

    const hideAddRoleModal = () => {
        setModalVisible(false);
    };
  return (
    <BottomSheet
      bottomSheetRef={bottomSheetRef}
      snapPoints={snapPoints}
      setIsOpen={setIsOpen}>
      <View style={styles.container}>
        <View style={styles.topApp}>
          <Text style={styles.topAppText}>Danh sách vai trò</Text>
        </View>
        <View style={styles.bodyApp}>
          <ScrollView style={styles.listStaff}>
            <RoleCard DATA={DATA} />
            <>
            <TouchableOpacity 
            onPress={showAddRoleModal}
              style={styles.addStaffButton}>
              <Ionicons name="add" size={24} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginStart: "3%",
                  }}
                >
                  Thêm vai trò
                </Text>
            </TouchableOpacity>
            <AddRoleModal visible={modalVisible} onClose={hideAddRoleModal}/>
            </>
          </ScrollView>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2'
    },
    topApp: {
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      padding: '3%',
      backgroundColor: '#fff'
    },
    topAppText: {
      fontSize: 16,
      fontWeight: '600'
    },
    bodyApp: {
      padding: '5%'
    },
    addButton: {
      backgroundColor: '#fff',
    },
    addStaffButton: {
      backgroundColor: "#fff",
      padding: "3%",
      borderRadius: 10,
      alignItems: "center",
      flexDirection: "row",
  },
})

