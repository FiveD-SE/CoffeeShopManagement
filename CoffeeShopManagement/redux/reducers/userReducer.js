import * as types from "../constants/userConstants";
import { addToFavorites, removeFromFavorites } from "../../api";

const initialState = {
	productList: [],
	favoriteList: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TO_FAVORITES:
			const userIdToAdd = action.payload.userId;
			const itemIdToAdd = action.payload.itemId;
			addToFavorites(userIdToAdd, [itemIdToAdd]);
			return state;
		case types.REMOVE_FROM_FAVORITES:
			const userIdToRemove = action.payload.userId;
			const itemIdToRemove = action.payload.itemId;
			removeFromFavorites(userIdToRemove, itemIdToRemove);
			return state;
		case types.GET_PRODUCT_LIST:
			return {
				...state,
				productList: action.payload,
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
