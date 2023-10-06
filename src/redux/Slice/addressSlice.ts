import { createSlice } from "@reduxjs/toolkit";



const AddressSlice = createSlice({
    name:'address',
    initialState:{
        address:[],
        selectAddress:[],
    },
    reducers:{
        AddAddress:(state,action)=>{
            if(!state.address){
                state.address = []
            }
            state.address.push(action.payload);
        },
        DeleteAddress:(state,action)=>{
            state.address = state.address.filter((element)=>{
                return element.index !== action.payload
            })
        },
        EditAddress: (state,action)=>{
            // console.log(action.payload.index,'🏠🏠🏠🏠🏠🏠🏠🏠Address:',action.payload.address)
            console.log(state.address,'🏠🏠🏠🏠🏠🏠🏠🏠Address:')
            state.address = state.address.map((item)=>{

                if( item.index === action.payload.key){
                    console.log(item,'🏩🏩🏩🏩🏩🏩🏩🏩',action.payload.address)
                    item = action.payload.address
                    console.log(item,'THis is the item of Filter')
                }
                return item
            })
            console.log(state.address,'#*&*#*#&&#')
        },
        DeliveryAddress:(state,action)=>{
            if(action.payload >= 0){
                console.log(action.payload,'AddressSlicer Call')
                state.selectAddress = state.address.reduce((acc,curr,index)=>{
                    if(index === action.payload){
                        acc  = curr 
                    }
                    return acc 
                },[])
            }
            else{
                state.selectAddress = state.selectAddress
            }

        },
        EmptyData:(state,action)=>{
            state.address= action.payload
            state.selectAddress = action.payload
        }
    }
})

export const {AddAddress,DeleteAddress,EditAddress,DeliveryAddress,EmptyData} = AddressSlice.actions

export default AddressSlice.reducer