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
		case types.SAVE_EMAIL:
			return {
				...state,
				phoneNumber: action.payload,
			};
		case types.SAVE_USER_DATA:
			return {
				...state,
				userData: action.payload,
			};
		case types.UPDATE_USER_DATA:
			return {
				...state,
				userData: {
					...state.userData, // Keep existing data
					...(action.payload || {}), // Merge changed fields
				},
			};
		case types.UPDATE_USER_CREDIT: {
			console.log("action.payload", action.payload);
			return {
				...state,
				userData: {
					...state.userData,
					credit: action.payload,
				},
			};
		}
		case types.UPDATE_USER_RECENTLY_VIEWED:
			return {
				...state,
				userData: {
					...state.userData,
					recentlyViewedItems: action.payload,
				},
			};
		default:
			return state;
	}
};

export default authReducer;
