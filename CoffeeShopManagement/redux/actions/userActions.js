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

export const addToFavorites = (item) => ({
	type: types.ADD_TO_FAVORITES,
	payload: item,
});

export const removeFromFavorites = (itemId) => ({
	type: types.REMOVE_FROM_FAVORITES,
	payload: itemId,
});

export const savePhoneNumber = (phoneNumber) => ({
    type: types.SAVE_PHONE_NUMBER,
    payload: phoneNumber,
});
