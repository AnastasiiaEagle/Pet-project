import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../../utils/axios'

export const getColor = createAsyncThunk('color/getColor',
async (_, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get('/color')
        dispatch(setColor(res.data))
    } catch (error) {
        console.log(400)
    }
})

export const getIdColor = createAsyncThunk('color/getIdColor',
async (params, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get(`/color:${params}`)
        dispatch(setColorId(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const postColor = createAsyncThunk('color/postColor',
async (params, {rejectWithValue})=>{
    try {
        await instance.post('/color', params)
    } catch (error) {
        console.log(error)
    }    
})

export const updateColor = createAsyncThunk('color/updateColor',
async (params, {rejectWithValue})=>{
    try {
        await instance.patch(`/color:${params.get("id")}`, params)
    } catch (error) {
        console.log(error)
    }    
})

export const deleteColor = createAsyncThunk('color/deleteColor',
async (params, {rejectWithValue})=>{
    try {
        await instance.delete(`/color:${params}`)
    } catch (error) {
        console.log(error)
    }
})

export const colorSlice = createSlice({
    name: "color",
    initialState:{
        data: [],
        loading: false,
        status: '',
        dataId: [],
    },
    reducers: {
        setColor: (state, action)=>{
            state.data = action.payload
            state.status = action.payload.message
        },
        setColorId: (state, action)=>{
            state.dataId = action.payload
        }
    },
    extraReducers: {
        //Get
        [getColor.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [getColor.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getColor.rejected]: (state, {action})=>{ // Неполадки
            state.loading = false
        },
        //Get Id
        [getIdColor.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [getIdColor.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getIdColor.rejected]: (state, {action})=>{ // Неполадки
            state.loading = false
        },
    }
})

export const { setColor, setColorId } = colorSlice.actions
export default colorSlice.reducer