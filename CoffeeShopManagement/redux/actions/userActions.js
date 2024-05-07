import * as types from "../constants/userConstants";

export const signUpRequest = (userData) => ({
	type: types.SIGNUP_REQUEST,
	payload: userData,
});

export const signUpSuccess = () => ({
	type: types.SIGNUP_SUCCESS,
});

export const signUpFailure = (error) => ({
	type: types.SIGNUP_FAILURE,
	payload: error,
});

export const otpSuccess = () => ({
	type: types.OTP_SUCCESS,
});

export const signInSuccess = (userData) => ({
	type: types.SIGNIN_SUCCESS,
	payload: userData,
});

export const getProductList = (productList) => ({
	type: types.GET_PRODUCT_LIST,
	payload: productList,
});

export const initializeFavorites = (favorites) => ({
	type: types.INITIALIZE_FAVORITES,
	payload: favorites,
});
export const addToFavorites = (userId, itemId) => ({
	type: types.ADD_TO_FAVORITES,
	payload: { userId, itemId },
});

export const removeFromFavorites = (userId, itemId) => ({
	type: types.REMOVE_FROM_FAVORITES,
	payload: { userId, itemId },
});

export const addToCart = (item) => ({
	type: types.ADD_TO_CART,
	payload: item,
});

export const updateCartItemQuantity = (itemId, newQuantity) => ({
	type: types.UPDATE_CART_ITEM_QUANTITY,
	payload: {
		itemId,
		newQuantity,
	},
});

export const confirmOrder = (cartList) => ({
	type: types.CONFIRM_ORDER,
	payload: cartList,
});

export const savePhoneNumber = (phoneNumber) => ({
	type: types.SAVE_PHONE_NUMBER,
	payload: phoneNumber,
});

export const saveUserData = (userData) => ({
	type: types.SAVE_USER_DATA,
	payload: userData,
});
