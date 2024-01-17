import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import instance from '../../../utils/axios'

export const postAuth = createAsyncThunk('user/postAuth',
async (params, {rejectWithValue})=>{
    try {
        await instance.post('/auth/register', params)
    } catch (error) {
        console.log(error)
    }
}
)

export const postUser = createAsyncThunk('user/postUser',
async (params, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.post('/auth/login', params)
        dispatch(setUser(res.data))
    } catch (error) {
        dispatch(setUser({message: "Ви ввели невірні дані"}))
    }
})

export const getUsers = createAsyncThunk('user/getUsers',
async (_, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.get('/auth/user')
        dispatch(setUsers(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const getMe = createAsyncThunk('user/getMe',
async (_, { rejectWithValue, dispatch })=>{
    try {
        const res = await instance.post('/auth/me')
        dispatch(setUser(res.data))
    } catch (error) {
        console.log(error)
    }
})

export const deleteUser = createAsyncThunk('user/deleteUser',
async (params, { rejectWithValue })=>{
    try {
        await instance.delete(`/auth/delete:${params}`)
    } catch (error) {
        console.log(error)
    }
}
)

export const userSlice = createSlice({
    name: 'user',
    initialState:{
        users: [],
        token: null,
        role: null,
        loading: false,
        status: '',
    },
    reducers:{
        setUser: (state, action)=>{
            state.token = action.payload?.token
            state.role = action.payload?.role
            localStorage.setItem("token", action.payload?.token)
            state.status = action.payload.message
        },
        logout: (state)=>{
            state.token = null
            state.loading = false
            state.status = ''
        },
        setUsers: (state, action)=>{
            state.users = action.payload
        }
    },
    extraReducers:{
        //Логін
        [postUser.pending]: (state)=>{ 
            state.loading = true
            state.message = ''
        },
        [postUser.fulfilled]: (state, {action})=>{
            state.loading = false
        },
        [postUser.rejected]: (state, {action})=>{
            state.loading = false
        },
        //Перевірка
        [getMe.pending]: (state)=>{
            state.loading = true
            state.message = ''
        },
        [getMe.fulfilled]: (state, {action})=>{
            state.loading = false
            state.message = null
        },
        [getMe.rejected]: (state, {action})=>{
            state.loading = false
        },
        //Виведення користувачів
        [getUsers.pending]: (state)=>{ 
            state.loading = true
            state.message = ''
        },
        [getUsers.fulfilled]: (state, {action})=>{ 
            state.loading = false
            state.message = null
        },
        [getUsers.rejected]: (state, {action})=>{ 
            state.loading = false
        },
    },
})

export const checkIsAuth = (state) => Boolean(state.user.token)
export const checkIsRole = (state) => state.user.role

export const { setUser, logout, setUsers } = userSlice.actions
export default userSlice.reducer