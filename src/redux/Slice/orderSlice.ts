import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-simple-toast'

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api'


export const placeOrder = createAsyncThunk('order', async({address,accessToken,thunkAPI})=>{
    try{
        const placeOrderAPIData = await axios.post(`${baseURL}/order`,{
            address:address,
        },
        {
            headers:{
                access_token : accessToken,
                'Content-Type': 'multipart/form-data',
            }
        })

        const toastMessage = placeOrderAPIData.data.user_msg;
        Toast.show(toastMessage,Toast.SHORT)
        return placeOrderAPIData.data
    }
    catch(error:any){
        return thunkAPI.rejectWithValue(error.message)
    }
})

const OrderSlice = createSlice({
    name:'order',
    initialState:{
        order:[],
        orderList:[],
        orderDetail:[]
    },
    reducers:{

    },
    extraReducers:(builders)=>{
        builders.addCase(placeOrder.fulfilled,(state,action)=>{
            state.order = action.payload;
        })
    }
})



export default OrderSlice.reducer