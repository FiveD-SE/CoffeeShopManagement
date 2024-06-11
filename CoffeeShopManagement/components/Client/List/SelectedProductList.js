import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../../../assets/colors/colors";

const SelectedProductList = ({ orderList }) => {
    const renderOptionList = (item) => {
        const optionLabels = ["Đường", "Sữa", "Đá"];
        return item
            .map(
                (option, index) =>
                    `${optionLabels[index]}: ${
                        option.charAt(0).toLowerCase() +
                        option.slice(1).toLowerCase()
                    }`
            )
            .join(", ");
    };

    const renderToppingsList = (toppings) => {
        return toppings
            .map(
                (topping) =>
                    topping.title.charAt(0).toUpperCase() +
                    topping.title.slice(1).toLowerCase()
            )
            .join(", ");
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const renderSelectedProductItem = () => {
        return orderList.map((item, index) => (
            <View style={styles.itemContainer} key={index}>
                <View style={styles.itemContent}>
                    <View>
                        <Text style={styles.title}>{item.productName}</Text>
                    </View>
                    {item.toppings && item.toppings.length > 0 && (
                        <Text style={styles.subtitle} numberOfLines={2}>
                            {renderToppingsList(item.toppings)}
                        </Text>
                    )}
                    {item.options && item.options.length > 0 && (
                        <Text style={styles.subtitle} numberOfLines={2}>
                            {renderOptionList(item.options)}
                        </Text>
                    )}
                    <Text
                        style={[
                            styles.subtitle,
                            { color: colors.black_100, fontSize: 14 },
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        Số lượng: {item.quantity}
                    </Text>
                </View>
                <Text style={styles.price}>
                    {formatCurrency(item.totalPrice * item.quantity)}
                </Text>
            </View>
        ));
    };

    return <View style={styles.container}>{renderSelectedProductItem()}</View>;
};

export default SelectedProductList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.green_10,
        borderWidth: 1,
        borderColor: colors.grey_50,
        padding: "5%",
        borderRadius: 10,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: "5%",
    },
    itemContent: {
        flexDirection: "column",
        flex: 1,
        marginRight: "4%",
    },
    title: {
        color: colors.black_100,
        fontSize: 16,
        fontFamily: "lato-bold",
        lineHeight: 20,
    },
    subtitle: {
        color: colors.grey_100,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: "lato-regular",
        marginTop: "1%",
    },
    price: {
        color: colors.black_100,
        fontSize: 16,
        fontFamily: "lato-bold",
    },
});
