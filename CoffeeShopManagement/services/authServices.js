import AsyncStorage from "@react-native-async-storage/async-storage";

const saveToken = async (token) => {
    try {
        const tokenString = JSON.stringify(token);
        await AsyncStorage.setItem("token", tokenString);
        console.log("Token saved successfully:", tokenString);
    } catch (error) {
        console.error("Failed to save token:", error);
        throw error;
    }
};

const getToken = async () => {
    try {
        const tokenString = await AsyncStorage.getItem("token");
        if (tokenString) {
            console.log("Token retrieved successfully:", tokenString);
            return JSON.parse(tokenString);
        } else {
            console.log("No token found in storage");
            return null;
        }
    } catch (error) {
        console.error("Failed to retrieve token:", error);
        throw error;
    }
};

const removeToken = async () => {
    try {
        await AsyncStorage.removeItem("token");
        console.log("Token removed successfully.");
    } catch (error) {
        console.error("Failed to remove token:", error);
    }
};

export { saveToken, getToken, removeToken };
