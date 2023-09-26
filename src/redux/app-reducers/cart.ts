import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from '../../@types/cart';
import { Product } from '../../@types/product';

export const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Product>) => {
            const cartItem: CartItem = {...action.payload, quantity: 1};
            const index = state.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state[index].quantity++;
            } else {
                state.push(cartItem);
            }
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const index = state.findIndex((item) => item.id === action.payload);
            if (state[index].quantity > 1) {
                state[index].quantity--;
            } else {
                state.splice(index, 1);
            }
            
        }
    }
});

const cartReducer = cartSlice.reducer;
export const { addItem, removeItem } = cartSlice.actions;

export default cartReducer;