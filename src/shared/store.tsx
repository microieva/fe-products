import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import products from '../redux/products';
import users from '../redux/users';


export const store = configureStore({
  reducer: {
    // these are destructures names instead of "products: productsReducer" - we just name the export the same so can write shortly in here
    products,
    users
  }
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>; // redux-intro 1:56
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;