import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { db, auth } from "../../../services/firebaseService";

const UserBestSellerScreen = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
    const itemDetailSnapPoints = useMemo(() => ["85%"]);
    const itemDetailBottomSheetRef = useRef(null);
    const [productList, setProductList] = useState([]);
    const [recentlyViewedList, setRecentlyViewedList] = useState([]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const renderBestSellerItemList = ({ item }) => (
        <BestSellerItem
            id={item.productId}
            name={item.productName}
            price={
                item.productPrice ? formatCurrency(item.productPrice) : "N/A"
            }
            imageSource={item.productImage}
            vertical={true}
            onPress={() => handleOpenItemDetail(item)}
        />
    );

    const handleOpenItemDetail = async (item) => {
        setSelectedItem(item);
        setIsItemDetailVisible(true);

        try {
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            if (!userDocSnap.exists()) {
                console.error("User document does not exist!");
                return;
            }

            let updatedRecentlyViewedItems =
                userDocSnap.data().recentlyViewedItems || [];
            updatedRecentlyViewedItems = updatedRecentlyViewedItems.filter(
                (pid) => pid !== item.productId
            );
            updatedRecentlyViewedItems.unshift(item.productId);
            updatedRecentlyViewedItems = updatedRecentlyViewedItems.slice(0, 5);

            await updateDoc(userDocRef, {
                recentlyViewedItems: updatedRecentlyViewedItems,
            });

            setRecentlyViewedList(updatedRecentlyViewedItems);
        } catch (error) {
            console.error("Error updating recently viewed items:", error);
        }
    };

    const handleCloseItemDetail = () => setIsItemDetailVisible(false);

    useEffect(() => {
        if (isItemDetailVisible) {
            itemDetailBottomSheetRef.current?.present();
        }
    }, [isItemDetailVisible]);

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const productsCollectionRef = collection(db, "products");
                const querySnapshot = await getDocs(productsCollectionRef);
                const fetchedProducts = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    productId: doc.id,
                }));
                setProductList(fetchedProducts);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };

        fetchProductList();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.bestSellerItemListContainer}>
                <FlatList
                    data={productList}
                    renderItem={renderBestSellerItemList}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.bestSellerItemListContainer}
                />
            </View>
            {isItemDetailVisible && (
                <ItemDetailBottomSheet
                    bottomSheetRef={itemDetailBottomSheetRef}
                    snapPoints={itemDetailSnapPoints}
                    selectedItem={selectedItem}
                    isVisible={isItemDetailVisible}
                    onClose={handleCloseItemDetail}
                />
            )}
        </View>
    );
};

export default UserBestSellerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    bestSellerItemListContainer: {
        marginTop: "2%",
        paddingHorizontal: "2%",
        paddingBottom: "5%",
    },
});
