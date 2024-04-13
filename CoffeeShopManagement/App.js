import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProfileDetails from "./screens/Client/ProfileDetails";
import Other from "./screens/Client/Other";

export default function App() {
    return (
        <View style={styles.container}>
            <ProfileDetails/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
