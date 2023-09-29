import { createSlice } from "@reduxjs/toolkit";



const AddressSlice = createSlice({
    name:'address',
    initialState:{
        address:[]
    },
    reducers:{
        AddAddress:(state,action)=>{
            state.address.push(action.payload);
        },
        DeleteAddress:(state,action)=>{
            state.address = state.address.filter((element)=>{
                return element.streetAddress !== action.payload
            })
        }
    }
})

export const {AddAddress,DeleteAddress} = AddressSlice.actions

export default AddressSlice.reducer