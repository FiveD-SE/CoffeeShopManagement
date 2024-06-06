import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function UserMapScreen() {
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={{
                    region: {
                        latitude: 10.8231,
                        longitude: 106.6297,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    },
                }}
            ></MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
