import * as types from "../constants/userConstants";
import AsyncStorage from "@react-native-async-storage/async-storage";
const initialState = {
	favoriteList: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TO_FAVORITES:
			const newFavoriteList = [...state.favoriteList, action.payload];
			AsyncStorage.setItem("favoriteList", JSON.stringify(newFavoriteList));
			return {
				...state,
				favoriteList: newFavoriteList,
			};
		case types.REMOVE_FROM_FAVORITES:
			const updatedFavoriteList = state.favoriteList.filter(
				(item) => item.id !== action.payload
			);
			AsyncStorage.setItem("favoriteList", JSON.stringify(updatedFavoriteList));
			return {
				...state,
				favoriteList: updatedFavoriteList,
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
