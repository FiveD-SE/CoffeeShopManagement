import React, { useEffect, useState, useRef } from "react";
import {
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Dimensions,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import UserHomeScreenHeader from "../../../components/Client/Header/UserHomeScreenHeader";
import Carousel from "../../../components/Client/Carousel";
import SearchBar from "../../../components/Client/SearchBar";
import BestSellerItem from "../../../components/Client/Card/BestSellerItem";
import Section from "../../../components/Client/Section";
import RecentlyViewedItem from "../../../components/Client/Card/RecentlyViewedItem";
import ItemDetailBottomSheet from "../PlaceOrder/ItemDetailBottomSheet";
import { db, auth } from "../../../services/firebaseService";
import {
    collection,
    getDocs,
    doc,
    getDoc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";

import { connect } from "react-redux";
import { updateUserRecentlyViewed } from "../../../redux/actions/userActions";

const cardWidth = Dimensions.get("window").width;

const UserHomeScreen = ({ userData, updateUserRecentlyViewed }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const itemDetailBottomSheetRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const [bestSellerList, setBestSellerList] = useState([]);
    const [recentlyViewedList, setRecentlyViewedList] = useState(
        userData.recentlyViewedItems
    );
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);

    const handleOpenItemDetail = async (item) => {
        try {
            setSelectedItem(item);
            setIsItemDetailVisible(true);
            console.log("Opening item detail:", item);

            const userDocRef = doc(db, "users", auth.currentUser.uid);
            const userDocSnap = await getDoc(userDocRef);
            const userDocData = userDocSnap.data();
            let updatedRecentlyViewedItems =
                userDocData.recentlyViewedItems || [];

            const itemIndex = updatedRecentlyViewedItems.indexOf(
                item.productId
            );
            if (itemIndex > -1) {
                updatedRecentlyViewedItems.splice(itemIndex, 1);
            }
            updatedRecentlyViewedItems.unshift(item.productId);
            updatedRecentlyViewedItems = updatedRecentlyViewedItems.slice(0, 5);

            await updateDoc(userDocRef, {
                recentlyViewedItems: updatedRecentlyViewedItems,
            });
            updateUserRecentlyViewed(updatedRecentlyViewedItems);
        } catch (error) {
            console.error("Error opening item detail:", error);
        }
    };

    const handleCloseItemDetail = () => setIsItemDetailVisible(false);

    const goToExchangeVoucher = () => navigation.navigate("ExchangeVoucher");
    const goToSearchScreen = () => navigation.navigate("SearchScreen");
    const goToBestSellerScreen = () => navigation.navigate("BestSeller");
    const goToNotificationScreen = () =>
        navigation.navigate("UserNotification");

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };
    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const updatedProductList = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return { ...data, id: doc.id };
            });
            setProductList(updatedProductList);

            const notifications = await getDocs(collection(db, "user_notifications"));
            const unreadNotifications = notifications.docs.filter((doc) => doc.data().notificationStatus === false && doc.data().userId === userData.id);
            setUnreadNotificationCount(unreadNotifications.length);
        };

        fetchData();
    }, [isFocused]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "products"),
            (snapshot) => {
                const updatedBestSellerList = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    updatedBestSellerList.push({ ...data, id: doc.id });
                });
                updatedBestSellerList.sort((a, b) => b.buyCount - a.buyCount);
                setBestSellerList(updatedBestSellerList);
            }
        );

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const fetchRecentlyViewed = async () => {
            if (
                userData?.recentlyViewedItems &&
                userData?.recentlyViewedItems.length > 0
            ) {
                const products = await Promise.all(
                    userData.recentlyViewedItems.map(async (productId) => {
                        const productDocRef = doc(db, "products", productId);
                        const productDocSnap = await getDoc(productDocRef);
                        return productDocSnap.exists()
                            ? {
                                ...productDocSnap.data(),
                                id: productDocSnap.id,
                            }
                            : null;
                    })
                );
                setRecentlyViewedList(products.filter(Boolean));
            }
        };

        fetchRecentlyViewed();
    }, [userData.recentlyViewedItems]);

    const renderBestSellerItemList = () =>
        bestSellerList.map((item, index) => (
            <BestSellerItem
                key={index}
                id={item.productId}
                name={item.productName}
                price={formatCurrency(item.productPrice)}
                imageSource={item.productImage}
                onPress={() => handleOpenItemDetail(item)}
                horizontal={true}
            />
        ));

    const renderRecentlyViewedItemList = () => {
        if (recentlyViewedList?.length === 0) {
            return null;
        }

        return recentlyViewedList?.map((item, index) => (
            <RecentlyViewedItem
                key={index}
                id={item.productId}
                name={item.productName}
                price={formatCurrency(item.productPrice)}
                imageSource={item.productImage}
                onPress={() => handleOpenItemDetail(item)}
            />
        ));
    };

    const getProductById = async (productId) => {
        const productDocRef = doc(db, "products", productId);
        const productDocSnap = await getDoc(productDocRef);
        return { ...productDocSnap.data(), productId };
    };

    useEffect(() => {
        if (isItemDetailVisible) {
            itemDetailBottomSheetRef.current?.present();
        }
    }, [isItemDetailVisible]);

    console.log("USER DATA", userData);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerCointainer}>
                <UserHomeScreenHeader
                    username={userData.name}
                    totalPoint={userData.credit}
                    onPressBean={goToExchangeVoucher}
                    onPressNotify={goToNotificationScreen}
                    unreadNotificationCount={unreadNotificationCount}
                />
                <View style={styles.searchBarContainer}>
                    <SearchBar onFocus={goToSearchScreen} />
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                <Carousel style={{ width: "100%" }} />
                <View style={{ marginTop: "5%" }}>
                    <Section
                        title="Sản Phẩm Bán Chạy"
                        showSubtitle={true}
                        subtitle="Xem thêm"
                        onPressSubtitle={goToBestSellerScreen}
                    >
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.itemList}
                        >
                            {renderBestSellerItemList()}
                        </ScrollView>
                    </Section>
                </View>
                <View style={{ marginTop: "5%" }}>
                    <Section title="Đã Xem Gần Đây">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.itemList}
                        >
                            {renderRecentlyViewedItemList()}
                        </ScrollView>
                    </Section>
                </View>
            </ScrollView>
            {isItemDetailVisible && (
                <ItemDetailBottomSheet
                    bottomSheetRef={itemDetailBottomSheetRef}
                    snapPoints={["85%"]}
                    selectedItem={selectedItem}
                    isVisible={isItemDetailVisible}
                    onClose={handleCloseItemDetail}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    contentContainer: {
        padding: "5%",
    },
    headerCointainer: {
        padding: "5%",
        marginBottom: "5%",
    },
    searchBarContainer: {
        marginTop: "5%",
    },
    categoryContainer: {
        flexDirection: "row",
        marginTop: "5%",
    },
    itemList: {
        width: cardWidth * 4,
        flexDirection: "row",
        marginTop: "5%",
    },
});

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

const mapDispatchToProps = {
    updateUserRecentlyViewed,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeScreen);
