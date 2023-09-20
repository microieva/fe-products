import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '../@types/product';
import axios, { AxiosError, AxiosResponse } from 'axios';

const initialState: Product[] = [];

export const fetchProductsAsync = createAsyncThunk(
    'fetchProductsAsync',
    async () => {
        // const response: Promise<AxiosResponse<Product[]>> = await axios.get('https://api.escuelajs.co/api/v1/products');
        // state = response.data;
        try{
            //setLoading(true)
            const response: AxiosResponse<Product[]> = await axios.get('https://api.escuelajs.co/api/v1/products');
            return response.data;
        }catch(e){
            const err = e as AxiosError;
            console.log('axios error: ', err);
            //setError(err.message)
        }finally{
            //setTimeout(()=>setLoading(false), 2000);
        }
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.push(action.payload)
        },
        removeProduct: (state, action) => {
            const index = state.findIndex(p => p.id === action.payload);
            state.splice(index, 1);
        },
    },
    // extraReducers meant for dealing with async functions
    extraReducers: (builder) => {
        builder.addCase(
            fetchProductsAsync.fulfilled, 
            (state, action) => { return action.payload }
        )
    }
});

const products = productsSlice.reducer; // only sync actions
export const { addProduct, removeProduct } = productsSlice.actions;

export default products;