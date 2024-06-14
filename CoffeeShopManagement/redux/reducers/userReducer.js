import * as types from "../constants/userConstants";

const initialState = {
	productList: [],
	favoriteList: [],
	cartList: [],
	orderInformation: [],
	addressStatus: false,
	deliveryStatus: false,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
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
		case types.CONFIRM_ORDER:
			return {
				...state,
				orderInformation: action.payload,
			};
		case types.UPDATE_USER_LIKES:
			return {
				...state,
				favoriteList: action.payload,
			};
		case types.UPDATE_ADDRESS_STATUS:
			console.log("Updating address status:", action.payload);
			return {
				...state,
				addressStatus: action.payload,
			};
		case types.UPDATE_DELIVERY_STATUS:
			return {
				...state,
				deliveryStatus: action.payload,
			};

		default:
			return state;
	}
};

export default userReducer;
