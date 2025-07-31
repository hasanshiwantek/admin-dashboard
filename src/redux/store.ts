import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './slices/homeSlice';
import authReducer from './slices/authSlice'
import configReducer from './slices/configSlice'
import productReducer from "./slices/productSlice"
import orderReducer from "./slices/orderSlice"
import categoryReducer from "./slices/categorySlice"

export const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    config: configReducer,
    product:productReducer,
    order:orderReducer,
    category:categoryReducer
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
