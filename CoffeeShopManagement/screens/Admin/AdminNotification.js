import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import React, {  useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'

export default function AdminNotification() {
    const navigation = useNavigation();
    const handleback = () => {
        navigation.goBack();
    }
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
            orderId: '#12345',
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12345',
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12345',
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12345',
        },
        {
            title: 'Tiêu đề',
            content: 'Nội dung',
            orderId: '#12345',
        },
    ]
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topApp}>
            <TouchableOpacity
            onPress={handleback}>
                <View>
                    <Icon name='chevron-left' size={32}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.notificationText}>Thông báo</Text>
        </View>
        <View style={styles.bodyApp}>
            <View style={styles.filter}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 300}}>
                    {selectionButtons.map((buttonTitle, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[
                                styles.filterDetaiil,
                                selectedButtonIndex === index && { borderWidth: 1, borderColor: '#ffdfe7', backgroundColor: '#fff6f8' }
                            ]}
                            onPress={() => setSelectedButtonIndex(index)}
                        >
                            <Text style={[{fontSize: 20}, selectedButtonIndex === index && {color: '#ff9cb2'}]}>{buttonTitle}</Text>
                        </TouchableOpacity>
                ))}
                    
                    
                    
                    {/* <TouchableOpacity style={styles.filterDetaiil}>
                        <Text style={{fontSize: 20}}>Tất cả</Text>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.filterDetaiil}>
                        <Text style={{fontSize: 20}}>Chưa đọc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterDetaiil}>
                        <Text style={{fontSize: 20}}>Đã đọc</Text>
                    </TouchableOpacity> */}
                </View>
                <View>
                    <TouchableOpacity style={styles.filterButton}>
                        <Image 
                        source={require('../../assets/filter.png')}
                        style={{height: 32, width: 32}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.listNotification}>
                <Text style={styles.allNotificationText}>Tất cả thông báo</Text>
                <FlatList 
                data={DATA}
                
                renderItem={({item}) => (
                    <TouchableOpacity style={{flexDirection: 'row', backgroundColor: 'rgba(166, 166, 170, 0.1)', height: 80, alignItems: 'center', paddingStart: 10, zIndex: 0, borderRadius: 20, marginTop: 10}}>
                        <TouchableOpacity style={{width: 60, height: 60, backgroundColor: 'rgba(114, 255, 148, 0.3)', justifyContent: 'center', alignItems: 'center', zIndex: 10, borderRadius: 10}}>
                            <Image 
                            source={require('../../assets/successful_icon.png')}
                            style={{width: 32, height: 32}}/>
                        </TouchableOpacity>
                        <View style={{flexDirection: 'column', height: 60, paddingStart: 10}}>
                            <Text style={{fontSize: 18, fontWeight: '500', color: 'rgba(58, 58, 58, 1)'}}>{item.title}</Text>
                            <Text style={{fontSize: 14, color: 'rgba(166, 166, 170, 1)'}}>{item.content}</Text>
                        </View>
                    </TouchableOpacity>
                )}/>
            </View>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    topApp: {
        flex: 1, 
        borderBottomWidth: 1,
        paddingTop: 30,
        alignItems:'center',
        flexDirection:'row'
    },
    bodyApp: {
        flex: 12,
        marginTop: 20,
    },
    notificationText: {
        marginStart: 10,
        fontSize: 20,
        fontWeight:'500'
    },
    filter: {
        paddingStart: 15,
        flexDirection: 'row'
    },
    filterDetaiil: {
        height: 42,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 5,
        paddingStart: 10,
        paddingEnd: 10,
        backgroundColor: '#fafafb'
    },
    filterButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 30,
        borderColor: 'rgba(58, 58, 58, 0.1)',
        borderWidth: 1,
        borderRadius: 8,
        padding: 5
    },
    listNotification: {
        padding: 15,
    },
    allNotificationText: {
        fontSize: 18,
        fontWeight: '500',
    }
})