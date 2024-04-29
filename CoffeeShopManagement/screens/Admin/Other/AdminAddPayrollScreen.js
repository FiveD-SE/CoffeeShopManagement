import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, SafeAreaView, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectTermOptionsModal from '../../../components/Admin/Modal/SelectTermOptionsModal';
import SelectBranchModal from '../../../components/Admin/Modal/SelectBranchModal';
import SelectDateModal from '../../../components/Admin/Modal/SelectDateModal';

export default function AdminAddPayrollScreen() {
    const [selectedTermOption, setSelectedTermOption] = useState('');
    const [selectedDateEndOption, setSelectedDateEndOption] = useState('');
    const [selectedDateStartOption, setSelectedDateStartOption] = useState('');
    const [modalSelectTermOptionVisible, setModalSelectTermOptionVisible] = useState(false);
    const [modalSelectBranchVisible, setModalSelectBranchVisible] = useState(false);
    const [modalSelectDateVisible, setModalSelectDateVisible] = useState(false);
    const [selectedDateType, setSelectedDateType] = useState('start');

    const handleSelectTermOption = (option) => {
        setSelectedTermOption(option);
    };

    const handleSelectDateEndOption = (option) => {
        setSelectedDateEndOption(option);
    };

    const handleSelectDateStartOption = (option) => {
        setSelectedDateStartOption(option);
    };

    const showSelectTermOptionsModal = () => {
        setModalSelectTermOptionVisible(true);
    };

    const hideSelectTermOptionsModal = () => {
        setModalSelectTermOptionVisible(false);
    };

    const showSelectBranchModal = () => {
        setModalSelectBranchVisible(true);
    };

    const hideSelectBranchModal = () => {
        setModalSelectBranchVisible(false);
    };

    const showSelectDateModal = (dateType) => {
        setSelectedDateType(dateType);
        setModalSelectDateVisible(true);
    };

    const hideSelectDateModal = () => {
        setModalSelectDateVisible(false);
    };

    const staffList = [
        { image: require("../../../assets/vietnam.png"), name: 'Tên nhân viên', phonenumber: 'Số điện thoại', position: 'Chức vụ' },
        { image: require("../../../assets/vietnam.png"), name: 'Tên nhân viên', phonenumber: 'Số điện thoại', position: 'Chức vụ' }, 
        { image: require("../../../assets/vietnam.png"), name: 'Tên nhân viên', phonenumber: 'Số điện thoại', position: 'Chức vụ' },
        { image: require("../../../assets/vietnam.png"), name: 'Tên nhân viên', phonenumber: 'Số điện thoại', position: 'Chức vụ' }, 
        { image: require("../../../assets/vietnam.png"), name: 'Tên nhân viên', phonenumber: 'Số điện thoại', position: 'Chức vụ' }, 
    ];

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.row}>
                <Image source={item.image} style={styles.avatar} />
                <View style={styles.column}>
                    <Text style={styles.textPrimary}>{item.name}</Text>
                    <Text style={styles.textSecondary}>{item.phonenumber}</Text>
                    <View style={styles.positionLabel}>
                        <Text style={[styles.textPrimary, {color: '#4ECB71'}]}>{item.position}</Text>
                    </View>
                </View>
                <Pressable style={styles.checkbox}>
                    <MaterialCommunityIcons name="checkbox-blank-outline" size={25} color="#9C9C9C" />
                </Pressable>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.section}>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Chi nhánh</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>Tên các chi nhánh</Text>
                            <Pressable style={styles.button} onPress={showSelectBranchModal}>
                                <Icon name="chevron-small-right" size={30} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSecondary}>
                        <Text style={styles.sectionText}>Thông tin bản lương</Text>
                    </View>
                    <View style={styles.label}>
                        <Text style={styles.labelText}>Kỳ hạn trả lương</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>{selectedTermOption || 'Chọn kỳ hạn'}</Text>
                            <Pressable style={styles.button} onPress={showSelectTermOptionsModal}>
                                <Icon name="chevron-small-right" size={30} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.label}>
                        <Text style={styles.labelText}>Kỳ làm việc từ</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>{selectedDateStartOption}</Text>
                            <Pressable style={[styles.button, {marginLeft: 10}]} onPress={() => showSelectDateModal('start')}>
                                <Icon name="calendar" size={20} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.label}>
                        <Text style={styles.labelText}>Kỳ làm việc đến</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>{selectedDateEndOption}</Text>
                            <Pressable style={[styles.button, {marginLeft: 10}]} onPress={() => showSelectDateModal('end')}>
                                <Icon name="calendar" size={20} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.labelSecondary}>
                        <Text style={styles.sectionText}>Nhân viên được trả lương</Text>
                        <View style={styles.row}>
                            <Text style={styles.textSecondary}>Chọn tất cả</Text>
                            <Pressable style={[styles.button, {marginLeft: 10}]}>
                                <MaterialCommunityIcons name="checkbox-blank-outline" size={25} color="#9C9C9C" />
                            </Pressable>
                        </View>
                    </View>
                    <View style={styles.label}>
                        <TextInput style={styles.searchText} placeholder='Tìm kiếm' />
                        <Ionicons name='search' size={20}/>
                    </View>
                </View>

                <View style={styles.section}>
                    {staffList.map((item) => 
                        renderItem({item})
                    )}
                </View>

                {/* Modal */}
                <SelectTermOptionsModal visible={modalSelectTermOptionVisible} onClose={hideSelectTermOptionsModal} onSelectOption={handleSelectTermOption} />
                <SelectBranchModal visible={modalSelectBranchVisible} onClose={hideSelectBranchModal} />
                <SelectDateModal 
                    visible={modalSelectDateVisible} 
                    onClose={hideSelectDateModal} 
                    onSelectOption={selectedDateType === 'start' ? handleSelectDateStartOption : handleSelectDateEndOption} // Chọn hàm xử lý tùy thuộc vào loại ngày
                />

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    section: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    label: {
        flexDirection: 'row',
        backgroundColor: "#fff",
        width: "100%",
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        borderWidth: 2,
        borderColor:'#EBEBEB',
        paddingHorizontal: 15,
    },
    labelText: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: '#000000'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center',
    },
    labelSecondary: {
        flexDirection: 'row',
        width: "100%",
        padding: 10,
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 10,
        paddingHorizontal: 10,
    },
    searchText: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#000000'
    },
    item: {
        flexDirection: 'row',
        height: 'auto',
        width: "100%",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent:'space-between',
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    column: {
        flex: 1,
        gap: 5,
        marginLeft: 10,
    },
    textPrimary: {
        fontFamily: 'Lato-Bold',
        fontSize: 16,
        color: '#000000',
    },
    textSecondary: {
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#9C9C9C',
        lineHeight: 20
    },
    positionLabel: {
        backgroundColor: '#EDFAF1',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginTop: 5,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    button: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionText: {
        fontFamily: 'Lato-Bold',
        fontSize: 18,
        color: '#000000',
        lineHeight: 20
    },
});
