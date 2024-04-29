import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import ModalHeader from '../../Client/Header/ModalHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectGenderModal = ({ visible, onClose, onSelectGender }) => {
  const [maleClicked, setMaleClicked] = useState(false);
  const [femaleClicked, setFemaleClicked] = useState(false);
  const [otherClicked, setOtherClicked] = useState(false);

  const [selectedGender, setSelectedGender] = useState('');

  const handleMaleClick = () => {
    setSelectedGender('Nam');
    setMaleClicked(true);
    setFemaleClicked(false);
    setOtherClicked(false);
    onSelectGender('Nam');
  };

  const handleFemaleClick = () => {
    setSelectedGender('Nữ');
    setMaleClicked(false);
    setFemaleClicked(true);
    setOtherClicked(false);
    onSelectGender('Nữ');
  };

  const handleOtherClick = () => {
    setSelectedGender('Khác');
    setMaleClicked(false);
    setFemaleClicked(false);
    setOtherClicked(true);
    onSelectGender('Khác');
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
          <ModalHeader title="Chọn giới tính" onClose={onClose} />
          <View style={styles.main}>
            <Pressable
              style={[styles.row, maleClicked && styles.selectedRow]}
              onPress={handleMaleClick}
            >
              <Text style={styles.text}>Nam</Text>
              {maleClicked ? (
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
            </Pressable>
            <Pressable
              style={[styles.row, femaleClicked && styles.selectedRow]}
              onPress={handleFemaleClick}
            >
              <Text style={styles.text}>Nữ</Text>
              {femaleClicked ? (
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
            </Pressable>
            <Pressable
              style={[styles.row, otherClicked && styles.selectedRow]}
              onPress={handleOtherClick}
            >
              <Text style={styles.text}>Khác</Text>
              {otherClicked ? (
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
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectGenderModal;

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
    maxHeight: '25%',
  },
  main: {
    height: '100%',
    borderRadius: 20,
    paddingHorizontal: '5%',
    marginBottom: 15,
    backgroundColor: '#F8F7FA',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 10,
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
    color: '#3a3a3a',
    fontSize: 16,
    fontWeight: '600',
  },
});
