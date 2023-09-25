import { createSlice } from "@reduxjs/toolkit";



const AddressSlice = createSlice({
    name:'address',
    initialState:{
        address:[]
    },
    reducers:{
        AddAddress:(state,action)=>{
            state.address.push(action.payload);
        }
    }
})

export const {AddAddress} = AddressSlice.actions

export default AddressSlice.reducer