import AsyncStorage from "@react-native-async-storage/async-storage";
import * as types from "../redux/constants/userConstants";
export const initializeFavorites = async (dispatch) => {
    try {
        const favorites = await AsyncStorage.getItem("favoriteList");
        if (favorites !== null) {
            dispatch({
                type: types.INITIALIZE_FAVORITES,
                payload: JSON.parse(favorites),
            });
        }
    } catch (error) {
        console.error("Error initializing favorites:", error);
    }
};
