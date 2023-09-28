import { configureStore, ThunkAction, Action, combineReducers, Reducer, AnyAction } from "@reduxjs/toolkit";

import cart from '../redux/app-reducers/cart';
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import { PersistConfig } from "redux-persist/lib/types";

import { setupListeners } from '@reduxjs/toolkit/query/react';
import productQueries from '../redux/api-queries/product-queries';
import userQueries from "../redux/api-queries/user-queries";

const persistConfig: PersistConfig<any> = { 
    key: 'cart', 
    storage, 
    whitelist: ['cart'] // For local storage 
};
const rootReducer = combineReducers({
    cart, 
    [productQueries.reducerPath]: productQueries.reducer,
    [userQueries.reducerPath]: userQueries.reducer
});

const persistedReducer: Reducer<AppState, AnyAction> = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
        {
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }
    ).concat(productQueries.middleware, userQueries.middleware),
  });

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
setupListeners(store.dispatch);
export const persistor = persistStore(store);