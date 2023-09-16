import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-simple-toast'


const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api'

export const registerUser = createAsyncThunk('register/user', async (formData,thunkAPI) => {
    try{
        const res = await axios.post(`${baseURL}/users/register`,
            formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            }
    )

    Toast.show('Registered',Toast.SHORT)
    return res.status
    }
    catch(error:any){
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const loginUser = createAsyncThunk('login/User', async (formData,thunkAPI) => {
    try{
        const res = await axios.post(`${baseURL}/users/login`,
            formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            }
    )
    Toast.show('Logged in Successfully',Toast.SHORT)
    return res.data
    }
    catch(error:any){
        return thunkAPI.rejectWithValue(error.message);
    }

})

const initialState = {
    AuthData:[]
}
const AuthSlice = createSlice({
    name:'AuthUser',
    initialState,
    reducers:{
        addUser:(state,action)=>{
            
        }
    },
    extraReducers:(builder) => {
        builder.addCase(loginUser.fulfilled,(state,action:any)=>{
            // state.AuthData.push(2)
            state.AuthData.push(action.payload)
        })
    },
})


export default AuthSlice.reducer