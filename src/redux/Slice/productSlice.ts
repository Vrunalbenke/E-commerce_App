import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api';

const initialState = {
  ProductData: [],
  ProductDetailData: [],
  isLoading: false,
  ProductRating: [],
  FullProduct: [],
  routeStack: [],
};

export const getProduct = createAsyncThunk(
  'products/getList',
  async (product_category_id, thunkAPI) => {
    try {
      // console.log('getProduct function call --> ',product_category_id)
      initialState.isLoading = true;
      const ProductAPIData = await axios.get(
        `${baseURL}/products/getList?product_category_id=${product_category_id}`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(ProductAPIData.data.data, '🏝🏝🏝🏝🏝🏝🌋🌋🌋🌋🌋🌋🌋🌋🌋');
      initialState.isLoading = false;
      return ProductAPIData.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getFullProduct = createAsyncThunk(
  'products/getFullProductList',
  async (_,thunkAPI) => {
    try {
      initialState.isLoading = true
      let FullProductAPIData = [];
      for(let i = 1; i < 5;i++){
        const url  = `${baseURL}/products/getList?product_category_id=${i}`
       let response = await axios.get(url);
      FullProductAPIData.push(response.data.data)
    }
      // console.log(FullProductAPIData, '🌋🌋🌋🌋🌋🌋🌋🌋🌋');
      return FullProductAPIData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getProductDetail = createAsyncThunk(
  'products/getDetail',
  async (product_id, thunkAPI) => {
    try {
    //   console.log('API is Calling?????????');
      const productDetail = await axios.get(
        `${baseURL}/products/getDetail?product_id=${product_id}`,
      );
      // {headers: {
      //     'Content-Type': 'multipart/form-data',
      //     }}
      return productDetail.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const setProductRating = createAsyncThunk(
  'products/setRating',
  async (formData, thunkAPI) => {
    try {
      const ProductRatingAPIData = await axios.post(
        `${baseURL}/products/setRating`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      // console.log(ProductRatingAPIData.data);
      const toastMsg = ProductRatingAPIData.data.user_msg;

      Toast.show(toastMsg, Toast.SHORT);
      return ProductRatingAPIData.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    EmptyProductData: (state, action) => {
      // state.ProductData.splice(0,action.payload)
      state.ProductData = action.payload;
    },
    RouteStack: (state,action)=>{
      console.log(action.payload)
      
      console.log(state.routeStack,'🐬🐬🐬🐬🐬🐬🐬🐬🐬')
      state.routeStack.push(action.payload);
    },
    PopRouteStack: (state,action)=>{
      state.routeStack = state.routeStack.filter((item,index)=>{
        return index !== action.payload
      })
    },
    EmptyRouteStack:(state,action)=>{
      state.routeStack = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        // state.ProductData = [];
        // state.isLoading = true;
        console.log(
          '🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒 extrareducer of productSlice',
          state.ProductData,
        );
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.ProductData = action.payload;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.ProductDetailData = action.payload;
      })
      .addCase(setProductRating.fulfilled, (state, action) => {
        state.ProductRating = action.payload;
      })
      .addCase(getFullProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.FullProduct = action.payload;
      });
  },
});

export const {EmptyProductData,RouteStack,PopRouteStack,EmptyRouteStack} = ProductSlice.actions;

export default ProductSlice.reducer;
