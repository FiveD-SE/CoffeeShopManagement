import * as types from "../constants/userConstants";
import { addToFavorites, removeFromFavorites } from "../../api";

const initialState = {
	productList: [],
	favoriteList: [],
	cartList: [],
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
		case types.ADD_TO_CART:
			return {
				...state,
				cartList: [...state.cartList, action.payload],
			};
		case types.UPDATE_CART_ITEM_QUANTITY:
			console.log("UPDATE_CART_ITEM_QUANTITY", action.payload);
			const { itemId, newQuantity } = action.payload;
			const existingItemIndex = state.cartList.findIndex(
				(item) => item._id === itemId
			);
			if (existingItemIndex !== -1) {
				const updatedCartList = [...state.cartList];
				if (newQuantity < 1) {
					updatedCartList.splice(existingItemIndex, 1);
				} else {
					updatedCartList[existingItemIndex] = {
						...updatedCartList[existingItemIndex],
						quantity: newQuantity,
					};
				}
				return {
					...state,
					cartList: updatedCartList,
				};
			} else {
				if (newQuantity > 0) {
					const newItem = {
						_id: itemId,
						quantity: newQuantity,
					};
					return {
						...state,
						cartList: [...state.cartList, newItem],
					};
				} else {
					return state;
				}
			}

		default:
			return state;
	}
};

export default userReducer;
