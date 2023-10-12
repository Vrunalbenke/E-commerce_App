import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api';

export const getUserDetail = createAsyncThunk(
  'users/getUserData',
  async (accessToken: string, thunkAPI) => {
    try {
      const UserAPIData = await axios.get(`${baseURL}/users/getUserData`, {
        headers: {
          access_token: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(UserAPIData.data.data.user_data);
      return UserAPIData.data.data.user_data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserDetail = createAsyncThunk(
  'users/update',
  async ({formData, accessToken, thunkAPI}) => {
    try {
      const UpdateAPIData = await axios.post(
        `${baseURL}/users/update`,
        formData,
        {
          headers: {
            access_token: accessToken,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const toastMessage = UpdateAPIData.data.user_msg;
      Toast.show(toastMessage, Toast.SHORT);
      return UpdateAPIData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    updateStatus: [],
  },
  reducers: {},
  extraReducers: builders => {
    builders
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserDetail.fulfilled, (state, action) => {
        state.updateStatus = action.payload;
      });
  },
});

export default userSlice.reducer;
