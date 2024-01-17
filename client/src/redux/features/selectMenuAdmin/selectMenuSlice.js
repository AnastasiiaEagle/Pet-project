import { createSlice } from "@reduxjs/toolkit";

export const selectMenuSlice = createSlice({
    name: "selectMenu",
    initialState:{
        select: "1",
    },
    reducers:{
        setSelectMenu: (state, action)=>{
            state.select = action.payload
        }
    }
})

export const { setSelectMenu } = selectMenuSlice.actions
export default selectMenuSlice.reducer