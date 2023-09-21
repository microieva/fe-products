import { configureStore, ThunkAction, Action, combineReducers, Reducer } from "@reduxjs/toolkit";

import products from '../redux/app-reducers/products';
import users from '../redux/app-reducers/users';
import cart from '../redux/app-reducers/cart';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/lib/types";
import { CartItem } from "../@types/cart";
import { setupListeners } from '@reduxjs/toolkit/query/react';
import productQueries from '../redux/api-queries/product-queries';

const persistConfig: PersistConfig<any> = { 
    key: 'cart', 
    storage, 
    whitelist: ['cart'] // For local storage we add reducers we want to follow. opposite we can have blacklist and add the ones we skip
};
const rootReducer = combineReducers({
    products, 
    users, 
    cart, 
    [productQueries.reducerPath]: productQueries.reducer
});
const persistedReducer: Reducer<CartItem[]> = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
  });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>; // redux-intro 1:56
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);
export const persistor = persistStore(store);