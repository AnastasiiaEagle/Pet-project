import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../../utils/axios'

export const getProduct = createAsyncThunk('product/getProduct',
async (_, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get('/product')
        dispatch(setProduct(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const getProductTypeId = createAsyncThunk('product/getProductTypeId',
async (params, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get(`/productId:${params.type}`)
        dispatch(setProduct(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const getProductId = createAsyncThunk('product/getProductId',
async (params, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.get(`/product:${params}`)
        dispatch(setProductId(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const getProductSizeId = createAsyncThunk('product/getProductSizeId',
async (params, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.get(`/size:${params}`)
        dispatch(setProduct(res.data))
    }catch (error) {
        console.log(error)
    }
}
)

export const postProduct = createAsyncThunk('product/postProduct',
async (params, {rejectWithValue})=>{
    try {
        await instance.post('/product', params)
    }catch (error) {
        console.log(error)
    }
})

export const updateProduct = createAsyncThunk('product/updateProduct',
async (params, {rejectWithValue})=>{
    try {
        await instance.patch(`/product:${params.productID}`, params.data)
    } catch (error) {
        console.log(error)
    }
})

export const updateProductPhoto = createAsyncThunk('product/updateProductPhoto',
async (params, {rejectWithValue})=>{
    try {
        await instance.patch(`/product/photo:${params.get("id")}`, params)
    } catch (error) {
        console.log(error)
    }
})

export const updateProductSize = createAsyncThunk('product/updateProductSize',
async (params, {rejectWithValue})=>{
    try {
        await instance.patch(`/product/size:${params.productID}`, params)
    } catch (error) {
        console.log(error)
    }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct',
async (params, { rejectWithValue })=>{
    try {
        await instance.delete(`/product:${params}`)
    } catch (error) {
        console.log(error)
    }
})

export const productSlice = createSlice({
    name: "product",
    initialState:{
        data: [],
        dataId: [],
        loading: false,
        status: '',
    },
    reducers: {
        setProduct: (state, action)=>{
            state.data = action.payload
            state.status = action.payload.message
        },
        setProductId: (state, action)=>{
            state.dataId = action.payload
        }
    },
    extraReducers: {
        //Get
        [getProduct.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [getProduct.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getProduct.rejected]: (state, {action})=>{ // Помилки
            state.loading = false
        },
        //Get Id
        [getProductId.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [getProductId.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getProductId.rejected]: (state, {action})=>{ // Помилки
            state.loading = false
        },
    }
})

export const { setProduct, setProductId } = productSlice.actions
export default productSlice.reducer