import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ModalHeader from '../../Client/Header/ModalHeader'
import { colors } from '../../../assets/colors/colors';

const RankUserModal = ({ visible, onClose, setRankUser }) => {
  const [selectedTypes, setSelectedTypes] = useState({
    all: false,
    bronze: false,
    silver: false,
    gold: false,
    diamond: false
  });


  const handleSelectType = (type) => {
    setSelectedTypes(prevSelectedTypes => {
      let newSelectedTypes;
      if (type === "all") {
        if (!prevSelectedTypes.all) {
          newSelectedTypes = { all: true, bronze: true, silver: true, gold: true, diamond: true };
        } else {
          newSelectedTypes = { all: false, bronze: false, silver: false, gold: false, diamond: false };
        }
      } else {
        newSelectedTypes = { ...prevSelectedTypes, [type]: !prevSelectedTypes[type] };
        if (newSelectedTypes.bronze && newSelectedTypes.silver && newSelectedTypes.gold && newSelectedTypes.diamond) {
          newSelectedTypes.all = true;
        } else {
          newSelectedTypes.all = false;
        }
      }
      return newSelectedTypes;
    });
  };
  const handleSave = () => {
    if (!selectedTypes.bronze && selectedTypes.silver && selectedTypes.gold && selectedTypes.diamond) {
      setRankUser(null);
      onClose();
    }
    else {
      setRankUser({
        bronzeUsers: selectedTypes.bronze,
        silverUsers: selectedTypes.silver,
        goldUsers: selectedTypes.gold,
        diamondUsers: selectedTypes.diamond,
      });
      onClose();
    }

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
          <ModalHeader title="Chọn đối tượng" onClose={onClose} />
          <ScrollView style={styles.main} showsVerticalScrollIndicator={false}>
            <View style={{ flexDirection: "row", marginTop: "5%" }}>
              <TouchableOpacity style={[
                styles.buttonContainer,
                { marginRight: "1%", backgroundColor: selectedTypes.all ? colors.green_20 : "#ffffff" }
              ]}
                onPress={() => handleSelectType("all")}
              >
                <Image
                  source={require("../../../assets/allUserIcon.png")} />
                <Text style={styles.title}>Tất cả</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.header}>Khách hàng thành viên</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { flex: 1, marginRight: "1%", backgroundColor: selectedTypes.bronze ? colors.green_20 : "#ffffff" }
                ]}
                onPress={() => handleSelectType("bronze")}
              >
                <Image
                  source={require("../../../assets/bronzeIcon.png")} />
                <Text style={styles.title}>Đồng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { flex: 1, marginRight: "1%", backgroundColor: selectedTypes.silver ? colors.green_20 : "#ffffff" }
                ]}
                onPress={() => handleSelectType("silver")}
              >
                <Image
                  source={require("../../../assets/silverIcon.png")} />
                <Text style={styles.title}>Bạc</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { flex: 1, marginRight: "1%", backgroundColor: selectedTypes.gold ? colors.green_20 : "#ffffff" }
                ]}
                onPress={() => handleSelectType("gold")}
              >
                <Image
                  source={require("../../../assets/goldIcon.png")} />
                <Text style={styles.title}>Vàng</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.buttonContainer,
                  { flex: 1, marginRight: "1%", backgroundColor: selectedTypes.diamond ? colors.green_20 : "#ffffff" }
                ]}
                onPress={() => handleSelectType("diamond")}
              >
                <Image
                  source={require("../../../assets/diamondIcon.png")} />
                <Text style={styles.title}>Kim cương</Text>
              </TouchableOpacity>

            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Lưu</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal >
  )
}

export default RankUserModal

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#F8F7FA",
    borderRadius: 20,
    width: "90%",
    height: "49%",
  },
  imageContainer: {
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center"
  },
  main: {
    paddingHorizontal: "5%",
    marginBottom: "5%",
  },
  header: {
    color: "#3a3a3a",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: "4%"
  },
  title: {
    marginTop: "3%",
    color: "#3a3a3a",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center"
  },
  buttonContainer: {
    padding: "5%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ECECEC"
  },
  saveButton: {
    backgroundColor: '#00A188',
    borderRadius: 10,
    paddingVertical: "4%",
    paddingHorizontal: "5%",
    alignItems: 'center',
    marginVertical: "5%",
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  }
});