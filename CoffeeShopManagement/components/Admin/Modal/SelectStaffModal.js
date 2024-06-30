import { View, Text, Modal, StyleSheet, TextInput, Pressable, FlatList, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import ModalHeader from '../../Client/Header/ModalHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Branch from '../Branch';
import BranchWithoutImageCard from '../BranchWithoutImage';
import SearchBar from '../../Client/SearchBar';
import StaffCard2 from '../StaffCard2';
import ColorButton from '../Button/ColorButton';
import StaffCardWithCheckBox from '../Card/StaffCardWithCheckBox';

const SelectStaffModal = ({ visible, onClose, staffList, onAddStaff }) => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedStaffs, setSelectedStaffs] = useState([]);

    const handleToggleSelect = (staffId) => {
        setSelectedStaffs(prevSelected => {
            if (prevSelected.includes(staffId)) {
                return prevSelected.filter(id => id !== staffId);
            } else {
                return [...prevSelected, staffId];
            }
        });
    };
    //   const handleSearch = (query) => {
    //     setSearchKeyword(query);
    //     if (query) {
    //       const filteredList = branches.filter(branch =>
    //         branch.branchName.toLowerCase().includes(query.toLowerCase()) ||
    //         branch.street.toLowerCase().includes(query.toLowerCase()) ||
    //         branch.wardName.toLowerCase().includes(query.toLowerCase()) ||
    //         branch.districtName.toLowerCase().includes(query.toLowerCase()) ||
    //         branch.provinceName.toLowerCase().includes(query.toLowerCase())
    //       );
    //       setFilteredBranches(filteredList);
    //     } else {
    //       setFilteredBranches();
    //     }
    //   };

    const renderStaffList = () => (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={staffList}
            keyExtractor={item => item}
            renderItem={({ item }) => (
                <StaffCardWithCheckBox
                    item={item}
                    onToggleSelect={handleToggleSelect}
                    isSelected={selectedStaffs.includes(item)}
                />
            )}
        />
    );

    const renderAddStaff = () => {
        onAddStaff(selectedStaffs);
        onClose();
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ModalHeader title="Chọn nhân viên" onClose={onClose} />
                    <View style={styles.main}>
                        {/* <View style={styles.sreachBar}>
                            <SearchBar />
                        </View> */}
                        {renderStaffList()}
                        <ColorButton
                            OnPress={renderAddStaff}
                            color="#00A188"
                            text="Thêm mới"
                            textColor="#ffffff"
                        />
                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default SelectStaffModal;

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
        height: "65%",
    },
    sreachBar: {
        marginVertical: "4%",
        flexDirection: "row",
    },
    main: {
        height: "100%",
        paddingHorizontal: "5%",
        marginBottom: "10%",
        marginTop:"3%",
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
