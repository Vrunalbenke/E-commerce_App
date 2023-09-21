import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = 'http://staging.php-dev.in:8844/trainingapp/api'

const initialState = {
    ProductData:[],
    ProductDetailData:[]
}

export const getProduct = createAsyncThunk('products/getList', async (product_category_id,thunkAPI) =>{
    try{
        console.log('getProduct function call --> ',product_category_id)
        const ProductAPIData = await axios.get(`${baseURL}/products/getList?product_category_id=${product_category_id}`,
            {headers: {
                'Content-Type': 'multipart/form-data',
                }}
        )
        // console.log(ProductData.data)
        return ProductAPIData.data.data
    }
    catch(error:any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})


export const getProductDetail = createAsyncThunk('products/getDetail',async(product_id,thunkAPI)=>{
    try{
        const productDetail = await axios.get(`${baseURL}/products/getDetail?product_id=${product_id}`)
    // {headers: {
    //     'Content-Type': 'multipart/form-data',
    //     }}
    return productDetail.data
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
            state.ProductData = [];
        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            // state.ProductData.splice(0,state.ProductData.length)
            // state.ProductData.pop()
            // state.ProductData.push(action.payload)
            state.ProductData =  action.payload
        }).addCase(getProductDetail.fulfilled,(state,action)=>{
            state.ProductData.splice(0,state.ProductData.length)
            state.ProductDetailData.push(action.payload)
        })
    },
})

export const {EmptyProductData} = ProductSlice.actions

export default ProductSlice.reducer