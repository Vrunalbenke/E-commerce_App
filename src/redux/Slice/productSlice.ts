import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-simple-toast'

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api'

const initialState = {
    ProductData:[],
    ProductDetailData:[],
    isLoading:false,
    ProductRating:[]
}

export const getProduct = createAsyncThunk('products/getList', async (product_category_id,thunkAPI) =>{
    try{
        // console.log('getProduct function call --> ',product_category_id)
        initialState.isLoading = true;
        const ProductAPIData = await axios.get(`${baseURL}/products/getList?product_category_id=${product_category_id}`,
            {headers: {
                'Content-Type': 'multipart/form-data',
                }}
        )
        console.log(ProductAPIData.data.data)
        initialState.isLoading = false
        return ProductAPIData.data.data
    }
    catch(error:any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})


export const getProductDetail = createAsyncThunk('products/getDetail',async(product_id,thunkAPI)=>{
    try{
        console.log('API is Calling?????????')
        const productDetail = await axios.get(`${baseURL}/products/getDetail?product_id=${product_id}`)
    // {headers: {
    //     'Content-Type': 'multipart/form-data',
    //     }}
    return productDetail.data.data
    }
    catch(error:any){
        return thunkAPI.rejectWithValue(error.message)
    }
})

export const setProductRating = createAsyncThunk('products/setRating',async(formData,thunkAPI)=>{
    try{
        const ProductRatingAPIData = await axios.post(`${baseURL}/products/setRating`,
        formData,
        {headers: {
                'Content-Type': 'multipart/form-data',
                }}
        )
        console.log(ProductRatingAPIData.data)
        const toastMsg = ProductRatingAPIData.data.user_msg;

        Toast.show(toastMsg,Toast.SHORT)
        return ProductRatingAPIData.data
    }
    catch(error:any){
        return thunkAPI.rejectWithValue(error.message)
    }
})


const ProductSlice = createSlice({
    name:'Product',
    initialState,
    reducers:{
        EmptyProductData: (state,action)=>{
            // state.ProductData.splice(0,action.payload)
            state.ProductData = action.payload
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getProduct.pending,(state,action)=>{
            // state.ProductData = [];
            // state.isLoading = true;
            console.log('🎒🎒🎒🎒🎒🎒🎒🎒🎒🎒 extrareducer of productSlice',state.ProductData)
        }).addCase(getProduct.fulfilled,(state,action)=>{
            // state.ProductData.splice(0,state.ProductData.length)
            // state.ProductData.pop()
            // state.ProductData.push(action.payload)
            // state.isLoading = false
            state.ProductData =  action.payload
            console.log('Product slicer log',state.ProductData)
            
        }).addCase(getProductDetail.fulfilled,(state,action)=>{
            // state.ProductData.splice(0,state.ProductData.length)
            state.ProductDetailData = action.payload
        })
        .addCase(setProductRating.fulfilled,(state,action)=>{
            state.ProductRating = action.payload
        })
    },
})

export const {EmptyProductData} = ProductSlice.actions

export default ProductSlice.reducer