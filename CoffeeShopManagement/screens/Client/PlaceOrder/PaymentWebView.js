import React from "react";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native-animatable";
import { Text } from "react-native";

const PaymentWebView = () => {
    const route = useRoute();
    const { paymentUrl } = route.params;

    return (
        <View>
            <Text>PaymentWebView</Text>
            <WebView
                source={{ uri: paymentUrl }}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error("WebView error: ", nativeEvent);
                }}
                onHttpError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.error(
                        "HTTP error status code: ",
                        nativeEvent.statusCode
                    );
                }}
            />
        </View>
    );
};

export default PaymentWebView;
