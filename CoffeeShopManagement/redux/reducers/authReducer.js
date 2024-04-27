import * as types from "../constants/userConstants";

const initialState = {
    loading: false,
    error: null,
    success: false,
    userData: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
            };
        case types.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };
        case types.SIGNUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.SIGNIN_SUCCESS:
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
