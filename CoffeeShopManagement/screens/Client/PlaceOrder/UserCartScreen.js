import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Section from "../../../components/Client/Section";
import CartItemCard from "../../../components/Client/Card/CartItemCard";
import { connect } from "react-redux";
import {
    confirmOrder,
    updateCartItemQuantity,
} from "../../../redux/actions/userActions";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebaseService";
import Toast from "react-native-toast-message";
import { colors } from "../../../assets/colors/colors";

const UserCartScreen = ({ userData, updateQuantity, confirmOrder }) => {
    const navigation = useNavigation();

    const [cartList, setCartList] = useState([]);

    const [totalPrice, setTotalPrice] = useState(0);

    const [updateTrigger, setUpdateTrigger] = useState(false);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const renderCartList = ({ item }) => (
        <CartItemCard
            id={item.cartItemId}
            name={item.productName}
            price={formatCurrency(item.totalPrice)}
            imageSource={item.productImage}
            quantity={item.quantity}
            options={`${item.size}, ${item.options
                .map((i) => i.toLowerCase())
                .join(", ")}`}
            onQuantityChange={(newQuantity) => {
                handleQuantityChange(item.cartItemId, newQuantity);
            }}
        />
    );

    const handleQuantityChange = useCallback(
        (cartItemId, newQuantity) => {
            if (newQuantity < 1) {
                Alert.alert(
                    "Xoá khỏi giỏ hàng",
                    "Bạn có chắn chắn muốn xoá sản phẩm này khỏi giỏ hàng",
                    [
                        {
                            text: "Cancel",
                            style: "cancel",
                        },
                        {
                            text: "Remove",
                            onPress: () => {
                                removeItemFromCart(cartItemId);
                            },
                        },
                    ],
                    { cancelable: false }
                );
                return;
            }

            let updatedCartList;
            if (newQuantity === 0) {
                updatedCartList = cartList.filter(
                    (item) => item.cartItemId !== cartItemId
                );
            } else {
                updatedCartList = cartList.map((item) => {
                    if (item.cartItemId === cartItemId) {
                        return { ...item, quantity: newQuantity };
                    }
                    return item;
                });
            }
            setCartList(updatedCartList);

            let newTotalPrice = 0;
            for (const item of updatedCartList) {
                newTotalPrice += item.totalPrice * item.quantity;
            }
            setTotalPrice(newTotalPrice);

            const cartRef = doc(db, "carts", userData.id);
            updateDoc(cartRef, {
                items: updatedCartList,
            });
        },
        [cartList, userData.id]
    );

    const removeItemFromCart = (cartItemId) => {
        const updatedCartList = cartList.filter(
            (item) => item.cartItemId !== cartItemId
        );
        setCartList(updatedCartList);

        let newTotalPrice = 0;
        for (const item of updatedCartList) {
            newTotalPrice += item.totalPrice * item.quantity;
        }
        setTotalPrice(newTotalPrice);

        const cartRef = doc(db, "carts", userData.id);
        updateDoc(cartRef, {
            items: updatedCartList,
        })
            .then(() => {
                Toast.show({
                    type: "success",
                    text1: "Thành công",
                    text2: "Sản phẩm đã được xoá khỏi giỏ hàng",
                    text1Style: {
                        fontSize: 16,
                        fontFamily: "lato-bold",
                    },
                    text2Style: {
                        fontSize: 12,
                        fontFamily: "lato-bold",
                        color: colors.grey_100,
                    },
                    visibilityTime: 2000,
                    autoHide: true,
                });
            })
            .catch((error) => {
                console.error("Error updating quantity on Firebase:", error);
                setCartList(cartList);
                setTotalPrice(totalPrice);
            });
    };

    const handleConfirmOrdering = () => {
        navigation.navigate("UserOrderConfirmationScreen");
        confirmOrder(cartList);
    };

    useEffect(() => {
        let newTotalPrice = 0;
        for (const item of cartList) {
            newTotalPrice += item.totalPrice * item.quantity;
        }
        setTotalPrice(newTotalPrice);
    }, [cartList, updateTrigger]);

    useEffect(() => {
        const fetchCartList = async () => {
            if (!userData.id) return;

            const cartRef = doc(db, "carts", userData.id);
            const cartDoc = await getDoc(cartRef);

            if (cartDoc.exists()) {
                const cartData = cartDoc.data();
                setCartList(cartData.items || []);
            } else {
                setCartList([]);
            }
        };

        fetchCartList();
    }, [userData.id, handleQuantityChange]);

    return (
        <View style={styles.container}>
            <View style={styles.main}>
                <View style={{ marginTop: "5%" }}>
                    <Section title="Sản phẩm đã thêm">
                        <View style={styles.cartListContainer}>
                            <FlatList
                                data={cartList}
                                renderItem={renderCartList}
                                keyExtractor={(item) => item.id}
                            />
                        </View>
                    </Section>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.totalPriceContainer}>
                    <Text style={styles.label}>Tổng cộng:</Text>
                    <Text style={styles.price}>
                        {formatCurrency(totalPrice)}
                    </Text>
                </View>
                <Pressable
                    style={styles.orderButton}
                    onPress={handleConfirmOrdering}
                >
                    <Text style={styles.orderButtonText}>Mua hàng</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        flex: 1,
        paddingHorizontal: "6%",
    },
    cartListContainer: {
        marginTop: "2%",
    },
    footer: {
        backgroundColor: colors.white_100,
        paddingHorizontal: "6%",
        paddingVertical: "6%",
    },
    totalPriceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        color: colors.black_100,
        fontSize: 20,
        fontWeight: "700",
    },
    price: {
        color: colors.black_100,
        fontSize: 20,
        fontWeight: "700",
    },
    orderButton: {
        backgroundColor: colors.green_100,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: "4%",
        borderRadius: 12,
        marginTop: "6%",
        shadowColor: colors.grey_100,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    orderButtonText: {
        color: colors.white_100,
        fontSize: 16,
        fontFamily: "lato-bold",
    },
});

const mapStateToProps = (state) => ({
    userData: state.auth.userData,
});

const mapDispatchToProps = (dispatch) => ({
    updateQuantity: (itemId, newQuantity) =>
        dispatch(updateCartItemQuantity(itemId, newQuantity)),
    confirmOrder: (cartList) => dispatch(confirmOrder(cartList)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserCartScreen);
