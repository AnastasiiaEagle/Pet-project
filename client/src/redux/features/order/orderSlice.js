import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import instance from '../../../utils/axios'

export const getCustomer = createAsyncThunk('order/getCustomer',
async (_, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.get('/customer')
        dispatch(setOrder(res.data))
    } catch (error) {
        console.log()
    }
})

export const getOrderAllId = createAsyncThunk('order/getOrderAllId',
async (params, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.get(`/allorder:${params}`)
        dispatch(setOrderAllId(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const getOrderId = createAsyncThunk('order/getOrderId',
async (params, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.get(`/order:${params}`)
        dispatch(setOrderId(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const deleteOrder = createAsyncThunk('order/deleteOrder',
async (params, { rejectWithValue })=>{
    try {
        await instance.delete(`/order:${params}`)
    } catch (error) {
        console.log(error)
    }
})

export const deleteCustomer = createAsyncThunk('order/deleteCustomer',
async (params, { rejectWithValue })=>{
    try {
        console.log(params)
        await instance.delete(`/customer:${params}`)
    } catch (error) {
        console.log(error)
    }
})

export const postOrder = createAsyncThunk('order/postOrder',
async (params, { rejectWithValue })=>{
    try {
        await instance.post('/order', params)
    } catch (error) {
        console.log(error)
    }
})

export const updateOrderStatus = createAsyncThunk('order/updateOrderStatus',
async (params, { rejectWithValue })=>{
    try {
        await instance.patch(`/status_customer:${params.id}`, params)
    } catch (error) {
        console.log(error)
    }
})

export const updateOrderId = createAsyncThunk('order/updateOrderId', 
async (params, { rejectWithValue })=>{
    try {
        console.log(params)
        await instance.patch(`/order:${params.id}`, params)
    } catch (error) {
        console.log(error)
    }
})

export const orderSlice = createSlice({
    name: "order",
    initialState:{
        loading: false,
        data: [],
        dataAllId: [],
        dataId: [],
    },
    reducers:{
        setOrder: (state, action)=>{
            state.data = action.payload
        },
        setOrderAllId: (state, action)=>{
            state.dataAllId = action.payload
        },
        setOrderId: (state, action)=>{
            state.dataId = action.payload
        },
        setOrderIdNull: (state)=>{
            state.dataId = []
        }
    },
    extraReducers:{
    }
})

export const { setOrder, setOrderAllId, setOrderId, setOrderIdNull} = orderSlice.actions
export default orderSlice.reducer