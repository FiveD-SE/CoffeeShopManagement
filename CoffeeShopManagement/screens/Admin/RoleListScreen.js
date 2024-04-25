import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import Icon from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';

export default function RoleListScreen() {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const DATA = [
        {
            idRole: '123',
            roleName: 'Cashier',
            salary: '2.000.000',
        },
        {
            idRole: '124',
            roleName: 'Cashier',
            salary: '2.000.000',
        },
        {
            idRole: '125',
            roleName: 'Cashier',
            salary: '2.000.000',
        }
    ]
    const navigation = useNavigation();
    const handleback = () => {
        navigation.goBack();
    }
  return (
    // <BottomSheetModalProvider>
    //     <View style={styles.container}>
    //         <View style={styles.topApp}>
    //             <View style={{flexDirection: 'row', alignItems: 'center'}}>
    //                 <TouchableOpacity
    //                     onPress={handleback}>
    //                     <Icon name='chevron-left' size={32}/>
    //                 </TouchableOpacity>
    //                 <Text style={styles.topAppText}>Danh sách vai trò</Text>
    //             </View>
    //             <TouchableOpacity style={styles.addButton}>
    //                 <Icon name='plus' size={32} color={'#ffa730'}/>
    //             </TouchableOpacity>
    //         </View>
    //         <View style={styles.bodyApp}>
    //             <FlatList 
    //                 data={DATA}
    //                 keyExtractor={item => item.idRole}
    //                 renderItem={({item}) => (
    //                     <TouchableOpacity style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginBottom: '5%', backgroundColor: '#fff', padding: '3%', borderRadius: 10, alignItems: 'center'}}>
    //                         <View>
    //                             <Text style={{fontSize: 16, fontWeight: '600'}}>{item.roleName}</Text>
    //                             <Text style={{fontSize: 16, color: '#9c9c9c'}}>Lương: {item.salary} / giờ</Text>
    //                         </View>
    //                         <View>
    //                             <Icon name='chevron-right' size={32}/>
    //                         </View>
    //                     </TouchableOpacity>
    //                 )}/>
    //         </View>
    //     </View>
    // </BottomSheetModalProvider>
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  )
}

//const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     topApp: {
//         paddingTop: '10%',
//         backgroundColor: '#fff',
//         padding: '3%',
//         borderBottomWidth: 1,
//         borderColor: '#cbcbd4',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     topAppText: {
//         fontSize: 16, 
//         fontWeight: '600',
//         paddingStart: '4%'
//     },
//     addButton: {
//         borderColor: '#ebebeb',
//         borderWidth: 1,
//         borderRadius: 20,
//         padding: "1%"
//     },
//     bodyApp: {
//         padding: '5%'
//     }
// })

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      backgroundColor: 'grey',
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });