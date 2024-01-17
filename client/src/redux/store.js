import { configureStore } from '@reduxjs/toolkit'
import woodSlice from './features/wood/woodSlice'
import userSlice from './features/auth/authSlice'
import selectMenuSlice from './features/selectMenuAdmin/selectMenuSlice'
import additionalTypeSlice from './features/additionalType/additionalTypeSlice'
import additionalSlice from './features/additional/additionalSlice'
import colorSlice from './features/color/colorSlice'
import productTypeSlice from './features/productType/productTypeSlice'
import productSlice from './features/product/productSlice'
import listenerSlice from './features/listener/listenerSlice'
import orderSlice from './features/order/orderSlice'

export const store = configureStore({
    reducer: {
        wood: woodSlice,
        user: userSlice,
        additionalType: additionalTypeSlice,
        selectMenu: selectMenuSlice,
        additional: additionalSlice,
        color: colorSlice,
        productType: productTypeSlice,
        product: productSlice,
        listener: listenerSlice,
        order: orderSlice,
    },
})

