import React, { useEffect, useState, useRef } from "react";
import {
    View,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Text,
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
import RequestAddressModal from "../../../components/Client/RequestAddressModal";
import Toast from "react-native-toast-message";
import { colors } from "../../../assets/colors/colors";

const cardWidth = Dimensions.get("window").width;

const UserHomeScreen = ({
    userData,
    updateUserRecentlyViewed,
    addressStatus,
    deliveryStatus,
}) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const itemDetailBottomSheetRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isItemDetailVisible, setIsItemDetailVisible] = useState(false);
    const [productList, setProductList] = useState([]);
    const [bestSellerList, setBestSellerList] = useState([]);
    const [recentlyViewedList, setRecentlyViewedList] = useState(
        userData.recentlyViewedItems || []
    );
    const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
    const [userCredit, setUserCredit] = useState(0);

    useEffect(() => {
        const userRef = doc(db, "users", userData.id);

        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setUserCredit(userData.credit || 0);
            } else {
                console.error("User document does not exist!");
            }
        });

        return () => unsubscribe();
    }, [userData.id]);

    const handleOpenItemDetail = async (item) => {
        if (addressStatus === false) {
            showRequestAddressModal();
            return;
        }

        if (deliveryStatus === false) {
            Toast.show({
                type: "error",
                text1: "Địa chỉ của bạn không nằm trong phạm vi giao hàng",
                text2: "",
                text1Style: {
                    fontSize: 14,
                    fontFamily: "lato-bold",
                    color: colors.black_100,
                },
                text2Style: {
                    fontSize: 14,
                    fontFamily: "lato-regular",
                    color: colors.grey_100,
                },
            });
        }

        try {
            setSelectedItem(item);
            setIsItemDetailVisible(true);
            console.log("Opening item detail:", item);

            // Update recently viewed items for the user
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

            // Limit to 5 items
            updatedRecentlyViewedItems = updatedRecentlyViewedItems.slice(0, 5);

            await updateDoc(userDocRef, {
                recentlyViewedItems: updatedRecentlyViewedItems,
            });

            // Update Redux state for recently viewed items
            updateUserRecentlyViewed(updatedRecentlyViewedItems);
        } catch (error) {
            console.error("Error opening item detail:", error);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, "user_notifications"),
            (snapshot) => {
                const unreadNotifications = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    if (
                        data.userId === userData.id &&
                        !data.notificationStatus
                    ) {
                        unreadNotifications.push(data);
                    }
                });
                unreadNotifications.sort((a, b) => b.buyCount - a.buyCount);
                setUnreadNotificationCount(unreadNotifications.length);
            }
        );

        return () => unsubscribe();
    }, [userData.id]);

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

    const handleCloseItemDetail = () => setIsItemDetailVisible(false);

    const goToExchangeVoucher = () => navigation.navigate("ExchangeVoucher");
    const goToSearchScreen = () => navigation.navigate("SearchScreen");
    const goToBestSellerScreen = () => navigation.navigate("BestSeller");
    const goToNotificationScreen = () =>
        navigation.navigate("UserNotification");

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "products"));
            const updatedProductList = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return { ...data, id: doc.id };
            });
            setProductList(updatedProductList);
        };

        fetchProducts();
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
            } else {
                setRecentlyViewedList([]);
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
        if (!recentlyViewedList || recentlyViewedList.length === 0) {
            return null;
        }

        return recentlyViewedList.map((item, index) => (
            <RecentlyViewedItem
                key={index}
                id={item.productId} // Assuming productId is part of the data
                name={item.productName}
                price={formatCurrency(item.productPrice)}
                imageSource={item.productImage}
                onPress={() => handleOpenItemDetail(item)}
            />
        ));
    };

    const showRequestAddressModal = () => {
        setModalVisible(true);
    };

    const hideRequestAddressModal = () => {
        setModalVisible(false);
    };

    useEffect(() => {
        if (isItemDetailVisible) {
            itemDetailBottomSheetRef.current?.present();
        }
    }, [isItemDetailVisible]);

    useEffect(() => {
        console.log("useEffect addressStatus: ", addressStatus);
        const timeout = setTimeout(() => {
            setModalVisible(false);
        }, 2500);

        return () => clearTimeout(timeout);
    }, [modalVisible]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <UserHomeScreenHeader
                    username={userData.name}
                    totalPoint={userData.credit}
                    onPressBean={goToExchangeVoucher}
                    onPressNotify={goToNotificationScreen}
                    unreadNotificationCount={unreadNotificationCount}
                    userCredit={userCredit}
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
                            contentContainerStyle={[
                                styles.itemList,
                                { width: recentlyViewedList.length * 160 },
                            ]}
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
            <RequestAddressModal
                visible={modalVisible}
                onClose={hideRequestAddressModal}
            />
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
    headerContainer: {
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
    addressStatus: state.user.addressStatus,
    deliveryStatus: state.user.deliveryStatus,
});

const mapDispatchToProps = {
    updateUserRecentlyViewed,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeScreen);
