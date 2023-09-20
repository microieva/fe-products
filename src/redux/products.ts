import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../@types/product';

const initialState: Product[] = [];

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
        }
    }
});

const products = productsSlice.reducer;
export const { addProduct, removeProduct } = productsSlice.actions;

export default products;