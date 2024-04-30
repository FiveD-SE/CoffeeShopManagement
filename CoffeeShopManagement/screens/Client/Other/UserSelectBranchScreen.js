import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, Image } from 'react-native'
import React, { useState } from 'react';

export default function SelectBranch() {
    const [nearbyBranch, setNearbyBranch] = useState([
        { id: '1', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '2', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '3', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '4', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
    ]);

    const [ortherBranch, setOrtherBranch] = useState([
        { id: '1', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '2', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '3', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
        { id: '4', nameBranch: 'THE COFFEE HOUSE', addressBranch: 'HCM Đường D1', distanceBranch: 'Cách đây 3.3 km'},
    ]);
    
    const renderNearbyBranchItem = (item) => (
        <Pressable style={styles.addressItem}>
            <Image style={styles.image}/>
            <View style={styles.vertical}> 
                <View>
                    <Text style={styles.nameBranchText}>{item.nameBranch}</Text>
                    <Text style={styles.addressBranchText}>{item.addressBranch}</Text>
                </View>
                <Text style={styles.distanceBranchText}>{item.distanceBranch}</Text>
            </View>
        </Pressable>
    );

    const renderOrtherBranchItem = (item) => (
        <Pressable style={styles.addressItem}>
            <Image style={styles.image}/>
            <View style={styles.vertical}> 
                <View>
                    <Text style={styles.nameBranchText}>{item.nameBranch}</Text>
                    <Text style={styles.addressBranchText}>{item.addressBranch}</Text>
                </View>
                <Text style={styles.distanceBranchText}>{item.distanceBranch}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Chi nhánh gần đây</Text>
                    {nearbyBranch.map((item) => 
                        renderNearbyBranchItem(item)
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>Các chi nhánh khác</Text>
                    {ortherBranch.map((item) => 
                        renderOrtherBranchItem(item)
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    addressItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    icon: {
        marginRight: 15,
    },
    editIcon: {
        marginLeft: 'auto',
        color: '#FFA730',
    },
    nameBranchText: {
        flex: 1,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#9C9C9C',
    },
    addressBranchText: {
        flex: 1,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#000',
    },
    distanceBranchText: {
        flex: 1,
        fontFamily: 'Lato-Regular',
        fontSize: 16,
        color: '#9C9C9C',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
        backgroundColor: '#CBCBD4',
        marginRight: 16,
    },
    vertical: {
        flexDirection: 'column',
        gap: 25,
    }
});
