import { View, Text, Modal, StyleSheet,  Pressable } from 'react-native';
import React, { useState } from 'react';
import ModalHeader from '../../Client/Header/ModalHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectTermOptionsModal = ({ visible, onClose, onSelectOption }) => {
  const [monthlyClicked, setMonthlyClicked] = useState(false);
  const [quarterClicked, setQuarterClicked] = useState(false);

  const [selectedOption, setSelectedOption] = useState('');

  const handleMonthlyClick = () => {
    setSelectedOption('Định kỳ hàng tháng');
    setMonthlyClicked(true);
    setQuarterClicked(false);
    onSelectOption('Định kỳ hàng tháng');
  };

  const handleQuarterClick = () => {
    setSelectedOption('Định kỳ hàng quý');
    setQuarterClicked(true);
    setMonthlyClicked(false);
    onSelectOption('Định kỳ hàng quý');
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
          <ModalHeader title="Chọn kỳ hạn" onClose={onClose} style={styles.title}/>
          <View style={styles.main}>
            <Pressable
              style={[styles.row, monthlyClicked]}
              onPress={handleMonthlyClick}
            >
              <Text style={styles.text}>Định kỳ hàng tháng</Text>
              {monthlyClicked ? (
                <MaterialCommunityIcons
                  name="checkbox-marked-circle"
                  size={25}
                  color="#000000"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={25}
                  color="#000000"
                />
              )}
            </ Pressable>
            < Pressable
              style={[styles.row, quarterClicked]}
              onPress={handleQuarterClick}
            >
              <Text style={styles.text}>Định kỳ hàng quý</Text>
              {quarterClicked ? (
                <MaterialCommunityIcons
                  name="checkbox-marked-circle"
                  size={25}
                  color="#000000"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle-outline"
                  size={25}
                  color="#000000"
                />
              )}
            </ Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectTermOptionsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    maxHeight: '15%',
  },
  main: {
    height: "100%",
    borderRadius: 20,
    paddingHorizontal: '5%',
    marginBottom: 15,
    backgroundColor: '#F8F7FA',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    elevation: 3,
  },
  selectedRow: {
    backgroundColor: '#e6f2ff',
  },
  text: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600"
  },
});
