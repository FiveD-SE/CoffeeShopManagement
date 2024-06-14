import { View, Text, Modal, StyleSheet, TextInput, Pressable, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import ModalHeader from '../../Client/Header/ModalHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Branch from '../Branch';

const SelectBranchModal = ({ visible, onClose, branches, setBranch }) => {

  const handleChooseBranch = (branch) => {
    setBranch(branch);
    onClose();
  }

  const renderBranchList = () => {
    return branches.map((item, index) => {
      const address = `${item.street}, ${item.wardName}, ${item.districtName}, ${item.provinceName}`;
      return (
        <Branch
          key={index}
          storeName="FIVED COFFEE"
          branchName={item.branchName}
          address={address}
          image={{ uri: item.branchImage }}
          onPress={() => handleChooseBranch(item)}
          openingHour={item.openingHour}
          closingHour={item.closingHour}
        />
      );
    });
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Chọn chi nhánh làm việc" onClose={onClose} />
          <View style={styles.main}>
            <View style={styles.label}>
              <TextInput style={styles.searchText} placeholder='Tìm kiếm' />
              <Ionicons name='search' size={20} />
            </View>
            {renderBranchList()}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default SelectBranchModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    height: "70%",
  },
  main: {
    height: "100%",
    paddingHorizontal: "5%",
    marginBottom: "10%",
    backgroundColor: "#F8F7FA",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  label: {
    flexDirection: 'row',
    backgroundColor: "#fff",
    width: "100%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#EBEBEB',
    paddingHorizontal: 15,
  },
  searchText: {
    flex: 1,
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#000000',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
    elevation: 2,
    height: 100
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#CBCBD4',
    marginRight: 16,
  },
  vertical: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  nameBranchText: {
    fontFamily: 'lato-bold',
    fontSize: 16,
    color: '#000000',
  },
  addressBranchText: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#9C9C9C',
  },
  distanceBranchText: {
    fontFamily: 'lato-regular',
    fontSize: 16,
    color: '#9C9C9C',
    marginTop: 5,
  },
  branchList: {
    marginTop: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});
