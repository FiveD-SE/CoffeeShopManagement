import AsyncStorage from "@react-native-async-storage/async-storage";

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem("token", token);
        console.log("Token saved successfully:", token);
    } catch (error) {
        console.error("Failed to save token:", error);
        throw error;
    }
};

// Lấy token từ AsyncStorage
const getToken = async () => {
    try {
        const tokenString = await AsyncStorage.getItem("token");
        if (tokenString) {
            return tokenString;
        } else {
            console.log("No token found in storage");
            return null;
        }
    } catch (error) {
        console.error("Failed to retrieve token:", error);
        throw error;
    }
};

// Xóa token từ AsyncStorage
const removeToken = async () => {
    try {
        await AsyncStorage.removeItem("token");
        console.log("Token removed successfully.");
    } catch (error) {
        console.error("Failed to remove token:", error);
    }
};

export { saveToken, getToken, removeToken };
