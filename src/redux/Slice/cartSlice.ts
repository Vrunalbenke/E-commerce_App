import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

interface EditCartItemData {
  product_id: number;
  quantity: number;
  accessToken: string;
  ToastMessage: string;
}

interface DeleteItemData {
  product_id: number;
  accessToken: string;
}

interface EditCartItemResponse {
  status: string; // Adjust the type according to the actual response structure
  user_msg: string; // Adjust the type according to the actual response structure
}

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api';

export const AddToCart = createAsyncThunk(
  'addToCart',
  async ({formData, accessToken, thunkAPI}) => {
    try {
      const ItemAdded = await axios.post(`${baseURL}/addToCart`, formData, {
        headers: {
          access_token: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('🦄🦄🦄🦄🦄🦄🦄🦄', ItemAdded.data);
      const toastMessage = ItemAdded.data.user_msg;
      Toast.show(toastMessage, Toast.SHORT);
      return ItemAdded.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getCartItem = createAsyncThunk(
  'cart',
  async (accessToken, thunkAPI) => {
    try {
      const CartItems = await axios.get(`${baseURL}/cart`, {
        headers: {
          access_token: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('%%%%%%%%%%%%%%%%%%%%%%', CartItems.data);

      return CartItems.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editCartItem = createAsyncThunk<string, EditCartItemData>(
  'editCart',
  async (
    {product_id, quantity, accessToken, ToastMessage}: EditCartItemData,
    thunkAPI,
  ) => {
    try {
      if (quantity > 8) {
        Toast.show(ToastMessage, Toast.SHORT);
        return 400;
      } else if (quantity < 1) {
        Toast.show(ToastMessage, Toast.SHORT);
        return 400;
      } else {
        const EditCart = await axios.post(
          // `${baseURL}/editCart?product_id=${product_id}&quantity=${quantity}`,
          `${baseURL}/editCart`,
          {
            product_id: product_id,
            quantity: quantity,
          },
          {
            headers: {
              access_token: accessToken,
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        //   const toastMessage = EditCart.data.user_msg;
        Toast.show(ToastMessage, Toast.SHORT);
        return EditCart.data;
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteItem = createAsyncThunk<string, DeleteItemData>(
  'deleteCart',
  async ({product_id, accessToken}: DeleteItemData, thunkAPI) => {
    try {
      const DeletedData = await axios.post(
        `${baseURL}/deleteCart`,
        {
          product_id: product_id,
        },
        {
          headers: {
            access_token: accessToken,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const toastMessage = DeletedData.data.user_msg;
      Toast.show(toastMessage, Toast.SHORT);
      return DeletedData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    CartData: [],
    CartItem: [],
    EditStatus: [],
    DeleteItem: [],
    ButtonName: 'Add to cart',
  },
  reducers: {
    GetBtnName: (state, action) => {
      console.log(state.CartItem?.data, '🚦🚦🚦🚦🚦🚦🚦🚦🚦');
      const length = state.CartItem?.data?.length;

      if (length !== null) {
        for (let v = 0; v < length; v++) {
          if (state.CartItem.data[v].product_id === action.payload) {
            state.ButtonName = 'Go to cart';
            console.log(
              '🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦',
            );
            return;
          } else {
            state.ButtonName = 'Add to cart';
          }
        }
      } else {
        console.log('returned here,🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦🚦')
        state.ButtonName = 'Add to cart';
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(AddToCart.fulfilled, (state, action) => {
        //   state.CartData.push(action.payload);
        state.CartData = action.payload;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.CartItem = action.payload;
      })
      .addCase(editCartItem.fulfilled, (state, action) => {
        state.EditStatus = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.DeleteItem = action.payload;
      });
  },
});

export const {GetBtnName} = cartSlice.actions;

export default cartSlice.reducer;
