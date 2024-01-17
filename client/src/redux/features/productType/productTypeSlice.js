import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../../utils/axios'

export const getProductType = createAsyncThunk('productType/getProductType',
async (_, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get('/type')
        dispatch(setProductType(res.data))
    } catch (error) {
        console.log(400)
    }
})

export const postProductType = createAsyncThunk('productType/postProductType',
async (params, {rejectWithValue})=>{
    try {
        const res = await instance.post('/type', params)
    } catch (error) {
        console.log(error)
    }    
})

export const updateProductType = createAsyncThunk('productType/updateProductType',
    async (params, {rejectWithValue})=>{
        try {
            const res = await instance.patch(`/type:${params.stateUpdateId}`, params)
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteProductType = createAsyncThunk('productType/deleteProductType',
async (params, {rejectWithValue})=>{
    try {
        const res = await instance.delete(`/type:${params}`)
    } catch (error) {
        console.log(error)
    }
})

export const productTypeSlice = createSlice({
    name: "productType",
    initialState:{
        data: [],
        loading: false,
        status: '',
    },
    reducers: {
        setProductType: (state, action)=>{
            state.data = action.payload
            state.status = action.payload.message
        }
    },
    extraReducers: {
        //Get
        [getProductType.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [getProductType.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getProductType.rejected]: (state, {action})=>{ // Неполадки
            state.loading = false
        },
    }
})

export const { setProductType } = productTypeSlice.actions
export default productTypeSlice.reducer