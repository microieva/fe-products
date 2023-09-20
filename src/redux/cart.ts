import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '../@types/cart';

const initialState: Cart[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        },
        removeProduct: (state, action) => {
            //const index = state.findIndex(p => p.id === action.payload);
            //state.splice(index, 1);
        }
    }
});

const cartReducer = cartSlice.reducer;
export const { addProduct, removeProduct } = cartSlice.actions;

export default cartReducer;