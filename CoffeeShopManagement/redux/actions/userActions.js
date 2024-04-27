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
