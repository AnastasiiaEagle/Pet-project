import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../../utils/axios'

export const getAdditionalType = createAsyncThunk('additionalType/getAdditionalType',
async (_, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.get('/additional_type')
        dispatch(setAdditionalType(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const postAdditionalType = createAsyncThunk('additionalType/postAdditionalType',
async (params, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.post('/additional_type', params)
        dispatch(setAdditionalType(res.data))
    } catch (error) {
        console.log(error)
    }    
})

export const updateAdditionalType = createAsyncThunk('additionalType/updateAdditionalType',
    async (params, {rejectWithValue})=>{
        try {
            const res = await instance.patch(`/additional_type:${params.stateUpdateId}`, params)
        } catch (error) {
            console.log(error)
        }
    }
)

export const deleteAdditionalType = createAsyncThunk('additionalType/deleteAdditionalType',
async (params, {rejectWithValue, dispatch})=>{
    try {
        const res = await instance.delete(`/additional_type:${params}`)
        dispatch(setAdditionalType(res.data))
    } catch (error) {
        console.log(error)
    }
}
)

export const additionalTypeSlice = createSlice({
    name: "additionalType",
    initialState:{
        data: [],
        loading: false,
        status: '',
    },
    reducers: {
        setAdditionalType: (state, action)=>{
            state.data = action.payload
            state.status = action.payload?.message
        }
    },
    extraReducers: {
        //Get
        [getAdditionalType.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [getAdditionalType.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [getAdditionalType.rejected]: (state, {action})=>{ // Неполадки
            state.loading = false
        },
        //Post
        [postAdditionalType.pending]: (state)=>{ //Грузить
            state.loading = true
            state.message = ''
        },
        [postAdditionalType.fulfilled]: (state, {action})=>{ //Дані получені
            state.loading = false
        },
        [postAdditionalType.rejected]: (state, {action})=>{ // Неполадки
            state.loading = false
        },
    }
})

export const { setAdditionalType } = additionalTypeSlice.actions
export default additionalTypeSlice.reducer