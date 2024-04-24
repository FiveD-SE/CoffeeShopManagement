import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; // Import các thành phần cần thiết từ react-native
import Icon from 'react-native-vector-icons/Entypo'

const StaffCard = ({ DATA }) => {
    return (
        <View>
            {DATA.map((item, index) => (
                <TouchableOpacity key={item.id} style={styles.staffItem}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ width: 80, height: 80, backgroundColor: '#cbcbd4', borderRadius: 10 }}>

                        </View>
                        <View style={{ marginStart: '5%', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                            <Text style={{ fontSize: 14, color: '#808080' }}>{item.SDT}</Text>
                            <View style={{ backgroundColor: '#edfaf1', borderRadius: 15, justifyContent: 'center', alignItems: 'center', padding: '5%' }}>
                                <Text style={{ color: '#5bcf7c', fontSize: 14 }}>{item.role}</Text>
                            </View>
                        </View>
                    </View>
                    <Icon name='chevron-right' size={32} />
                </TouchableOpacity>
            ))}
        </View>
    );
};

styles = StyleSheet.create({
    staffItem: {
        backgroundColor: '#fff',
        padding: '3%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: '3%'
    },
})

export default StaffCard;