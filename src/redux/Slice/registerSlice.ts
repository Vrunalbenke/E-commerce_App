import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api';

export const registerUser = createAsyncThunk(
  'register/user',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const toastMsg: string = res.data.user_msg;
      Toast.showWithGravity(toastMsg, Toast.SHORT, Toast.BOTTOM);
      return res.status;
    } catch (error: any) {
      Toast.showWithGravity(
        'Email id already exist',
        Toast.SHORT,
        Toast.CENTER,
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginUser = createAsyncThunk(
  'login/User',
  async (formData, thunkAPI) => {
    try {
      const res = await axios.post(`${baseURL}/users/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const toastMsg: string = res.data.user_msg;
      console.log('toast message ', toastMsg);
      Toast.showWithGravity(toastMsg, Toast.SHORT, Toast.BOTTOM);
      console.log(res.data.data);
      return res.data.data;
    } catch (error: any) {
      Toast.show('Email or password is wrong. try again', Toast.SHORT);
      return thunkAPI.rejectWithValue('Email or password is wrong. try again');
    }
  },
);

const initialState = {
  AuthData: [],
  AccessToken: [],
};
const AuthSlice = createSlice({
  name: 'AuthUser',
  initialState,
  reducers: {
    logout: (state, action) => {
      // state.AuthData.splice(0,action.payload)
      state.AccessToken = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      // state.AuthData.push(2)
      state.AuthData = action.payload;
      state.AccessToken = action.payload.access_token;
    });
  },
});

export const {logout} = AuthSlice.actions;

export default AuthSlice.reducer;
