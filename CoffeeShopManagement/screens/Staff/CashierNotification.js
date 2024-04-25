import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {  useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import NotificationCard from '../../components/Staff/NotificationCard';

export default function CashierNotification() {

    const [selectedButtonIndex, setSelectedButtonIndex] = useState(null);

    useEffect(() => {
        // Chọn ngẫu nhiên một TouchableOpacity làm màu cam ban đầu
        const randomIndex = Math.floor(Math.random() * 3);
        setSelectedButtonIndex(randomIndex);
    }, []);

    const selectionButtons = ['Tất cả', 'Chưa đọc', 'Đã đọc'];
    const DATA = [
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12341',
            state: 'Success',
            isRead: false
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12342',
            state: 'Success',
            isRead: true
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12343',
            state: 'Failed',
            isRead: false
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12344',
            state: 'Failed',
            isRead: true
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12345',
            state: 'None',
            isRead: false
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#123456',
            state: 'None',
            isRead: true
        },
    ]
  return (
    <View style={styles.container}>
        <View>
            <View style={styles.filter}>
                <View style={styles.filterWrapper}>
                    {selectionButtons.map((buttonTitle, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[
                                styles.filterDetail,
                                selectedButtonIndex === index && { borderWidth: 1, borderColor: '#ffdfe7', backgroundColor: '#fff6f8' }
                            ]}
                            onPress={() => setSelectedButtonIndex(index)}
                        >
                            <Text style={[{fontSize: 20}, selectedButtonIndex === index && {color: '#ff9cb2'}]}>{buttonTitle}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Icon name='list' size={40}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.listNotification}>
            <Text style={styles.allNotificationText}>Tất cả thông báo</Text>
            <FlatList
                data={DATA}
                renderItem={({item}) => (
                    <NotificationCard item={item}/>
                )}/>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    filter: {
        padding: '5%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    filterDetail: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: '3%',
        backgroundColor: '#fafafb'
    },
    filterButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(58, 58, 58, 0.1)',
        borderWidth: 1,
        borderRadius: 10,
        padding: '1%'
    },
    filterWrapper: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '80%', 
        alignItems: 'center'
    },
    listNotification: {
        padding: '5%'
    },
    allNotificationText: {
        fontSize: 18,
        fontWeight: '600',
    }
})