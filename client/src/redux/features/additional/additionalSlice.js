import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../../utils/axios'

export const getAdditional = createAsyncThunk('additional/getAdditional',
async (_, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get('/material_additional')
        dispatch(setAdditional(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const getAdditionalId = createAsyncThunk('additional/getAdditional',
async (params, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get(`/material_additional:${params.type}`)
        dispatch(setAdditional(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const postAdditional = createAsyncThunk('additional/postAdditional',
async (params, {rejectWithValue})=>{
    try {
        await instance.post('/material_additional', params)
    } catch (error) {
        console.log(error)
    }    
})

export const updateAdditional = createAsyncThunk('additional/updateAdditional',
async (params, {rejectWithValue})=>{
    try {
        await instance.patch(`/material_additional:${params.get("id")}`, params)
    } catch (error) {
        console.log(error)
    }    
})
export const deleteAdditional = createAsyncThunk('additional/deleteAdditional',
async (params, {rejectWithValue})=>{
    try {
        await instance.delete(`/material_additional:${params}`)
    } catch (error) {
        console.log(error)
    }    
})


export const additionalSlice = createSlice({
    name: "additional",
    initialState:{
        data: [],
        loading: false,
        status: '',
    },
    reducers: {
        setAdditional: (state, action)=>{
            state.data = action.payload
            state.status = action.payload.message
        }
    },
    extraReducers: {
        //Get
        [getAdditional.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [getAdditional.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getAdditional.rejected]: (state, {action})=>{ // Неполадки
            state.loading = false
        },
    }
})

export const { setAdditional } = additionalSlice.actions
export default additionalSlice.reducer