import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useRef, useState, useEffect, useMemo } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import AddNewItemButton from '../../../components/Admin/Button/AddNewItemButton';
import AddNewVoucherButton from '../../../components/Admin/Button/AddNewVoucherButton';
import Section from '../../../components/Client/Section';
import ItemCard from '../../../components/Admin/Card/ItemCard';
import VoucherCard from '../../../components/Admin/Card/VoucherCard';
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
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from '../../../services/firebaseService';

const AdminSalesScreen = () => {
    const navigation = useNavigation();

    const goToItemListScreen = () => {
        navigation.navigate("AdminItemList");
    };

    const goToVoucherListScreen = () => {
        navigation.navigate("AdminVoucherList");
    };

    const [vouchers, setVouchers] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('productDiscount');

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadVouchers();
            loadProducts();
        });

        return unsubscribe;
    }, [navigation]);

    const loadVouchers = async () => {
        try {
            const q = query(collection(db, 'vouchers'), orderBy('dateCreated', 'desc'), limit(3));
            const querySnapshot = await getDocs(q);
            const loadedVouchers = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const expirationDate = data.expirationDate.toDate();
                const status = expirationDate > new Date();
                loadedVouchers.push({
                    ...data,
                    expirationDate,
                    status
                });
            });
            setVouchers(loadedVouchers);
        } catch (error) {
            console.log('Error loading vouchers:', error);
        }
    };

    const loadProducts = async () => {
        try {
            const q = query(collection(db, 'products'), orderBy('dateCreated', 'desc'), limit(3));
            const querySnapshot = await getDocs(q);
            const loadedProducts = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                loadedProducts.push(data);
            });
            setProducts(loadedProducts);

        } catch (error) {
            console.log('Error loading products:', error);
        }
    };

    const renderSortedVouchers = () => {

        vouchers.sort((a, b) => b.expirationDate - a.expirationDate);

        return vouchers.map((item, index) => (
            <VoucherCard
                key={index}
                itemName={item.voucherName}
                imageSource={{ uri: item.voucherImage }}
                expiryDate={formatDate(item.expirationDate)}
                status={item.status}
                minimumPrice={item.minimumOrderPrice}
            />
        ));
    };

    const renderProducts = () => {
        return products.map((product, index) => (
            <ItemCard
                key={index}
                title={product.productName}
                price={formatPrice(product.productPrice)}
                imageSource={{ uri: product.productImage }}
            />
        ));
    };

    const formatPrice = (price) => {

        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(price);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionContainer}>
                <Section
                    title="Danh sách sản phẩm"
                    showSubtitle={true}
                    subtitle="Xem tất cả"
                    onPressSubtitle={goToItemListScreen}
                >
                    <View style={{ marginTop: "3%" }}>
                        {renderProducts()}
                    </View>
                </Section>
            </View>
            <AddNewItemButton />
            <View style={styles.sectionContainer}>
                <Section
                    title="Danh sách khuyến mãi"
                    showSubtitle={true}
                    subtitle="Xem tất cả"
                    onPressSubtitle={goToVoucherListScreen}
                >
                    <View style={{ marginTop: "3%" }}>
                        {renderSortedVouchers()}
                    </View>
                </Section>
            </View>
            <AddNewVoucherButton />
        </ScrollView>
    )
}

export default AdminSalesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: "3%",
        marginTop: "7%",
        marginBottom: "3%"
    },
    sectionContainer: {
        marginVertical: "4%",
        backgroundColor: "#ffffff",
        padding: "3%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#D8D8D8"
    },

})