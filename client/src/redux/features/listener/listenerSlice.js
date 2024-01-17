import { createSlice } from "@reduxjs/toolkit";

export const ListenerSlice = createSlice({
    name: "listener",
    initialState:{
        addBool: false,
        updateBool: false,
        id_type: "",
        id: "",
        status: "",
        productId: "",
        number: 0,
    },
    reducers:{
        setAddBool: (state, action)=>{
            if(action.payload == true){
                state.addBool = true
            }else{
                state.addBool = false
            }
        },
        setUpdateBool: (state, action)=>{
            if(action.payload.update == true){
                state.updateBool = true
                state.status = action.payload?.status
                state.productId = action.payload?.productId
                state.number = action.payload?.discount
            }else{
                state.updateBool = false
                state.id = ""
                state.status = ""
                state.productId = ""
            }
            state.id = action.payload.id
        },
        setTypeId: (state, action)=>{
            state.id_type = action.payload
        },
        setProductId: (state, action)=>{
            state.productId = action.payload
        }
        
    }
})

export const { setAddBool, setUpdateBool, setTypeId, setProductId } = ListenerSlice.actions
export default ListenerSlice.reducer