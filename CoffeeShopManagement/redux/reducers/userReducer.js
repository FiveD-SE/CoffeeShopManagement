import * as types from "../constants/userConstants";

const initialState = {
	favoriteList: [],
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TO_FAVORITES:
			return {
				...state,
				favoriteList: [...state.favoriteList, action.payload],
			};
		case types.REMOVE_FROM_FAVORITES:
			return {
				...state,
				favoriteList: state.favoriteList.filter(
					(item) => item.id !== action.payload
				),
			};
		default:
			return state;
	}
};

export default userReducer;
