import * as types from "../constants/adminConstants";

export const goodsListSave = (goodsList) => ({
    type: types.GOODS_LIST_SAVE,
    payload: goodsList,
})

export const warehouseItemListSave = (warehouseItemList) => ({
    type: types.WAREHOUSE_ITEM_LIST_SAVE,
    payload: warehouseItemList,
})

export const warehouseItemUpdate = (warehouseItem) => ({
    type: types.WAREHOUSE_ITEM_UPDATE,
    payload: warehouseItem,
})

export const goodsListRenderSave = (goodsListRender) => ({
    type: types.GOODS_LIST_RENDER_SAVE,
    payload: goodsListRender,
})

export const goodsUpdate = (goodsList) => ({
    type: types.GOODS_UPDATE,
    payload: goodsList,
})