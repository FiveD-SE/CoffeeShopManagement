import * as types from "../constants/adminConstants";

const initialState = {
    goodsList: [],
    warehouseItemList: [],
    goodsListRender: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GOODS_LIST_SAVE:
            return {
                ...state,
                goodsList: action.payload,
            };
        case types.WAREHOUSE_ITEM_LIST_SAVE:
            return {
                ...state,
                warehouseItemList: action.payload,
            };
        case types.WAREHOUSE_ITEM_UPDATE:
            return {
                ...state,
                warehouseItemList: state.warehouseItemList.map(item => 
                    {
                        return  (item.goodsId === action.payload.goodsId ? {
                            ...item,
                            goodsQuantity: action.payload.goodsQuantity
                        } : {
                            ...item
                        })
                    }
                ),
            };
        case types.GOODS_LIST_RENDER_SAVE:
            return {
                ...state,
                goodsListRender: action.payload,
            };
        case types.GOODS_UPDATE:
            return {
                ...state,
                goodsListRender: state.goodsListRender.map(item => 
                    {
                        return  (item.goodsId === action.payload.goodsId ? {
                            ...item,
                            goodsQuantity: action.payload.goodsQuantity
                        } : {
                            ...item
                        })
                    }
                ),
            };
        default:
            return state;
    }
}

export default adminReducer;