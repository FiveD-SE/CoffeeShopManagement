import { View, Text, StyleSheet, imageContainer } from 'react-native'
import React from 'react'

const RoundItemTypeButton = ({typeImage, typeName}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.imageContainer} source={typeImage}></Image>
      <Text style={styles.typeName}></Text>
    </View>
  )
}

export default RoundItemTypeButton

const styles = StyleSheet.create({
    container :{
        flex:1,
    },
    imageContainer:{
      borderWidth:1,
      borderRadius:30,
      backgroundColor:"#EAEE",
      borderColor:"#ECECEC"
    },
    typeName: {
        color: "#3a3a3a",
        fontSize: 16,
        fontWeight: "500",
        textAlign:"center"
    }
})