import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import ShiftCard2 from '../../components/Admin/ShiftCard2'
import { useNavigation } from '@react-navigation/native';
import {
    doc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    writeBatch,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseService";
import { ScrollView } from 'react-native-gesture-handler';
import AddNewShiftButton from '../../components/Admin/Button/AddNewShiftButton';
import EditShiftModal from "../../components/Admin/Modal/EditShiftModal";

export default function AddShiftScreen() {
    const navigation = useNavigation();
    const [shiftList, setShiftList] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    const [selectedShift, setSelectedShift] = useState(null);

    const showEditShiftModal = (item) => {
        setModalVisible(true);
        setSelectedShift(item);
    };

    const hideEditShiftModal = () => {
        setModalVisible(false);
        loadShifts();
    };

    const loadShifts = useCallback(async () => {
        try {
            const q = query(
                collection(db, "shifts"),
            );
            const querySnapshot = await getDocs(q);
            const loadShifts = [];
            querySnapshot.forEach((doc) => {
                loadShifts.push({ id: doc.id, ...doc.data() });
            });
            setShiftList(loadShifts);
        } catch (error) {
            console.log("Error loading shifts:", error);
        }
    }, []);

    useEffect(() => {
        loadShifts();
        const unsubscribe = navigation.addListener("focus", () => {
            loadShifts();
        });

        return unsubscribe;
    }, [navigation, loadShifts]);

    const renderShiftList = () => {
        return shiftList.map((item) => (
            <ShiftCard2
                key={item.id}
                item={item}
                onPress={() => showEditShiftModal(item)}
            />
        ));
    };

    return (
        <View style={styles.container}>
            <AddNewShiftButton onModalClose={loadShifts} />
            <Text style={styles.topText}>Các ca làm việc sẵn có</Text>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {renderShiftList()}
            </ScrollView>
            <EditShiftModal visible={modalVisible} onClose={hideEditShiftModal} shift={selectedShift}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '5%'
    },
    topText: {
        color: "#3a3a3a",
        fontSize: 18,
        fontWeight: "600",
        marginVertical: "3%",
    },
    scrollView: {
        flex: 1,
    },
});