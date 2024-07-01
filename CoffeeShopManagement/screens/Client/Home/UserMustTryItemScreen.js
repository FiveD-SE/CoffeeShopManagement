import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import React, { useState, useRef, useMemo, useEffect } from "react";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../services/firebaseService";

const UserMustTryItemScreen = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);

    const itemDetailSnapPoints = useMemo(() => ["85%"]);

    const itemDetailBottomSheetRef = useRef(null);

    const [productList, setProductList] = useState([]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const renderBestSellerItemList = ({ item }) => (
        <BestSellerItem
            id={item._id}
            name={item.productName}
            price={
                item.productPrice ? formatCurrency(item.productPrice) : "N/A"
            }
            imageSource={item.productImage}
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
                    productId: doc.id,
                }));

                const sortedProducts = fetchedProducts
                    .filter(item => {
                        const productDate = new Date(item.dateCreated.seconds * 1000 + item.dateCreated.nanoseconds / 1000000);
                        return productDate.getTime();
                    })
                    .sort((a, b) => {
                        const dateA = new Date(a.dateCreated.seconds * 1000 + a.dateCreated.nanoseconds / 1000000);
                        const dateB = new Date(b.dateCreated.seconds * 1000 + b.dateCreated.nanoseconds / 1000000);
                        return dateB - dateA;
                    })

                setProductList(sortedProducts);
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

export default UserMustTryItemScreen;

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
