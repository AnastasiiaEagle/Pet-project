import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../../utils/axios'

export const getWood = createAsyncThunk('wood/getWood',
async (_, { rejectWithValue, dispatch })=>{ //перший аргумент, передача даних
    const res = await instance.get('/wood')
    dispatch(setWood(res.data))
})

export const postWood = createAsyncThunk('wood/postWood',
async (params, { rejectWithValue })=>{
    try {
       await instance.post('/wood', params)
    } catch (error) {
        console.log(error)
    }
})

export const updateWood = createAsyncThunk('wood/updateWood',
async (params, { rejectWithValue })=>{
    try {
        await instance.patch(`/wood:${params.get("id")}`, params)
    } catch (error) {
        console.log(error)
    }
})

export const deleteWood = createAsyncThunk('wood/deleteWood',
async (params, { rejectWithValue })=>{
    try {
        await instance.delete(`/wood:${params}`)
    } catch (error) {
        console.log(error)
    }
})

export const woodSlice = createSlice({
    name: "wood",
    initialState:{
        data: [],
        loading:false,
    },
    reducers: {
        setWood: (state, action)=>{
            state.data = action.payload
        }
    },
    extraReducers: {
        [getWood.pending]: (state)=>{ //Грузить
             state.loading = true
        },
        [getWood.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getWood.rejected]: (state, {action})=>{ // Неполадки
            state.loading = false
        },
    },
})

export const { setWood } = woodSlice.actions
export default woodSlice.reducer
