import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-simple-toast'


const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api'

export const getPassword = createAsyncThunk('users/forgot', async (emailID,thunkAPI)=>{
    const formData = new FormData();
    formData.append('email',emailID)

    try{
        const PassAPIData = await axios.post(`${baseURL}/users/forgot`,formData,{headers: {
            'Content-Type': 'multipart/form-data',
            },})
        console.log('$$$$$$$$$$',PassAPIData.data)
        const toastMessage = PassAPIData.data.user_msg;
        Toast.show(toastMessage,Toast.SHORT);
        return PassAPIData
    }
    catch(error){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const changePassword = createAsyncThunk('users/change',async({formData,accessToken,thunkAPI})=>{
    try{
        const passwordChanged = await axios.post(`${baseURL}/users/change`,formData,{
            headers: {
                access_token : accessToken,
                'Content-Type': 'multipart/form-data',
                },
        })
        const toastMessage = passwordChanged.data.user_msg;
        Toast.show(toastMessage,Toast.SHORT)
        console.log(passwordChanged.data)
        return passwordChanged.status;
    }
    catch(error:any){
        return thunkAPI.rejectWithValue(error.message)
    }
})

const passwordSlice = createSlice({
    name:'password',
    initialState:{
        password:[],
        PassChangeStatus:[]
    },
    reducers:{

    },
    extraReducers:(builder)=> {
        builder.addCase(getPassword.fulfilled,(state,action)=>{
            state.password = action.payload
        })
        .addCase(changePassword.fulfilled,(state,action)=>{
            state.PassChangeStatus = action.payload
        })
    },
})


export default passwordSlice.reducer;