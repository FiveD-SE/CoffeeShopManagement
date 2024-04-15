import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProfileDetails from "./screens/Client/ProfileDetails";
import Other from "./screens/Client/Other";
import EditProfile from "./screens/Client/EditProfile";
import FeedbackAndHelp from "./screens/Client/FeedbackAndHelp";
import Setting from "./screens/Client/Setting";
import ChangePassword from "./screens/Client/ChangePassword";
export default function App() {
    return (
        <View style={styles.container}>
            <ChangePassword />
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
