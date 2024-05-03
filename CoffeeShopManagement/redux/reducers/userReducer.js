import * as types from "../constants/userConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addToFavorites, removeFromFavorites } from "../../api";
const initialState = {
	favoriteList: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TO_FAVORITES:
			const newFavoriteItem = {
				itemId: action.payload.itemId,
				userId: action.payload.userId,
			};
			const updatedFavoritesAdd = [...state.favoriteList, newFavoriteItem];
			AsyncStorage.setItem("favoriteList", JSON.stringify(updatedFavoritesAdd));
			return {
				...state,
				favoriteList: updatedFavoritesAdd,
			};
		case types.REMOVE_FROM_FAVORITES:
			const updatedFavoritesRemove = state.favoriteList.filter(
				(item) => item.itemId !== action.payload.itemId
			);
			AsyncStorage.setItem(
				"favoriteList",
				JSON.stringify(updatedFavoritesRemove)
			);
			return {
				...state,
				favoriteList: updatedFavoritesRemove,
			};
		case types.INITIALIZE_FAVORITES:
			return {
				...state,
				favoriteList: action.payload,
			};
		default:
			return state;
	}
};

export default userReducer;
