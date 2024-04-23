import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import React from 'react'

export default function History() {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Lịch sử đổi thưởng</Text>
        {/* Render List ex */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        paddingHorizontal :20,
        paddingVertical : 20,
    },
    text: {
        fontFamily: 'Lato-Bold',
        fontSize : 18,
        fontWeight : 'bold',
        marginBottom : 20,
        color : '#000000'
    }
});