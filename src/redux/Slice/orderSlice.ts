import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api';

export const placeOrder = createAsyncThunk(
  'order',
  async ({OrderAddress, accessToken, thunkAPI}) => {
    try {
      const placeOrderAPIData = await axios.post(
        `${baseURL}/order`,
        {
          address: OrderAddress,
        },
        {
          headers: {
            access_token: accessToken,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const toastMessage = placeOrderAPIData.data.user_msg;
      Toast.show(toastMessage, Toast.SHORT);
      return placeOrderAPIData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getOrderList = createAsyncThunk(
  'orderList',
  async ({accessToken, thunkAPI}) => {
    try {
      const getOrderListAPIData = await axios.get(`${baseURL}/orderList`, {
        headers: {
          access_token: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });

      return getOrderListAPIData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getOrderDetail = createAsyncThunk(
  'orderDetail',
  async ({orderID, accessToken, thunkAPI}) => {
    try {
      const getOrderDetailtAPIData = await axios.get(
        `${baseURL}/orderDetail?order_id=${orderID}`,
        {
          headers: {
            access_token: accessToken,
            // 'Content-Type': 'multipart/form-data',
          },
        },
      );

      return getOrderDetailtAPIData.data.data;
    } 
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    orderList: [],
    orderDetail: [],
  },
  reducers: {},
  extraReducers: builders => {
    builders
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.orderDetail = action.payload;
      });
  },
});

export default OrderSlice.reducer;
