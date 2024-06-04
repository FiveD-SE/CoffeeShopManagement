import { FlatList, StyleSheet, View } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { IsOpenProvider } from "../../../utils/IsOpenContext";
import { PRODUCT_ITEM_LIST } from "../../../utils/constants";
import { getProductsList } from "../../../api";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const UserBestSellerScreen = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

    const itemDetailSnapPoints = useMemo(() => ["85%"]);

    const itemDetailBottomSheetRef = useRef(null);

    const [productList, setProductList] = useState([]);

    const renderBestSellerItemList = ({ item }) => (
        <BestSellerItem
            id={item._id}
            name={item.productName}
            price={
                item.productPrice
                    ? item.productPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                      })
                    : "N/A"
            }
            imageSource={item.imageSource}
            vertical={true}
            onPress={() => handleOpenItemDetail(item)}
        />
    );

    const handleOpenItemDetail = (item) => {
        setSelectedItem(item);
        setIsItemDetailVisible(true);
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
                    productId: doc.id, // Add productId from the document ID
                }));
                setProductList(fetchedProducts);
            } catch (error) {
                console.error("Error fetching product list:", error);
            }
        };

        fetchProductList();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <View style={styles.bestSellerItemListContainer}>
                    <FlatList
                        data={productList}
                        renderItem={renderBestSellerItemList}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={
                            styles.bestSellerItemListContainer
                        }
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
        </>
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
    },
});
